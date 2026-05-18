"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Globe } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { useLanguage, type Language } from '@/lib/language-context';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const menuItems = [
  { nameKey: 'nav.features', href: '/features' },
  { nameKey: 'nav.solution', href: '/solution' },
  { nameKey: 'nav.pricing',  href: '/pricing' },
  { nameKey: 'nav.about',    href: '/about' },
  { nameKey: 'nav.contact',  href: '/contact' },
];

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { t, language, setLanguage } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLangMenu = () => setLangMenuOpen(!langMenuOpen);

  const handleLangChange = (lang: Language) => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  return (
    <header>
      <nav
        data-state={menuState ? 'active' : undefined}
        className="fixed z-20 w-full px-2 group top-0"
      >
        <div className={cn(
          'mx-auto mt-4 max-w-6xl px-6 transition-all duration-300 lg:px-12',
          isScrolled
            ? 'bg-background/90 max-w-4xl rounded-2xl border border-border backdrop-blur-lg lg:px-5 py-2'
            : 'bg-transparent py-4'
        )}>
          <div className="relative flex flex-wrap items-center justify-between gap-6 lg:gap-0">
            <div className="flex w-full justify-between lg:w-auto items-center">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Logo />
              </Link>
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 block cursor-pointer p-2 lg:hidden text-foreground"
              >
                <Menu className={cn("size-6 duration-200", menuState && "rotate-180 scale-0 opacity-0")} />
                <X className={cn("absolute inset-0 m-auto size-6 duration-200 -rotate-180 scale-0 opacity-0", menuState && "rotate-0 scale-100 opacity-100")} />
              </button>
            </div>

            <div className={cn(
              "absolute inset-x-0 top-full mt-4 hidden lg:static lg:mt-0 lg:flex lg:items-center lg:bg-transparent lg:p-0",
              menuState && "block bg-background p-6 rounded-2xl border border-border"
            )}>
              <ul className="flex flex-col lg:flex-row gap-6 lg:gap-8 text-sm font-medium text-foreground/80">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="hover:text-[rgb(6,182,212)] block duration-150 transition-colors"
                      onClick={() => setMenuState(false)}
                    >
                      <span>{t(item.nameKey)}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col lg:flex-row items-center gap-4 mt-6 lg:mt-0 lg:ml-8 text-foreground">
                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Language Switcher */}
                <div className="relative">
                  <button
                    onClick={toggleLangMenu}
                    className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-[rgb(6,182,212)] transition-colors px-2 py-1 rounded-md"
                  >
                    <Globe className="h-4 w-4" />
                    <span className="uppercase">{language}</span>
                  </button>

                  {langMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-32 rounded-xl border border-border bg-popover shadow-lg py-1 z-50 text-popover-foreground">
                      <button onClick={() => handleLangChange('en')} className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center justify-between">
                        English {language === 'en' && '✓'}
                      </button>
                      <button onClick={() => handleLangChange('fr')} className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center justify-between">
                        Français {language === 'fr' && '✓'}
                      </button>
                      <button onClick={() => handleLangChange('ar')} className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center justify-between">
                        العربية {language === 'ar' && '✓'}
                      </button>
                      <button onClick={() => handleLangChange('zh')} className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center justify-between">
                        中文 {language === 'zh' && '✓'}
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

gsap.registerPlugin(useGSAP);

const Logo = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const gradRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Entry pop
    gsap.from(wrapRef.current, {
      opacity: 0, scale: 0.84, duration: 0.7, ease: 'back.out(1.9)',
    });

    // 2. Rotating border beam
    const state = { angle: 0 };
    gsap.to(state, {
      angle: 360, duration: 3, repeat: -1, ease: 'none',
      onUpdate() {
        if (!gradRef.current) return;
        gradRef.current.style.background =
          `conic-gradient(from ${state.angle}deg at 50% 50%,
            transparent 0deg, #38bdf8 48deg, #bae6fd 78deg, transparent 128deg)`;
      },
    });

    // 3. Outer glow breath
    gsap.fromTo(wrapRef.current,
      { boxShadow: '0 0 5px rgba(56,189,248,0.12)' },
      { boxShadow: '0 0 20px rgba(56,189,248,0.45), 0 0 40px rgba(56,189,248,0.14)',
        duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.7 }
    );

    // 4. Ambient inner glow
    gsap.to(glowRef.current, {
      opacity: 0.2, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });

  }, { scope: wrapRef });

  return (
    <>
      {/* ── Light & dark: pure code logo with GSAP border beam ── */}
      <div ref={wrapRef} className="relative p-[1.5px] rounded-2xl">

        {/* Rotating conic-gradient border */}
        <div
          ref={gradRef}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: 'conic-gradient(from 0deg, transparent, #38bdf8, transparent)' }}
        />

        {/* Wordmark */}
        {/* Wordmark */}
        <div className="relative z-10 flex items-center py-[7px]">
          <span
            className="select-none leading-none"
            style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              color: 'rgb(59, 130, 246)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >SourSync</span>
        </div>
      </div>
    </>
  );
};
