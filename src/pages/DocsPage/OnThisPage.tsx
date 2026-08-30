import { useEffect, useState } from 'react'

const MONO = "'JetBrains Mono', monospace"
const BODY = 'var(--font-body)'

const SECTIONS = [
  { id: 'introduction', label: 'Overview' },
  { id: 'quickstart', label: 'Installation' },
  { id: 'configuration', label: 'Configuration' },
  { id: 'authentication', label: 'Authentication' },
  { id: 'api', label: 'Response' },
  { id: 'next', label: 'Next steps' }
]

export default function OnThisPage() {
  const [activeId, setActiveId] = useState('introduction')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <aside style={{
      width: '240px',
      position: 'sticky',
      top: '64px',
      height: 'calc(100vh - 64px)',
      padding: '48px 16px',
      display: 'none',
    }} className="on-this-page-sidebar">
      <div style={{
        fontFamily: MONO,
        fontSize: '10px',
        color: '#0D0D0D',
        letterSpacing: '0.12em',
        marginBottom: '16px'
      }}>
        ON THIS PAGE
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            style={{
              fontFamily: BODY,
              fontSize: '13px',
              color: activeId === section.id ? '#0D0D0D' : '#9A9A9A',
              textDecoration: 'none',
              transition: 'color 150ms ease',
              fontWeight: activeId === section.id ? 500 : 400
            }}
          >
            {section.label}
          </a>
        ))}
      </div>
    </aside>
  )
}
