import { Article } from '../types/blog';
import { ArrowUpRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (slug: string) => void;
  priority?: boolean;
}

export function ArticleCard({ article, onSelect, priority = false }: ArticleCardProps) {
  return (
    <article
      onClick={() => onSelect(article.slug)}
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-[#F3D2CE]/80 hover:border-[#BF7E81] transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
    >
      {/* Featured Card Image with natural 4:3 ratio */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#FFE4E1]/30">
        <img
          src={article.image}
          alt={article.imageAlt}
          loading={priority ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
        />
      </div>

      {/* Card Content with unboxed typography metadata */}
      <div className="p-5 flex flex-col flex-1">
        {/* Unboxed Metadata (Zero-Pill rule) */}
        <div className="flex items-center gap-2 text-xs text-[#BF7E81] font-medium mb-2.5">
          <span className="uppercase tracking-wider font-semibold">{article.category}</span>
          <span aria-hidden="true" className="text-[#E8CAC8]">·</span>
          <span className="text-[#7E6567]">{article.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-semibold text-[#2F1E21] group-hover:text-[#BF7E81] transition-colors leading-snug">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-[#7E6567] mt-2.5 line-clamp-2 leading-relaxed flex-1">
          {article.excerpt}
        </p>

        {/* Bottom Kicker Action */}
        <div className="mt-4 pt-3 border-t border-[#F3D2CE]/50 flex items-center justify-between text-xs font-medium text-[#BF7E81]">
          <span>Read Entry</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
}
