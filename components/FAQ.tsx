'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
  title?: string
  blue?: boolean
}

export default function FAQ({ items, title = 'Gyakori kérdések', blue }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (blue) {
    return (
      <div className="faq-blue-wrapper">
        <h2 className="typo-h2-decorated-white">
          {title}
          <span className="decorative-line"></span>
          <span className="decorative-dot">●</span>
        </h2>
        <div className="faq-blue-items">
          {items.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={index} className="faq-blue-item">
                <button
                  className="typo-faq-question faq-blue-question"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-toggle">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="typo-faq-answer faq-blue-answer">{item.answer}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="faq-default-wrapper">
      <h2 className="typo-h2-decorated">
        {title}
        <span className="decorative-line"></span>
        <span className="decorative-dot">●</span>
      </h2>
      <div className="faq-default-items">
        {items.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <span className="faq-toggle">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="faq-answer">{item.answer}</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}