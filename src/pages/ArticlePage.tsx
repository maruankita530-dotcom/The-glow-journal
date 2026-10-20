import { useEffect } from 'react';
import { Article } from '../types/blog';
import { allArticles, getArticleBySlug } from '../data/articles';
import { ArrowLeft, ArrowRight, Share2, Check, Clock, Calendar, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface ArticlePageProps {
  article: Article;
  onNavigate: (path: string) => void;
  onSelectCategory?: (category: any) => void;
}

export function ArticlePage({ article, onNavigate, onSelectCategory }: ArticlePageProps) {
  const [copied, setCopied] = useState(false);

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article.slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBreadcrumbCategory = () => {
    if (onSelectCategory) {
      onSelectCategory(article.category);
    }
    onNavigate(`/?category=${encodeURIComponent(article.category)}`);
  };

  // Get full related articles
  const relatedArticles = article.relatedSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is Article => a !== undefined);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-20">
      {/* 1. Working Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#7E6567]">
        <button
          onClick={() => onNavigate('/')}
          className="hover:text-[#BF7E81] transition-colors cursor-pointer"
        >
          Home
        </button>
        <span aria-hidden="true" className="text-[#F3D2CE]">/</span>
        <button
          onClick={handleBreadcrumbCategory}
          className="hover:text-[#BF7E81] transition-colors cursor-pointer"
        >
          {article.category}
        </button>
        <span aria-hidden="true" className="text-[#F3D2CE]">/</span>
        <span className="text-[#2F1E21] font-medium truncate max-w-[200px] sm:max-w-none">
          {article.title}
        </span>
      </nav>

      {/* 2. Category Label & Metadata (Zero-Pill rule: clean unboxed typography) */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#BF7E81]">
          <span>{article.category}</span>
          <span aria-hidden="true" className="text-[#E8CAC8]">·</span>
          <span>{article.kicker}</span>
        </div>

        {/* 3. Exactly ONE H1 per page */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2F1E21] leading-tight tracking-tight">
          {article.title}
        </h1>

        {/* Publication Metadata & Share */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-b border-[#F3D2CE]/70 pb-5 text-xs text-[#7E6567]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#BF7E81]" />
              {article.publishedDate}
            </span>
            <span aria-hidden="true" className="text-[#F3D2CE]">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#BF7E81]" />
              {article.readTime}
            </span>
            <span aria-hidden="true" className="text-[#F3D2CE]">·</span>
            <span className="text-[#2F1E21] font-medium">By The Glow Journal Editors</span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#FFE4E1]/30 border border-[#F3D2CE] rounded-full text-[#2F1E21] transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Share2 className="w-3 h-3 text-[#BF7E81]" />}
            <span>{copied ? 'Link Copied' : 'Share Article'}</span>
          </button>
        </div>
      </div>

      {/* 4. Concise Introduction & Excerpt */}
      <div className="space-y-4 mb-8">
        <p className="text-lg sm:text-xl text-[#2F1E21]/90 font-serif italic leading-relaxed border-l-2 border-[#BF7E81] pl-4 py-1">
          {article.excerpt}
        </p>
        {article.intro.map((p, idx) => (
          <p
            key={idx}
            className={`text-base text-[#2F1E21]/90 leading-relaxed ${
              idx === 0
                ? 'first-letter:text-4xl first-letter:font-script first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-[#BF7E81]'
                : ''
            }`}
          >
            {p}
          </p>
        ))}
      </div>

      {/* 5. Unique Featured Image and Descriptive Alt Text */}
      <figure className="mb-10 rounded-2xl overflow-hidden border border-[#F3D2CE] bg-[#FFE4E1]/20">
        <img
          src={article.image}
          alt={article.imageAlt}
          loading="eager"
          referrerPolicy="no-referrer"
          className="w-full aspect-16/10 sm:aspect-16/9 object-cover"
        />
        <figcaption className="p-3 text-xs text-center text-[#7E6567] bg-white/70 border-t border-[#F3D2CE]/50 italic">
          {article.imageAlt}
        </figcaption>
      </figure>

      {/* 6. Clickable Table of Contents */}
      <div className="mb-12 bg-white/80 border border-[#F3D2CE] rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[#BF7E81]" />
          <h2 className="text-xs font-bold tracking-wider uppercase text-[#BF7E81]">
            Table of Contents
          </h2>
        </div>
        <ol className="space-y-2 text-sm">
          {article.sections.map((section, idx) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-[#2F1E21] hover:text-[#BF7E81] transition-colors flex items-start gap-2"
              >
                <span className="text-xs font-mono text-[#BF7E81] pt-0.5">
                  0{idx + 1}.
                </span>
                <span>{section.title}</span>
              </a>
              {/* Optional sub-level TOC items */}
              {section.subsections && section.subsections.length > 0 && (
                <ul className="pl-6 pt-1.5 space-y-1 text-xs text-[#7E6567]">
                  {section.subsections.map((sub) => (
                    <li key={sub.id}>
                      <a
                        href={`#${sub.id}`}
                        className="hover:text-[#BF7E81] transition-colors"
                      >
                        · {sub.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <a
              href="#conclusion"
              className="text-[#2F1E21] hover:text-[#BF7E81] transition-colors flex items-start gap-2"
            >
              <span className="text-xs font-mono text-[#BF7E81] pt-0.5">
                0{article.sections.length + 1}.
              </span>
              <span>{article.conclusion.title}</span>
            </a>
          </li>
        </ol>
      </div>

      {/* 7. Complete Article Content Sections */}
      <div className="space-y-12 text-[#2F1E21]/90">
        {article.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
            {/* 8. Descriptive H2 Headings & 9. Question-Style H2 with Direct Answers */}
            {section.isQuestion ? (
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#2F1E21] leading-snug">
                  {section.title}
                </h2>
                {section.directAnswer && (
                  <div className="bg-[#FFE4E1]/60 border border-[#F3D2CE] rounded-xl p-4 sm:p-5">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#BF7E81] block mb-1">
                      Direct Answer
                    </span>
                    <p className="text-sm sm:text-base font-medium text-[#2F1E21] leading-relaxed">
                      {section.directAnswer}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#2F1E21] leading-snug">
                {section.title}
              </h2>
            )}

            {/* Paragraphs */}
            {section.paragraphs.map((para, pIdx) => (
              <p key={pIdx} className="text-base leading-relaxed text-[#2F1E21]/90">
                {para}
              </p>
            ))}

            {/* Bullets */}
            {section.bullets && (
              <ul className="space-y-2 pl-5 list-disc text-sm sm:text-base marker:text-[#BF7E81] text-[#2F1E21]/90">
                {section.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            {/* Subsections (H3 Headings) */}
            {section.subsections && (
              <div className="pt-4 space-y-6">
                {section.subsections.map((sub) => (
                  <div key={sub.id} id={sub.id} className="scroll-mt-24 space-y-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#2F1E21]">
                      {sub.title}
                    </h3>
                    {sub.paragraphs.map((subP, sIdx) => (
                      <p key={sIdx} className="text-base leading-relaxed text-[#2F1E21]/90">
                        {subP}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* 10. Practical Skincare Tip Box */}
            {section.tipBox && (
              <div className="bg-white border border-[#F3D2CE] rounded-xl p-5 shadow-xs space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#BF7E81]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{section.tipBox.title}</span>
                </div>
                <p className="text-sm text-[#7E6567] leading-relaxed">
                  {section.tipBox.content}
                </p>
              </div>
            )}

            {/* 12. Contextual Internal Links with meaningful anchor text */}
            {section.internalLinks && section.internalLinks.length > 0 && (
              <div className="pt-2">
                {section.internalLinks.map((link, lIdx) => (
                  <p key={lIdx} className="text-sm text-[#7E6567] bg-[#FFE4E1]/30 p-3 rounded-lg border border-[#F3D2CE]/60">
                    <span>{link.contextBefore}</span>
                    <a
                      href={link.url}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(link.url);
                      }}
                      className="font-semibold text-[#BF7E81] underline underline-offset-3 hover:text-[#a9686b] transition-colors"
                    >
                      {link.anchorText}
                    </a>
                    <span>{link.contextAfter}</span>
                  </p>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* 11. Conclusion Section */}
        <section id="conclusion" className="scroll-mt-24 pt-6 border-t border-[#F3D2CE] space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#2F1E21]">
            {article.conclusion.title}
          </h2>
          {article.conclusion.paragraphs.map((cp, cIdx) => (
            <p key={cIdx} className="text-base leading-relaxed text-[#2F1E21]/90">
              {cp}
            </p>
          ))}
        </section>
      </div>

      {/* Target Keywords / Academic SEO Meta Box */}
      <div className="mt-14 p-5 bg-[#FFE4E1]/30 rounded-2xl border border-[#F3D2CE] text-xs text-[#7E6567] space-y-2">
        <span className="font-semibold text-[#BF7E81] uppercase tracking-wider block">
          Technical SEO Assignment Reference
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
          <div>
            <span className="font-medium text-[#2F1E21]">Primary Keyword:</span> {article.mainKeyword}
          </div>
          <div>
            <span className="font-medium text-[#2F1E21]">Secondary Keywords:</span> {article.relatedKeywords.join(', ')}
          </div>
          <div>
            <span className="font-medium text-[#2F1E21]">Canonical URL:</span> https://theglowjournal.com{article.slug}
          </div>
          <div>
            <span className="font-medium text-[#2F1E21]">Structured Data:</span> Schema.org/BlogPosting, FAQPage
          </div>
        </div>
      </div>

      {/* 14. Navigation Back to Homepage */}
      <div className="mt-12 pt-6 border-t border-[#F3D2CE] flex items-center justify-between">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#BF7E81] hover:text-[#a9686b] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal Index</span>
        </button>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs text-[#7E6567] hover:text-[#2F1E21] transition-colors cursor-pointer"
        >
          Back to top ↑
        </button>
      </div>

      {/* 13. Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="mt-16 pt-10 border-t border-[#F3D2CE] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-script text-[#2F1E21]">
              Related Skincare Guides
            </h2>
            <span className="text-xs text-[#7E6567]">Curated for you</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigate(rel.slug)}
                className="group bg-white rounded-xl overflow-hidden border border-[#F3D2CE] hover:border-[#BF7E81] transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col"
              >
                <div className="aspect-4/3 w-full overflow-hidden bg-[#FFE4E1]/30">
                  <img
                    src={rel.image}
                    alt={rel.imageAlt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform group-hover:scale-103 duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#BF7E81] mb-1">
                    {rel.category}
                  </span>
                  <h3 className="text-sm font-semibold text-[#2F1E21] group-hover:text-[#BF7E81] transition-colors line-clamp-2">
                    {rel.title}
                  </h3>
                  <div className="mt-auto pt-3 flex items-center justify-between text-xs text-[#BF7E81] font-medium">
                    <span>Read entry</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
