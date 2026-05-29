'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Mail, 
  Shield, 
  Clock, 
  Folder, 
  Sparkles, 
  ArrowRight, 
  Check,
  ChevronDown,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

const features = [
  {
    icon: Shield,
    title: 'Полная конфиденциальность',
    description: 'Ваши данные защищены. Никакой привязки к личной информации.'
  },
  {
    icon: Clock,
    title: '90 дней хранения',
    description: 'Письма хранятся 90 дней. При активности срок автоматически продлевается.'
  },
  {
    icon: Folder,
    title: 'Умные папки',
    description: 'Создавайте свои папки и метки для удобной организации писем.'
  },
  {
    icon: Mail,
    title: 'Полноценная почта',
    description: 'Получайте и отправляйте письма как в обычном почтовом клиенте.'
  },
  {
    icon: Sparkles,
    title: 'Умный антиспам',
    description: 'Автоматическая фильтрация нежелательных писем.'
  },
  {
    icon: ArrowRight,
    title: 'Мгновенный доступ',
    description: 'Начните использовать почту сразу, без регистрации и подтверждений.'
  }
]

const faqItems = [
  {
    question: 'Что такое временная почта?',
    answer: 'Временная почта — это почтовый ящик, который можно использовать для регистрации на сайтах, получения подтверждений и другой корреспонденции без раскрытия вашего основного email адреса.'
  },
  {
    question: 'Как долго хранятся письма?',
    answer: 'Письма хранятся 90 дней с момента последней активности. Если вы регулярно проверяете почту, срок хранения автоматически продлевается ещё на 90 дней.'
  },
  {
    question: 'Можно ли отправлять письма?',
    answer: 'Да, RusMail поддерживает отправку писем. Вы можете отвечать на полученные сообщения или писать новые.'
  },
  {
    question: 'Безопасно ли это?',
    answer: 'Мы используем современные протоколы шифрования. Однако временная почта не предназначена для конфиденциальной переписки — используйте её для регистраций и временных целей.'
  },
  {
    question: 'Могу ли я выбрать свой адрес?',
    answer: 'Адрес генерируется автоматически для обеспечения уникальности. Это также защищает от спам-ботов, которые могут угадывать адреса.'
  },
  {
    question: 'Что если API перестанет работать?',
    answer: 'RusMail автоматически переключается между несколькими провайдерами почты. Если один сервис недоступен, система автоматически использует резервный.'
  }
]

export function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Возможности
            </Link>
            <Link href="#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              FAQ
            </Link>
            <Link href="/docs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Документация
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Условия
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hidden sm:flex"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}
            <Link href="/app" className="hidden sm:block">
              <Button>
                Открыть почту
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-background p-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <Link href="#features" className="text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
                Возможности
              </Link>
              <Link href="#faq" className="text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </Link>
              <Link href="/docs" className="text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
                Документация
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
                Условия
              </Link>
              <Link href="/app" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Открыть почту</Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Бесплатная временная почта
          </div>
          
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Временная почта{' '}
            <span className="text-primary">нового поколения</span>
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
            Защитите свою конфиденциальность с RusMail. Мгновенный доступ к почтовому ящику
            без регистрации. 90 дней хранения с автопродлением.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/app">
              <Button size="lg" className="w-full sm:w-auto">
                Получить почту бесплатно
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Узнать больше
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              Без регистрации
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              90 дней хранения
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              Полностью бесплатно
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-border bg-secondary/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              Всё что нужно от почты
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              RusMail предоставляет полный набор функций для комфортной работы с временной почтой
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="border-t border-border px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              Часто задаваемые вопросы
            </h2>
            <p className="text-lg text-muted-foreground">
              Ответы на популярные вопросы о RusMail
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-card"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-card-foreground">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="border-t border-border px-4 pb-4 pt-2">
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-primary/5 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Готовы начать?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Получите свой временный почтовый ящик прямо сейчас — это бесплатно и занимает секунду.
          </p>
          <Link href="/app">
            <Button size="lg">
              Открыть RusMail
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Mail className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">RusMail</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Безопасная временная почта для защиты вашей конфиденциальности.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-foreground">Продукт</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/app" className="hover:text-foreground">Открыть почту</Link></li>
                <li><Link href="#features" className="hover:text-foreground">Возможности</Link></li>
                <li><Link href="#faq" className="hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-foreground">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/docs" className="hover:text-foreground">Документация</Link></li>
                <li><Link href="/terms" className="hover:text-foreground">Условия использования</Link></li>
                <li><Link href="/privacy" className="hover:text-foreground">Политика конфиденциальности</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-foreground">Тема</h4>
              {mounted && (
                <div className="flex gap-2">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('light')}
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    Светлая
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('dark')}
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    Тёмная
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} RusMail. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
