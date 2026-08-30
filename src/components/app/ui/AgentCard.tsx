import { motion } from 'framer-motion'
import { Bot, Clock } from 'lucide-react'
import StatusBadge from './StatusBadge'
import LanguagePill from './LanguagePill'

interface AgentCardProps {
  id: string
  name: string
  type: string
  status: 'live' | 'paused' | 'offline'
  languages: string[]
  calls: string | number
  resolutionRate: string | number
  latency: string | number
  lastActive: string
}

export default function AgentCard({
  name,
  type,
  status,
  languages,
  calls,
  resolutionRate,
  latency,
  lastActive
}: AgentCardProps) {
  return (
    <motion.div whileHover={{ y: -2 }} style={{ background: 'white', border: '1px solid #E0DED9', borderRadius: '18px', padding: '20px', cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <StatusBadge status={status} />
        <Bot size={14} color="#C8C5C0" strokeWidth={1.5} />
      </div>
      
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 500, color: '#0D0D0D', marginBottom: '4px', letterSpacing: '-0.01em' }}>
        {name}
      </div>
      
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9E9E9E', marginBottom: '12px' }}>
        {type}
      </div>
      
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '14px' }}>
        {languages.map(l => (
          <LanguagePill key={l} language={l} />
        ))}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
        {[
          { v: typeof calls === 'number' ? calls.toLocaleString() : calls, l: 'calls' }, 
          { v: `${resolutionRate}${typeof resolutionRate === 'number' ? '%' : ''}`, l: 'resolved' }, 
          { v: `${latency}${typeof latency === 'number' ? 'ms' : ''}`, l: 'avg' }
        ].map(s => (
          <div key={s.l} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 500, color: '#0D0D0D' }}>{s.v}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: '#C8C5C0', letterSpacing: '0.10em', textTransform: 'uppercase' }}>{s.l}</div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '12px', fontFamily: 'var(--font-body)', fontSize: '11px', color: '#C8C5C0', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Clock size={10} color="#C8C5C0" />Last active {lastActive}
      </div>
    </motion.div>
  )
}
