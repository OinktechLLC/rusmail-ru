'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { X, Send, Paperclip, Minus, Maximize2, Minimize2 } from 'lucide-react'
import { Email } from '@/lib/store'

interface ComposeEmailProps {
  isOpen: boolean
  onClose: () => void
  replyTo: Email | null
  fromEmail: string
}

export function ComposeEmail({ isOpen, onClose, replyTo, fromEmail }: ComposeEmailProps) {
  const [to, setTo] = useState(replyTo ? replyTo.from : '')
  const [subject, setSubject] = useState(replyTo ? `Re: ${replyTo.subject}` : '')
  const [body, setBody] = useState(replyTo ? `\n\n---\nОт: ${replyTo.from}\nДата: ${new Date(replyTo.date).toLocaleString('ru-RU')}\n\n${replyTo.body}` : '')
  const [isSending, setIsSending] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleSend = async () => {
    if (!to || !subject) return

    setIsSending(true)
    
    // Simulate sending (actual implementation would depend on the API)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real implementation, you would call the email service to send
    // For now, we'll just close the dialog
    
    setIsSending(false)
    onClose()
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-0 right-4 z-50 w-72 rounded-t-lg border border-border bg-card shadow-lg">
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="truncate text-sm font-medium text-card-foreground">
            {subject || 'Новое письмо'}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsMinimized(false)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`
        flex flex-col gap-0 p-0
        ${isFullscreen ? 'h-screen max-h-screen w-screen max-w-none rounded-none' : 'max-w-2xl'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <DialogTitle className="text-lg font-semibold">
            {replyTo ? 'Ответить' : 'Новое письмо'}
          </DialogTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsMinimized(true)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* From */}
          <div className="flex items-center border-b border-border px-4 py-2">
            <span className="w-20 text-sm text-muted-foreground">От:</span>
            <span className="text-sm text-foreground">{fromEmail}</span>
          </div>

          {/* To */}
          <div className="flex items-center border-b border-border px-4 py-2">
            <label htmlFor="to" className="w-20 text-sm text-muted-foreground">Кому:</label>
            <Input
              id="to"
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="email@example.com"
              className="border-0 bg-transparent p-0 focus-visible:ring-0"
            />
          </div>

          {/* Subject */}
          <div className="flex items-center border-b border-border px-4 py-2">
            <label htmlFor="subject" className="w-20 text-sm text-muted-foreground">Тема:</label>
            <Input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Тема письма"
              className="border-0 bg-transparent p-0 focus-visible:ring-0"
            />
          </div>

          {/* Body */}
          <div className="flex-1 overflow-hidden p-4">
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Напишите ваше сообщение..."
              className={`h-full min-h-[200px] resize-none border-0 bg-transparent p-0 focus-visible:ring-0 ${isFullscreen ? 'min-h-[calc(100vh-300px)]' : ''}`}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <Button onClick={handleSend} disabled={!to || !subject || isSending}>
                {isSending ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Отправить
                  </>
                )}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" disabled>
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
