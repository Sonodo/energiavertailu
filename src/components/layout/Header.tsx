'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Menu, X, ChevronRight } from 'lucide-react';
import { NAVIGATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { UserMenu } from '@/components/auth/UserMenu';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass-dark shadow-lg shadow-black/10'
            : 'bg-navy/80 backdrop-blur-md border-b border-white/5'
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
          aria-label="Päävalikko"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-80"
            aria-label="Valitse Sähkö — Etusivu"
          >
            <Image
              src="/logo.png"
              alt="Valitse Sähkö"
              width={609}
              height={192}
              priority
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {NAVIGATION.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-white/10 text-accent-400'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA + UserMenu */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/vertailu"
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-600 hover:shadow-accent/30"
            >
              Vertaa sähkösopimuksia
            </Link>
            <UserMenu />
          </div>

          {/* Mobile: UserMenu + menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <UserMenu />
            <button
              type="button"
              className="relative min-h-[44px] min-w-[44px] rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Sulje valikko' : 'Avaa valikko'}
            >
              <span className="sr-only">
                {mobileMenuOpen ? 'Sulje valikko' : 'Avaa valikko'}
              </span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile slide-out menu */}
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          mobileMenuOpen
            ? 'opacity-100'
            : 'pointer-events-none opacity-0'
        )}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Slide-out panel */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full max-w-sm transform bg-navy shadow-2xl transition-transform duration-300 ease-out lg:hidden',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobiilivalikko"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <Link
            href="/"
            className="flex items-center"
            onClick={closeMobileMenu}
            aria-label="Valitse Sähkö — Etusivu"
          >
            <Image
              src="/logo.png"
              alt="Valitse Sähkö"
              width={609}
              height={192}
              className="h-8 w-auto"
            />
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
            onClick={closeMobileMenu}
            aria-label="Sulje valikko"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col px-3 py-4" aria-label="Mobiilinavigaatio">
          {NAVIGATION.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={cn(
                  'flex items-center justify-between rounded-xl px-4 py-3.5 transition-colors',
                  isActive
                    ? 'bg-accent/10 text-accent-400'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                )}
              >
                <div>
                  <span className="text-base font-semibold">{item.label}</span>
                  {item.description && (
                    <span className="block text-sm font-normal text-white/40">
                      {item.description}
                    </span>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 text-white/30" />
              </Link>
            );
          })}
        </nav>

        {/* Mobile CTA */}
        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-navy-dark p-5">
          <Link
            href="/vertailu"
            onClick={closeMobileMenu}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-600"
          >
            Vertaa sähkösopimuksia
          </Link>
        </div>
      </div>
    </>
  );
}
