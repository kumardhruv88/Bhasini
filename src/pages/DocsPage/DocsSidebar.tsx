

const MONO = "'JetBrains Mono', monospace"
const BODY = 'var(--font-body)'

const SECTIONS = [
  {
    title: 'GETTING STARTED',
    links: ['Introduction', 'Quickstart', 'Create your first agent']
  },
  {
    title: 'BUILD',
    links: ['Agents', 'Voices', 'Languages', 'Conversations']
  },
  {
    title: 'API',
    links: ['Authentication', 'Agents API', 'Calls API', 'Voices API', 'Webhooks']
  },
  {
    title: 'SDKs',
    links: ['JavaScript', 'Python', 'REST']
  },
  {
    title: 'GUIDES',
    links: ['Multilingual agents', 'Voice configuration', 'Production checklist']
  },
  {
    title: 'RESOURCES',
    links: ['Changelog', 'Status', 'Support']
  }
]

export default function DocsSidebar({ activeSection }: { activeSection: string }) {
  return (
    <aside style={{
      width: '230px',
      height: 'calc(100vh - 64px)',
      position: 'sticky',
      top: '64px',
      overflowY: 'auto',
      background: '#F7F5F2',
      borderRight: '1px solid #E0DED9',
      padding: '32px 16px',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    }} className="docs-sidebar">
      {SECTIONS.map(section => (
        <div key={section.title}>
          <div style={{
            fontFamily: MONO,
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: '#9A9A9A',
            marginBottom: '12px',
            paddingLeft: '12px'
          }}>
            {section.title}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {section.links.map(link => {
              const isActive = link.toLowerCase() === activeSection.toLowerCase()
              return (
                <button
                  key={link}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: BODY,
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#0D0D0D' : '#686868',
                    background: isActive ? '#FFFFFF' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 150ms ease'
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.background = '#F0EFED'
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {isActive && (
                    <div style={{ width: '4px', height: '14px', background: '#FF6B35', borderRadius: '2px' }} />
                  )}
                  {link}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </aside>
  )
}
