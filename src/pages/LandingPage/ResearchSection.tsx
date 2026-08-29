import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function ResearchSection() {
  const [index, setIndex] = useState(2)

  const milestones = [
    { date: 'Feb 2024', title: 'Bhasini v1', desc: 'First Indian language voice cloning model.' },
    { date: 'Oct 2024', title: 'Multilingual Speech', desc: 'Real-time speech generation across 22 dialects.' },
    { date: 'May 2026', title: 'BhasiniAgents', desc: 'For the first time, emotion and performance of the original speaker carries across every conversation.' },
    { date: 'Dec 2026', title: 'Real-time Translation', desc: 'Zero-latency voice-to-voice translation.' },
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Timeline track */}
        <div style={{ position: 'absolute', top: '50%', left: '100px', right: '100px', height: '1px', background: '#EAE8E3' }}>
          {/* Tick marks */}
          {Array.from({ length: 30 }).map((_, i) => (
             <div key={i} style={{ position: 'absolute', left: `${(i / 29) * 100}%`, top: '-4px', width: '1px', height: i % 5 === 0 ? '8px' : '4px', background: i % 5 === 0 ? '#C8C5C0' : '#EAE8E3' }}></div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', position: 'relative', zIndex: 10 }}>
          <button 
            onClick={() => setIndex(Math.max(0, index - 1))}
            style={{ 
              width: '40px', height: '40px', borderRadius: '50%', background: '#FFF', 
              border: '1px solid #EAE8E3', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: index > 0 ? 'pointer' : 'default', opacity: index > 0 ? 1 : 0.5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div style={{ width: '400px', position: 'relative', height: '200px' }}>
             <motion.div 
               key={index}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.4 }}
               style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
             >
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#0D0D0D', marginBottom: '80px' }}>
                  {milestones[index].title}
                </div>
                <div style={{ width: '2px', height: '60px', background: '#0D0D0D', position: 'absolute', top: '70px' }}></div>
                <div style={{ fontSize: '14px', color: '#0D0D0D', fontWeight: 500, marginTop: '20px', lineHeight: 1.5 }}>
                  {milestones[index].desc}
                </div>
                <div style={{ fontSize: '12px', color: '#9E9E9E', marginTop: '8px' }}>
                  {milestones[index].date}
                </div>
             </motion.div>
          </div>

          <button 
            onClick={() => setIndex(Math.min(milestones.length - 1, index + 1))}
            style={{ 
              width: '40px', height: '40px', borderRadius: '50%', background: '#FFF', 
              border: '1px solid #EAE8E3', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: index < milestones.length - 1 ? 'pointer' : 'default', opacity: index < milestones.length - 1 ? 1 : 0.5,
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
