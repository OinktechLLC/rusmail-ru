// Email API Service with automatic fallback
// Uses multiple temp mail APIs with automatic switching

interface TempMailAPI {
  name: string
  baseUrl: string
  isAvailable: boolean
  priority: number
}

const APIs: TempMailAPI[] = [
  { name: 'mail.tm', baseUrl: 'https://api.mail.tm', isAvailable: true, priority: 1 },
  { name: 'guerrillamail', baseUrl: 'https://api.guerrillamail.com/ajax.php', isAvailable: true, priority: 2 },
  { name: '1secmail', baseUrl: 'https://www.1secmail.com/api/v1', isAvailable: true, priority: 3 },
]

let currentAPIIndex = 0
let cachedToken: string | null = null
let cachedAccountId: string | null = null

// Helper to check API availability
async function checkAPIAvailability(api: TempMailAPI): Promise<boolean> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    
    const response = await fetch(`${api.baseUrl}`, {
      method: 'HEAD',
      signal: controller.signal,
    }).catch(() => null)
    
    clearTimeout(timeoutId)
    return response?.ok ?? false
  } catch {
    return false
  }
}

// Find next available API
async function findAvailableAPI(): Promise<TempMailAPI | null> {
  for (let i = 0; i < APIs.length; i++) {
    const index = (currentAPIIndex + i) % APIs.length
    const api = APIs[index]
    
    if (await checkAPIAvailability(api)) {
      currentAPIIndex = index
      return api
    }
  }
  return null
}

// Mail.tm API implementation
async function mailTmGetDomains(): Promise<string[]> {
  try {
    const res = await fetch('https://api.mail.tm/domains')
    const data = await res.json()
    return data['hydra:member']?.map((d: { domain: string }) => d.domain) || []
  } catch {
    return []
  }
}

async function mailTmCreateAccount(address: string, password: string): Promise<{ id: string; token: string } | null> {
  try {
    // Create account
    const createRes = await fetch('https://api.mail.tm/accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, password }),
    })
    
    if (!createRes.ok) {
      const error = await createRes.json()
      console.error('Account creation error:', error)
      return null
    }
    
    const account = await createRes.json()
    
    // Get token
    const tokenRes = await fetch('https://api.mail.tm/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, password }),
    })
    
    if (!tokenRes.ok) return null
    
    const tokenData = await tokenRes.json()
    cachedToken = tokenData.token
    cachedAccountId = account.id
    
    return { id: account.id, token: tokenData.token }
  } catch (e) {
    console.error('Mail.tm error:', e)
    return null
  }
}

async function mailTmGetMessages(token: string): Promise<Email[]> {
  try {
    const res = await fetch('https://api.mail.tm/messages', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    
    if (!res.ok) return []
    
    const data = await res.json()
    return (data['hydra:member'] || []).map((msg: MailTmMessage) => ({
      id: msg.id,
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
  } catch {
    return []
  }
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
  try {
    const res = await fetch(`https://api.mail.tm/messages/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    
    if (!res.ok) return null
    
    const msg: MailTmMessage = await res.json()
    return {
      id: msg.id,
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
  } catch {
    return null
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
  try {
    const res = await fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`)
    const data = await res.json()
    
    return data.map((msg: SecMailMessage) => ({
      id: String(msg.id),
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
  } catch {
    return []
  }
}

async function secMailGetMessage(login: string, domain: string, id: string): Promise<Email | null> {
  try {
    const res = await fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${id}`)
    const msg: SecMailMessage = await res.json()
    
    return {
      id: String(msg.id),
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
  } catch {
    return null
  }
}

// Unified Email interface
export interface Email {
  id: string
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
  login?: string
  domain?: string
  password?: string
  token?: string
  api: string
  createdAt: string
  lastActivity: string
  expiresAt: string
}

// Main API class
export class EmailService {
  private account: EmailAccount | null = null
  private currentAPI: string = 'mail.tm'
  
  async createAccount(): Promise<EmailAccount | null> {
    // Try Mail.tm first
    try {
      const domains = await mailTmGetDomains()
      if (domains.length > 0) {
        const domain = domains[0]
        const login = generateRandomString(10)
        const email = `${login}@${domain}`
        const password = generateRandomString(16)
        
        const result = await mailTmCreateAccount(email, password)
        if (result) {
          const now = new Date()
          const expires = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)
          
          this.account = {
            email,
            login,
            domain,
            password,
            token: result.token,
            api: 'mail.tm',
            createdAt: now.toISOString(),
            lastActivity: now.toISOString(),
            expiresAt: expires.toISOString(),
          }
          this.currentAPI = 'mail.tm'
          return this.account
        }
      }
    } catch (e) {
      console.error('Mail.tm failed, trying fallback:', e)
    }
    
    // Fallback to 1secmail
    try {
      const domain = ONESECMAIL_DOMAINS[Math.floor(Math.random() * ONESECMAIL_DOMAINS.length)]
      const login = generateRandomString(10)
      const email = `${login}@${domain}`
      
      const now = new Date()
      const expires = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)
      
      this.account = {
        email,
        login,
        domain,
        api: '1secmail',
        createdAt: now.toISOString(),
        lastActivity: now.toISOString(),
        expiresAt: expires.toISOString(),
      }
      this.currentAPI = '1secmail'
      return this.account
    } catch (e) {
      console.error('1secmail failed:', e)
    }
    
    return null
  }
  
  setAccount(account: EmailAccount) {
    this.account = account
    this.currentAPI = account.api
    if (account.token) {
      cachedToken = account.token
    }
  }
  
  async getMessages(): Promise<Email[]> {
    if (!this.account) return []
    
    try {
      if (this.currentAPI === 'mail.tm' && this.account.token) {
        return await mailTmGetMessages(this.account.token)
      } else if (this.currentAPI === '1secmail' && this.account.login && this.account.domain) {
        return await secMailGetMessages(this.account.login, this.account.domain)
      }
    } catch (e) {
      console.error('Failed to get messages:', e)
      // Try to switch API
      await this.switchAPI()
    }
    
    return []
  }
  
  async getMessage(id: string): Promise<Email | null> {
    if (!this.account) return null
    
    try {
      if (this.currentAPI === 'mail.tm' && this.account.token) {
        return await mailTmGetMessage(this.account.token, id)
      } else if (this.currentAPI === '1secmail' && this.account.login && this.account.domain) {
        return await secMailGetMessage(this.account.login, this.account.domain, id)
      }
    } catch (e) {
      console.error('Failed to get message:', e)
    }
    
    return null
  }
  
  private async switchAPI(): Promise<boolean> {
    const api = await findAvailableAPI()
    if (api) {
      this.currentAPI = api.name
      // Would need to recreate account with new API
      return true
    }
    return false
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
