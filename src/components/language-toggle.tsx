'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

export function LanguageToggle() {
  const [mounted, setMounted] = useState(false)
  const [language, setLanguage] = useState('en')

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
    // Get language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('language') || 'en'
    setLanguage(savedLanguage)
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'zh' : 'en'
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="h-9 px-2 text-sm font-medium"
    >
      <Globe className="h-[1.2rem] w-[1.2rem] mr-1" />
      {language === 'en' ? 'EN' : '中文'}
    </Button>
  )
}