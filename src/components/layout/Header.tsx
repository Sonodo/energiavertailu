'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Zap, ChevronRight } from 'lucide-react';
import { NAVIGATION } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Track scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
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
          'sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-shadow duration-200 supports-[backdrop-filter]:bg-white/80',
          scrolled ? 'border-slate-200 shadow-sm' : 'border-transparent'
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
          aria-label="Päävalikko"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            aria-label="Energiavertailu — Etusivu"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0066FF]">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">
              Energia<span className="text-[#0066FF]">vertailu</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-0.5 md:flex">
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
                      ? 'bg-blue-50 text-[#0066FF]'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#0066FF]'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/vertailu"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0066FF] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0052CC]"
            >
              Vertaa nyt
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="relative min-h-[44px] min-w-[44px] rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
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
        </nav>
      </header>

      {/* Mobile slide-out menu */}
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden',
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
          'fixed inset-y-0 right-0 z-50 w-full max-w-sm transform bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobiilivalikko"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={closeMobileMenu}
            aria-label="Energiavertailu — Etusivu"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0066FF]">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">
              Energia<span className="text-[#0066FF]">vertailu</span>
            </span>
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
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
                    ? 'bg-blue-50 text-[#0066FF]'
                    : 'text-slate-700 hover:bg-slate-50'
                )}
              >
                <div>
                  <span className="text-base font-semibold">{item.label}</span>
                  {item.description && (
                    <span className="block text-sm font-normal text-slate-500">
                      {item.description}
                    </span>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400" />
              </Link>
            );
          })}
        </nav>

        {/* Mobile CTA */}
        <div className="absolute inset-x-0 bottom-0 border-t border-slate-200 bg-slate-50 p-5">
          <Link
            href="/vertailu"
            onClick={closeMobileMenu}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0066FF] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#0052CC]"
          >
            Vertaa sähkösopimuksia
          </Link>
        </div>
      </div>
    </>
  );
}
