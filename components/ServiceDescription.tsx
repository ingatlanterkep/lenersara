import { ReactNode } from 'react'

interface ServiceDescriptionProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export default function ServiceDescription({
  title,
  subtitle,
  children,
  className = ''
}: ServiceDescriptionProps) {
  return (
    <div className={`service-description ${className}`}>
      {title && <h2 className="typo-h2-decorated">{title}</h2>}
      {subtitle && <p className="typo-section-subtitle">{subtitle}</p>}
      <div className="service-description-content">
        {children}
      </div>
    </div>
  )
}