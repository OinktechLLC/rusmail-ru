import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail, ArrowLeft, FileText, Shield, Clock, AlertTriangle, CheckCircle } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Mail className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">RusMail</span>
          </Link>
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              На главную
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Условия использования</h1>
              <p className="text-muted-foreground">Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
            </div>
          </div>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-12 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <CheckCircle className="h-5 w-5" />
              <h2 className="m-0 text-xl font-semibold text-card-foreground">1. Принятие условий</h2>
            </div>
            <p className="text-muted-foreground">
              Используя сервис RusMail (далее — «Сервис»), вы подтверждаете, что прочитали, поняли и согласны 
              соблюдать настоящие Условия использования. Если вы не согласны с какими-либо положениями, 
              пожалуйста, не используйте наш Сервис.
            </p>
            <p className="text-muted-foreground">
              Мы оставляем за собой право изменять эти условия в любое время. Продолжение использования 
              Сервиса после внесения изменений означает ваше согласие с обновлёнными условиями.
            </p>
          </section>

          <section className="mb-12 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <FileText className="h-5 w-5" />
              <h2 className="m-0 text-xl font-semibold text-card-foreground">2. Описание сервиса</h2>
            </div>
            <p className="text-muted-foreground">
              RusMail предоставляет услугу временной электронной почты, которая позволяет пользователям:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Получать временный почтовый адрес без регистрации
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Получать входящие электронные письма
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Отправлять ответы на полученные письма
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Организовывать письма с помощью меток и папок
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Хранить письма в течение 90 дней с момента последней активности
              </li>
            </ul>
          </section>

          <section className="mb-12 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Shield className="h-5 w-5" />
              <h2 className="m-0 text-xl font-semibold text-card-foreground">3. Правила использования</h2>
            </div>
            <p className="text-muted-foreground">При использовании Сервиса вы обязуетесь:</p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Использовать Сервис только в законных целях
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Не использовать Сервис для рассылки спама или вредоносного контента
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Не пытаться обойти системы защиты Сервиса
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Не использовать Сервис для мошенничества или обмана
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Не нарушать права третьих лиц
              </li>
            </ul>
          </section>

          <section className="mb-12 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <AlertTriangle className="h-5 w-5" />
              <h2 className="m-0 text-xl font-semibold text-card-foreground">4. Запрещённые действия</h2>
            </div>
            <p className="text-muted-foreground">Категорически запрещается использовать Сервис для:</p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                Распространения незаконного контента
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                Фишинга и других видов интернет-мошенничества
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                Распространения вредоносного программного обеспечения
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                Нарушения авторских прав и интеллектуальной собственности
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                Преследования или угроз другим лицам
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                Любой деятельности, нарушающей законодательство РФ или международное право
              </li>
            </ul>
          </section>

          <section className="mb-12 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Clock className="h-5 w-5" />
              <h2 className="m-0 text-xl font-semibold text-card-foreground">5. Срок хранения данных</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <strong className="text-card-foreground">Срок хранения:</strong> Все письма и данные почтового ящика 
                хранятся в течение 90 дней с момента последней активности пользователя.
              </li>
              <li>
                <strong className="text-card-foreground">Продление срока:</strong> При каждом входе в почтовый ящик 
                или получении нового письма срок хранения автоматически продлевается на 90 дней.
              </li>
              <li>
                <strong className="text-card-foreground">Удаление данных:</strong> По истечении 90 дней неактивности 
                все данные, включая письма и почтовый адрес, безвозвратно удаляются.
              </li>
              <li>
                <strong className="text-card-foreground">Невозможность восстановления:</strong> После удаления данные 
                не подлежат восстановлению. Мы рекомендуем сохранять важную информацию отдельно.
              </li>
            </ul>
          </section>

          <section className="mb-12 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Shield className="h-5 w-5" />
              <h2 className="m-0 text-xl font-semibold text-card-foreground">6. Ограничение ответственности</h2>
            </div>
            <p className="text-muted-foreground">
              Сервис предоставляется «как есть» без каких-либо гарантий. Мы не несём ответственности за:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>• Перебои в работе Сервиса или потерю данных</li>
              <li>• Действия третьих лиц, использующих Сервис</li>
              <li>• Любой ущерб, связанный с использованием Сервиса</li>
              <li>• Содержание писем, отправленных или полученных через Сервис</li>
              <li>• Блокировку почтовых адресов сторонними сервисами</li>
            </ul>
          </section>

          <section className="mb-12 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <FileText className="h-5 w-5" />
              <h2 className="m-0 text-xl font-semibold text-card-foreground">7. Интеллектуальная собственность</h2>
            </div>
            <p className="text-muted-foreground">
              Все права на дизайн, код, логотипы и другие элементы Сервиса принадлежат RusMail. 
              Копирование, модификация или распространение материалов Сервиса без письменного 
              разрешения запрещено.
            </p>
          </section>

          <section className="mb-12 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <AlertTriangle className="h-5 w-5" />
              <h2 className="m-0 text-xl font-semibold text-card-foreground">8. Прекращение доступа</h2>
            </div>
            <p className="text-muted-foreground">
              Мы оставляем за собой право прекратить ваш доступ к Сервису без предварительного 
              уведомления в случае нарушения настоящих Условий использования или по любой другой 
              причине по нашему усмотрению.
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Mail className="h-5 w-5" />
              <h2 className="m-0 text-xl font-semibold text-card-foreground">9. Контактная информация</h2>
            </div>
            <p className="text-muted-foreground">
              По всем вопросам, связанным с Условиями использования, вы можете связаться с нами 
              через форму обратной связи на сайте или отправив письмо на адрес поддержки.
            </p>
          </section>
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/app">
            <Button size="lg">
              Принять и продолжить
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
