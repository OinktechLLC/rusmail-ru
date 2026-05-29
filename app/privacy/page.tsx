import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail, ArrowLeft, Shield, Eye, Database, Lock, UserX, Globe, Clock, Trash2 } from 'lucide-react'

export default function PrivacyPage() {
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
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Политика конфиденциальности</h1>
              <p className="text-muted-foreground">Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
            </div>
          </div>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-12 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Eye className="h-5 w-5" />
              <h2 className="m-0 text-xl font-semibold text-card-foreground">1. Введение</h2>
            </div>
            <p className="text-muted-foreground">
              Настоящая Политика конфиденциальности описывает, как RusMail (далее — «мы», «наш», «Сервис») 
              собирает, использует и защищает информацию, которую вы предоставляете при использовании 
              нашего сервиса временной электронной почты.
            </p>
            <p className="text-muted-foreground">
              Мы серьёзно относимся к защите вашей конфиденциальности и стремимся быть максимально 
              прозрачными в отношении обработки данных.
            </p>
          </section>

          <section className="mb-12 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Database className="h-5 w-5" />
              <h2 className="m-0 text-xl font-semibold text-card-foreground">2. Какие данные мы собираем</h2>
            </div>
            <p className="text-muted-foreground">В процессе работы Сервиса мы можем собирать следующую информацию:</p>
            
            <h3 className="mt-6 text-lg font-medium text-card-foreground">2.1. Автоматически собираемые данные:</h3>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Database className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span><strong>Временный почтовый адрес</strong> — генерируется автоматически для вашего сеанса</span>
              </li>
              <li className="flex items-start gap-2">
                <Database className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span><strong>Содержимое писем</strong> — входящие и исходящие сообщения</span>
              </li>
              <li className="flex items-start gap-2">
                <Database className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span><strong>Метаданные</strong> — время получения/отправки писем, метки, статус прочтения</span>
              </li>
              <li className="flex items-start gap-2">
                <Database className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span><strong>Техническая информация</strong> — тип браузера, операционная система (анонимно)</span>
              </li>
            </ul>

            <h3 className="mt-6 text-lg font-medium text-card-foreground">2.2. Данные, которые мы НЕ собираем:</h3>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <UserX className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <span>Имя, фамилию или другие персональные данные</span>
              </li>
              <li className="flex items-start gap-2">
                <UserX className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <span>Номер телефона</span>
              </li>
              <li className="flex items-start gap-2">
                <UserX className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <span>Ваш основной email адрес</span>
              </li>
              <li className="flex items-start gap-2">
                <UserX className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <span>Платёжную информацию</span>
              </li>
              <li className="flex items-start gap-2">
                <UserX className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <span>Точное местоположение</span>
              </li>
            </ul>
          </section>

          <section className="mb-12 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Globe className="h-5 w-5" />
              <h2 className="m-0 text-xl font-semibold text-card-foreground">3. Как мы используем данные</h2>
            </div>
            <p className="text-muted-foreground">Собранные данные используются исключительно для:</p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Предоставления услуги временной электронной почты
              </li>
              <li className="flex items-start gap-2">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Доставки и хранения ваших писем
              </li>
              <li className="flex items-start gap-2">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Фильтрации спама и вредоносного контента
              </li>
              <li className="flex items-start gap-2">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Улучшения работы Сервиса
              </li>
              <li className="flex items-start gap-2">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Обеспечения безопасности и предотвращения злоупотреблений
              </li>
            </ul>
          </section>

          <section className="mb-12 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Clock className="h-5 w-5" />
              <h2 className="m-0 text-xl font-semibold text-card-foreground">4. Срок хранения данных</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-card-foreground">Основной срок:</strong> Все данные (почтовый адрес, письма, метки) 
                хранятся в течение <strong className="text-primary">90 дней</strong> с момента последней активности.
              </p>
              <p>
                <strong className="text-card-foreground">Автоматическое продление:</strong> Каждый раз, когда вы 
                входите в почтовый ящик или получаете новое письмо, срок хранения автоматически 
                продлевается на 90 дней.
              </p>
              <p>
                <strong className="text-card-foreground">Автоматическое удаление:</strong> После 90 дней 
                неактивности все данные <strong className="text-destructive">безвозвратно удаляются</strong> из наших систем.
              </p>
              <p>
                <strong className="text-card-foreground">Невозможность восстановления:</strong> После удаления 
                данные не могут быть восстановлены. Пожалуйста, сохраняйте важную информацию отдельно.
              </p>
            </div>
          </section>

          <section className="mb-12 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Lock className="h-5 w-5" />
              <h2 className="m-0 text-xl font-semibold text-card-foreground">5. Защита данных</h2>
            </div>
            <p className="text-muted-foreground">Мы применяем следующие меры для защиты ваших данных:</p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Шифрование данных при передаче (HTTPS/TLS)
              </li>
              <li className="flex items-start gap-2">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Регулярное обновление систем безопасности
              </li>
              <li className="flex items-start gap-2">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Ограниченный доступ к данным со стороны персонала
              </li>
              <li className="flex items-start gap-2">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Автоматическое удаление данных по истечении срока
              </li>
            </ul>
          </section>

          <section className="mb-12 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <UserX className="h-5 w-5" />
              <h2 className="m-0 text-xl font-semibold text-card-foreground">6. Передача данных третьим лицам</h2>
            </div>
            <p className="text-muted-foreground">
              Мы <strong className="text-card-foreground">не продаём, не сдаём в аренду и не передаём</strong> ваши 
              данные третьим лицам для маркетинговых целей.
            </p>
            <p className="mt-4 text-muted-foreground">Данные могут быть переданы только в следующих случаях:</p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>• По требованию правоохранительных органов в рамках действующего законодательства</li>
              <li>• Для защиты наших прав, собственности или безопасности</li>
              <li>• Техническим партнёрам, обеспечивающим работу инфраструктуры (с соблюдением конфиденциальности)</li>
            </ul>
          </section>

          <section className="mb-12 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Trash2 className="h-5 w-5" />
              <h2 className="m-0 text-xl font-semibold text-card-foreground">7. Ваши права</h2>
            </div>
            <p className="text-muted-foreground">Вы имеете право:</p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Trash2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Прекратить использование Сервиса в любой момент
              </li>
              <li className="flex items-start gap-2">
                <Trash2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Удалять письма вручную
              </li>
              <li className="flex items-start gap-2">
                <Trash2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Дождаться автоматического удаления данных (90 дней неактивности)
              </li>
              <li className="flex items-start gap-2">
                <Trash2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Обратиться к нам с вопросами о ваших данных
              </li>
            </ul>
          </section>

          <section className="mb-12 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Globe className="h-5 w-5" />
              <h2 className="m-0 text-xl font-semibold text-card-foreground">8. Cookies и локальное хранилище</h2>
            </div>
            <p className="text-muted-foreground">
              Мы используем локальное хранилище браузера (localStorage) для сохранения:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>• Информации о вашем почтовом ящике</li>
              <li>• Пользовательских настроек (тема, метки)</li>
              <li>• Статуса согласия с условиями использования</li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              Эти данные хранятся только на вашем устройстве и не передаются на наши серверы.
            </p>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Mail className="h-5 w-5" />
              <h2 className="m-0 text-xl font-semibold text-card-foreground">9. Изменения политики</h2>
            </div>
            <p className="text-muted-foreground">
              Мы можем обновлять эту Политику конфиденциальности время от времени. 
              Об существенных изменениях мы сообщим на главной странице Сервиса. 
              Продолжение использования Сервиса после внесения изменений означает 
              ваше согласие с обновлённой политикой.
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
