'use client'

import Link from 'next/link'
import { Globe } from 'lucide-react'
import { useState } from 'react'

interface Language {
  code: string
  name: string
  nativeName: string
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
]

interface BlogLanguageSwitcherProps {
  currentLanguage: string
  translations: Array<{
    language: string
    slug: string
    title: string
  }>
}

export function BlogLanguageSwitcher({
  currentLanguage,
  translations,
}: BlogLanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (translations.length === 0) {
    return null
  }

  const availableLanguages = languages.filter((lang) =>
    translations.some((t) => t.language === lang.code)
  )

  if (availableLanguages.length <= 1) {
    return null
  }

  const currentLang = languages.find((l) => l.code === currentLanguage)

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-background hover:bg-muted transition-colors"
        aria-label="Switch language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentLang?.nativeName || currentLanguage.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-background shadow-lg z-20">
            <div className="p-2">
              {availableLanguages.map((lang) => {
                const translation = translations.find(
                  (t) => t.language === lang.code
                )
                if (!translation) return null

                const isCurrent = lang.code === currentLanguage

                return (
                  <Link
                    key={lang.code}
                    href={`/blog/${lang.code}/${translation.slug}`}
                    className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                      isCurrent
                        ? 'bg-muted text-foreground font-medium'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{lang.nativeName}</span>
                      {isCurrent && (
                        <span className="text-[rgb(6,182,212)]">✓</span>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

