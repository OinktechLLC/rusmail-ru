import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter'
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: 'RusMail - Временная почта нового поколения',
  description: 'Безопасная временная почта с хранением 90 дней. Защитите свою конфиденциальность с RusMail.',
  keywords: ['временная почта', 'анонимная почта', 'temp mail', 'disposable email', 'RusMail'],
  authors: [{ name: 'RusMail Team' }],
  creator: 'RusMail',
  openGraph: {
    title: 'RusMail - Временная почта нового поколения',
    description: 'Безопасная временная почта с хранением 90 дней',
    type: 'website',
    locale: 'ru_RU',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9fafb' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1b1e' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
