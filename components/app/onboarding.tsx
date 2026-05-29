'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Mail, 
  Shield, 
  FileText, 
  ChevronDown, 
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowRight
} from 'lucide-react'

interface OnboardingProps {
  onAccept: () => void
}

export function Onboarding({ onAccept }: OnboardingProps) {
  const [termsRead, setTermsRead] = useState(false)
  const [privacyRead, setPrivacyRead] = useState(false)
  const [termsChecked, setTermsChecked] = useState(false)
  const [privacyChecked, setPrivacyChecked] = useState(false)
  const [activeSection, setActiveSection] = useState<'terms' | 'privacy'>('terms')
  
  const termsRef = useRef<HTMLDivElement>(null)
  const privacyRef = useRef<HTMLDivElement>(null)

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>, section: 'terms' | 'privacy') => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50
      
      if (isAtBottom) {
        if (section === 'terms') {
          setTermsRead(true)
        } else {
          setPrivacyRead(true)
        }
      }
    }
  }

  const canProceed = termsRead && privacyRead && termsChecked && privacyChecked

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Mail className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">RusMail</h1>
            <p className="text-sm text-muted-foreground">Добро пожаловать</p>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col px-4 py-8">
        <div className="mx-auto w-full max-w-4xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Шаг 1 из 1</span>
              <span className="text-muted-foreground">Ознакомление с условиями</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-secondary">
              <div 
                className="h-2 rounded-full bg-primary transition-all duration-500"
                style={{ width: canProceed ? '100%' : `${(Number(termsRead) + Number(privacyRead)) * 40 + (Number(termsChecked) + Number(privacyChecked)) * 10}%` }}
              />
            </div>
          </div>

          {/* Info Banner */}
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-medium text-foreground">Важно прочитать</p>
              <p className="text-sm text-muted-foreground">
                Для использования RusMail вам необходимо прочитать и принять Условия использования 
                и Политику конфиденциальности. Прокрутите каждый раздел до конца.
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setActiveSection('terms')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                activeSection === 'terms'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/50'
              }`}
            >
              <FileText className="h-4 w-4" />
              Условия использования
              {termsRead && <CheckCircle className="h-4 w-4 text-primary" />}
            </button>
            <button
              onClick={() => setActiveSection('privacy')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                activeSection === 'privacy'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/50'
              }`}
            >
              <Shield className="h-4 w-4" />
              Политика конфиденциальности
              {privacyRead && <CheckCircle className="h-4 w-4 text-primary" />}
            </button>
          </div>

          {/* Content */}
          <div className="rounded-xl border border-border bg-card">
            {activeSection === 'terms' ? (
              <div className="relative">
                <div
                  ref={termsRef}
                  onScroll={() => handleScroll(termsRef, 'terms')}
                  className="h-[400px] overflow-y-auto p-6"
                >
                  <TermsContent />
                </div>
                {!termsRead && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center justify-center bg-gradient-to-t from-card via-card/80 to-transparent pb-4 pt-16">
                    <ChevronDown className="h-6 w-6 animate-bounce text-primary" />
                    <span className="text-sm text-muted-foreground">Прокрутите вниз для продолжения</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <div
                  ref={privacyRef}
                  onScroll={() => handleScroll(privacyRef, 'privacy')}
                  className="h-[400px] overflow-y-auto p-6"
                >
                  <PrivacyContent />
                </div>
                {!privacyRead && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center justify-center bg-gradient-to-t from-card via-card/80 to-transparent pb-4 pt-16">
                    <ChevronDown className="h-6 w-6 animate-bounce text-primary" />
                    <span className="text-sm text-muted-foreground">Прокрутите вниз для продолжения</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Checkboxes */}
          <div className="mt-6 space-y-4">
            <label 
              className={`flex items-start gap-3 rounded-lg border p-4 transition-colors ${
                termsRead 
                  ? 'cursor-pointer border-border bg-card hover:border-primary/50' 
                  : 'cursor-not-allowed border-border/50 bg-muted/30 opacity-60'
              }`}
            >
              <Checkbox
                checked={termsChecked}
                onCheckedChange={(checked) => termsRead && setTermsChecked(checked as boolean)}
                disabled={!termsRead}
                className="mt-0.5"
              />
              <div>
                <p className="font-medium text-foreground">Я прочитал(а) и принимаю Условия использования</p>
                <p className="text-sm text-muted-foreground">
                  {termsRead 
                    ? 'Вы ознакомились с условиями' 
                    : 'Сначала прочитайте условия использования до конца'}
                </p>
              </div>
            </label>

            <label 
              className={`flex items-start gap-3 rounded-lg border p-4 transition-colors ${
                privacyRead 
                  ? 'cursor-pointer border-border bg-card hover:border-primary/50' 
                  : 'cursor-not-allowed border-border/50 bg-muted/30 opacity-60'
              }`}
            >
              <Checkbox
                checked={privacyChecked}
                onCheckedChange={(checked) => privacyRead && setPrivacyChecked(checked as boolean)}
                disabled={!privacyRead}
                className="mt-0.5"
              />
              <div>
                <p className="font-medium text-foreground">Я прочитал(а) и принимаю Политику конфиденциальности</p>
                <p className="text-sm text-muted-foreground">
                  {privacyRead 
                    ? 'Вы ознакомились с политикой' 
                    : 'Сначала прочитайте политику конфиденциальности до конца'}
                </p>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              disabled={!canProceed}
              onClick={onAccept}
              className="w-full sm:w-auto"
            >
              Продолжить к почте
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {!canProceed && (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Прочитайте оба документа и отметьте галочки для продолжения
            </p>
          )}
        </div>
      </main>
    </div>
  )
}

function TermsContent() {
  return (
    <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
      <h2 className="text-xl font-bold text-card-foreground">Условия использования RusMail</h2>
      <p className="text-xs text-muted-foreground">Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
      
      <h3 className="mt-6 text-lg font-semibold text-card-foreground">1. Принятие условий</h3>
      <p className="text-muted-foreground">
        Используя сервис RusMail, вы подтверждаете, что прочитали, поняли и согласны 
        соблюдать настоящие Условия использования. Если вы не согласны с какими-либо положениями, 
        пожалуйста, не используйте наш Сервис.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-card-foreground">2. Описание сервиса</h3>
      <p className="text-muted-foreground">RusMail предоставляет услугу временной электронной почты:</p>
      <ul className="text-muted-foreground">
        <li>Получение временного почтового адреса без регистрации</li>
        <li>Получение входящих электронных писем</li>
        <li>Отправка ответов на полученные письма</li>
        <li>Организация писем с помощью меток и папок</li>
        <li>Хранение писем в течение 90 дней с момента последней активности</li>
      </ul>

      <h3 className="mt-6 text-lg font-semibold text-card-foreground">3. Правила использования</h3>
      <p className="text-muted-foreground">При использовании Сервиса вы обязуетесь:</p>
      <ul className="text-muted-foreground">
        <li>Использовать Сервис только в законных целях</li>
        <li>Не использовать Сервис для рассылки спама</li>
        <li>Не пытаться обойти системы защиты Сервиса</li>
        <li>Не использовать Сервис для мошенничества</li>
        <li>Не нарушать права третьих лиц</li>
      </ul>

      <h3 className="mt-6 text-lg font-semibold text-card-foreground">4. Запрещённые действия</h3>
      <p className="text-muted-foreground">Категорически запрещается использовать Сервис для:</p>
      <ul className="text-muted-foreground">
        <li>Распространения незаконного контента</li>
        <li>Фишинга и других видов интернет-мошенничества</li>
        <li>Распространения вредоносного программного обеспечения</li>
        <li>Нарушения авторских прав</li>
        <li>Преследования или угроз другим лицам</li>
        <li>Любой деятельности, нарушающей законодательство</li>
      </ul>

      <h3 className="mt-6 text-lg font-semibold text-card-foreground">5. Срок хранения данных</h3>
      <p className="text-muted-foreground">
        <strong>Срок хранения:</strong> Все письма и данные почтового ящика 
        хранятся в течение 90 дней с момента последней активности пользователя.
      </p>
      <p className="text-muted-foreground">
        <strong>Продление срока:</strong> При каждом входе в почтовый ящик 
        срок хранения автоматически продлевается на 90 дней.
      </p>
      <p className="text-muted-foreground">
        <strong>Удаление данных:</strong> По истечении 90 дней неактивности 
        все данные безвозвратно удаляются.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-card-foreground">6. Ограничение ответственности</h3>
      <p className="text-muted-foreground">
        Сервис предоставляется «как есть» без каких-либо гарантий. Мы не несём ответственности за 
        перебои в работе, потерю данных, действия третьих лиц или любой ущерб, связанный с использованием Сервиса.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-card-foreground">7. Прекращение доступа</h3>
      <p className="text-muted-foreground">
        Мы оставляем за собой право прекратить ваш доступ к Сервису без предварительного 
        уведомления в случае нарушения настоящих Условий использования.
      </p>

      <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-4">
        <p className="text-center text-sm font-medium text-foreground">
          Вы дошли до конца Условий использования
        </p>
      </div>
    </div>
  )
}

function PrivacyContent() {
  return (
    <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
      <h2 className="text-xl font-bold text-card-foreground">Политика конфиденциальности RusMail</h2>
      <p className="text-xs text-muted-foreground">Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
      
      <h3 className="mt-6 text-lg font-semibold text-card-foreground">1. Введение</h3>
      <p className="text-muted-foreground">
        Настоящая Политика конфиденциальности описывает, как RusMail собирает, 
        использует и защищает информацию, которую вы предоставляете при использовании 
        нашего сервиса временной электронной почты.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-card-foreground">2. Какие данные мы собираем</h3>
      <p className="text-muted-foreground"><strong>Автоматически собираемые данные:</strong></p>
      <ul className="text-muted-foreground">
        <li>Временный почтовый адрес — генерируется автоматически</li>
        <li>Содержимое писем — входящие и исходящие сообщения</li>
        <li>Метаданные — время получения/отправки, статус прочтения</li>
        <li>Техническая информация — тип браузера (анонимно)</li>
      </ul>

      <p className="mt-4 text-muted-foreground"><strong>Данные, которые мы НЕ собираем:</strong></p>
      <ul className="text-muted-foreground">
        <li>Имя, фамилию или другие персональные данные</li>
        <li>Номер телефона</li>
        <li>Ваш основной email адрес</li>
        <li>Платёжную информацию</li>
        <li>Точное местоположение</li>
      </ul>

      <h3 className="mt-6 text-lg font-semibold text-card-foreground">3. Как мы используем данные</h3>
      <p className="text-muted-foreground">Собранные данные используются для:</p>
      <ul className="text-muted-foreground">
        <li>Предоставления услуги временной электронной почты</li>
        <li>Доставки и хранения ваших писем</li>
        <li>Фильтрации спама</li>
        <li>Улучшения работы Сервиса</li>
        <li>Обеспечения безопасности</li>
      </ul>

      <h3 className="mt-6 text-lg font-semibold text-card-foreground">4. Срок хранения данных</h3>
      <p className="text-muted-foreground">
        Все данные хранятся <strong>90 дней</strong> с момента последней активности. 
        При каждой активности срок автоматически продлевается. 
        После 90 дней неактивности данные безвозвратно удаляются.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-card-foreground">5. Защита данных</h3>
      <p className="text-muted-foreground">Мы применяем следующие меры защиты:</p>
      <ul className="text-muted-foreground">
        <li>Шифрование данных при передаче (HTTPS/TLS)</li>
        <li>Регулярное обновление систем безопасности</li>
        <li>Ограниченный доступ к данным</li>
        <li>Автоматическое удаление по истечении срока</li>
      </ul>

      <h3 className="mt-6 text-lg font-semibold text-card-foreground">6. Передача данных третьим лицам</h3>
      <p className="text-muted-foreground">
        Мы <strong>не продаём и не передаём</strong> ваши данные третьим лицам для маркетинговых целей. 
        Данные могут быть переданы только по требованию правоохранительных органов в рамках законодательства.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-card-foreground">7. Cookies и локальное хранилище</h3>
      <p className="text-muted-foreground">
        Мы используем локальное хранилище браузера для сохранения информации о вашем почтовом ящике 
        и настройках. Эти данные хранятся только на вашем устройстве.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-card-foreground">8. Ваши права</h3>
      <p className="text-muted-foreground">Вы имеете право:</p>
      <ul className="text-muted-foreground">
        <li>Прекратить использование Сервиса в любой момент</li>
        <li>Удалять письма вручную</li>
        <li>Дождаться автоматического удаления данных</li>
        <li>Обратиться к нам с вопросами о ваших данных</li>
      </ul>

      <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-4">
        <p className="text-center text-sm font-medium text-foreground">
          Вы дошли до конца Политики конфиденциальности
        </p>
      </div>
    </div>
  )
}
