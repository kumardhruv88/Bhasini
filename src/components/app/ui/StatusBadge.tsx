import { motion } from 'framer-motion'

interface StatusBadgeProps {
  status: 'live' | 'paused' | 'offline' | 'pending' | 'Streaming'
  label?: string
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const isLive = status === 'live' || status === 'Streaming'
  const isWarning = status === 'paused' || status === 'pending'
  const color = isLive ? '#22C55E' : isWarning ? '#F59E0B' : '#EF4444'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <motion.div 
        animate={isLive ? { opacity: [1, 0.3, 1] } : {}} 
        transition={{ duration: 1.4, repeat: Infinity }}
        style={{ width: '7px', height: '7px', borderRadius: '50%', background: color }} 
      />
      <span style={{ 
        fontFamily: "'JetBrains Mono', monospace", 
        fontSize: '9px', 
        letterSpacing: '0.14em', 
        color, 
        textTransform: 'uppercase', 
        fontWeight: 600,
        whiteSpace: 'nowrap'
      }}>
        {label || status}
      </span>
    </div>
  )
}
