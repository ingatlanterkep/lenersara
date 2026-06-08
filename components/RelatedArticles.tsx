// components/RelatedArticles.jsx
'use client';

import React from 'react';
import Link from 'next/link';  // ← Next.js Link, nem react-router-dom
import { usePathname } from 'next/navigation';  // ← Next.js hook a path lekéréséhez
import { allArticles } from './AllArticles';
import '../styles/BlogListPage.css';

const RelatedArticles = () => {
  const pathname = usePathname();  // ← useLocation helyett
  const currentSlug = pathname?.split('/blog/')[1];  // ← pathname-t használjuk

  const related = allArticles.filter((art) => art.slug !== currentSlug);

  return (
    <section className="article-section">
      <h2 className="related-article-title">Ez is érdekelhet</h2>
      <div className="related-article-grid similar-posts-grid">
        {related.map((article) => (
          <article key={article.slug} className="article-card similar-post-card">
            <Link href={`/blog/${article.slug}`} className="article-link">  {/* ← to helyett href */}
              <img
                src={article.image}
                alt={`${article.title} – ${article.date}`}
                className="article-card-image similar-post-image"
                loading="lazy"
              />
              <div className="article-card-content similar-post-content">
                <h3 className="article-card-title">{article.title}</h3>
                <p className="article-card-meta">
                  {article.author} • {article.date}
                </p>
                <p className="article-card-excerpt">{article.excerpt}</p>
                <span className="read-more">Olvasom →</span>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Schema.org script a blog listinghoz - ezt is át kell írni, mert a allArticles-t használja */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Ingatlan-Térkép Blog – Ingatlanpiaci hírek és elemzések",
            "url": "https://www.ingatlan-terkep.hu/blog",
            "description": "Friss ingatlanpiaci trendek, árindexek, Otthon Start hatásai, közbiztonság réteg és kreditrendszer hírek.",
            "blogPost": allArticles.map((art) => {
              const dateParts = art.date.match(/(\d{4})\.\s*(\w+)\s*(\d{1,2})\./);
              let isoDate = "2026-01-01T00:00:00+01:00";
              if (dateParts) {
                const year = dateParts[1];
                const monthStr = dateParts[2].toLowerCase();
                const day = dateParts[3].padStart(2, '0');
                const monthMap: Record<string, string> = {
                  január: '01', február: '02', március: '03', április: '04',
                  május: '05', június: '06', július: '07', augusztus: '08',
                  szeptember: '09', október: '10', november: '11', december: '12'
                };
                const month = monthMap[monthStr] || '01';
                isoDate = `${year}-${month}-${day}T00:00:00+01:00`;
              }

              return {
                "@type": "BlogPosting",
                "headline": art.title,
                "url": `https://www.ingatlan-terkep.hu/blog/${art.slug}`,
                "datePublished": isoDate,
                "author": {
                  "@type": "Person",
                  "name": art.author,
                  "url": "https://www.ingatlan-terkep.hu/about"
                },
                "image": art.image,
                "description": art.excerpt
              };
            })
          })
        }}
      />
    </section>
  );
};

export default RelatedArticles;