'use client';

import { useState, useCallback } from 'react';
import { Share2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
  className?: string;
}

export default function ShareButton({
  title = 'Valitse Sähkö',
  text = 'Katso sähkösopimuksien vertailu',
  url,
  className,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

    // Try Web Share API first (mostly mobile)
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        return;
      } catch {
        // User cancelled or API not supported — fall through to clipboard
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available — try legacy approach
      try {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Nothing we can do
      }
    }
  }, [title, text, url]);

  return (
    <button
      onClick={handleShare}
      className={cn(
        'inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium transition-colors',
        copied
          ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
          : 'text-slate-600 hover:bg-slate-50',
        className
      )}
      aria-label={copied ? 'Linkki kopioitu' : 'Jaa vertailu'}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Kopioitu!
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          Jaa vertailu
        </>
      )}
    </button>
  );
}
