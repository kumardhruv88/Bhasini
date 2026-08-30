import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { agents, type BhasiniAgent } from '../../data/agents'
import Navbar from '../../components/layout/Navbar'
import AgentCard from './AgentCard'
import AgentDetailModal from './AgentDetailModal'

const TABS = [
  { id: 'all', label: 'All Agents', count: 20 },
  { id: 'health-medical', label: 'Health & Medical', count: 4 },
  { id: 'tourism', label: 'Tourism', count: 3 },
  { id: 'customer-support', label: 'Customer Support', count: 4 },
  { id: 'real-estate', label: 'Real Estate', count: 3 },
  { id: 'travel', label: 'Travel', count: 3 },
  { id: 'mental-health', label: 'Mental Wellness', count: 3 },
]

export default function AgentExplorerPage() {
  const [activeIndustry, setActiveIndustry] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAgent, setSelectedAgent] = useState<BhasiniAgent | null>(null)
  const navigate = useNavigate()

  const handleStartConversation = (agentId: string) => {
    navigate(`/agents/${agentId}/talk`)
  }

  const filtered = agents.filter(agent => {
    const matchesIndustry = activeIndustry === 'all' || agent.industry === activeIndustry
    const q = searchQuery.toLowerCase()
    const matchesSearch = q === '' ||
      agent.name.toLowerCase().includes(q) ||
      agent.description.toLowerCase().includes(q) ||
      agent.languages.some(l => l.toLowerCase().includes(q))
    return matchesIndustry && matchesSearch
  })

  return (
    <div style={{ paddingTop: '64px', background: '#F7F5F2', minHeight: '100vh', fontFamily: 'var(--font-body)', WebkitFontSmoothing: 'antialiased' }}>
      <Navbar />
      
      {/* PAGE HEADER SECTION */}
      <div style={{ padding: '64px 32px 48px', maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* H1 */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#0D0D0D',
            marginBottom: '16px',
            marginTop: 0,
            WebkitFontSmoothing: 'antialiased'
          }}
        >
          Find Your Perfect Voice Agent
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '18px',
            color: '#6B6B6B',
            maxWidth: '520px',
            lineHeight: 1.6,
            margin: 0
          }}
        >
          Production-ready agents for every industry. Speak in Hindi, Tamil, Telugu, Marathi, Punjabi and more.
        </p>

        {/* Search bar */}
        <div style={{ marginTop: '32px', position: 'relative', maxWidth: '480px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agents..."
            style={{
              width: '100%',
              height: '48px',
              padding: '0 48px 0 48px',
              background: 'white',
              border: '1.5px solid #E0DED9',
              borderRadius: '9999px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '15px',
              color: '#0D0D0D',
              outline: 'none',
              transition: 'border-color 200ms, box-shadow 200ms',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#FF6B35'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.12)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E0DED9'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9E9E9E', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
            <Search size={18} />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#9E9E9E',
                display: 'flex',
                alignItems: 'center',
                padding: '4px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#0D0D0D'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9E9E9E'}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* INDUSTRY FILTER TABS */}
        <div style={{ marginTop: '32px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {TABS.map(tab => {
            const isActive = activeIndustry === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveIndustry(tab.id)}
                style={{
                  height: '38px',
                  padding: '0 16px',
                  borderRadius: '9999px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 200ms',
                  display: 'flex',
                  alignItems: 'center',
                  background: isActive ? '#0D0D0D' : 'white',
                  border: `1px solid ${isActive ? '#0D0D0D' : '#E0DED9'}`,
                  color: isActive ? 'white' : '#6B6B6B'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = '#C8C5C0'
                    e.currentTarget.style.color = '#0D0D0D'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = '#E0DED9'
                    e.currentTarget.style.color = '#6B6B6B'
                  }
                }}
              >
                {tab.label}
                <span
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.15)' : '#EFEFED',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '1px 7px',
                    borderRadius: '9999px',
                    marginLeft: '6px',
                    color: isActive ? 'white' : '#9E9E9E'
                  }}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* AGENTS GRID */}
      <div style={{ padding: '0 32px 48px', maxWidth: '1280px', margin: '0 auto' }}>
        {filtered.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '24px', fontWeight: 700, color: '#0D0D0D', margin: '0 0 8px' }}>
              No agents found
            </h3>
            <p style={{ color: '#6B6B6B', marginBottom: '24px' }}>Try a different industry or search term</p>
            <button
              onClick={() => {
                setActiveIndustry('all')
                setSearchQuery('')
              }}
              style={{
                height: '40px',
                padding: '0 20px',
                background: 'white',
                border: '1px solid #E0DED9',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#0D0D0D',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif"
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px'
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map(agent => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onClick={setSelectedAgent}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* MODAL */}
      <AgentDetailModal
        agent={selectedAgent}
        onClose={() => setSelectedAgent(null)}
        onStartConversation={handleStartConversation}
      />
    </div>
  )
}
