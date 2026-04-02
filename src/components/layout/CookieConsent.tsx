'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'energiavertailu-cookie-consent';

type ConsentState = 'pending' | 'accepted' | 'rejected';

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>('accepted'); // default to hide banner

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setConsent('pending');
    } else {
      setConsent(stored as ConsentState);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setConsent('accepted');
  }

  if (consent !== 'pending') return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-4 shadow-lg sm:p-6"
      role="dialog"
      aria-label="Evästeasetukset"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-900">
            Evästekäytäntö
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Käytämme teknisesti välttämättömiä evästeitä palvelun toiminnan
            varmistamiseksi.{' '}
            <Link
              href="/evasteet"
              className="font-medium text-[#0066FF] hover:text-[#0052CC]"
            >
              Lue lisää
            </Link>
          </p>
        </div>
        <div className="flex flex-shrink-0 gap-3">
          <button
            onClick={handleAccept}
            className="rounded-lg bg-[#0066FF] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0052CC]"
          >
            Selvä
          </button>
        </div>
      </div>
    </div>
  );
}
