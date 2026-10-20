import { useState, useMemo } from 'react';
import { allArticles } from '../data/articles';
import { CategoryType } from '../types/blog';
import { ArticleCard } from '../components/ArticleCard';
import { ArrowDown, Sparkles, ArrowRight, Heart } from 'lucide-react';

interface HomePageProps {
  onSelectArticle: (slug: string) => void;
  selectedCategory: CategoryType | null;
  onSelectCategory: (category: CategoryType | null) => void;
}

export function HomePage({
  onSelectArticle,
  selectedCategory,
  onSelectCategory,
}: HomePageProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryType | 'All'>(
    selectedCategory || 'All'
  );

  const categories: CategoryType[] = [
    'Skincare Rituals',
    'Ingredient Notes',
    'Product Education',
    'Beauty on a Budget',
  ];

  // Lead featured article: Article 1 (The Ultimate Skincare Routine for Beginners)
  const featuredArticle = allArticles[0];

  const handleFilterClick = (category: CategoryType | 'All') => {
    setActiveFilter(category);
    onSelectCategory(category === 'All' ? null : category);
  };

  const filteredArticles = useMemo(() => {
    if (activeFilter === 'All') return allArticles;
    return allArticles.filter((article) => article.category === activeFilter);
  }, [activeFilter]);

  const scrollToArticles = () => {
    const el = document.getElementById('journal-entries');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ================================================== */}
      {/* SECTION B: HERO SECTION                           */}
      {/* ================================================== */}
      <section className="relative pt-6 sm:pt-12 pb-8 sm:pb-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Editorial Copy */}
            <div className="lg:col-span-7 space-y-6">
              {/* Small introductory phrase */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#BF7E81] font-semibold">
                <Heart className="w-3.5 h-3.5 fill-[#BF7E81]/20" />
                <span>a little love note to your skin</span>
              </div>

              {/* Main Headline in Petit Formal Script */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-script text-[#2F1E21] leading-tight tracking-wide">
                Your skin, your ritual, your glow.
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-[#7E6567] max-w-xl leading-relaxed">
                Your little corner of the internet for skincare discoveries, thoughtful routines and
                everyday beauty.
              </p>

              {/* Primary Action Button */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={scrollToArticles}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#BF7E81] hover:bg-[#a9686b] text-white text-sm font-medium rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  <span>Explore the Journal</span>
                  <ArrowDown className="w-4 h-4" />
                </button>

                <a
                  href="#about"
                  className="px-5 py-3 text-sm font-medium text-[#2F1E21] hover:text-[#BF7E81] border border-[#F3D2CE] rounded-full hover:bg-white transition-all"
                >
                  Our Philosophy
                </a>
              </div>

              {/* Minimal Editorial Badges (Unboxed metadata style) */}
              <div className="pt-4 flex items-center gap-6 text-xs text-[#7E6567]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#2F1E21]">10</span>
                  <span>Long-form Guides</span>
                </div>
                <span aria-hidden="true" className="text-[#F3D2CE]">·</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#2F1E21]">100%</span>
                  <span>Dermatology Science-Grounded</span>
                </div>
                <span aria-hidden="true" className="text-[#F3D2CE]">·</span>
                <div>
                  <span className="font-semibold text-[#2F1E21]">Zero</span>
                  <span> Hype</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Art-Directed Photography */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#F3D2CE] bg-[#FFE4E1]/30 shadow-md">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.imageAlt}
                  loading="eager"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 lg:h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2F1E21]/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="text-[11px] tracking-widest uppercase font-medium text-[#FFE4E1]">
                      Featured Ritual
                    </span>
                    <p className="text-base font-semibold leading-snug">
                      The Foundation: Cleanser, Hydration & Daily Sun Defense
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION C: FEATURED ARTICLE                       */}
      {/* ================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-4 h-4 text-[#BF7E81]" />
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[#BF7E81]">
            Featured Article Spotlight
          </h2>
        </div>

        <div
          onClick={() => onSelectArticle(featuredArticle.slug)}
          className="group grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 bg-white rounded-2xl border border-[#F3D2CE] p-5 sm:p-7 hover:border-[#BF7E81] transition-all cursor-pointer shadow-xs hover:shadow-md"
        >
          <div className="md:col-span-6 overflow-hidden rounded-xl bg-[#FFE4E1]/40 aspect-4/3 md:aspect-auto md:h-full">
            <img
              src={featuredArticle.image}
              alt={featuredArticle.imageAlt}
              loading="eager"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
            />
          </div>
          <div className="md:col-span-6 flex flex-col justify-center py-2 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#BF7E81] font-medium">
              <span className="uppercase tracking-wider font-semibold">
                {featuredArticle.category}
              </span>
              <span aria-hidden="true" className="text-[#E8CAC8]">·</span>
              <span className="text-[#7E6567]">{featuredArticle.readTime}</span>
              <span aria-hidden="true" className="text-[#E8CAC8]">·</span>
              <span className="text-[#7E6567]">Editor's Essential</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#2F1E21] group-hover:text-[#BF7E81] transition-colors leading-snug">
              {featuredArticle.title}
            </h3>

            <p className="text-sm sm:text-base text-[#7E6567] leading-relaxed">
              {featuredArticle.excerpt}
            </p>

            <div className="pt-2 flex items-center gap-2 text-sm font-semibold text-[#BF7E81]">
              <span>Read Full Feature</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION E: CATEGORIES (Interactive Tabs)          */}
      {/* ================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F3D2CE]">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#BF7E81]">
              Browse By Focus
            </span>
            <h2 className="text-2xl sm:text-3xl font-script text-[#2F1E21] mt-0.5">
              The Curated Categories
            </h2>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleFilterClick('All')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
                activeFilter === 'All'
                  ? 'bg-[#BF7E81] text-white shadow-xs'
                  : 'bg-white text-[#2F1E21] border border-[#F3D2CE] hover:border-[#BF7E81]'
              }`}
            >
              All Articles (10)
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterClick(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[#BF7E81] text-white shadow-xs'
                    : 'bg-white text-[#2F1E21] border border-[#F3D2CE] hover:border-[#BF7E81]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION D: LATEST JOURNAL ENTRIES (All 10 Grid)    */}
      {/* ================================================== */}
      <section id="journal-entries" className="max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-24">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-script text-[#2F1E21]">
              Latest Journal Entries
            </h2>
            <p className="text-xs text-[#7E6567] mt-1">
              Showing {filteredArticles.length} of {allArticles.length} comprehensive skincare entries
            </p>
          </div>
        </div>

        {/* 10-Article Editorial Grid with distinct images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={onSelectArticle}
              priority={index < 3}
            />
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION F: ABOUT SECTION                          */}
      {/* ================================================== */}
      <section id="about" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-24">
        <div className="bg-[#FFE4E1]/50 border border-[#F3D2CE] rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#BF7E81]">
            About The Journal
          </span>

          <h2 className="text-3xl sm:text-4xl font-script text-[#2F1E21] tracking-wide">
            Our Skin Philosophy
          </h2>

          {/* Exact Brand Introduction Copy */}
          <blockquote className="text-base sm:text-lg text-[#2F1E21]/90 leading-relaxed max-w-2xl mx-auto font-sans">
            "The Glow Journal is your little corner of the internet for thoughtful skincare,
            ingredient discoveries and everyday beauty rituals. We believe skincare should feel
            less overwhelming and more personal — one gentle step at a time."
          </blockquote>

          <div className="pt-4 flex flex-wrap justify-center gap-6 text-xs text-[#7E6567]">
            <span>· Evidence-Based Formulations</span>
            <span>· Safe for Sensitive Skin</span>
            <span>· College & Student Friendly</span>
          </div>
        </div>
      </section>
    </div>
  );
}
