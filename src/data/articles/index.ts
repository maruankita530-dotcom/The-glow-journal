import { Article, CategoryType } from '../../types/blog';
import { article1 } from './article1';
import { article2 } from './article2';
import { article3 } from './article3';
import { article4 } from './article4';
import { article5 } from './article5';
import { article6 } from './article6';
import { article7 } from './article7';
import { article8 } from './article8';
import { article9 } from './article9';
import { article10 } from './article10';

export const allArticles: Article[] = [
  article1,
  article2,
  article3,
  article4,
  article5,
  article6,
  article7,
  article8,
  article9,
  article10,
];

export function getArticleBySlug(slug: string): Article | undefined {
  // Normalize slug to always match with leading slash
  const normalized = slug.startsWith('/') ? slug : `/${slug}`;
  return allArticles.find((a) => a.slug === normalized);
}

export function getArticlesByCategory(category: CategoryType): Article[] {
  return allArticles.filter((a) => a.category === category);
}

export function searchArticles(query: string): Article[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return allArticles.filter((article) => {
    return (
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.mainKeyword.toLowerCase().includes(q) ||
      article.relatedKeywords.some((k) => k.toLowerCase().includes(q)) ||
      article.category.toLowerCase().includes(q) ||
      article.intro.some((p) => p.toLowerCase().includes(q)) ||
      article.sections.some(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.paragraphs.some((p) => p.toLowerCase().includes(q)) ||
          (s.directAnswer && s.directAnswer.toLowerCase().includes(q))
      )
    );
  });
}
