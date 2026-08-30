import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { BhasiniAgent } from '../../data/agents'

interface AgentCardProps {
  agent: BhasiniAgent
  onClick: (agent: BhasiniAgent) => void
}

const industryMap: Record<string, string> = {
  'health-medical': 'Medical',
  'tourism': 'Tourism',
  'customer-support': 'Support',
  'real-estate': 'Real Estate',
  'travel': 'Travel',
  'mental-health': 'Wellness'
}

export default function AgentCard({ agent, onClick }: AgentCardProps) {
  // Safe default for gradient just in case
  const gradient = agent.orbGradient && agent.orbGradient.length >= 2 
    ? `radial-gradient(circle at 32% 28%, ${agent.orbGradient.join(', ')})` 
    : 'radial-gradient(circle at 32% 28%, #FFD4A0 0%, #FF9A3C 22%, #FF6B35 52%, #C44A1A 80%, #8B2500 100%)';

  const shadowColor = agent.orbGradient && agent.orbGradient.length > 0 
    ? `${agent.orbGradient[0]}44` 
    : 'rgba(255,107,53,0.27)';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick(agent)}
      whileHover={{
        y: -4,
        boxShadow: '0 12px 40px rgba(0,0,0,0.10)',
        borderColor: '#C8C5C0'
      }}
      style={{
        background: 'white',
        border: '1px solid #E0DED9',
        borderRadius: '20px',
        padding: '24px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 200ms ease',
        fontFamily: 'var(--font-body)',
        WebkitFontSmoothing: 'antialiased'
      }}
    >
      {/* CARD HEADER */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
        
        {/* LEFT: ORB AVATAR */}
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
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: gradient,
            boxShadow: `0 8px 24px ${shadowColor}`,
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

        {/* RIGHT: INDUSTRY BADGE */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '4px 10px',
            background: '#EFEFED',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#6B6B6B',
            fontFamily: "var(--font-body)"
          }}
        >
          {industryMap[agent.industry] || 'AI Agent'}
        </div>
      </div>

      {/* CARD BODY */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: '17px',
          fontWeight: 700,
          color: '#0D0D0D',
          letterSpacing: '-0.01em',
          marginBottom: '8px'
        }}
      >
        {agent.name}
      </div>

      <div
        style={{
          fontSize: '13px',
          lineHeight: 1.55,
          color: '#6B6B6B',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          marginBottom: '16px'
        }}
      >
        {agent.description}
      </div>

      {/* LANGUAGE BADGES ROW */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {agent.languages.slice(0, 4).map((lang) => (
          <span
            key={lang}
            style={{
              fontSize: '10px',
              fontWeight: 600,
              padding: '3px 9px',
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
        {agent.languages.length > 4 && (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              padding: '3px 9px',
              background: 'rgba(255,107,53,0.06)',
              border: '1px solid rgba(255,107,53,0.15)',
              borderRadius: '9999px',
              color: '#FF6B35',
              fontFamily: "var(--font-body)"
            }}
          >
            +{agent.languages.length - 4}
          </span>
        )}
      </div>

      {/* CARD FOOTER */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '16px',
          borderTop: '1px solid #F0EFED',
          gap: '12px'
        }}
      >
        {/* LEFT: Sample question preview */}
        <div
          style={{
            fontSize: '12px',
            color: '#9E9E9E',
            fontStyle: 'italic',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          "{agent.sampleQuestions[0]}"
        </div>

        {/* RIGHT: Try Agent button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => {
            e.stopPropagation()
            onClick(agent)
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            height: '28px',
            padding: '0 12px',
            background: '#0D0D0D',
            border: 'none',
            borderRadius: '9999px',
            color: 'white',
            fontSize: '11px',
            fontWeight: 600,
            fontFamily: "var(--font-body)",
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}
        >
          Try Agent <ArrowRight size={12} />
        </motion.button>
      </div>
    </motion.div>
  )
}
