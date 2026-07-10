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
        <h2 className="section-title-white">{title}</h2>
        <div className="faq-blue-items">
          {items.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={index} className="faq-blue-item">
                <button
                  className="faq-blue-question"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-toggle">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="faq-blue-answer">{item.answer}</div>
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
      <h2 className="section-title">{title}</h2>
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