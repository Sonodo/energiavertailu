'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const SIZES = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

export default function StarRating({
  rating,
  max = 5,
  size = 'md',
  interactive = false,
  onChange,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;

  return (
    <div className="inline-flex items-center gap-0.5" role={interactive ? 'radiogroup' : 'img'} aria-label={`${rating} / ${max} tähteä`}>
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const fillPercentage = Math.min(1, Math.max(0, displayRating - i));

        // For partial fills, we use a clip approach
        const isFull = fillPercentage >= 1;
        const isEmpty = fillPercentage <= 0;
        const isPartial = !isFull && !isEmpty;

        const starElement = (
          <span
            key={starValue}
            className={cn('relative inline-block', interactive && 'cursor-pointer')}
            onMouseEnter={interactive ? () => setHoverRating(starValue) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
            onClick={interactive ? () => onChange?.(starValue) : undefined}
            role={interactive ? 'radio' : undefined}
            aria-checked={interactive ? starValue <= rating : undefined}
            aria-label={interactive ? `${starValue} tähteä` : undefined}
          >
            {/* Empty star (background) */}
            <Star className={cn(SIZES[size], 'fill-slate-200 text-slate-200')} />

            {/* Filled overlay */}
            {(isFull || isPartial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={isPartial ? { width: `${fillPercentage * 100}%` } : undefined}
              >
                <Star className={cn(SIZES[size], 'fill-amber-400 text-amber-400')} />
              </span>
            )}
          </span>
        );

        return starElement;
      })}
    </div>
  );
}
