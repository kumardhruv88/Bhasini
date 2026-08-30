import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Phone, MessageCircle, Check,
  ArrowRight, Share2
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { BhasiniAgent } from '../../data/agents'

interface AgentDetailModalProps {
  agent: BhasiniAgent | null
  onClose: () => void
  onStartConversation: (agentId: string) => void
}

// ---------- helpers ----------
function buildOrbGradient(colors: string[]): string {
  if (!colors || colors.length === 0) return '#FF6B35'
  if (colors.length === 1) return colors[0]
  if (colors.length === 2) return `radial-gradient(circle at 32% 28%, ${colors[0]} 0%, ${colors[1]} 100%)`
  return `radial-gradient(circle at 32% 28%, ${colors[0]} 0%, ${colors[1]} 45%, ${colors[2]} 100%)`
}

function getCapabilities(industry: string): string[] {
  const map: Record<string, string[]> = {
    'health-medical': ['Symptom Check','Appointment Booking','Report Explain','Doctor Finder','Prescription Help','Emergency Guide'],
    'tourism': ['Heritage Sites','Local Cuisine','Festival Guide','Transport Tips','Hotel Suggest','Cultural Context'],
    'customer-support': ['Refund Processing','Order Tracking','Complaint Filing','Account Help','Product Info','Escalation'],
    'real-estate': ['Property Search','Price Analysis','Document Guide','RERA Check','Loan Advice','Locality Info'],
    'travel': ['Trip Planning','Hotel Booking','Itinerary Build','Budget Planning','Visa Guide','Local Tips'],
    'mental-health': ['Active Listening','Breathing Exercises','Mood Tracking','Grounding Techniques','Journal Prompts','Crisis Resources'],
  }
  return map[industry] || []
}

const industryLabel: Record<string, string> = {
  'health-medical': 'Medical',
  'tourism': 'Tourism',
  'customer-support': 'Customer Support',
  'real-estate': 'Real Estate',
  'travel': 'Travel',
  'mental-health': 'Mental Wellness',
}

type StatDef = { value: string; label: string }
const statsMap: Record<string, StatDef[]> = {
  'health-medical': [{ value:'< 1s', label:'Response' },{ value:'4.9★', label:'Rating' },{ value:'22k+', label:'Sessions' }],
  'tourism': [{ value:'3.2s', label:'Avg. Call' },{ value:'4.8★', label:'Rating' },{ value:'8k+', label:'Sessions' }],
  'customer-support': [{ value:'< 800ms', label:'Latency' },{ value:'4.7★', label:'CSAT' },{ value:'77k+', label:'Calls' }],
  'real-estate': [{ value:'< 1.2s', label:'Response' },{ value:'4.8★', label:'Rating' },{ value:'5k+', label:'Leads' }],
  'travel': [{ value:'< 1s', label:'Response' },{ value:'4.9★', label:'Rating' },{ value:'12k+', label:'Trips' }],
  'mental-health': [{ value:'< 1s', label:'Response' },{ value:'5.0★', label:'Rating' },{ value:'3k+', label:'Sessions' }],
}

type PreviewMsg = { speaker: 'user' | 'agent'; text: string }
const previewConversations: Record<string, PreviewMsg[]> = {
  'health-medical': [
    { speaker:'user', text:'मुझे सिरदर्द है' },
    { speaker:'agent', text:'समझा। कितने समय से है? क्या आपने कोई दवा ली है?' },
  ],
  'tourism': [
    { speaker:'user', text:'Hampi ke baare mein batao' },
    { speaker:'agent', text:'Hampi ek UNESCO site hai — 500+ temples, stunning ruins!' },
  ],
  'customer-support': [
    { speaker:'user', text:'Mujhe refund chahiye' },
    { speaker:'agent', text:'ज़रूर। Order number share karein, main check karta hoon.' },
  ],
  'real-estate': [
    { speaker:'user', text:'2BHK ka rate kya hai?' },
    { speaker:'agent', text:'Noida sector 62 mein ₹65–75 lakh range hai abhi.' },
  ],
  'travel': [
    { speaker:'user', text:'Ladakh trip plan karo' },
    { speaker:'agent', text:'10 din ka plan: Day 1–2 Leh, Day 3–4 Pangong...' },
  ],
  'mental-health': [
    { speaker:'user', text:'Main bahut stressed hoon' },
    { speaker:'agent', text:'Sunita hoon main. Aap safe hain. Kya share karna chahenge?' },
  ],
}

// -------------------------
export default function AgentDetailModal({ agent, onClose, onStartConversation }: AgentDetailModalProps) {
  const navigate = useNavigate()
  const [hoveredQ, setHoveredQ] = useState<number | null>(null)
  const prevRef = useRef<PreviewMsg[]>([])

  useEffect(() => {
    if (agent) {
      document.body.style.overflow = 'hidden'
      prevRef.current = previewConversations[agent.industry] || []
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [agent])

  return (
    <AnimatePresence>
      {agent && (() => {
        const color0 = agent.orbGradient?.[0] || '#FF6B35'
        const stats = statsMap[agent.industry] || statsMap['travel']
        const caps = getCapabilities(agent.industry)
        const preview = previewConversations[agent.industry] || []
        const heroGrad = agent.orbGradient?.length >= 2
          ? `linear-gradient(160deg, ${agent.orbGradient[0]}14 0%, ${agent.orbGradient[1]}08 50%, rgba(247,245,242,0) 100%)`
          : 'transparent'

        return (
          <>
            {/* OVERLAY */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={onClose}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(13,13,13,0.60)',
                backdropFilter: 'blur(12px) saturate(160%)',
                zIndex: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              {/* MODAL PANEL */}
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.93, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={e => e.stopPropagation()}
                style={{
                  background: 'white',
                  borderRadius: '28px',
                  width: '100%',
                  maxWidth: '580px',
                  maxHeight: '88vh',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  position: 'relative',
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.06), 0 32px 80px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.08)',
                  fontFamily: 'var(--font-body)',
                  WebkitFontSmoothing: 'antialiased',
                }}
              >
                {/* ── HERO BAND ── */}
                <div style={{
                  background: heroGrad,
                  padding: '32px 32px 24px',
                  position: 'relative',
                  borderRadius: '28px 28px 0 0',
                }}>
                  {/* Close */}
                  <button
                    onClick={onClose}
                    style={{
                      position: 'absolute', top: '20px', right: '20px',
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: 'rgba(0,0,0,0.06)', border: 'none',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#6B6B6B', transition: 'background 150ms',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.10)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
                  >
                    <X size={16} />
                  </button>

                  {/* Orb + Name row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                    {/* ORB */}
                    <motion.div
                      animate={{ y: [0, -6, 0], scale: [1, 1.03, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        width: '80px', height: '80px', borderRadius: '50%', flexShrink: 0,
                        background: buildOrbGradient(agent.orbGradient),
                        boxShadow: `0 8px 32px ${color0}40, inset 0 1px 0 rgba(255,255,255,0.3)`,
                        position: 'relative',
                      }}
                    >
                      <div style={{
                        position: 'absolute', top: '12%', left: '18%',
                        width: '32%', height: '26%', borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent)',
                        filter: 'blur(3px)',
                      }} />
                    </motion.div>

                    {/* Name + badge */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '28px', fontWeight: 300,
                        letterSpacing: '-0.02em', color: '#0D0D0D', lineHeight: 1,
                      }}>
                        {agent.name.split(' — ')[0]}
                      </div>
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        padding: '5px 12px', background: 'rgba(0,0,0,0.05)',
                        borderRadius: '9999px', width: 'fit-content',
                      }}>
                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: color0 }} />
                        <span style={{
                          fontFamily: 'var(--font-body)', fontSize: '12px',
                          fontWeight: 500, color: '#6B6B6B', letterSpacing: '0.02em',
                        }}>
                          {industryLabel[agent.industry] || 'AI Agent'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick stats */}
                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1px', background: '#F0EFED', borderRadius: '14px', overflow: 'hidden',
                  }}>
                    {stats.map(s => (
                      <div key={s.label} style={{
                        background: 'white', padding: '14px 16px',
                        display: 'flex', flexDirection: 'column', gap: '3px',
                      }}>
                        <div style={{
                          fontFamily: 'var(--font-display)', fontSize: '20px',
                          fontWeight: 600, color: '#0D0D0D', letterSpacing: '-0.02em',
                        }}>{s.value}</div>
                        <div style={{
                          fontFamily: 'var(--font-body)', fontSize: '10px',
                          fontWeight: 500, color: '#9E9E9E',
                          letterSpacing: '0.06em', textTransform: 'uppercase',
                        }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── BODY ── */}
                <div style={{ padding: '0 32px 0' }}>
                  {/* Description */}
                  <p style={{
                    marginTop: '24px', marginBottom: '28px',
                    fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 300,
                    lineHeight: 1.75, color: '#4A4A4A', letterSpacing: '0.005em',
                  }}>
                    {agent.description}
                  </p>

                  <div style={{ height: '1px', background: '#F0EFED', marginBottom: '28px' }} />

                  {/* SPEAKS */}
                  <SectionLabel>Speaks</SectionLabel>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
                    {agent.languages.map(lang => (
                      <motion.span
                        key={lang}
                        whileHover={{ scale: 1.04, background: `${color0}15` }}
                        transition={{ duration: 0.15 }}
                        style={{
                          padding: '7px 16px', borderRadius: '9999px',
                          border: `1.5px solid ${color0}35`,
                          background: `${color0}08`,
                          fontFamily: 'var(--font-body)', fontSize: '13px',
                          fontWeight: 500, color: color0,
                        }}
                      >
                        {lang}
                      </motion.span>
                    ))}
                  </div>

                  {/* TRY ASKING */}
                  <SectionLabel>Try Asking</SectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: '28px' }}>
                    {agent.sampleQuestions.map((q, idx) => (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredQ(idx)}
                        onMouseLeave={() => setHoveredQ(null)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '14px',
                          padding: '14px 8px',
                          borderBottom: '1px solid #F5F5F5',
                          cursor: 'pointer', borderRadius: '8px',
                          background: hoveredQ === idx ? '#FAFAFA' : 'transparent',
                          transition: 'background 150ms',
                        }}
                      >
                        <div style={{
                          width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                          background: `${color0}10`, border: `1px solid ${color0}20`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <MessageCircle size={13} color={color0} />
                        </div>
                        <div style={{
                          fontFamily: 'var(--font-body)', fontSize: '14px',
                          fontWeight: 400, color: '#2A2A2A', lineHeight: 1.4, flex: 1,
                        }}>
                          {q}
                        </div>
                        <motion.div
                          animate={{ opacity: hoveredQ === idx ? 1 : 0 }}
                          transition={{ duration: 0.15 }}
                          style={{ flexShrink: 0 }}
                        >
                          <ArrowRight size={14} color="#C8C5C0" />
                        </motion.div>
                      </div>
                    ))}
                  </div>

                  {/* CAPABILITIES */}
                  <SectionLabel>Capabilities</SectionLabel>
                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '8px', marginBottom: '28px',
                  }}>
                    {caps.map(cap => (
                      <div key={cap} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 14px', background: '#FAFAFA',
                        border: '1px solid #F0EFED', borderRadius: '10px',
                      }}>
                        <div style={{
                          width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                          background: `${color0}12`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <Check size={10} color={color0} />
                        </div>
                        <span style={{
                          fontFamily: 'var(--font-body)', fontSize: '12px',
                          fontWeight: 500, color: '#4A4A4A',
                        }}>{cap}</span>
                      </div>
                    ))}
                  </div>

                  {/* PREVIEW CONVERSATION */}
                  {preview.length > 0 && (
                    <>
                      <SectionLabel>Preview</SectionLabel>
                      <div style={{
                        background: '#FAFAFA', borderRadius: '16px',
                        padding: '16px', border: '1px solid #F0EFED',
                        marginBottom: '28px',
                      }}>
                        {preview.map((msg, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.2 }}
                            style={{
                              display: 'flex',
                              justifyContent: msg.speaker === 'user' ? 'flex-end' : 'flex-start',
                              gap: '8px',
                              marginBottom: idx < preview.length - 1 ? '10px' : 0,
                              alignItems: 'flex-end',
                            }}
                          >
                            {msg.speaker === 'agent' && (
                              <div style={{
                                width: '6px', height: '6px', borderRadius: '50%',
                                background: color0, flexShrink: 0, marginBottom: '4px',
                              }} />
                            )}
                            <div style={{
                              padding: '8px 14px',
                              borderRadius: msg.speaker === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                              background: msg.speaker === 'user' ? '#0D0D0D' : 'white',
                              border: msg.speaker === 'user' ? 'none' : '1px solid #E8E8E8',
                              color: msg.speaker === 'user' ? 'white' : '#2A2A2A',
                              fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 400,
                            }}>
                              {msg.text}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* ── FOOTER ── */}
                <div style={{
                  padding: '20px 32px 32px',
                  borderTop: '1px solid #F5F5F5',
                  display: 'flex', flexDirection: 'column', gap: '12px',
                }}>
                  {/* Primary button */}
                  <motion.button
                    whileHover={{ scale: 1.01, backgroundColor: '#1A1A1A' }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      onClose()
                      onStartConversation(agent.id)
                      navigate(`/agents/${agent.id}/talk`)
                    }}
                    style={{
                      width: '100%', height: '52px',
                      background: '#0D0D0D', border: 'none', borderRadius: '9999px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                      style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E' }}
                    />
                    <span style={{
                      fontFamily: 'var(--font-display)', fontSize: '15px',
                      fontWeight: 500, color: 'white', letterSpacing: '-0.01em',
                    }}>
                      Start Conversation
                    </span>
                    <Phone size={15} color="white" />
                  </motion.button>

                  {/* Secondary row */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      style={{
                        flex: 1, height: '44px', background: 'transparent',
                        border: '1.5px solid #E0DED9', borderRadius: '9999px',
                        fontFamily: 'var(--font-body)', fontSize: '14px',
                        fontWeight: 400, color: '#6B6B6B', cursor: 'pointer',
                        transition: 'all 200ms',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = '#C8C5C0'
                        e.currentTarget.style.color = '#0D0D0D'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = '#E0DED9'
                        e.currentTarget.style.color = '#6B6B6B'
                      }}
                    >
                      View Docs
                    </button>
                    <button
                      style={{
                        width: '44px', height: '44px',
                        border: '1.5px solid #E0DED9', borderRadius: '50%',
                        background: 'transparent', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 200ms',
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#C8C5C0'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#E0DED9'}
                    >
                      <Share2 size={15} color="#6B6B6B" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )
      })()}
    </AnimatePresence>
  )
}

// ---------- tiny helper component ----------
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '9px', fontWeight: 500,
      letterSpacing: '0.18em', textTransform: 'uppercase',
      color: '#9E9E9E', marginBottom: '12px',
    }}>
      {children}
    </div>
  )
}
