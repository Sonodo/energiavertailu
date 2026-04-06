'use client';

import { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import StarRating from './StarRating';

interface Review {
  rating: number;
  text: string;
  date: string;
  author: string;
}

interface ProviderReviewsProps {
  providerId: string;
  providerName: string;
}

function getStorageKey(providerId: string): string {
  return `energiavertailu-reviews-${providerId}`;
}

function loadReviews(providerId: string): Review[] {
  try {
    const stored = localStorage.getItem(getStorageKey(providerId));
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Privacy mode or storage error
  }
  return [];
}

function saveReviews(providerId: string, reviews: Review[]): void {
  try {
    localStorage.setItem(getStorageKey(providerId), JSON.stringify(reviews));
  } catch {
    // Privacy mode or storage error
  }
}

function formatReviewDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fi-FI', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateStr;
  }
}

export default function ProviderReviews({ providerId, providerName }: ProviderReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newText, setNewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setReviews(loadReviews(providerId));
  }, [providerId]);

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const handleSubmit = useCallback(() => {
    if (newRating === 0) return;

    const review: Review = {
      rating: newRating,
      text: newText.trim(),
      date: new Date().toISOString(),
      author: 'Anonyymi',
    };

    const updated = [review, ...reviews];
    setReviews(updated);
    saveReviews(providerId, updated);
    setNewRating(0);
    setNewText('');
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }, [newRating, newText, reviews, providerId]);

  // Show most recent 5
  const visibleReviews = reviews.slice(0, 5);

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">Asiakasarvostelut</h2>

      {/* Summary card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {reviews.length > 0 ? (
              <>
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-900">{averageRating.toFixed(1)}</p>
                  <StarRating rating={averageRating} size="sm" />
                </div>
                <div className="text-sm text-slate-500">
                  {reviews.length} {reviews.length === 1 ? 'arvostelu' : 'arvostelua'}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  <MessageSquare className="h-5 w-5 text-slate-400" />
                </div>
                <p className="text-sm text-slate-500">
                  Ei vielä arvosteluja. Ole ensimmäinen!
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className={cn(
              'inline-flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors',
              showForm
                ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                : 'bg-[#0066FF] text-white hover:bg-[#0052CC]'
            )}
          >
            <MessageSquare className="h-4 w-4" />
            {showForm ? 'Peruuta' : 'Kirjoita arvostelu'}
          </button>
        </div>

        {/* Submitted feedback */}
        {submitted && (
          <div className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            Kiitos arvostelustasi!
          </div>
        )}

        {/* Review form */}
        {showForm && (
          <div className="mt-6 space-y-4 border-t border-slate-100 pt-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Arvosanasi: {providerName}
              </label>
              <StarRating
                rating={newRating}
                size="lg"
                interactive
                onChange={setNewRating}
              />
              {newRating === 0 && (
                <p className="mt-1 text-xs text-slate-400">Valitse 1-5 tähteä</p>
              )}
            </div>

            <div>
              <label htmlFor="review-text" className="mb-2 block text-sm font-medium text-slate-700">
                Kommentti (valinnainen)
              </label>
              <textarea
                id="review-text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder={`Kerro kokemuksestasi ${providerName}n asiakkaana...`}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 focus:outline-none"
                rows={3}
                maxLength={500}
              />
              <p className="mt-1 text-xs text-slate-400">{newText.length}/500</p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={newRating === 0}
              className={cn(
                'inline-flex min-h-[44px] items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors',
                newRating > 0
                  ? 'bg-[#0066FF] text-white hover:bg-[#0052CC]'
                  : 'cursor-not-allowed bg-slate-200 text-slate-400'
              )}
            >
              <Send className="h-4 w-4" />
              Lähetä
            </button>
          </div>
        )}
      </div>

      {/* Reviews list */}
      {visibleReviews.length > 0 && (
        <div className="mt-4 space-y-3">
          {visibleReviews.map((review, idx) => (
            <div
              key={`${review.date}-${idx}`}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                    <User className="h-4 w-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{review.author}</p>
                    <p className="text-xs text-slate-400">{formatReviewDate(review.date)}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} size="sm" />
              </div>
              {review.text && (
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{review.text}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {reviews.length > 5 && (
        <p className="mt-3 text-center text-xs text-slate-400">
          Näytetään viimeisimmät 5 / {reviews.length} arvostelua
        </p>
      )}
    </section>
  );
}
