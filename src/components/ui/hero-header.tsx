"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage, type Language } from '@/lib/language-context';

const menuItems = [
  { nameKey: 'nav.features', href: '/#features' },
  { nameKey: 'nav.solution', href: '/#solution' },
  { nameKey: 'nav.pricing', href: '/#pricing' },
  { nameKey: 'nav.blog', href: '/blog' },
  { nameKey: 'nav.about', href: '/about' },
  { nameKey: 'nav.contact', href: '/contact' },
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
            ? 'bg-background/80 max-w-4xl rounded-2xl border border-[rgb(6,182,212)] backdrop-blur-lg lg:px-5 py-2' 
            : 'bg-transparent py-4'
        )}>
          <div className="relative flex flex-wrap items-center justify-between gap-6 lg:gap-0">
            <div className="flex w-full justify-between lg:w-auto items-center">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Logo className={isScrolled ? "brightness-100" : "brightness-0 invert"} />
              </Link>
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 block cursor-pointer p-2 lg:hidden text-white"
              >
                <Menu className={cn("size-6 duration-200", menuState && "rotate-180 scale-0 opacity-0")} />
                <X className={cn("absolute inset-0 m-auto size-6 duration-200 -rotate-180 scale-0 opacity-0", menuState && "rotate-0 scale-100 opacity-100")} />
              </button>
            </div>

            <div className={cn(
              "absolute inset-x-0 top-full mt-4 hidden lg:static lg:mt-0 lg:flex lg:items-center lg:bg-transparent lg:p-0",
              menuState && "block bg-background p-6 rounded-2xl border border-[rgb(6,182,212)]"
            )}>
              <ul className={cn(
                "flex flex-col lg:flex-row gap-6 lg:gap-8 text-sm font-medium",
                !isScrolled && !menuState ? "text-white/90" : "text-muted-foreground"
              )}>
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="hover:text-[rgb(6,182,212)] block duration-150"
                      onClick={() => setMenuState(false)}
                    >
                      <span>{t(item.nameKey)}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className={cn(
                "flex flex-col lg:flex-row items-center gap-4 mt-6 lg:mt-0 lg:ml-8",
                !isScrolled && !menuState ? "text-white" : "text-foreground"
              )}>
                {/* Language Switcher */}
                <div className="relative">
                  <button
                    onClick={toggleLangMenu}
                    className="flex items-center gap-1.5 text-sm font-medium hover:text-[rgb(6,182,212)] transition-colors px-2 py-1 rounded-md"
                  >
                    <Globe className="h-4 w-4" />
                    <span className="uppercase">{language}</span>
                  </button>
                  
                  {langMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-32 rounded-md border bg-background shadow-lg py-1 z-50 text-foreground">
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

const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/soursync-logo.svg"
      alt="SourSync Logo"
      width={320}
      height={100}
      className={cn('h-[2.4rem] w-auto transition-all duration-300', className)}
      priority
    />
  );
};
