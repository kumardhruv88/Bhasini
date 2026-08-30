import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function ResearchSection() {
  const [startIndex, setStartIndex] = useState(0)
  const visibleCount = 4

  const milestones = [
    {
      date: 'March 2025',
      title: 'Hindi Voice Engine v1',
      desc: 'First human-like Hindi TTS model. 95% naturalness score.',
    },
    {
      date: 'June 2025',
      title: 'Multilingual Expansion',
      desc: '8 Indian languages added. Tamil and Telugu achieve near-native quality.',
    },
    {
      date: 'September 2025',
      title: 'BhasiniAgents Launch',
      desc: 'Conversational agent framework. Sub-800ms latency in production.',
    },
    {
      date: 'January 2026',
      title: 'Hinglish Model',
      desc: "World's first code-switched Hinglish voice model. 40M speakers served.",
    },
    {
      date: 'May 2026',
      title: 'Enterprise Platform',
      desc: 'Emotion and context carry across every conversation turn for the first time.',
    },
    {
      date: 'August 2026',
      title: 'Bhasini API v2',
      desc: 'Real-time streaming, 22+ Indian languages, 75ms Flash model.',
    },
  ]

  return (
    <section style={{ padding: '80px 32px', maxWidth: '1160px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '64px', flexWrap: 'wrap', gap: '40px' }}>
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ 
            fontSize: 'clamp(32px, 4vw, 42px)', 
            fontWeight: 500, 
            fontFamily: 'var(--font-display)', 
            lineHeight: 1.1, 
            letterSpacing: '-0.03em', 
            margin: '0', 
            color: '#0D0D0D'
          }}>
            Research that redefines<br/>human technology interaction
          </h2>
        </div>
        <div style={{ flex: '1 1 400px', paddingTop: '12px' }}>
          <p style={{ fontSize: '16px', color: '#4A4A4A', margin: 0, lineHeight: 1.6 }}>
            Our vision is to make communication and creation with technology seamless across all Indian languages. We build our own foundational models, beginning with the first human-like regional voice model and now extending far beyond voice.
          </p>
        </div>
      </div>

      <div style={{ 
        background: '#F9F8F6', 
        borderRadius: '32px', 
        padding: '64px 32px', 
        border: '1px solid #EBE9E4', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '24px', zIndex: 10 }}>
          <button 
            onClick={() => setStartIndex(Math.max(0, startIndex - 1))}
            style={{ 
              width: '48px', height: '48px', borderRadius: '50%', background: '#FFF', flexShrink: 0,
              border: '1px solid #EAE8E3', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: startIndex > 0 ? 'pointer' : 'default', opacity: startIndex > 0 ? 1 : 0.5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div style={{ flex: 1, position: 'relative', height: '280px' }}>
            {/* Horizontal Line */}
            <div style={{ position: 'absolute', top: '140px', left: 0, right: 0, height: '1px', background: '#EAE8E3' }}></div>
            
            <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
              <AnimatePresence mode="popLayout">
                {milestones.slice(startIndex, startIndex + visibleCount).map((m) => (
                  <motion.div 
                    key={m.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                  >
                     {/* Top half */}
                     <div style={{ height: '140px', display: 'flex', alignItems: 'flex-end', paddingBottom: '40px' }}>
                        <div style={{ fontSize: '15px', fontWeight: 600, color: '#0D0D0D' }}>{m.title}</div>
                     </div>
                     {/* The tick mark */}
                     <div style={{ position: 'absolute', top: '128px', width: '2px', height: '24px', background: '#0D0D0D' }}></div>
                     {/* Bottom half */}
                     <div style={{ height: '140px', paddingTop: '40px', paddingLeft: '16px', paddingRight: '16px' }}>
                        <div style={{ fontSize: '13px', color: '#6B6B6B', lineHeight: 1.5, marginBottom: '12px' }}>{m.desc}</div>
                        <div style={{ fontSize: '11px', color: '#9E9E9E', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.date}</div>
                     </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <button 
            onClick={() => setStartIndex(Math.min(milestones.length - visibleCount, startIndex + 1))}
            style={{ 
              width: '48px', height: '48px', borderRadius: '50%', background: '#FFF', flexShrink: 0,
              border: '1px solid #EAE8E3', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: startIndex < milestones.length - visibleCount ? 'pointer' : 'default', opacity: startIndex < milestones.length - visibleCount ? 1 : 0.5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  )
}
