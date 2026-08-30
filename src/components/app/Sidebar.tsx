import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, Bot, Phone, Activity, FlaskConical,
  Languages, Volume2, KeyRound, BarChart3,
  Settings, ChevronRight, Menu, ChevronLeft
} from 'lucide-react'

const sections = [
  {
    label: 'WORKSPACE',
    items: [
      { label: 'Overview',       icon: Home,          path: '/app/home' },
      { label: 'Voice Agents',   icon: Bot,           path: '/app/agents' },
      { label: 'Calls',          icon: Phone,         path: '/app/calls' },
      { label: 'Observatory',    icon: Activity,      path: '/app/observatory' },
      { label: 'Evaluation Kit', icon: FlaskConical,  path: '/app/eval' },
    ],
  },
  {
    label: 'BUILD',
    items: [
      { label: 'Create Agent', icon: Bot,       path: '/agents' },
      { label: 'Voices',       icon: Volume2,   path: '/voices' },
      { label: 'Languages',    icon: Languages, path: '/app/languages' },
    ],
  },
  {
    label: 'MANAGE',
    items: [
      { label: 'API Keys', icon: KeyRound,  path: '/app/api-keys' },
      { label: 'Usage',    icon: BarChart3, path: '/app/usage' },
      { label: 'Settings', icon: Settings,  path: '/app/settings' },
    ],
  },
]

interface SidebarProps {
  isExpanded: boolean
  onToggle: () => void
  isMobile?: boolean
  isMobileHidden?: boolean
}

export default function Sidebar({ isExpanded, onToggle, isMobileHidden }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <motion.div 
      initial={false}
      animate={{ width: isExpanded ? '248px' : '72px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        minHeight: '100vh', background: '#0D0D0D',
        position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100,
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        borderRight: '1px solid #1A1A1A',
        transform: isMobileHidden ? 'translateX(-100%)' : 'translateX(0)',
      }}
    >
      {/* Subtle saffron glow */}
      <div style={{
        position: 'absolute', top: -60, right: -60,
        width: '200px', height: '200px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,53,0.10) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      {/* Header / Logo */}
      <div style={{ 
        padding: isExpanded ? '28px 20px 20px' : '28px 0 20px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: isExpanded ? 'space-between' : 'center',
      }}>
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '19px', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
                Bhasini
              </span>
              <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.25)' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.10em', padding: '3px 8px', borderRadius: '9999px', background: 'linear-gradient(90deg, #FF6B35, #FF3CAC)', color: 'white' }}>
                BETA
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={onToggle}
          style={{ 
            background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', 
            cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' 
          }}
        >
          {isExpanded ? <ChevronLeft size={18} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Nav sections */}
      <div 
        className="sidebar-scroll"
        style={{ flex: 1, padding: isExpanded ? '8px 12px' : '8px 8px', overflowY: 'auto', overflowX: 'hidden' }}
      >
        {sections.map((section) => (
          <div key={section.label} style={{ marginBottom: '24px' }}>
            <AnimatePresence>
              {isExpanded ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', fontWeight: 500, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', padding: '0 8px', marginBottom: '6px', whiteSpace: 'nowrap' }}
                >
                  {section.label}
                </motion.div>
              ) : (
                <div style={{ height: '15px' }} />
              )}
            </AnimatePresence>
            
            {section.items.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon
              return (
                <motion.button
                  key={item.path}
                  whileHover={{ x: 1 }}
                  onClick={() => navigate(item.path)}
                  title={!isExpanded ? item.label : undefined}
                  style={{
                    width: '100%', height: '40px', display: 'flex', alignItems: 'center',
                    justifyContent: isExpanded ? 'flex-start' : 'center',
                    gap: isExpanded ? '10px' : '0', 
                    padding: isExpanded ? '0 8px 0 6px' : '0', 
                    borderRadius: '10px', border: 'none',
                    cursor: 'pointer', marginBottom: '2px', position: 'relative',
                    background: isActive ? 'rgba(255,255,255,0.10)' : 'transparent',
                    color: isActive ? 'white' : 'rgba(255,255,255,0.50)',
                    transition: 'background 150ms, color 150ms',
                    textAlign: 'left',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'white' } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.50)' } }}
                >
                  {/* Saffron active indicator */}
                  {isExpanded && <div style={{ width: '3px', height: '16px', borderRadius: '9999px', background: isActive ? '#FF6B35' : 'transparent', transition: 'background 150ms', flexShrink: 0 }} />}
                  <Icon size={isExpanded ? 15 : 18} strokeWidth={1.75} style={{ flexShrink: 0 }} />
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span 
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 400, whiteSpace: 'nowrap', overflow: 'hidden' }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isExpanded && isActive && <ChevronRight size={12} style={{ marginLeft: 'auto', opacity: 0.4 }} />}
                </motion.button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Workspace section at bottom */}
      <div style={{ padding: isExpanded ? '16px 12px 24px' : '16px 8px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'center' }}>
        <div style={{ 
          display: 'flex', alignItems: 'center', gap: isExpanded ? '10px' : '0', 
          padding: isExpanded ? '10px 8px' : '8px', 
          borderRadius: '12px', cursor: 'pointer', transition: 'background 150ms',
          width: '100%', justifyContent: isExpanded ? 'flex-start' : 'center'
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: 'white', flexShrink: 0 }}>
            DK
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}
              >
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Dhruv's Workspace</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.40)', whiteSpace: 'nowrap' }}>Growth plan</div>
              </motion.div>
            )}
          </AnimatePresence>
          {isExpanded && <Settings size={14} color="rgba(255,255,255,0.35)" strokeWidth={1.5} style={{ flexShrink: 0 }} />}
        </div>
      </div>

      <style>{`
        .sidebar-scroll::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        .sidebar-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </motion.div>
  )
}
