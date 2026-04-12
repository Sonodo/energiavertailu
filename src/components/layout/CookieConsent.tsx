'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'cookie_consent';

type ConsentState = 'pending' | 'granted' | 'denied';

function getStoredConsent(): ConsentState {
  if (typeof window === 'undefined') return 'pending';
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === 'granted' || stored === 'denied') return stored;
  return 'pending';
}

function updateGtagConsent(granted: boolean) {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;
  const state = granted ? 'granted' : 'denied';
  gtag('consent', 'update', {
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
}

function updateClarityConsent(granted: boolean, retries = 5) {
  const clarity = (window as unknown as { clarity?: (...args: unknown[]) => void }).clarity;
  if (!clarity) {
    if (retries > 0) setTimeout(() => updateClarityConsent(granted, retries - 1), 200);
    return;
  }
  clarity('consentv2', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
  });
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>('pending');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent();
    setConsent(stored);

    if (stored === 'granted') {
      updateGtagConsent(true);
      updateClarityConsent(true);
    } else if (stored === 'denied') {
      updateGtagConsent(false);
      updateClarityConsent(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'granted');
    setConsent('granted');
    updateGtagConsent(true);
    updateClarityConsent(true);
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'denied');
    setConsent('denied');
    updateGtagConsent(false);
    updateClarityConsent(false);
  };

  if (!mounted || consent !== 'pending') return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur-md sm:p-6"
      role="dialog"
      aria-label="Evästeasetukset"
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-900">
            Evästekäytäntö
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Käytämme teknisesti välttämättömiä evästeitä sekä analytiikkaevästeitä
            (Google Analytics) palvelun kehittämiseksi suostumuksellasi.{' '}
            <Link
              href="/evasteet"
              className="font-medium text-accent-600 hover:text-accent-700"
            >
              Lue lisää
            </Link>
          </p>
        </div>
        <div className="flex flex-shrink-0 gap-3">
          <button
            onClick={handleReject}
            className="min-h-[44px] rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Hylkää
          </button>
          <button
            onClick={handleAccept}
            className="min-h-[44px] rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-600"
          >
            Hyväksy
          </button>
        </div>
      </div>
    </div>
  );
}
