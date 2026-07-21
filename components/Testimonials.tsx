interface Testimonial {
  rating: number
  text: string
  author: string
}

interface TestimonialsProps {
  items: Testimonial[]
  title?: string
  viewAllLink?: string
}

export default function Testimonials({ 
  items, 
  title = 'Vélemények',
  viewAllLink = '/velemenyek'
}: TestimonialsProps) {
  return (
    <div className="testimonials">
      <h2 className="typo-h2-decorated">
        {title}
        <span className="decorative-line"></span>
        <span className="decorative-dot">●</span>
      </h2>
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
                    fontSize: '0.9rem'
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="testimonial-text">{item.text}</p>
            <p className="testimonial-author">— {item.author}</p>
          </div>
        ))}
      </div>
      
      {/* További vélemények link */}
      <div className="testimonials-footer">
        <a href={viewAllLink} className="testimonials-view-all">
          További vélemények megtekintése a Google-n →
        </a>
      </div>
    </div>
  )
}