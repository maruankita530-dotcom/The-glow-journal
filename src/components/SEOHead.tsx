import { useEffect } from 'react';
import { Article } from '../types/blog';

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  article?: Article;
}

export function SEOHead({ title, description, path, article }: SEOHeadProps) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update OpenGraph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://theglowjournal.com';
    ogUrl.setAttribute('content', `${currentOrigin}${path}`);

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (article) {
      if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
      }
      ogImage.setAttribute('content', `${currentOrigin}${article.image}`);
    }

    // 4. Update Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${currentOrigin}${path}`);

    // 5. Inject / Update Structured Data (Schema.org JSON-LD)
    const existingScript = document.getElementById('schema-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'schema-jsonld';
    script.type = 'application/ld+json';

    if (article) {
      // Build FAQ question elements if any
      const faqQuestions = article.sections
        .filter((s) => s.isQuestion && s.directAnswer)
        .map((s) => ({
          '@type': 'Question',
          name: s.title,
          acceptedAnswer: {
            '@type': 'Answer',
            text: s.directAnswer,
          },
        }));

      const schemaData: Record<string, unknown>[] = [
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: article.title,
          description: article.metaDescription,
          image: [`${currentOrigin}${article.image}`],
          datePublished: '2026-10-20T08:00:00+05:30',
          dateModified: '2026-10-20T08:00:00+05:30',
          author: {
            '@type': 'Organization',
            name: 'The Glow Journal Editorial Team',
            url: currentOrigin,
          },
          publisher: {
            '@type': 'Organization',
            name: 'The Glow Journal',
            logo: {
              '@type': 'ImageObject',
              url: `${currentOrigin}/favicon.ico`,
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${currentOrigin}${article.slug}`,
          },
          keywords: [article.mainKeyword, ...article.relatedKeywords].join(', '),
          articleSection: article.category,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: currentOrigin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: article.category,
              item: `${currentOrigin}/?category=${encodeURIComponent(article.category)}`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: article.title,
              item: `${currentOrigin}${article.slug}`,
            },
          ],
        },
      ];

      if (faqQuestions.length > 0) {
        schemaData.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqQuestions,
        });
      }

      script.textContent = JSON.stringify(schemaData);
    } else {
      // Homepage Structured Data
      const siteSchema = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'The Glow Journal',
        url: currentOrigin,
        description: 'Your skin, your ritual, your glow. An independent beauty and skincare publication offering practical, beginner-friendly advice.',
        inLanguage: 'en',
        publisher: {
          '@type': 'Organization',
          name: 'The Glow Journal',
          url: currentOrigin,
        },
      };
      script.textContent = JSON.stringify(siteSchema);
    }

    document.head.appendChild(script);
  }, [title, description, path, article]);

  return null;
}
