'use client';

import { useState, useEffect, useCallback } from 'react';
import { Bell, BellOff, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'valitsesahko-notify-tomorrow';

interface PriceNotificationsProps {
  tomorrowPricesAvailable: boolean;
  tomorrowAvgPrice?: number;
  tomorrowMinPrice?: number;
  tomorrowMinHour?: number;
}

function formatPriceFi(price: number): string {
  return price.toFixed(2).replace('.', ',');
}

export default function PriceNotifications({
  tomorrowPricesAvailable,
  tomorrowAvgPrice,
  tomorrowMinPrice,
  tomorrowMinHour,
}: PriceNotificationsProps) {
  const [enabled, setEnabled] = useState(false);
  const [permissionState, setPermissionState] = useState<NotificationPermission | 'unsupported'>('default');
  const [notified, setNotified] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  // Initialize state from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('Notification' in window)) {
      setPermissionState('unsupported');
      return;
    }

    setPermissionState(Notification.permission);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'true' && Notification.permission === 'granted') {
      setEnabled(true);
    }

    // Check if we already notified today
    const notifiedDate = localStorage.getItem(`${STORAGE_KEY}-last`);
    const today = new Date().toISOString().split('T')[0];
    if (notifiedDate === today) {
      setNotified(true);
    }
  }, []);

  // Send notification when tomorrow's prices become available
  const sendNotification = useCallback(() => {
    if (!enabled || notified || !tomorrowPricesAvailable) return;
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    if (Notification.permission !== 'granted') return;

    const body = tomorrowAvgPrice != null && tomorrowMinPrice != null && tomorrowMinHour != null
      ? `Keskihinta ${formatPriceFi(tomorrowAvgPrice)} c/kWh. Halvin tunti klo ${String(tomorrowMinHour).padStart(2, '0')}:00 (${formatPriceFi(tomorrowMinPrice)} c/kWh).`
      : 'Huomisen sähkön tuntihinnat ovat nyt saatavilla.';

    try {
      new Notification('Huomisen sähköhinnat julkaistu', {
        body,
        icon: '/icon.svg',
        tag: 'tomorrow-prices',
      });

      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(`${STORAGE_KEY}-last`, today);
      setNotified(true);
    } catch (err) {
      console.warn('Failed to send notification:', err);
    }
  }, [enabled, notified, tomorrowPricesAvailable, tomorrowAvgPrice, tomorrowMinPrice, tomorrowMinHour]);

  // Check and send notification on data changes
  useEffect(() => {
    sendNotification();
  }, [sendNotification]);

  const handleToggle = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;

    if (enabled) {
      // Disable
      setEnabled(false);
      localStorage.setItem(STORAGE_KEY, 'false');
      return;
    }

    // Enable — request permission if needed
    if (Notification.permission === 'default') {
      const result = await Notification.requestPermission();
      setPermissionState(result);
      if (result !== 'granted') return;
    }

    if (Notification.permission === 'granted') {
      setEnabled(true);
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  };

  if (permissionState === 'unsupported') return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl',
              enabled ? 'bg-accent/10' : 'bg-slate-100'
            )}
          >
            {enabled ? (
              <Bell className="h-5 w-5 text-accent" />
            ) : (
              <BellOff className="h-5 w-5 text-slate-400" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Hintailmoitukset</h3>
            <p className="text-sm text-slate-500">
              Saat ilmoituksen kun huomisen hinnat julkaistaan
            </p>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className={cn(
            'relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors',
            enabled ? 'bg-accent' : 'bg-slate-200'
          )}
          role="switch"
          aria-checked={enabled}
          aria-label="Ilmoitukset päälle/pois"
        >
          <span
            className={cn(
              'inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform',
              enabled ? 'translate-x-6' : 'translate-x-1'
            )}
          />
        </button>
      </div>

      {permissionState === 'denied' && showBanner && (
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-800">
          <X
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-amber-500 hover:text-amber-700"
            onClick={() => setShowBanner(false)}
          />
          <span>
            Ilmoitukset on estetty selaimessa. Salli ilmoitukset selaimen asetuksista.
          </span>
        </div>
      )}

      {enabled && notified && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700">
          <Check className="h-4 w-4 shrink-0" />
          <span>Ilmoitus huomisen hinnoista lähetetty!</span>
        </div>
      )}

      {enabled && !tomorrowPricesAvailable && !notified && (
        <p className="mt-3 text-xs text-slate-400">
          Huomisen hinnat julkaistaan yleensä klo 14:00 (CET) jälkeen. Pidä sivu auki saadaksesi ilmoituksen.
        </p>
      )}
    </div>
  );
}
