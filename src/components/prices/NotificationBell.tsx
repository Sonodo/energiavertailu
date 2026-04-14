'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'valitsesahko-notify-tomorrow';

export default function NotificationBell() {
  const [enabled, setEnabled] = useState(false);
  const [supported, setSupported] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setSupported(false);
      return;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'true' && Notification.permission === 'granted') {
      setEnabled(true);
    }
  }, []);

  const handleClick = async () => {
    if (!supported) return;

    if (enabled) {
      setEnabled(false);
      localStorage.setItem(STORAGE_KEY, 'false');
      return;
    }

    if (Notification.permission === 'default') {
      const result = await Notification.requestPermission();
      if (result !== 'granted') return;
    }

    if (Notification.permission === 'granted') {
      setEnabled(true);
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  };

  if (!supported) return null;

  return (
    <div className="relative inline-flex">
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-full border transition-colors',
          enabled
            ? 'border-accent/30 bg-accent/10 text-accent hover:bg-accent/20'
            : 'border-slate-200 bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600'
        )}
        aria-label={enabled ? 'Poista hintailmoitukset käytöstä' : 'Ota hintailmoitukset käyttöön'}
      >
        {enabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
        {enabled && (
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-accent" />
        )}
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-lg">
          {enabled
            ? 'Hintailmoitukset päällä — klikkaa poistaaksesi'
            : 'Ilmoita kun huomisen hinnat julkaistaan'}
          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-slate-200 bg-white" />
        </div>
      )}
    </div>
  );
}
