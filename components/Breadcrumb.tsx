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
    <div className="breadcrumb-bar">
      <div className="breadcrumb-bar-inner">
        <ol className="breadcrumb-bar-list">
          {items.map((item, index) => (
            <li key={item.href} className="breadcrumb-bar-item">
              {index > 0 && <span className="breadcrumb-bar-sep">/</span>}
              {index === items.length - 1 ? (
                <span className="breadcrumb-bar-current">{item.label}</span>
              ) : (
                <Link href={item.href} className="breadcrumb-bar-link">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}