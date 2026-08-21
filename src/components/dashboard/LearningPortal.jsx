import { BookOpen, ArrowRight } from 'lucide-react'

export default function LearningPortal() {
  return (
    <a className="learn-side" href="/enrich">
      <div className="l-top">
        <span className="l-ico" aria-hidden="true">
          <BookOpen size={18} strokeWidth={2.1} />
        </span>
        <div>
          <span className="l-tag">Enrich</span>
          <h4>Learning Portal</h4>
        </div>
      </div>
      <p>Short guides on deferrals, investing, and planning for retirement.</p>
      <ul className="l-topics">
        <li>Plan Basics</li>
        <li>Taxes</li>
        <li>Investing</li>
      </ul>
      <span className="l-cta">
        Explore The Library
        <ArrowRight size={15} strokeWidth={2.2} />
      </span>
    </a>
  )
}
