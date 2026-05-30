// Email API Service with automatic fallback
// Uses multiple temp mail APIs with timeouts, cooldowns, and automatic switching

interface TempMailAPI {
  name: EmailApiName
  priority: number
  cooldownUntil?: number
  failures: number
}

type EmailApiName = 'mail.tm' | '1secmail'

const REQUEST_TIMEOUT_MS = 8000
const API_COOLDOWN_MS = 60_000

const APIs: TempMailAPI[] = [
  { name: 'mail.tm', priority: 1, failures: 0 },
  { name: '1secmail', priority: 2, failures: 0 },
]

function nowMs() {
  return Date.now()
}

function isApiCoolingDown(api: TempMailAPI) {
  return Boolean(api.cooldownUntil && api.cooldownUntil > nowMs())
}

function markApiSuccess(apiName: EmailApiName) {
  const api = APIs.find((item) => item.name === apiName)
  if (!api) return

  api.failures = 0
  api.cooldownUntil = undefined
}

function markApiFailure(apiName: EmailApiName) {
  const api = APIs.find((item) => item.name === apiName)
  if (!api) return

  api.failures += 1
  api.cooldownUntil = nowMs() + API_COOLDOWN_MS * api.failures
}

function getOrderedApis(preferredApi?: EmailApiName) {
  return [...APIs].sort((a, b) => {
    if (preferredApi && a.name === preferredApi) return -1
    if (preferredApi && b.name === preferredApi) return 1

    const aCoolingDown = isApiCoolingDown(a)
    const bCoolingDown = isApiCoolingDown(b)
    if (aCoolingDown !== bCoolingDown) return aCoolingDown ? 1 : -1

    if (a.failures !== b.failures) return a.failures - b.failures
    return a.priority - b.priority
  })
}

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit = {}, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController()
  const timeoutId = globalThis.setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    })
  } finally {
    globalThis.clearTimeout(timeoutId)
  }
}

async function fetchJson<T>(input: RequestInfo | URL, init: RequestInit = {}, timeoutMs = REQUEST_TIMEOUT_MS): Promise<T> {
  const response = await fetchWithTimeout(input, init, timeoutMs)

  if (!response.ok) {
    let details = ''
    try {
      details = JSON.stringify(await response.json())
    } catch {
      details = response.statusText
    }
    throw new Error(`Request failed (${response.status}): ${details}`)
  }

  return response.json() as Promise<T>
}

// Mail.tm API implementation
interface MailTmDomainResponse {
  'hydra:member'?: { domain: string }[]
}

async function mailTmGetDomains(): Promise<string[]> {
  const data = await fetchJson<MailTmDomainResponse>('https://api.mail.tm/domains')
  return data['hydra:member']?.map((domain) => domain.domain) || []
}

async function mailTmCreateAccount(address: string, password: string): Promise<{ id: string; token: string }> {
  const account = await fetchJson<{ id: string }>('https://api.mail.tm/accounts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address, password }),
  })

  const tokenData = await fetchJson<{ token: string }>('https://api.mail.tm/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address, password }),
  })

  return { id: account.id, token: tokenData.token }
}

async function mailTmGetMessages(token: string): Promise<Email[]> {
  const data = await fetchJson<{ 'hydra:member'?: MailTmMessage[] }>('https://api.mail.tm/messages', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return (data['hydra:member'] || []).map((msg) => ({
    id: `mail.tm:${msg.id}`,
    providerId: msg.id,
    from: msg.from?.address || 'unknown@mail.com',
    fromName: msg.from?.name || msg.from?.address || 'Unknown',
    to: msg.to?.[0]?.address || '',
    subject: msg.subject || '(Без темы)',
    body: msg.intro || '',
    date: msg.createdAt,
    read: msg.seen || false,
    starred: false,
    spam: false,
    labels: [],
  }))
}

interface MailTmMessage {
  id: string
  from: { address: string; name?: string }
  to: { address: string }[]
  subject: string
  intro: string
  text?: string
  html?: string[]
  createdAt: string
  seen?: boolean
}

async function mailTmGetMessage(token: string, id: string): Promise<Email | null> {
  const providerId = id.replace(/^mail\.tm:/, '')
  const msg = await fetchJson<MailTmMessage>(`https://api.mail.tm/messages/${providerId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return {
    id: `mail.tm:${msg.id}`,
    providerId: msg.id,
    from: msg.from?.address || 'unknown@mail.com',
    fromName: msg.from?.name || msg.from?.address || 'Unknown',
    to: msg.to?.[0]?.address || '',
    subject: msg.subject || '(Без темы)',
    body: msg.text || msg.intro || '',
    html: msg.html?.join('') || undefined,
    date: msg.createdAt,
    read: true,
    starred: false,
    spam: false,
    labels: [],
  }
}

// 1secmail API implementation
const ONESECMAIL_DOMAINS = ['1secmail.com', '1secmail.org', '1secmail.net', 'bheps.com', 'dcctb.com', 'kzccv.com', 'qiott.com', 'wuuvo.com']

function generateRandomString(length: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

interface SecMailMessage {
  id: number
  from: string
  subject: string
  date: string
  body?: string
  textBody?: string
  htmlBody?: string
}

async function secMailGetMessages(login: string, domain: string): Promise<Email[]> {
  const data = await fetchJson<SecMailMessage[]>(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`)

  return data.map((msg) => ({
    id: `1secmail:${msg.id}`,
    providerId: String(msg.id),
    from: msg.from,
    fromName: msg.from.split('@')[0],
    to: `${login}@${domain}`,
    subject: msg.subject || '(Без темы)',
    body: '',
    date: msg.date,
    read: false,
    starred: false,
    spam: false,
    labels: [],
  }))
}

async function secMailGetMessage(login: string, domain: string, id: string): Promise<Email | null> {
  const providerId = id.replace(/^1secmail:/, '')
  const msg = await fetchJson<SecMailMessage>(`https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${providerId}`)

  return {
    id: `1secmail:${msg.id}`,
    providerId: String(msg.id),
    from: msg.from,
    fromName: msg.from.split('@')[0],
    to: `${login}@${domain}`,
    subject: msg.subject || '(Без темы)',
    body: msg.textBody || msg.body || '',
    html: msg.htmlBody,
    date: msg.date,
    read: true,
    starred: false,
    spam: false,
    labels: [],
  }
}

// Unified Email interface
export interface Email {
  id: string
  providerId?: string
  from: string
  fromName: string
  to: string
  subject: string
  body: string
  html?: string
  date: string
  read: boolean
  starred: boolean
  spam: boolean
  labels: string[]
}

export interface EmailAccount {
  email: string
  login: string
  domain: string
  password?: string
  token?: string
  api: EmailApiName
  createdAt: string
  lastActivity: string
  expiresAt: string
}

// Main API class
export class EmailService {
  private account: EmailAccount | null = null
  private currentAPI: EmailApiName = 'mail.tm'

  getAccount() {
    return this.account
  }

  async createAccount(preferredApi?: EmailApiName): Promise<EmailAccount | null> {
    for (const api of getOrderedApis(preferredApi)) {
      try {
        const account = api.name === 'mail.tm'
          ? await this.createMailTmAccount()
          : await this.createSecMailAccount()

        this.account = account
        this.currentAPI = account.api
        markApiSuccess(api.name)
        return account
      } catch (error) {
        console.error(`${api.name} account creation failed:`, error)
        markApiFailure(api.name)
      }
    }

    return null
  }

  setAccount(account: Partial<EmailAccount> | null): boolean {
    if (!account || !this.isUsableAccount(account)) {
      this.account = null
      return false
    }

    this.account = account
    this.currentAPI = account.api
    return true
  }

  async getMessages(): Promise<Email[]> {
    if (!this.account) return []

    try {
      const messages = await this.getMessagesForAccount(this.account)
      markApiSuccess(this.currentAPI)
      return messages
    } catch (error) {
      console.error(`${this.currentAPI} failed, switching API automatically:`, error)
      markApiFailure(this.currentAPI)
      await this.switchAPI()
      return []
    }
  }

  async getMessage(id: string): Promise<Email | null> {
    if (!this.account) return null

    try {
      if (this.currentAPI === 'mail.tm' && this.account.token) {
        return await mailTmGetMessage(this.account.token, id)
      }

      if (this.currentAPI === '1secmail') {
        return await secMailGetMessage(this.account.login, this.account.domain, id)
      }
    } catch (error) {
      console.error('Failed to get message:', error)
      markApiFailure(this.currentAPI)
      await this.switchAPI()
    }

    return null
  }

  private async createMailTmAccount(): Promise<EmailAccount> {
    const domains = await mailTmGetDomains()
    if (domains.length === 0) {
      throw new Error('mail.tm returned no domains')
    }

    let lastError: unknown

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const domain = domains[attempt % domains.length]
        const login = generateRandomString(10)
        const email = `${login}@${domain}`
        const password = generateRandomString(16)
        const result = await mailTmCreateAccount(email, password)

        return this.buildAccount({
          api: 'mail.tm',
          email,
          login,
          domain,
          password,
          token: result.token,
        })
      } catch (error) {
        lastError = error
      }
    }

    throw lastError || new Error('Unable to create mail.tm account')
  }

  private async createSecMailAccount(): Promise<EmailAccount> {
    const domain = ONESECMAIL_DOMAINS[Math.floor(Math.random() * ONESECMAIL_DOMAINS.length)]
    const login = generateRandomString(10)
    const email = `${login}@${domain}`

    // Probe the inbox endpoint so we do not select a dead API silently.
    await secMailGetMessages(login, domain)

    return this.buildAccount({
      api: '1secmail',
      email,
      login,
      domain,
    })
  }

  private buildAccount(details: Pick<EmailAccount, 'api' | 'email' | 'login' | 'domain'> & Partial<EmailAccount>): EmailAccount {
    const now = new Date()
    const expires = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)

    return {
      ...details,
      createdAt: now.toISOString(),
      lastActivity: now.toISOString(),
      expiresAt: expires.toISOString(),
    }
  }

  private async getMessagesForAccount(account: EmailAccount): Promise<Email[]> {
    if (account.api === 'mail.tm' && account.token) {
      return mailTmGetMessages(account.token)
    }

    if (account.api === '1secmail') {
      return secMailGetMessages(account.login, account.domain)
    }

    throw new Error('Account is not usable')
  }

  private isUsableAccount(account: Partial<EmailAccount>): account is EmailAccount {
    if (!account.email || !account.login || !account.domain || !account.api) return false
    if (account.api === 'mail.tm') return Boolean(account.token && account.password)
    return account.api === '1secmail'
  }

  private async switchAPI(): Promise<boolean> {
    const nextAccount = await this.createAccount()
    return Boolean(nextAccount)
  }

  // Update activity to extend email life
  updateActivity() {
    if (this.account) {
      const now = new Date()
      const expires = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)
      this.account.lastActivity = now.toISOString()
      this.account.expiresAt = expires.toISOString()
    }
  }

  isExpired(): boolean {
    if (!this.account) return true
    return new Date() > new Date(this.account.expiresAt)
  }
}

export const emailService = new EmailService()
