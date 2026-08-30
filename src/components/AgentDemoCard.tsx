import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Conversation Script ─────────────────────────────────────────
const script = [
  {
    id: 1, speaker: 'user' as const,
    text: 'हलो, मुझे डॉक्टर से अपॉइंटमेंट चाहिए',
    translation: 'Hello, I need a doctor appointment',
    duration: 3000, contextLabel: 'USER CALLING IN',
    showCard: false,
  },
  {
    id: 2, speaker: 'agent' as const,
    text: 'नमस्ते! मैं Bhasini हूँ। Dr. Ananya Rao के साथ appointment चाहिए?',
    translation: 'Hello! I am Bhasini. Appointment with Dr. Ananya Rao?',
    duration: 4000, contextLabel: 'BHASINI ANSWERING',
    showCard: false, isTyping: true,
  },
  {
    id: 3, speaker: 'user' as const,
    text: 'हाँ, 2 सितंबर को सुबह 11 बजे',
    translation: 'Yes, September 2nd at 11 AM',
    duration: 2800, contextLabel: 'USER NAMES A TIME',
    showCard: false,
  },
  {
    id: 4, speaker: 'agent' as const,
    text: 'बुक हो गया! 2 September, 11:00 AM — SmileCare Dental.',
    translation: 'Booked! September 2nd, 11:00 AM — SmileCare Dental.',
    duration: 4000, contextLabel: 'APPOINTMENT CONFIRMED',
    showCard: true, isTyping: true,
  },
  {
    id: 5, speaker: 'user' as const,
    text: 'रुकिए, वो date cancel करनी है',
    translation: 'Wait, I need to cancel that date',
    duration: 2800, contextLabel: 'CHANGE OF PLAN',
    showCard: true,
  },
  {
    id: 6, speaker: 'agent' as const,
    text: 'ठीक है। Cancel कर दिया। नई date बताएं?',
    translation: 'Done. Cancelled. Please tell me a new date?',
    duration: 3500, contextLabel: 'BHASINI ADAPTS',
    showCard: false, isTyping: true,
  },
]

// ─── Particle System ─────────────────────────────────────────────
function ParticleCanvas({
  active, direction
}: { active: boolean; direction: 'ltr' | 'rtl' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Array<{
    x: number; y: number; tx: number; ty: number;
    speed: number; size: number; opacity: number;
    color: string; sparkle: boolean; progress: number;
  }>>([])
  const frameRef = useRef<number>(0)
  const tickRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width = 120
    const H = canvas.height = 140

    function spawnParticle() {
      const fromLeft = direction === 'ltr'
      const startX = fromLeft ? 0 : W
      const endX = fromLeft ? W : 0
      const centerY = H / 2
      particlesRef.current.push({
        x: startX,
        y: centerY + (Math.random() - 0.5) * 30,
        tx: endX,
        ty: centerY + (Math.random() - 0.5) * 20,
        speed: 0.008 + Math.random() * 0.012,
        size: 1.5 + Math.random() * 2.5,
        opacity: 0.7 + Math.random() * 0.3,
        color: fromLeft ? '#FF6B35' : '#3CCFCF',
        sparkle: Math.random() < 0.3,
        progress: 0,
      })
    }

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)
      tickRef.current++

      if (active && tickRef.current % 3 === 0 &&
          particlesRef.current.length < 35) {
        spawnParticle()
      }

      particlesRef.current = particlesRef.current.filter(p => {
        p.progress += p.speed
        if (p.progress >= 1) return false

        const x = p.x + (p.tx - p.x) * p.progress
        const y = p.y + (p.ty - p.y) * p.progress
        // Ease: fast in middle, slow at ends
        const alpha = p.opacity *
          Math.sin(p.progress * Math.PI)

        ctx.globalAlpha = alpha

        if (p.sparkle) {
          // Cross / sparkle shape
          ctx.strokeStyle = p.color
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(x - p.size, y)
          ctx.lineTo(x + p.size, y)
          ctx.moveTo(x, y - p.size)
          ctx.lineTo(x, y + p.size)
          ctx.stroke()
          // Diagonal cross
          const d = p.size * 0.6
          ctx.beginPath()
          ctx.moveTo(x - d, y - d)
          ctx.lineTo(x + d, y + d)
          ctx.moveTo(x + d, y - d)
          ctx.lineTo(x - d, y + d)
          ctx.stroke()
        } else {
          ctx.fillStyle = p.color
          ctx.beginPath()
          ctx.arc(x, y, p.size * 0.7, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.globalAlpha = 1
        return true
      })

      frameRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(frameRef.current)
      particlesRef.current = []
    }
  }, [active, direction])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  )
}

// ─── Single Orb ──────────────────────────────────────────────────
function Orb({
  type, state
}: {
  type: 'user' | 'agent'
  state: 'speaking' | 'listening' | 'idle'
}) {
  const isUser = type === 'user'

  const gradient = isUser
    ? 'radial-gradient(circle at 35% 30%, #FFC87A 0%, #FF9A3C 25%, #FF6B35 55%, #C44A1A 85%)'
    : 'radial-gradient(circle at 35% 30%, #A8EDEA 0%, #3CCFCF 25%, #1A9EAA 55%, #0E6B77 85%)'

  const glow = isUser
    ? '0 0 32px rgba(255,107,53,0.45), 0 0 64px rgba(255,107,53,0.20)'
    : '0 0 32px rgba(26,115,232,0.45), 0 0 64px rgba(60,207,207,0.20)'

  const speakingAnim = {
    scale: [1, 1.13, 1, 1.09, 1],
    transition: { duration: 0.72, repeat: Infinity, ease: 'easeInOut' as const },
  }
  const listeningAnim = {
    scale: [1, 1.05, 1],
    opacity: [0.88, 1, 0.88],
    transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' as const },
  }
  const idleAnim = {
    y: [0, -10, 0],
    scale: [1, 1.02, 1],
    transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' as const },
  }

  const anim =
    state === 'speaking' ? speakingAnim :
    state === 'listening' ? listeningAnim :
    idleAnim

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      width: '50%',
    }}>
      <motion.div
        animate={anim}
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: gradient,
          boxShadow: glow,
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {/* Inner highlight for 3D feel */}
        <div style={{
          position: 'absolute',
          top: '12%', left: '18%',
          width: '35%', height: '28%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 100%)',
          filter: 'blur(3px)',
        }} />

        {/* Speaking ring */}
        {state === 'speaking' && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: '-12px',
              borderRadius: '50%',
              border: isUser
                ? '1.5px solid rgba(255,107,53,0.4)'
                : '1.5px solid rgba(60,207,207,0.4)',
              pointerEvents: 'none',
            }}
          />
        )}
      </motion.div>

      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '8px',
        fontWeight: 500,
        color: 'rgba(255,255,255,0.35)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase' as const,
      }}>
        {isUser ? 'USER' : 'BHASINI'}
      </span>
    </div>
  )
}

// ─── Appointment Card ─────────────────────────────────────────────
function AppointmentCard({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 30, scale: 0.92 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: '16px',
            right: '14px',
            width: '188px',
            background: 'white',
            borderRadius: '14px',
            padding: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
            zIndex: 20,
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          {/* Calendar header */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: '6px', marginBottom: '8px',
          }}>
            <div style={{
              width: '14px', height: '14px',
              background: '#1A73E8',
              borderRadius: '3px',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
            }}>📅</div>
            <span style={{
              fontSize: '9px', color: '#5F6368',
              fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
            }}>Google Calendar</span>
            <span style={{
              fontSize: '9px', color: '#9E9E9E',
              marginLeft: 'auto',
              fontFamily: "'DM Sans', sans-serif",
            }}>Tue 2 Sep</span>
          </div>

          <div style={{ borderTop: '1px solid #E8EAED', margin: '6px 0' }} />

          {/* Doctor info */}
          <div style={{
            fontSize: '11px', fontWeight: 700,
            color: '#202124',
            fontFamily: "'DM Sans', sans-serif",
          }}>Dr. Ananya Rao</div>
          <div style={{
            fontSize: '9px', color: '#5F6368',
            fontFamily: "'DM Sans', sans-serif", marginBottom: '8px',
          }}>SmileCare Dental</div>

          {/* Time slot */}
          <div style={{
            background: '#F8F9FA',
            borderRadius: '6px',
            padding: '6px 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{
              fontSize: '10px', fontWeight: 600,
              color: '#202124',
              fontFamily: "'DM Sans', sans-serif",
            }}>11:00 AM · 2 Sep</span>
            <span style={{
              background: '#34A853',
              color: 'white',
              fontSize: '8px', fontWeight: 700,
              padding: '2px 6px',
              borderRadius: '9999px',
              fontFamily: "'DM Sans', sans-serif",
            }}>BOOKED</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Main Component ───────────────────────────────────────────────
export default function AgentDemoCard() {
  const [messages, setMessages] = useState<typeof script>([])
  const [activeOrb, setActiveOrb] = useState<'user' | 'agent' | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [contextLabel, setContextLabel] = useState('INITIALIZING...')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let stepIdx = 0

    function clear() {
      if (timerRef.current) clearTimeout(timerRef.current)
    }

    function runStep() {
      if (stepIdx >= script.length) {
        // Loop reset
        timerRef.current = setTimeout(() => {
          setMessages([])
          setActiveOrb(null)
          setShowCard(false)
          setIsTyping(false)
          stepIdx = 0
          timerRef.current = setTimeout(runStep, 1500)
        }, 3500)
        return
      }

      const s = script[stepIdx]

      timerRef.current = setTimeout(() => {
        if (s.isTyping) {
          setIsTyping(true)
          setActiveOrb(null)
          timerRef.current = setTimeout(() => {
            setIsTyping(false)
            showStep(s)
          }, 1100)
        } else {
          showStep(s)
        }
      }, 700)
    }

    function showStep(s: typeof script[0]) {
      setContextLabel(s.contextLabel)
      setActiveOrb(s.speaker)
      setShowCard(s.showCard)
      setMessages(prev => [...prev, s].slice(-3))

      timerRef.current = setTimeout(() => {
        setActiveOrb(null)
        stepIdx++
        timerRef.current = setTimeout(runStep, 300)
      }, s.duration)
    }

    timerRef.current = setTimeout(runStep, 1800)
    return () => clear()
  }, [])

  const userState =
    activeOrb === 'user' ? 'speaking' :
    activeOrb === 'agent' ? 'listening' : 'idle'

  const agentState =
    activeOrb === 'agent' ? 'speaking' :
    activeOrb === 'user' ? 'listening' : 'idle'

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: '100%', maxWidth: '520px', margin: '0 auto' }}
    >
      {/* ── Main dark card ── */}
      <div style={{
        background: '#0F1117',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.04)',
      }}>

        {/* Status bar */}
        <div style={{
          height: '36px',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 14px',
          justifyContent: 'space-between',
        }}>
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: '5px' }}>
            {['#FF5F57','#FEBC2E','#28C840'].map(c => (
              <div key={c} style={{
                width: '10px', height: '10px',
                borderRadius: '50%', background: c,
              }} />
            ))}
          </div>

          {/* Live badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            background: 'rgba(34,197,94,0.12)',
            border: '1px solid rgba(34,197,94,0.25)',
            borderRadius: '9999px',
            padding: '3px 10px',
          }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              style={{
                width: '6px', height: '6px',
                borderRadius: '50%', background: '#22C55E',
              }}
            />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px', fontWeight: 600,
              color: '#22C55E', letterSpacing: '0.06em',
            }}>Live Demo</span>
          </div>

          {/* Language */}
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px', color: 'rgba(255,255,255,0.30)',
            letterSpacing: '0.08em',
          }}>hi-IN · en-IN</span>
        </div>

        {/* Orb scene */}
        <div style={{
          height: '240px',
          position: 'relative',
          background:
            'radial-gradient(ellipse 65% 55% at 28% 50%, rgba(255,107,53,0.10) 0%, transparent 60%),' +
            'radial-gradient(ellipse 65% 55% at 72% 50%, rgba(26,115,232,0.10) 0%, transparent 60%),' +
            '#0F1117',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>

          {/* Context caption top-left */}
          <AnimatePresence mode="wait">
            <motion.span
              key={contextLabel}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              style={{
                position: 'absolute', top: '12px', left: '14px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '8px', fontWeight: 500,
                color: 'rgba(255,255,255,0.30)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
              }}
            >
              {contextLabel}
            </motion.span>
          </AnimatePresence>

          {/* Language badge top-right */}
          <div style={{
            position: 'absolute', top: '12px', right: '14px',
            display: 'flex', alignItems: 'center', gap: '5px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: '9999px', padding: '3px 9px',
          }}>
            <span style={{ fontSize: '10px' }}>🇮🇳</span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px', color: 'rgba(255,255,255,0.45)',
            }}>Hindi · English</span>
          </div>

          {/* Appointment card */}
          <AppointmentCard visible={showCard} />

          {/* Orbs + particles row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            position: 'relative',
          }}>
            <Orb type="user" state={userState} />

            {/* Particle stream between orbs */}
            <div style={{
              position: 'relative',
              width: '120px',
              height: '140px',
              flexShrink: 0,
            }}>
              <ParticleCanvas
                active={activeOrb !== null}
                direction={activeOrb === 'user' ? 'ltr' : 'rtl'}
              />
            </div>

            <Orb type="agent" state={agentState} />
          </div>
        </div>

        {/* Transcript panel */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '14px 16px',
          minHeight: '130px',
          maxHeight: '150px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Top fade mask */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '32px',
            background: 'linear-gradient(to bottom, rgba(15,17,23,0.95) 0%, transparent 100%)',
            zIndex: 2, pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: 16, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
                >
                  {/* Speaker label */}
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '8px', fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase' as const,
                    color: msg.speaker === 'user'
                      ? 'rgba(255,107,53,0.75)'
                      : 'rgba(60,207,207,0.75)',
                  }}>
                    {msg.speaker === 'user' ? 'USER' : 'BHASINI'}
                  </span>
                  {/* Message text */}
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.82)',
                    lineHeight: 1.5,
                  }}>
                    {msg.text}
                  </span>
                  {/* Translation */}
                  {msg.translation && (
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '10px',
                      color: 'rgba(255,255,255,0.32)',
                      fontStyle: 'italic',
                    }}>
                      {msg.translation}
                    </span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '8px', fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase' as const,
                    color: 'rgba(60,207,207,0.75)',
                  }}>BHASINI</span>
                  <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                    {[0, 0.12, 0.24].map((delay, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.55, repeat: Infinity, delay }}
                        style={{
                          width: '4px', height: '4px',
                          borderRadius: '50%',
                          background: 'rgba(60,207,207,0.65)',
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Stat strip below card ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        marginTop: '14px',
      }}>
        {[
          { value: '< 800ms', label: 'Voice Latency', color: '#FF6B35' },
          { value: '8+', label: 'Languages', color: '#1A73E8' },
          { value: '99.2%', label: 'Uptime SLA', color: '#22C55E' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: 'white',
            border: '1px solid #E0DED9',
            borderRadius: '14px',
            padding: '12px 14px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            <div style={{
              fontSize: '10px', fontWeight: 500,
              color: '#9E9E9E',
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: '4px',
            }}>
              {stat.label}
            </div>
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '20px', fontWeight: 800,
              color: '#0D0D0D',
              letterSpacing: '-0.02em',
            }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
