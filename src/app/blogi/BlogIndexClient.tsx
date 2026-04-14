'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/types';

interface CategoryDef {
  readonly id: string;
  readonly label: string;
}

interface BlogIndexClientProps {
  posts: BlogPost[];
  categories: readonly CategoryDef[];
}

export default function BlogIndexClient({
  posts,
  categories,
}: BlogIndexClientProps) {
  const [activeCategory, setActiveCategory] = useState('kaikki');

  const filteredPosts =
    activeCategory === 'kaikki'
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <>
      {/* Category filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? 'bg-accent text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Posts grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Color accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-accent to-[#00D4AA]" />

            <div className="flex flex-1 flex-col p-6">
              {/* Category tag */}
              <span className="mb-3 inline-block w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-accent">
                {categories.find((c) => c.id === post.category)?.label ||
                  post.category}
              </span>

              {/* Title */}
              <h2 className="mb-2 text-lg font-bold text-slate-900 group-hover:text-accent transition-colors">
                <Link href={`/blogi/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>

              {/* Description */}
              <p className="mb-4 flex-1 text-sm text-slate-600 line-clamp-3">
                {post.description}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-end text-xs text-slate-400">
                <span>{post.readTime} min lukuaika</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Empty state */}
      {filteredPosts.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-slate-500">
            Ei artikkeleita tässä kategoriassa.
          </p>
        </div>
      )}
    </>
  );
}
