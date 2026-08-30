import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Phone, PhoneOff, Mic, MicOff,
  Check, Globe
} from 'lucide-react'
import { agents } from '../../data/agents'

// ---------- types ----------
type CallState = 'idle' | 'connecting' | 'active' | 'ended'

interface TranscriptMessage {
  id: number
  speaker: 'user' | 'agent'
  text: string
  timestamp: number
  isFinal: boolean
}

interface ScriptLine {
  speaker: 'user' | 'agent'
  text: string
  delay: number
  duration: number
}

// ---------- helpers ----------
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function buildOrbGradient(colors: string[]): string {
  if (!colors || colors.length === 0) return '#FF6B35'
  if (colors.length === 1) return colors[0]
  if (colors.length === 2) return `radial-gradient(circle at 32% 28%, ${colors[0]} 0%, ${colors[1]} 100%)`
  return `radial-gradient(circle at 32% 28%, ${colors[0]} 0%, ${colors[1]} 45%, ${colors[2]} 100%)`
}

const demoScripts: Record<string, ScriptLine[]> = {
  'health-medical': [
    { speaker:'user', text:'Doctor sahab, mujhe teen dino se bukhaar hai', delay:2000, duration:3000 },
    { speaker:'agent', text:'Samjha. Kitna temperature hai? Kya aapne paracetamol li hai?', delay:1000, duration:3500 },
    { speaker:'user', text:'102 degree hai. Ek tablet li thi subah.', delay:800, duration:2500 },
    { speaker:'agent', text:'102 pe concern hona chahiye. Kya body mein dard hai ya throat mein kuch feel ho raha hai?', delay:1000, duration:4000 },
  ],
  'customer-support': [
    { speaker:'user', text:'Mujhe refund chahiye mere order ka', delay:2000, duration:2800 },
    { speaker:'agent', text:'Zaroor main madad karunga. Kripya apna order number share karein.', delay:1000, duration:3200 },
    { speaker:'user', text:'Order number hai EL4543490', delay:800, duration:2000 },
    { speaker:'agent', text:'Dhanyavaad. Maine aapka order dekha — refund process shuru kar diya hai. 3-5 din mein credit ho jayega.', delay:1200, duration:4500 },
  ],
  'travel': [
    { speaker:'user', text:'Mujhe Ladakh jaana hai November mein', delay:2000, duration:3000 },
    { speaker:'agent', text:'Arrey November mein Ladakh bohot cold hoga — minus 20! Main suggest karunga October ya June-September.', delay:1000, duration:4000 },
    { speaker:'user', text:'Toh October mein 7 days ka plan banao', delay:800, duration:2500 },
    { speaker:'agent', text:'Perfect! Day 1-2: Leh acclimatization. Day 3: Nubra Valley by Khardung La. Day 4-5: Pangong Tso...', delay:1200, duration:5000 },
  ],
}

const defaultScript: ScriptLine[] = [
  { speaker:'user', text:'Namaste, main aapki help chahta hoon', delay:2000, duration:2500 },
  { speaker:'agent', text:'Namaste! Main yahan hoon aapki poori madad karne ke liye. Kya chahiye aapko?', delay:1000, duration:3500 },
  { speaker:'user', text:'Mujhe kuch important jaankari chahiye', delay:800, duration:2500 },
  { speaker:'agent', text:'Zaroor! Batayein kya jaanna chahte hain — main apni poori koshish karunga.', delay:1000, duration:3500 },
]

const latencyValues = ['< 750ms', '< 820ms', '< 680ms', '< 790ms']

const INDUSTRY_LABEL: Record<string, string> = {
  'health-medical': 'Medical',
  'tourism': 'Tourism',
  'customer-support': 'Support',
  'real-estate': 'Real Estate',
  'travel': 'Travel',
  'mental-health': 'Wellness',
}

// ──────────────────────────────────────────
export default function AgentConversationPage() {
  const { agentId } = useParams<{ agentId: string }>()
  const navigate = useNavigate()
  const agent = agents.find(a => a.id === agentId)

  const [callState, setCallState] = useState<CallState>('idle')
  const [activeOrb, setActiveOrb] = useState<'user' | 'agent' | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(agent?.languages[0] || 'Hindi')
  const [langDropOpen, setLangDropOpen] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([])
  const [sessionTime, setSessionTime] = useState(0)
  const [latency, setLatency] = useState('< 750ms')
  const [currentMsg, setCurrentMsg] = useState<TranscriptMessage | null>(null)

  const transcriptRef = useRef<HTMLDivElement>(null)
  const demoLoopRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const msgIdRef = useRef(0)

  // ── auto-scroll ──
  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: 'smooth' })
  }, [transcript])

  // ── session timer ──
  useEffect(() => {
    if (callState !== 'active') return
    const interval = setInterval(() => setSessionTime(t => t + 1), 1000)
    return () => clearInterval(interval)
  }, [callState])

  // ── latency animation ──
  useEffect(() => {
    if (callState !== 'active') return
    const interval = setInterval(() => {
      setLatency(latencyValues[Math.floor(Math.random() * latencyValues.length)])
    }, 3000)
    return () => clearInterval(interval)
  }, [callState])

  // ── demo conversation ──
  const stopDemo = useCallback(() => {
    demoLoopRef.current.forEach(clearTimeout)
    demoLoopRef.current = []
    setActiveOrb(null)
    setCurrentMsg(null)
  }, [])

  const startDemo = useCallback(() => {
    if (!agent) return
    const script = demoScripts[agent.industry] || defaultScript

    const runScript = (loopOffset: number = 0) => {
      let elapsed = loopOffset
      script.forEach((line, i) => {
        // delay before showing
        const t1 = setTimeout(() => {
          setActiveOrb(line.speaker)
          const id = ++msgIdRef.current
          const msg: TranscriptMessage = {
            id, speaker: line.speaker, text: line.text,
            timestamp: sessionTime, isFinal: false,
          }
          setCurrentMsg(msg)
        }, elapsed + line.delay)

        // finalize
        const t2 = setTimeout(() => {
          const id = ++msgIdRef.current
          const finalMsg: TranscriptMessage = {
            id, speaker: line.speaker, text: line.text,
            timestamp: sessionTime, isFinal: true,
          }
          setTranscript(prev => [...prev, finalMsg])
          if (i === script.length - 1) setCurrentMsg(null)
        }, elapsed + line.delay + line.duration)

        demoLoopRef.current.push(t1, t2)
        elapsed += line.delay + line.duration + 500
      })

      // loop
      const loopTimer = setTimeout(() => runScript(0), elapsed + 1500)
      demoLoopRef.current.push(loopTimer)
    }

    runScript()
  }, [agent, sessionTime])

  useEffect(() => {
    if (callState === 'active') startDemo()
    else stopDemo()
    return () => stopDemo()
  }, [callState]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── keyboard shortcuts ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') setIsMuted(m => !m)
      if (e.key === 'Escape' && callState === 'active') {
        setCallState('ended')
        stopDemo()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [callState, stopDemo])

  const handleCallButton = async () => {
    if (callState === 'idle' || callState === 'ended') {
      if (callState === 'ended') {
        setTranscript([])
        setSessionTime(0)
      }
      setCallState('connecting')
      await new Promise(r => setTimeout(r, 2000))
      setCallState('active')
    } else if (callState === 'active') {
      setCallState('ended')
      setActiveOrb(null)
      stopDemo()
    }
  }

  if (!agent) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
          <div style={{ fontSize: '18px', color: '#0D0D0D', marginBottom: '8px' }}>Agent not found</div>
          <button onClick={() => navigate('/agents')} style={{ padding: '10px 20px', borderRadius: '9999px', background: '#0D0D0D', color: 'white', border: 'none', cursor: 'pointer' }}>
            Back to Agents
          </button>
        </div>
      </div>
    )
  }

  const color0 = agent.orbGradient?.[0] || '#FF6B35'
  const statusDot = (color: string, pulse = false) => (
    <motion.div
      animate={pulse ? { opacity: [1, 0.3, 1] } : {}}
      transition={pulse ? { duration: 1.4, repeat: Infinity } : {}}
      style={{ width: '7px', height: '7px', borderRadius: '50%', background: color, flexShrink: 0 }}
    />
  )

  return (
    <div style={{
      width: '100vw', height: '100vh', display: 'flex',
      background: '#F7F5F2', overflow: 'hidden',
      fontFamily: 'var(--font-body)', WebkitFontSmoothing: 'antialiased',
    }}>

      {/* ═══════ PANEL 1 — LEFT SIDEBAR ═══════ */}
      <div style={{
        width: '280px', height: '100vh', background: 'white',
        borderRight: '1px solid #F0EFED', display: 'flex',
        flexDirection: 'column', flexShrink: 0,
      }}>
        {/* Header */}
        <div style={{
          height: '64px', padding: '0 20px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid #F0EFED', flexShrink: 0,
        }}>
          <button
            onClick={() => navigate('/agents')}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#6B6B6B', transition: 'color 150ms',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#0D0D0D'}
            onMouseLeave={e => e.currentTarget.style.color = '#6B6B6B'}
          >
            <ArrowLeft size={16} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500 }}>Agents</span>
          </button>

          <AnimatePresence>
            {callState === 'active' && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#FF6B35', fontWeight: 500 }}
              >
                {formatTime(sessionTime)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Agent info */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #F0EFED', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
                background: buildOrbGradient(agent.orbGradient),
                boxShadow: `0 4px 16px ${color0}40`,
              }}
            />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 400, color: '#0D0D0D', letterSpacing: '-0.01em', marginBottom: '4px' }}>
                {agent.name.split(' — ')[0]}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                {callState === 'idle' && <>{statusDot('#C8C5C0')} <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9E9E9E' }}>Ready</span></>}
                {callState === 'connecting' && <>{statusDot('#F59E0B', true)} <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#F59E0B' }}>Connecting...</span></>}
                {callState === 'active' && <>{statusDot('#22C55E', true)} <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#22C55E' }}>Live</span></>}
                {callState === 'ended' && <>{statusDot('#C8C5C0')} <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9E9E9E' }}>Ended</span></>}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '10px', padding: '3px 10px', background: '#EFEFED', borderRadius: '9999px', color: '#6B6B6B', fontWeight: 500 }}>
              {INDUSTRY_LABEL[agent.industry] || 'Agent'}
            </span>
            <span style={{ fontSize: '10px', padding: '3px 10px', background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.20)', borderRadius: '9999px', color: '#FF6B35', fontWeight: 600 }}>
              {selectedLanguage}
            </span>
          </div>
        </div>

        {/* Language selector */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0EFED', flexShrink: 0 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9E9E9E', marginBottom: '10px' }}>
            Language
          </div>
          {agent.languages.map(lang => {
            const isActive = lang === selectedLanguage
            return (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                style={{
                  width: '100%', padding: '9px 12px', borderRadius: '10px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px',
                  background: isActive ? 'rgba(255,107,53,0.08)' : 'transparent',
                  border: isActive ? '1px solid rgba(255,107,53,0.15)' : '1px solid transparent',
                  transition: 'all 150ms', textAlign: 'left',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#F5F5F5' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
              >
                <span style={{ fontSize: '16px' }}>🇮🇳</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: isActive ? 500 : 400, color: isActive ? '#FF6B35' : '#4A4A4A', flex: 1 }}>
                  {lang}
                </span>
                {isActive && <Check size={12} color="#FF6B35" />}
              </button>
            )
          })}
        </div>

        {/* Transcript */}
        <div ref={transcriptRef} style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', fontWeight: 500,
            letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9E9E9E',
            marginBottom: '14px', position: 'sticky', top: 0, background: 'white', paddingBottom: '8px', zIndex: 1,
          }}>
            Transcript
          </div>

          {transcript.length === 0 ? (
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#C8C5C0', textAlign: 'center', marginTop: '24px', whiteSpace: 'pre-line' }}>
              {'Transcript will appear here\nduring your conversation'}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <AnimatePresence initial={false}>
                {transcript.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: '8px',
                      fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase',
                      color: msg.speaker === 'user' ? 'rgba(255,107,53,0.7)' : 'rgba(107,107,107,0.6)',
                      marginBottom: '3px',
                    }}>
                      {msg.speaker === 'user' ? 'You' : agent.name.split(' — ')[0]}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 400,
                      lineHeight: 1.55, color: msg.isFinal ? '#2A2A2A' : '#9E9E9E',
                      fontStyle: msg.isFinal ? 'normal' : 'italic',
                    }}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* ═══════ PANEL 2 — CENTER STAGE ═══════ */}
      <div style={{
        flex: 1, height: '100vh', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        background: callState === 'active'
          ? `radial-gradient(ellipse 60% 50% at 35% 50%, ${color0}08 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 65% 50%, rgba(60,207,207,0.06) 0%, transparent 60%), #F7F5F2`
          : '#F7F5F2',
        transition: 'background 1s ease',
      }}>
        {/* Top status bar */}
        <div style={{ position: 'absolute', top: '24px', left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {callState === 'idle' && (
              <motion.div key="idle-pill" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '9999px', padding: '8px 20px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B6B6B' }}>
                Press to start conversation
              </motion.div>
            )}
            {callState === 'connecting' && (
              <motion.div key="conn-pill" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ background: 'rgba(255,165,0,0.08)', border: '1px solid rgba(255,165,0,0.20)', borderRadius: '9999px', padding: '8px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: '1.5px solid rgba(255,165,0,0.3)', borderTopColor: '#F59E0B', animation: 'spin 0.8s linear infinite' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#F59E0B' }}>
                  Connecting to {agent.name.split(' — ')[0]}...
                </span>
              </motion.div>
            )}
            {callState === 'active' && (
              <motion.div key="live-pill" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.20)', borderRadius: '9999px', padding: '8px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                  style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E' }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#22C55E', fontWeight: 500 }}>
                  {formatTime(sessionTime)} · Live
                </span>
              </motion.div>
            )}
            {callState === 'ended' && (
              <motion.div key="ended-pill" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '9999px', padding: '8px 20px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B6B6B' }}>
                Conversation ended
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main orb stage */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '100%' }}>
          <AnimatePresence mode="wait">
            {/* IDLE */}
            {callState === 'idle' && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                  animate={{ y: [0, -16, 0], scale: [1, 1.03, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ width: '200px', height: '200px', borderRadius: '50%', background: buildOrbGradient(agent.orbGradient), boxShadow: `0 20px 60px ${color0}40` }}
                >
                  <div style={{ position: 'absolute', top: '14%', left: '18%', width: '30%', height: '24%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent)', filter: 'blur(4px)' }} />
                </motion.div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 300, color: '#0D0D0D', letterSpacing: '-0.02em', marginTop: '24px' }}>
                  {agent.name.split(' — ')[0]}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#9E9E9E', marginTop: '8px' }}>
                  Tap to begin
                </div>
              </motion.div>
            )}

            {/* CONNECTING */}
            {callState === 'connecting' && (
              <motion.div key="connecting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                {[0, 0.5, 1.0].map((delay, i) => (
                  <motion.div key={i}
                    animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay, ease: 'easeOut' }}
                    style={{
                      position: 'absolute', width: '200px', height: '200px', borderRadius: '50%',
                      border: `1px solid ${color0}20`, top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}
                <div style={{ width: '200px', height: '200px', borderRadius: '50%', background: buildOrbGradient(agent.orbGradient), boxShadow: `0 20px 60px ${color0}40` }} />
              </motion.div>
            )}

            {/* ACTIVE — two orbs */}
            {callState === 'active' && (
              <motion.div key="active" style={{ display: 'flex', alignItems: 'center', gap: '60px' }}>
                {/* User orb */}
                <motion.div initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    {activeOrb === 'user' && (
                      <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        style={{ position: 'absolute', inset: '-10px', borderRadius: '50%', border: `2px solid rgba(255,107,53,0.3)` }}
                      />
                    )}
                    <motion.div
                      animate={activeOrb === 'user'
                        ? { scale: [1, 1.06, 1] }
                        : { scale: [1, 1.02, 1] }}
                      transition={{ duration: activeOrb === 'user' ? 0.5 : 2.5, repeat: Infinity }}
                      style={{
                        width: '140px', height: '140px', borderRadius: '50%',
                        background: 'radial-gradient(circle at 32% 28%, #FFD4A0 0%, #FF9A3C 22%, #FF6B35 52%, #C44A1A 80%, #8B2500 100%)',
                        boxShadow: '0 12px 40px rgba(255,107,53,0.35)',
                      }}
                    >
                      <div style={{ position: 'absolute', top: '14%', left: '18%', width: '30%', height: '24%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent)', filter: 'blur(3px)' }} />
                    </motion.div>
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.18em', color: '#9E9E9E' }}>YOU</div>
                </motion.div>

                {/* Center line / particles */}
                <div style={{ width: '120px', height: '120px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {activeOrb && [0, 1, 2, 3].map(i => (
                    <motion.div key={i}
                      initial={{ x: activeOrb === 'user' ? -50 : 50, opacity: 0, scale: 0 }}
                      animate={{ x: activeOrb === 'user' ? 50 : -50, opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.2, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ position: 'absolute', width: '6px', height: '6px', borderRadius: '50%', background: activeOrb === 'user' ? '#FF6B35' : '#3CCFCF' }}
                    />
                  ))}
                  {!activeOrb && (
                    <motion.div
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        position: 'absolute', left: 0, right: 0, top: '50%', height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.3), rgba(60,207,207,0.3), transparent)',
                      }}
                    />
                  )}
                </div>

                {/* Agent orb */}
                <motion.div initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    {activeOrb === 'agent' && (
                      <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        style={{ position: 'absolute', inset: '-10px', borderRadius: '50%', border: `2px solid ${color0}50` }}
                      />
                    )}
                    <motion.div
                      animate={activeOrb === 'agent'
                        ? { scale: [1, 1.06, 1] }
                        : { scale: [1, 1.02, 1] }}
                      transition={{ duration: activeOrb === 'agent' ? 0.5 : 2.5, repeat: Infinity }}
                      style={{
                        width: '140px', height: '140px', borderRadius: '50%',
                        background: buildOrbGradient(agent.orbGradient),
                        boxShadow: `0 12px 40px ${color0}40`,
                      }}
                    >
                      <div style={{ position: 'absolute', top: '14%', left: '18%', width: '30%', height: '24%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent)', filter: 'blur(3px)' }} />
                    </motion.div>
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.18em', color: '#9E9E9E' }}>BHASINI</div>
                </motion.div>
              </motion.div>
            )}

            {/* ENDED */}
            {callState === 'ended' && (
              <motion.div key="ended" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: buildOrbGradient(agent.orbGradient), opacity: 0.5 }} />
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#9E9E9E', marginTop: '20px' }}>Conversation ended</div>
                <button
                  onClick={() => { setCallState('idle'); setTranscript([]); setSessionTime(0) }}
                  style={{ marginTop: '16px', height: '44px', padding: '0 24px', background: '#0D0D0D', color: 'white', border: 'none', borderRadius: '9999px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500 }}>
                  Start New
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Current speaker text */}
        <div style={{ position: 'absolute', bottom: '140px', left: 0, right: 0, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
          <AnimatePresence mode="wait">
            {currentMsg && (
              <motion.div key={currentMsg.id}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                style={{ maxWidth: '480px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: currentMsg.speaker === 'user' ? '#FF6B35' : '#6B6B6B', marginBottom: '6px' }}>
                  {currentMsg.speaker === 'user' ? 'You' : agent.name.split(' — ')[0]}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 300, color: '#0D0D0D', lineHeight: 1.5, letterSpacing: '0.005em' }}>
                  {currentMsg.text}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom controls */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
          background: 'linear-gradient(to top, rgba(247,245,242,0.95) 0%, transparent 100%)',
          paddingBottom: '24px',
        }}>
          {/* Mute */}
          <motion.button
            whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
            onClick={() => setIsMuted(m => !m)}
            style={{
              width: '52px', height: '52px', borderRadius: '50%', border: 'none',
              background: isMuted ? 'rgba(239,68,68,0.10)' : 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              outline: isMuted ? '1.5px solid rgba(239,68,68,0.25)' : '1.5px solid #E0DED9',
              transition: 'all 200ms',
            }}>
            {isMuted ? <MicOff size={20} color="#EF4444" /> : <Mic size={20} color="#4A4A4A" />}
          </motion.button>

          {/* Main call button */}
          <motion.button
            whileHover={callState !== 'connecting' ? { scale: 1.08 } : {}}
            whileTap={callState !== 'connecting' ? { scale: 0.96 } : {}}
            onClick={handleCallButton}
            disabled={callState === 'connecting'}
            style={{
              width: '72px', height: '72px', borderRadius: '50%', border: 'none',
              cursor: callState === 'connecting' ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
              background: callState === 'active'
                ? 'linear-gradient(135deg, #EF4444, #DC2626)'
                : callState === 'connecting' ? '#F59E0B' : '#0D0D0D',
              boxShadow: callState === 'active' ? '0 8px 32px rgba(239,68,68,0.35)' : '0 8px 32px rgba(0,0,0,0.20)',
              transition: 'all 300ms',
            }}>
            {callState === 'active' && (
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                style={{ position: 'absolute', inset: '-8px', borderRadius: '50%', border: '2px solid rgba(239,68,68,0.25)' }}
              />
            )}
            {callState === 'active' ? <PhoneOff size={24} color="white" /> : <Phone size={26} color="white" />}
          </motion.button>

          {/* Language */}
          <div style={{ position: 'relative' }}>
            <motion.button
              whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
              onClick={() => setLangDropOpen(o => !o)}
              style={{
                width: '52px', height: '52px', borderRadius: '50%',
                background: 'white', border: '1.5px solid #E0DED9',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)', fontSize: '18px',
              }}>
              🇮🇳
            </motion.button>
            <AnimatePresence>
              {langDropOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                  style={{
                    position: 'absolute', bottom: 'calc(100% + 8px)', right: 0,
                    minWidth: '160px', background: 'white', borderRadius: '14px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #F0EFED',
                    overflow: 'hidden', zIndex: 10,
                  }}>
                  {agent.languages.map(lang => (
                    <button key={lang} onClick={() => { setSelectedLanguage(lang); setLangDropOpen(false) }}
                      style={{
                        width: '100%', padding: '11px 16px', background: lang === selectedLanguage ? '#F5F5F5' : 'white',
                        border: 'none', cursor: 'pointer', textAlign: 'left',
                        fontFamily: 'var(--font-body)', fontSize: '13px',
                        color: lang === selectedLanguage ? '#FF6B35' : '#0D0D0D',
                        fontWeight: lang === selectedLanguage ? 600 : 400,
                        display: 'flex', alignItems: 'center', gap: '10px',
                      }}>
                      <Globe size={13} /> {lang}
                      {lang === selectedLanguage && <Check size={11} color="#FF6B35" style={{ marginLeft: 'auto' }} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {callState === 'active' && (
          <div style={{ position: 'absolute', bottom: '12px', fontFamily: 'var(--font-body)', fontSize: '11px', color: '#C8C5C0' }}>
            Tap red button to end
          </div>
        )}
      </div>

      {/* ═══════ PANEL 3 — RIGHT PANEL ═══════ */}
      <div style={{
        width: '320px', height: '100vh', background: 'white',
        borderLeft: '1px solid #F0EFED', display: 'flex',
        flexDirection: 'column', flexShrink: 0,
      }}
        className="right-panel"
      >
        {/* Header */}
        <div style={{
          height: '64px', padding: '0 20px', display: 'flex',
          alignItems: 'center', borderBottom: '1px solid #F0EFED', flexShrink: 0,
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 400, color: '#0D0D0D', letterSpacing: '-0.01em' }}>
            Session Info
          </span>
        </div>

        {/* Live metrics */}
        <div style={{ padding: '20px' }}>
          <PanelLabel>Live Metrics</PanelLabel>
          {[
            { label: 'Latency', value: latency, color: '#22C55E' },
            { label: 'Language', value: selectedLanguage, color: '#FF6B35' },
            { label: 'Model', value: 'Bhasini Flash', color: '#1A73E8' },
            { label: 'Messages', value: String(transcript.length), color: '#6B6B6B' },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F5F5F5' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9E9E9E' }}>{row.label}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: row.color }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Agent details */}
        <div style={{ padding: '20px', borderTop: '1px solid #F5F5F5' }}>
          <PanelLabel>About This Agent</PanelLabel>
          <div style={{ position: 'relative', background: '#FAFAFA', borderRadius: '12px', padding: '14px', maxHeight: '120px', overflow: 'hidden' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#6B6B6B', lineHeight: 1.6 }}>
              {agent.systemPrompt.slice(0, 200)}...
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '32px', background: 'linear-gradient(to top, #FAFAFA 0%, transparent 100%)' }} />
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '16px' }}>
            {agent.languages.map(lang => (
              <span key={lang} style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '9999px', background: `${color0}08`, border: `1px solid ${color0}20`, color: color0, fontWeight: 500 }}>
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Shortcuts */}
        <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid #F5F5F5' }}>
          <PanelLabel>Shortcuts</PanelLabel>
          {[
            { key: 'Space', action: 'Push to talk' },
            { key: 'M', action: 'Toggle mute' },
            { key: 'Esc', action: 'End call' },
          ].map(s => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
              <kbd style={{ padding: '2px 8px', background: '#F0EFED', borderRadius: '6px', border: '1px solid #E0DED9', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#4A4A4A' }}>
                {s.key}
              </kbd>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9E9E9E' }}>{s.action}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 1200px) { .right-panel { display: none !important; } }
      `}</style>
    </div>
  )
}

function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', fontWeight: 500,
      letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9E9E9E', marginBottom: '12px',
    }}>
      {children}
    </div>
  )
}
