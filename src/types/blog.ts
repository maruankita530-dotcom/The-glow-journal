export type CategoryType =
  | 'Skincare Rituals'
  | 'Ingredient Notes'
  | 'Product Education'
  | 'Beauty on a Budget';

export interface Subsection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface InternalLinkCallout {
  anchorText: string;
  url: string;
  contextBefore: string;
  contextAfter: string;
}

export interface TipBox {
  title: string;
  content: string;
}

export interface ArticleSection {
  id: string;
  title: string;
  isQuestion?: boolean;
  directAnswer?: string;
  paragraphs: string[];
  bullets?: string[];
  subsections?: Subsection[];
  internalLinks?: InternalLinkCallout[];
  tipBox?: TipBox;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  kicker: string;
  mainKeyword: string;
  relatedKeywords: [string, string];
  category: CategoryType;
  readTime: string;
  publishedDate: string;
  image: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  intro: string[];
  sections: ArticleSection[];
  conclusion: {
    title: string;
    paragraphs: string[];
  };
  relatedSlugs: string[];
}
