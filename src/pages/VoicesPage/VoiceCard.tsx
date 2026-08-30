import { useState } from 'react'
import { Play, Pause } from 'lucide-react'
import { motion } from 'framer-motion'

const MONO = "'JetBrains Mono', monospace"
const DISPLAY = 'var(--font-display)'
const BODY = 'var(--font-body)'

export interface VoiceData {
  id: string
  name: string
  title: string
  languages: string[]
  gender: string
  style: string
  description: string
  gradient: string
  tags?: string[]
  latency: string
  quality: string
}

export default function VoiceCard({ voice }: { voice: VoiceData }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      style={{
        background: '#FFFFFF',
        border: '1px solid #E0DED9',
        borderRadius: '20px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative'
      }}
    >
      {/* Top section: Orb + Name + Meta */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          {/* Voice Orb */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: voice.gradient,
            flexShrink: 0,
            boxShadow: 'inset 0 0 12px rgba(255,255,255,0.3)',
          }} />
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ fontFamily: DISPLAY, fontSize: '20px', fontWeight: 500, color: '#0D0D0D', letterSpacing: '-0.01em' }}>
                {voice.name}
              </div>
              {voice.tags && voice.tags.map(tag => (
                <span key={tag} style={{
                  background: tag === 'BETA' ? 'linear-gradient(90deg, #FF6B35 0%, #FF3CAC 100%)' : '#0D0D0D',
                  color: 'white',
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '3px 8px',
                  borderRadius: '9999px',
                }}>
                  {tag}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }} />
              <div style={{ fontFamily: BODY, fontSize: '13px', color: '#686868' }}>
                Available
              </div>
            </div>
          </div>
        </div>

        {/* Small Metadata */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {[voice.languages[0], voice.gender, voice.style].map((meta, i) => (
            <span key={i} style={{ fontFamily: MONO, fontSize: '9px', color: '#9A9A9A', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {meta}{i < 2 ? ' ·' : ''}
            </span>
          ))}
        </div>

        {/* Description */}
        <div style={{ fontFamily: BODY, fontSize: '14px', lineHeight: 1.5, color: '#686868', marginBottom: '16px' }}>
          {voice.description}
        </div>

        {/* Technical Info */}
        <div style={{ display: 'flex', gap: '24px' }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: '9px', color: '#9A9A9A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '2px' }}>LATENCY</div>
            <div style={{ fontFamily: BODY, fontSize: '12px', color: '#0D0D0D', fontWeight: 500 }}>{voice.latency}</div>
          </div>
          <div>
            <div style={{ fontFamily: MONO, fontSize: '9px', color: '#9A9A9A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '2px' }}>QUALITY</div>
            <div style={{ fontFamily: BODY, fontSize: '12px', color: '#0D0D0D', fontWeight: 500 }}>{voice.quality}</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* Voice Player Simulation */}
      <div style={{ 
        padding: '12px 16px', 
        background: '#F7F5F2', 
        borderRadius: '14px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px' 
      }}>
        <button 
          onClick={togglePlay}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#0D0D0D',
            color: '#FFFFFF',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" style={{ marginLeft: '2px' }} />}
        </button>
        
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '2px', height: '16px' }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div 
              key={i}
              animate={{ 
                height: isPlaying ? ['4px', `${Math.random() * 12 + 4}px`, '4px'] : '4px' 
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.05
              }}
              style={{
                width: '3px',
                background: isPlaying ? '#FF6B35' : '#D0CDD5',
                borderRadius: '2px',
                opacity: isPlaying ? 0.8 : 0.5
              }}
            />
          ))}
        </div>
        
        <div style={{ fontFamily: MONO, fontSize: '10px', color: '#9A9A9A' }}>
          {isPlaying ? '0:02' : '0:14'}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #F0EFED', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {voice.languages.map(l => (
            <span key={l} style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 500, color: '#686868', background: '#F7F5F2', padding: '4px 8px', borderRadius: '6px' }}>
              {l}
            </span>
          ))}
        </div>
        <button style={{ background: 'none', border: 'none', fontFamily: BODY, fontSize: '13px', fontWeight: 500, color: '#FF6B35', cursor: 'pointer' }}>
          Use voice →
        </button>
      </div>

    </motion.div>
  )
}
