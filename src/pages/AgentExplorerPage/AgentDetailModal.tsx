import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, HelpCircle } from 'lucide-react'
import type { BhasiniAgent } from '../../data/agents'

interface AgentDetailModalProps {
  agent: BhasiniAgent | null
  onClose: () => void
  onStartConversation: (agentId: string) => void
}

const industryMap: Record<string, string> = {
  'health-medical': 'Medical',
  'tourism': 'Tourism',
  'customer-support': 'Support',
  'real-estate': 'Real Estate',
  'travel': 'Travel',
  'mental-health': 'Wellness'
}

const capabilitiesMap: Record<string, string[]> = {
  'health-medical': ['Symptom Check', 'Appointment Booking', 'Report Explain', 'Doctor Finder', 'Prescription Help', 'Emergency Guide'],
  'tourism': ['Heritage Sites', 'Local Cuisine', 'Festival Guide', 'Transport Tips', 'Hotel Suggest', 'Cultural Context'],
  'customer-support': ['Refund Processing', 'Order Tracking', 'Complaint Filing', 'Account Help', 'Product Info', 'Escalation'],
  'real-estate': ['Property Search', 'Price Analysis', 'Document Guide', 'RERA Check', 'Loan Advice', 'Locality Info'],
  'travel': ['Trip Planning', 'Hotel Booking', 'Itinerary Build', 'Budget Planning', 'Visa Guide', 'Local Tips'],
  'mental-health': ['Active Listening', 'Breathing Exercises', 'Mood Tracking', 'Grounding Techniques', 'Journal Prompts', 'Crisis Resources']
}

export default function AgentDetailModal({ agent, onClose, onStartConversation }: AgentDetailModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (agent) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [agent])

  return (
    <AnimatePresence>
      {agent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            zIndex: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={onClose}
        >
          {/* MODAL PANEL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
            style={{
              background: 'white',
              borderRadius: '28px',
              width: '100%',
              maxWidth: '560px',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              fontFamily: 'var(--font-body)',
              WebkitFontSmoothing: 'antialiased'
            }}
          >
            {/* MODAL HEADER */}
            <div style={{ padding: '28px 28px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              
              {/* Left: Orb + Name + Industry */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <motion.div
                  animate={{
                    y: [0, -4, 0],
                    scale: [1, 1.03, 1]
                  }}
                  transition={{
                    duration: 3.5 + Math.random(),
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: agent.orbGradient && agent.orbGradient.length >= 2 
                      ? `radial-gradient(circle at 32% 28%, ${agent.orbGradient.join(', ')})` 
                      : 'radial-gradient(circle at 32% 28%, #FFD4A0 0%, #FF9A3C 22%, #FF6B35 52%, #C44A1A 80%, #8B2500 100%)',
                    boxShadow: `0 8px 24px ${agent.orbGradient && agent.orbGradient.length > 0 ? agent.orbGradient[0] + '44' : 'rgba(255,107,53,0.27)'}`,
                    position: 'relative',
                    flexShrink: 0
                  }}
                >
                  {/* Inner highlight */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12%',
                      left: '18%',
                      width: '35%',
                      height: '28%',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(255,255,255,0.45) 0%, transparent)',
                      filter: 'blur(2px)'
                    }}
                  />
                </motion.div>

                <div style={{ marginLeft: '16px', display: 'flex', flexDirection: 'column' }}>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, fontFamily: "var(--font-display)", color: '#0D0D0D', margin: 0, marginBottom: '8px' }}>
                    {agent.name.split(' — ')[0]}
                  </h2>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '5px 12px',
                      background: '#EFEFED',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#6B6B6B',
                      fontFamily: "var(--font-body)",
                      alignSelf: 'flex-start'
                    }}
                  >
                    {industryMap[agent.industry] || 'AI Agent'}
                  </div>
                </div>
              </div>

              {/* Right: Close button */}
              <button
                onClick={onClose}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#EFEFED',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6B6B6B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 200ms'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#E0DED9'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#EFEFED'}
              >
                <X size={18} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div style={{ padding: '24px 28px 28px' }}>
              <p style={{ fontSize: '15px', lineHeight: 1.65, color: '#6B6B6B', marginBottom: '24px', fontFamily: "var(--font-body)" }}>
                {agent.description}
              </p>

              {/* Speaks */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9E9E9E', marginBottom: '10px', fontFamily: "var(--font-body)" }}>
                  Speaks
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {agent.languages.map(lang => (
                    <span
                      key={lang}
                      style={{
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontWeight: 600,
                        background: 'rgba(255,107,53,0.06)',
                        border: '1px solid rgba(255,107,53,0.15)',
                        borderRadius: '9999px',
                        color: '#FF6B35',
                        fontFamily: "var(--font-body)"
                      }}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sample Questions */}
              <div style={{ marginTop: '20px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9E9E9E', marginBottom: '10px', fontFamily: "var(--font-body)" }}>
                  Try Asking
                </div>
                <div>
                  {agent.sampleQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '10px 0',
                        borderBottom: '1px solid #F0EFED'
                      }}
                    >
                      <div
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: 'rgba(255,107,53,0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px'
                        }}
                      >
                        <HelpCircle size={12} color="#FF6B35" />
                      </div>
                      <div style={{ fontSize: '13px', color: '#0D0D0D', lineHeight: 1.5, fontFamily: "var(--font-body)" }}>
                        {q}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capabilities */}
              <div style={{ marginTop: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9E9E9E', marginBottom: '12px', fontFamily: "var(--font-body)" }}>
                  Capabilities
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {(capabilitiesMap[agent.industry] || []).map((cap, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '9999px',
                        background: '#EFEFED',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#6B6B6B',
                        fontFamily: "var(--font-body)",
                        textAlign: 'center'
                      }}
                    >
                      {cap}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div
              style={{
                padding: '20px 28px 28px',
                borderTop: '1px solid #F0EFED',
                display: 'flex',
                gap: '10px'
              }}
            >
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#2A2A2A' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onClose()
                  onStartConversation(agent.id)
                }}
                style={{
                  flex: 1,
                  height: '48px',
                  background: '#0D0D0D',
                  color: 'white',
                  border: 'none',
                  borderRadius: '9999px',
                  fontSize: '15px',
                  fontWeight: 600,
                  fontFamily: "var(--font-body)",
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Phone size={16} /> Start Conversation
              </motion.button>

              <button
                style={{
                  height: '48px',
                  padding: '0 20px',
                  background: 'transparent',
                  border: '1.5px solid #E0DED9',
                  borderRadius: '9999px',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#0D0D0D',
                  cursor: 'pointer',
                  fontFamily: "var(--font-body)",
                  transition: 'all 200ms'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#FF6B35'
                  e.currentTarget.style.color = '#FF6B35'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E0DED9'
                  e.currentTarget.style.color = '#0D0D0D'
                }}
              >
                View Docs
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
