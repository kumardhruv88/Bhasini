import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, Bell } from 'lucide-react'

const breadcrumbMap: Record<string, string[]> = {
  '/app/home':        ['Workspace', 'Overview'],
  '/app/observatory': ['Workspace', 'Observatory'],
  '/app/eval':        ['Workspace', 'Evaluation Kit'],
  '/app/agents':      ['Workspace', 'Voice Agents'],
  '/app/calls':       ['Workspace', 'Calls'],
}

interface TopbarProps {
  onMenuClick?: () => void
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const location = useLocation()
  const crumbs = breadcrumbMap[location.pathname] ?? ['Workspace', 'Dashboard']

  return (
    <div style={{
      height: '68px', background: 'rgba(247,245,242,0.92)', backdropFilter: 'blur(8px)',
      borderBottom: '1px solid #E0DED9', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 32px', position: 'sticky', top: 0, zIndex: 50,
    }}>
      {/* Left side: Menu (mobile) + Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {onMenuClick && (
          <button onClick={onMenuClick} style={{ background: 'transparent', border: 'none', color: '#0D0D0D', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Menu size={20} />
          </button>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {crumbs.map((c, i) => (
            <span key={i} style={{ color: i === crumbs.length - 1 ? '#0D0D0D' : '#9E9E9E' }}>
              {c}{i < crumbs.length - 1 && <span style={{ margin: '0 6px', color: '#C8C5C0' }}>/</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* System status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E' }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#6B6B6B', fontWeight: 400 }}>
            All systems operational
          </span>
        </div>

        {/* Bell */}
        <button style={{ width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #E0DED9', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'border-color 150ms' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#C8C5C0'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#E0DED9'}>
          <Bell size={15} color="#6B6B6B" strokeWidth={1.75} />
        </button>

        {/* Avatar */}
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'white', cursor: 'pointer' }}>
          DK
        </div>
      </div>
    </div>
  )
}
