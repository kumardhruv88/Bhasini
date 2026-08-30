import { LucideIcon } from 'lucide-react'
import React from 'react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '48px', 
      textAlign: 'center', 
      background: 'white', 
      border: '1px dashed #E0DED9', 
      borderRadius: '18px' 
    }}>
      <div style={{ 
        width: '48px', 
        height: '48px', 
        borderRadius: '50%', 
        background: '#F7F5F2', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: '16px' 
      }}>
        <Icon size={24} color="#C8C5C0" strokeWidth={1.5} />
      </div>
      <h3 style={{ 
        fontFamily: 'var(--font-display)', 
        fontSize: '16px', 
        fontWeight: 500, 
        color: '#0D0D0D', 
        marginBottom: '8px',
        letterSpacing: '-0.01em'
      }}>
        {title}
      </h3>
      <p style={{ 
        fontFamily: 'var(--font-body)', 
        fontSize: '13px', 
        color: '#9E9E9E', 
        maxWidth: '320px', 
        marginBottom: action ? '20px' : '0' 
      }}>
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  )
}
