import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic } from 'lucide-react'

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

    const W = canvas.width = 100
    const H = canvas.height = 140

    function spawnParticle() {
      const fromLeft = direction === 'ltr'
      const startX = fromLeft ? 0 : W
      const endX = fromLeft ? W : 0
      const startY = H / 2 + (Math.random() - 0.5) * 30
      const endY = H / 2 + (Math.random() - 0.5) * 20
      particlesRef.current.push({
        x: startX,
        y: startY,
        tx: endX,
        ty: endY,
        speed: 0.007 + Math.random() * 0.009,
        size: 1.5 + Math.random() * 2.0,
        opacity: 0.8 + Math.random() * 0.2,
        color: fromLeft ? '#FF6B35' : '#3CCFCF',
        sparkle: Math.random() < 0.35,
        progress: 0,
      })
    }
    
    function easeInOut(t: number) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    }
    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t
    }

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)
      tickRef.current++

      if (active && tickRef.current % 4 === 0 &&
          particlesRef.current.length < 30) {
        spawnParticle()
      }

      particlesRef.current = particlesRef.current.filter(p => {
        p.progress += p.speed
        if (p.progress >= 1) return false

        const currentX = lerp(p.x, p.tx, easeInOut(p.progress))
        const currentY = lerp(p.y, p.ty, p.progress) + Math.sin(p.progress * Math.PI * 1.5) * 12
        const alpha = p.opacity * Math.sin(p.progress * Math.PI)

        ctx.globalAlpha = alpha

        if (p.sparkle) {
          ctx.strokeStyle = p.color
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(currentX - p.size * 2.5, currentY)
          ctx.lineTo(currentX + p.size * 2.5, currentY)
          ctx.moveTo(currentX, currentY - p.size * 2.5)
          ctx.lineTo(currentX, currentY + p.size * 2.5)
          const d = p.size * 1.5
          ctx.moveTo(currentX - d, currentY - d)
          ctx.lineTo(currentX + d, currentY + d)
          ctx.moveTo(currentX + d, currentY - d)
          ctx.lineTo(currentX - d, currentY + d)
          ctx.stroke()
        } else {
          ctx.fillStyle = p.color
          ctx.beginPath()
          ctx.arc(currentX, currentY, p.size, 0, Math.PI * 2)
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
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}

export default function InlineOrbDemo() {
  const [messages, setMessages] = useState<typeof script>([])
  const [activeOrb, setActiveOrb] = useState<'user' | 'agent' | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [contextLabel, setContextLabel] = useState('INITIALIZING...')
  const [langLabel, setLangLabel] = useState('Hindi · English')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let stepIdx = 0

    function clear() {
      if (timerRef.current) clearTimeout(timerRef.current)
    }

    function runStep() {
      if (stepIdx >= script.length) {
        timerRef.current = setTimeout(() => {
          setMessages([])
          setActiveOrb(null)
          setShowCard(false)
          setIsTyping(false)
          stepIdx = 0
          timerRef.current = setTimeout(runStep, 1500)
        }, 3000)
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
      setMessages(prev => [...prev, s].slice(-2))

      timerRef.current = setTimeout(() => {
        setActiveOrb(null)
        stepIdx++
        timerRef.current = setTimeout(runStep, 300)
      }, s.duration)
    }

    timerRef.current = setTimeout(runStep, 1800)
    return () => clear()
  }, [])
  
  useEffect(() => {
    const langs = ['Hindi · English', 'Telugu · English', 'Tamil · English']
    let i = 0
    const int = setInterval(() => {
      i = (i + 1) % langs.length
      setLangLabel(langs[i])
    }, 4000)
    return () => clearInterval(int)
  }, [])

  return (
    <div style={{
      width: '100%',
      maxWidth: '540px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}>
      {/* ── TOP SECTION — THE ORB ARENA ── */}
      <div style={{
        padding: '40px 32px 32px',
        position: 'relative',
        overflow: 'visible',
      }}>
        {/* Status Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          {/* Live Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E' }}
            />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 600, color: '#22C55E', letterSpacing: '0.04em' }}>Live Demo</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Mic Button */}
            <button
              onClick={() => {}}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: '#FFF', border: '1px solid #E0DED9', borderRadius: '9999px',
                padding: '6px 12px', cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#F9F8F6'}
              onMouseLeave={e => e.currentTarget.style.background = '#FFF'}
            >
              <Mic size={14} color="#0D0D0D" />
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#0D0D0D', fontFamily: "'DM Sans', sans-serif" }}>Listen Live</span>
            </button>
            
            {/* Language Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 12px', background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.18)', borderRadius: '9999px' }}>
              <span style={{ fontSize: '12px' }}>🇮🇳</span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#FF6B35', fontFamily: "'DM Sans', sans-serif" }}>{langLabel}</span>
            </div>
          </div>
        </div>

        {/* Orb Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', position: 'relative' }}>
          
          {/* LEFT ORB (User) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '50%' }}>
            <motion.div
              animate={
                activeOrb === 'user' ? { scale: [1, 1.12, 1, 1.08, 1], transition: { duration: 0.7, repeat: Infinity } } :
                activeOrb === 'agent' ? { scale: [1, 1.04, 1], opacity: [0.85, 1, 0.85], transition: { duration: 2, repeat: Infinity } } :
                { y: [0, -10, 0], scale: [1, 1.02, 1], transition: { duration: 4, repeat: Infinity } }
              }
              style={{
                width: '120px', height: '120px', borderRadius: '50%', position: 'relative',
                background: 'radial-gradient(circle at 32% 28%, #FFD4A0 0%, #FF9A3C 22%, #FF6B35 52%, #C44A1A 80%, #8B2500 100%)',
                boxShadow: '0 0 0 1px rgba(255,107,53,0.20), 0 12px 40px rgba(255,107,53,0.35), 0 0 80px rgba(255,107,53,0.15), inset 0 1px 0 rgba(255,255,255,0.25), inset -2px -2px 8px rgba(0,0,0,0.15)',
              }}
            >
              <div style={{ position: 'absolute', top: '12%', left: '18%', width: '30%', height: '24%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.55) 0%, transparent 100%)', filter: 'blur(3px)' }} />
              <AnimatePresence>
                {activeOrb === 'user' && (
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                    style={{ position: 'absolute', inset: '-14px', borderRadius: '50%', border: '2px solid rgba(255,107,53,0.35)' }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(107,107,107,0.7)' }}>USER</span>
          </div>

          {/* CENTER PARTICLE CANVAS */}
          <div style={{ position: 'relative', width: '100px', height: '140px', flexShrink: 0 }}>
            <ParticleCanvas active={activeOrb !== null} direction={activeOrb === 'user' ? 'ltr' : 'rtl'} />
          </div>

          {/* RIGHT ORB (Agent) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '50%' }}>
            <motion.div
              animate={
                activeOrb === 'agent' ? { scale: [1, 1.12, 1, 1.08, 1], transition: { duration: 0.7, repeat: Infinity } } :
                activeOrb === 'user' ? { scale: [1, 1.04, 1], opacity: [0.85, 1, 0.85], transition: { duration: 2, repeat: Infinity } } :
                { y: [0, -10, 0], scale: [1, 1.02, 1], transition: { duration: 4, repeat: Infinity } }
              }
              style={{
                width: '120px', height: '120px', borderRadius: '50%', position: 'relative',
                background: 'radial-gradient(circle at 32% 28%, #C8F7F5 0%, #5DDBD8 18%, #3CCFCF 40%, #1A9EAA 65%, #0E6B77 100%)',
                boxShadow: '0 0 0 1px rgba(60,207,207,0.20), 0 12px 40px rgba(26,115,232,0.30), 0 0 80px rgba(60,207,207,0.12), inset 0 1px 0 rgba(255,255,255,0.3), inset -2px -2px 8px rgba(0,0,0,0.12)',
              }}
            >
              <div style={{ position: 'absolute', top: '12%', left: '18%', width: '30%', height: '24%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.55) 0%, transparent 100%)', filter: 'blur(3px)' }} />
              <AnimatePresence>
                {activeOrb === 'agent' && (
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                    style={{ position: 'absolute', inset: '-14px', borderRadius: '50%', border: '2px solid rgba(60,207,207,0.40)' }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(107,107,107,0.7)' }}>BHASINI</span>
          </div>

        </div>

        {/* Context Label */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={contextLabel}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.4 }}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, color: '#6B6B6B', fontStyle: 'italic', letterSpacing: '0.01em', margin: 0 }}
            >
              {contextLabel}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* ── MIDDLE SECTION — TRANSCRIPT ── */}
      <div style={{ background: 'transparent', border: 'none', padding: '0 16px', minHeight: '80px', maxHeight: '110px', overflow: 'hidden', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(107,107,107,0.8)' }}>
                    {msg.speaker === 'user' ? 'USER' : 'BHASINI'}
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.5, color: '#0D0D0D' }}>
                  {msg.text}
                </span>
                {msg.translation && (
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9E9E9E', fontStyle: 'italic' }}>
                    {msg.translation}
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(107,107,107,0.8)' }}>
                  BHASINI
                </span>
                <div style={{ display: 'flex', gap: '3px', alignItems: 'center', marginLeft: '4px' }}>
                  {[0, 0.12, 0.24].map((delay, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.55, repeat: Infinity, delay }}
                      style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(60,207,207,0.8)' }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── BOTTOM SECTION — APPOINTMENT CARD ── */}
      <AnimatePresence>
        {showCard && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
            style={{ background: 'white', border: '1px solid #E0DED9', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px' }}>📅</span>
              <span style={{ fontSize: '10px', color: '#5F6368', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>Google Calendar</span>
              <span style={{ fontSize: '10px', color: '#9E9E9E', marginLeft: 'auto', fontFamily: "'DM Sans', sans-serif" }}>Tue 2 Sep</span>
            </div>
            <div style={{ borderTop: '1px solid #E8EAED' }} />
            <div style={{ marginTop: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#202124', fontFamily: "'DM Sans', sans-serif" }}>Dr. Ananya Rao</div>
              <div style={{ fontSize: '11px', color: '#5F6368', fontFamily: "'DM Sans', sans-serif" }}>SmileCare Dental</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8F9FA', borderRadius: '8px', padding: '8px 10px', marginTop: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#202124', fontFamily: "'DM Sans', sans-serif" }}>11:00 AM · 2 September</span>
              <span style={{ background: '#34A853', color: 'white', fontSize: '9px', fontWeight: 700, padding: '3px 8px', borderRadius: '9999px', fontFamily: "'DM Sans', sans-serif" }}>BOOKED ✓</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Stat strip below card ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px',
        marginTop: '0px',
      }}>
        {[
          { value: '< 800ms', label: 'Voice Latency', color: '#FF6B35' },
          { value: '8+', label: 'Languages', color: '#1A73E8' },
          { value: '99.2%', label: 'Uptime SLA', color: '#22C55E' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: 'white',
            border: '1px solid #E0DED9',
            borderRadius: '10px',
            padding: '8px 10px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              fontSize: '9px', fontWeight: 600,
              color: '#9E9E9E',
              fontFamily: 'var(--font-body)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '2px',
            }}>
              {stat.label}
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px', fontWeight: 600,
              color: '#0D0D0D',
              letterSpacing: '-0.02em',
            }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
