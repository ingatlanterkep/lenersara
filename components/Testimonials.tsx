// components/Testimonials.tsx
interface Testimonial {
  rating: number
  text: string
  author: string
}

interface TestimonialsProps {
  items: Testimonial[]
  title?: string
}

export default function Testimonials({ items, title = 'Vélemények' }: TestimonialsProps) {
  return (
    <div className="testimonials">
      <h2 className="section-title">{title}</h2>
      <div className="testimonials-grid">
        {items.map((item, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className="testimonial-star"
                  style={{
                    color: i < item.rating ? '#f59e0b' : '#d1d5db',
                    fontSize: '1.1rem'
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="testimonial-text">"{item.text}"</p>
            <p className="testimonial-author">— {item.author}</p>
          </div>
        ))}
      </div>
    </div>
  )
}