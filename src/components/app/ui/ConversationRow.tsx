import { motion } from 'framer-motion'
import { LiveConversation } from '../../../data/observatoryData'

// Animated waveform bars
function Waveform({ active = true }: { active?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '16px' }}>
      {[3, 6, 10, 7, 12, 8, 5, 9, 4, 7].map((h, i) => (
        <motion.div key={i}
          animate={active ? { height: [`${h}px`, `${Math.min(h + 6, 14)}px`, `${h}px`] } : { height: '3px' }}
          transition={{ duration: 0.6 + i * 0.08, repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 }}
          style={{ width: '2px', borderRadius: '9999px', background: active ? '#FF6B35' : '#E0DED9' }}
        />
      ))}
    </div>
  )
}

interface ConversationRowProps {
  conversation: LiveConversation
  isSelected: boolean
  onClick: () => void
}

export default function ConversationRow({ conversation, isSelected, onClick }: ConversationRowProps) {
  return (
    <div onClick={onClick}
      style={{ 
        padding: '12px 20px', 
        cursor: 'pointer', 
        borderLeft: isSelected ? '3px solid #FF6B35' : '3px solid transparent', 
        background: isSelected ? '#FAFAFA' : 'transparent', 
        borderBottom: '1px solid #F0EFED', 
        transition: 'all 150ms' 
      }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#0D0D0D', fontWeight: 600 }}>
          {conversation.id}
        </span>
        <Waveform active={isSelected} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#6B6B6B' }}>
          {conversation.agent}
        </span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', padding: '2px 7px', background: '#F7F5F2', borderRadius: '9999px', color: '#9E9E9E' }}>
          {conversation.language}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#C8C5C0', marginLeft: 'auto' }}>
          {conversation.duration}
        </span>
      </div>
    </div>
  )
}
