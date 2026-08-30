import { motion } from 'framer-motion'
import { TranscriptMessage } from '../../../data/observatoryData'

interface TranscriptBubbleProps {
  message: TranscriptMessage
  index: number
}

export default function TranscriptBubble({ message, index }: TranscriptBubbleProps) {
  const isUser = message.speaker === 'USER'
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3, delay: index * 0.07 }}
    >
      <div style={{ 
        fontFamily: "'JetBrains Mono', monospace", 
        fontSize: '8px', 
        letterSpacing: '0.14em', 
        color: '#C8C5C0', 
        textTransform: 'uppercase', 
        marginBottom: '4px', 
        textAlign: isUser ? 'right' : 'left' 
      }}>
        {message.speaker} · {message.timestamp}
      </div>
      <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
        <div style={{ 
          maxWidth: '75%', 
          padding: '10px 14px', 
          borderRadius: '14px', 
          background: isUser ? '#F7F5F2' : '#0D0D0D', 
          color: isUser ? '#0D0D0D' : 'white', 
          fontFamily: 'var(--font-body)', 
          fontSize: '13px', 
          lineHeight: 1.55, 
          fontWeight: 300 
        }}>
          {message.text}
        </div>
      </div>
    </motion.div>
  )
}
