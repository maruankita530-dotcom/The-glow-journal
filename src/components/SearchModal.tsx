import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen } from 'lucide-react';
import { searchArticles } from '../data/articles';
import { Article } from '../types/blog';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (slug: string) => void;
}

export function SearchModal({ isOpen, onClose, onSelectArticle }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const matched = searchArticles(query);
    setResults(matched);
  }, [query]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popularSearches = [
    'Beginner routine',
    'Niacinamide',
    'Sunscreen SPF',
    'Acne-prone',
    'Salicylic acid',
    'Moisturiser',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-sm transition-opacity">
      <div
        className="w-full max-w-2xl bg-[#FFF9F8] rounded-2xl shadow-xl border border-[#F3D2CE] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F3D2CE]/70 bg-white/70">
          <Search className="w-5 h-5 text-[#BF7E81] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, ingredients, routines..."
            className="w-full bg-transparent text-[#2F1E21] placeholder-[#7E6567]/60 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#7E6567] hover:text-[#2F1E21] transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs tracking-wider uppercase text-[#7E6567] hover:text-[#2F1E21] border border-[#F3D2CE] rounded-md transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Search Body */}
        <div className="max-h-[60vh] overflow-y-auto p-5">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-[#7E6567] mb-3">
                Suggested Topics
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 text-xs font-medium bg-white text-[#2F1E21] border border-[#F3D2CE] rounded-lg hover:border-[#BF7E81] hover:bg-[#FFE4E1]/30 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-[#F3D2CE]/60 text-center text-xs text-[#7E6567]">
                Search across all 10 in-depth articles, skincare guides, and ingredient breakdowns.
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#7E6567] mb-2">
                Found {results.length} {results.length === 1 ? 'article' : 'articles'}
              </p>
              {results.map((article) => (
                <div
                  key={article.id}
                  onClick={() => {
                    onSelectArticle(article.slug);
                    onClose();
                  }}
                  className="group flex gap-4 p-3 rounded-xl hover:bg-[#FFE4E1]/40 border border-transparent hover:border-[#F3D2CE] cursor-pointer transition-all"
                >
                  <img
                    src={article.image}
                    alt={article.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#F3D2CE]"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-[#BF7E81]">
                      {article.category}
                    </span>
                    <h4 className="text-sm font-semibold text-[#2F1E21] group-hover:text-[#BF7E81] transition-colors truncate">
                      {article.title}
                    </h4>
                    <p className="text-xs text-[#7E6567] line-clamp-1 mt-0.5">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#BF7E81] font-medium mt-1">
                      Read article <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <BookOpen className="w-8 h-8 mx-auto text-[#BF7E81]/60 mb-3" />
              <p className="text-sm font-medium text-[#2F1E21]">No articles matched "{query}"</p>
              <p className="text-xs text-[#7E6567] mt-1">
                Try searching for broader keywords like "SPF", "Cleanser", or "Niacinamide".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
