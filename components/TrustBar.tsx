interface TrustBarProps {
  items: {
    icon: string
    text: string
  }[]
}

export default function TrustBar({ items }: TrustBarProps) {
  return (
    <div className="trust-bar">
      <div className="container">
        <div className="trust-bar-grid">
          {items.map((item, index) => (
            <div key={index} className="trust-bar-item">
              <span className="trust-bar-icon">{item.icon}</span>
              <span className="trust-bar-text">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}