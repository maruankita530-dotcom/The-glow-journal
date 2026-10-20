/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { SEOHead } from './components/SEOHead';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { getArticleBySlug, allArticles } from './data/articles';
import { CategoryType } from './types/blog';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return typeof window !== 'undefined' ? window.location.pathname : '/';
  });
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category') as CategoryType | null;
      return cat;
    }
    return null;
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync state with browser history (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPath(path);
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category') as CategoryType | null;
      setSelectedCategory(cat);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Custom client navigation handler
  const navigate = (path: string) => {
    if (path.startsWith('/#')) {
      const hash = path.substring(2);
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (path.includes('?category=')) {
      const url = new URL(path, window.location.origin);
      const cat = url.searchParams.get('category') as CategoryType | null;
      setSelectedCategory(cat);
      setCurrentPath('/');
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find if current path is a valid article
  const currentArticle = getArticleBySlug(currentPath);

  // Determine metadata
  const isHome = currentPath === '/' || currentPath === '';
  const pageTitle = currentArticle
    ? currentArticle.metaTitle
    : isHome
    ? 'The Glow Journal – Skincare Routines, Ingredients & Everyday Glow'
    : 'Page Not Found | The Glow Journal';

  const pageDescription = currentArticle
    ? currentArticle.metaDescription
    : 'Your little corner of the internet for thoughtful skincare discoveries, beginner routines, active ingredient guides and everyday beauty rituals.';

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F8] text-[#2F1E21] font-sans antialiased">
      {/* Dynamic SEO Head & JSON-LD Injection */}
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        path={currentPath}
        article={currentArticle}
      />

      {/* Global 3-Zone Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {isHome ? (
          <HomePage
            onSelectArticle={navigate}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        ) : currentArticle ? (
          <ArticlePage
            article={currentArticle}
            onNavigate={navigate}
            onSelectCategory={setSelectedCategory}
          />
        ) : (
          /* 404 Fallback */
          <div className="max-w-2xl mx-auto px-6 py-24 text-center space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#BF7E81]">
              404 · Page Not Found
            </span>
            <h1 className="text-4xl font-script text-[#2F1E21]">
              Lost in the Routine?
            </h1>
            <p className="text-sm text-[#7E6567] max-w-md mx-auto">
              We couldn't find the article you were looking for. Explore our index of 10 beginner-friendly
              guides or search for specific skincare ingredients.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#BF7E81] text-white text-xs font-medium rounded-full hover:bg-[#a9686b] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Homepage</span>
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#F3D2CE] text-[#2F1E21] text-xs font-medium rounded-full hover:border-[#BF7E81] transition-colors"
              >
                <BookOpen className="w-4 h-4 text-[#BF7E81]" />
                <span>Search All Articles</span>
              </button>
            </div>

            {/* Quick list of available articles */}
            <div className="mt-12 text-left pt-8 border-t border-[#F3D2CE]">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#BF7E81] mb-3">
                All Available Journal Entries
              </h2>
              <ul className="space-y-2 text-sm">
                {allArticles.map((art) => (
                  <li key={art.id}>
                    <button
                      onClick={() => navigate(art.slug)}
                      className="text-[#2F1E21] hover:text-[#BF7E81] text-left transition-colors cursor-pointer"
                    >
                      {art.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Global Editorial Footer */}
      <Footer onNavigate={navigate} onSelectCategory={setSelectedCategory} />

      {/* Global Functional Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={navigate}
      />
    </div>
  );
}
