'use client'

import { useEffect, useState } from 'react'
import { useEmailStore } from '@/lib/store'
import { Onboarding } from '@/components/app/onboarding'
import { EmailDashboard } from '@/components/app/email-dashboard'

export default function AppPage() {
  const { hasAcceptedTerms, setHasAcceptedTerms } = useEmailStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    )
  }

  if (!hasAcceptedTerms) {
    return <Onboarding onAccept={() => setHasAcceptedTerms(true)} />
  }

  return <EmailDashboard />
}
