'use client';

import React from 'react';
import Link from 'next/link';
import { allArticles, blogSchemaData } from '../components/AllArticles';
import '../styles/BlogListPage.css';
import FacebookBadge from '../components/FacebookBadge';

const BlogListPage = () => {
  return (
    <>
      {/* Schema.org script - a metadata már a page.tsx-ben van, de a schema-t ide tehetjük */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchemaData) }}
      />

      <div className="blog-list-container">
        <div className="blog-list-wrapper">
          <header className="blog-list-header">
            <h1 className="blog-list-title">Hírek és ingatlanpiaci elemzések</h1>
            <p className="blog-list-subtitle">
              Friss hírek és adatvezérelt elemzések a magyar ingatlanpiacról az Ingatlan-Térkép saját kutatásai alapján.
            </p>
            <FacebookBadge />
          </header>

          <div className="articles-grid">
            {allArticles.map((article) => (
              <article key={article.slug} className="article-card">
                <Link href={`/blog/${article.slug}`} className="article-link">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="article-card-image"
                    loading="lazy"
                  />
                  <div className="article-card-content">
                    <h2 className="article-card-title">{article.title}</h2>
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

          <p className="coming-soon">
            Hamarosan további hírek és elemzések következnek!
          </p>
        </div>
      </div>
    </>
  );
};

export default BlogListPage;