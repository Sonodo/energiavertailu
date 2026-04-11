'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1">
      {NAVIGATION.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-accent/10 text-accent'
                : 'text-slate-700 hover:bg-slate-100 hover:text-accent'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
