interface Step {
  number: number
  title: string
  description: string
}

interface TimelineProps {
  steps: Step[]
  title?: string
}

export default function Timeline({ steps, title = 'Hogyan zajlik?' }: TimelineProps) {
  return (
    <div className="section section-white">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="timeline">
          {steps.map((step) => (
            <div key={step.number} className="timeline-item">
              <div className="timeline-number">{step.number}</div>
              <div>
                <h3 className="timeline-title">{step.title}</h3>
                <p className="timeline-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}