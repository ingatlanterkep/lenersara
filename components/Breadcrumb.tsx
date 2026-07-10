import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol style={{ display: 'flex', listStyle: 'none', flexWrap: 'wrap', gap: '0.5rem' }}>
        {items.map((item, index) => (
          <li key={item.href} style={{ display: 'flex', alignItems: 'center' }}>
            {index > 0 && <span style={{ margin: '0 0.5rem', color: '#6b7280' }}>/</span>}
            {index === items.length - 1 ? (
              <span style={{ color: '#6b7280' }}>{item.label}</span>
            ) : (
              <Link href={item.href} className="breadcrumb-link">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}