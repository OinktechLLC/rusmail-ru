import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Mail, 
  ArrowLeft, 
  BookOpen, 
  Rocket, 
  Inbox, 
  Send, 
  Tag, 
  Shield, 
  Clock, 
  RefreshCw,
  Smartphone,
  Moon,
  Folder,
  Search,
  Star,
  Trash2
} from 'lucide-react'

const sections = [
  {
    id: 'getting-started',
    icon: Rocket,
    title: 'Начало работы',
    content: `
      <h3>Как получить почтовый ящик</h3>
      <ol>
        <li>Перейдите на страницу <a href="/app">приложения</a></li>
        <li>При первом посещении прочитайте и примите Условия использования</li>
        <li>Система автоматически сгенерирует уникальный email адрес</li>
        <li>Ваш почтовый ящик готов к использованию!</li>
      </ol>
      <p><strong>Важно:</strong> Запомните или сохраните ваш email адрес — он привязан к вашему браузеру. При очистке данных браузера адрес будет утерян.</p>
    `
  },
  {
    id: 'receiving-emails',
    icon: Inbox,
    title: 'Получение писем',
    content: `
      <h3>Как получать письма</h3>
      <p>Используйте ваш временный email для регистрации на сайтах или получения подтверждений. Письма появятся в папке "Входящие" автоматически.</p>
      <h4>Автообновление</h4>
      <p>Почтовый ящик автоматически проверяет новые письма каждые 10 секунд. Вы также можете обновить вручную, нажав кнопку обновления.</p>
      <h4>Уведомления</h4>
      <p>При получении нового письма вы увидите уведомление в интерфейсе приложения.</p>
    `
  },
  {
    id: 'sending-emails',
    icon: Send,
    title: 'Отправка писем',
    content: `
      <h3>Как отправлять письма</h3>
      <ol>
        <li>Нажмите кнопку "Написать" в боковом меню</li>
        <li>Введите адрес получателя, тему и текст сообщения</li>
        <li>Нажмите "Отправить"</li>
      </ol>
      <h4>Ответ на письмо</h4>
      <p>Откройте письмо и нажмите кнопку "Ответить" для быстрого ответа отправителю.</p>
      <p><strong>Примечание:</strong> Возможность отправки писем зависит от используемого API провайдера.</p>
    `
  },
  {
    id: 'labels-folders',
    icon: Tag,
    title: 'Метки и папки',
    content: `
      <h3>Организация писем</h3>
      <p>Используйте метки для организации ваших писем:</p>
      <ul>
        <li><strong>Создание метки:</strong> Нажмите "+" рядом с разделом "Метки" в боковом меню</li>
        <li><strong>Применение метки:</strong> Откройте письмо и выберите нужную метку из меню</li>
        <li><strong>Фильтрация:</strong> Нажмите на метку в боковом меню для просмотра всех писем с этой меткой</li>
      </ul>
      <h4>Системные папки</h4>
      <ul>
        <li><strong>Входящие</strong> — все полученные письма</li>
        <li><strong>Помеченные</strong> — письма, отмеченные звёздочкой</li>
        <li><strong>Спам</strong> — письма, определённые как нежелательные</li>
        <li><strong>Корзина</strong> — удалённые письма</li>
      </ul>
    `
  },
  {
    id: 'spam-protection',
    icon: Shield,
    title: 'Защита от спама',
    content: `
      <h3>Как работает антиспам</h3>
      <p>RusMail автоматически фильтрует нежелательные письма:</p>
      <ul>
        <li>Подозрительные письма автоматически попадают в папку "Спам"</li>
        <li>Вы можете вручную отметить письмо как спам или наоборот</li>
        <li>Письма из спама не считаются активностью для продления срока хранения</li>
      </ul>
      <h4>Ручная фильтрация</h4>
      <p>Нажмите на иконку щита в письме для перемещения его в спам или обратно.</p>
    `
  },
  {
    id: 'storage-duration',
    icon: Clock,
    title: 'Срок хранения',
    content: `
      <h3>90 дней хранения</h3>
      <p>Все ваши письма и почтовый адрес хранятся <strong>90 дней</strong> с момента последней активности.</p>
      <h4>Что считается активностью:</h4>
      <ul>
        <li>Вход в почтовый ящик</li>
        <li>Получение нового письма</li>
        <li>Отправка письма</li>
        <li>Любое действие с письмами (чтение, пометка, удаление)</li>
      </ul>
      <h4>Автоматическое продление</h4>
      <p>При каждой активности срок хранения автоматически продлевается на 90 дней.</p>
      <h4>Истечение срока</h4>
      <p>Если в течение 90 дней не было активности, все данные безвозвратно удаляются.</p>
    `
  },
  {
    id: 'api-fallback',
    icon: RefreshCw,
    title: 'Резервные системы',
    content: `
      <h3>Автоматическое переключение API</h3>
      <p>RusMail использует несколько провайдеров временной почты для обеспечения надёжности:</p>
      <ul>
        <li><strong>Mail.tm</strong> — основной провайдер</li>
        <li><strong>1secmail</strong> — резервный провайдер</li>
      </ul>
      <h4>Как это работает</h4>
      <p>Если основной провайдер недоступен, система автоматически переключается на резервный. Вам не нужно предпринимать никаких действий — всё происходит автоматически.</p>
      <p><strong>Примечание:</strong> При переключении провайдера может быть создан новый почтовый адрес.</p>
    `
  },
  {
    id: 'mobile-usage',
    icon: Smartphone,
    title: 'Мобильная версия',
    content: `
      <h3>Использование на мобильных устройствах</h3>
      <p>RusMail полностью адаптирован для мобильных устройств:</p>
      <ul>
        <li><strong>Адаптивный интерфейс</strong> — удобная работа на любом размере экрана</li>
        <li><strong>Жесты</strong> — свайп для навигации между списком и письмом</li>
        <li><strong>Быстрые действия</strong> — долгое нажатие для контекстного меню</li>
      </ul>
      <h4>Добавление на главный экран</h4>
      <p>Вы можете добавить RusMail на главный экран вашего телефона для быстрого доступа как к обычному приложению.</p>
    `
  },
  {
    id: 'themes',
    icon: Moon,
    title: 'Темы оформления',
    content: `
      <h3>Настройка внешнего вида</h3>
      <p>RusMail поддерживает светлую и тёмную темы:</p>
      <ul>
        <li><strong>Светлая тема</strong> — классический светлый интерфейс</li>
        <li><strong>Тёмная тема</strong> — комфортная работа в условиях низкой освещённости</li>
        <li><strong>Системная</strong> — автоматическое переключение в зависимости от настроек вашего устройства</li>
      </ul>
      <p>Переключить тему можно в настройках приложения или в футере сайта.</p>
    `
  }
]

export default function DocsPage() {
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

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[250px_1fr] lg:gap-12">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24 space-y-1">
              <div className="mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">Документация</span>
              </div>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <section.icon className="h-4 w-4" />
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main>
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Документация RusMail</h1>
                  <p className="text-muted-foreground">Полное руководство по использованию сервиса</p>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="mb-8 overflow-x-auto lg:hidden">
              <div className="flex gap-2 pb-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground hover:border-primary/50"
                  >
                    <section.icon className="h-4 w-4" />
                    {section.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Documentation Sections */}
            <div className="space-y-12">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 rounded-xl border border-border bg-card p-6"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold text-card-foreground">{section.title}</h2>
                  </div>
                  <div 
                    className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-card-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </section>
              ))}
            </div>

            {/* Quick Reference */}
            <section className="mt-12 rounded-xl border border-primary/20 bg-primary/5 p-6">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Быстрая справка</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center gap-3">
                  <Inbox className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Входящие — все письма</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Звезда — важные письма</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Спам — нежелательные</span>
                </div>
                <div className="flex items-center gap-3">
                  <Folder className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Метки — организация</span>
                </div>
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Поиск — найти письмо</span>
                </div>
                <div className="flex items-center gap-3">
                  <Trash2 className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Корзина — удалённые</span>
                </div>
              </div>
            </section>

            <div className="mt-12 flex justify-center">
              <Link href="/app">
                <Button size="lg">
                  Открыть RusMail
                </Button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
