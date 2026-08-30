import React from 'react'

const BODY = 'var(--font-body)'
const MONO = "'JetBrains Mono', monospace"

interface DocsCalloutProps {
  type: 'INFO' | 'WARNING' | 'TIP'
  children: React.ReactNode
}

export default function DocsCallout({ type, children }: DocsCalloutProps) {
  const colors = {
    INFO: '#3B82F6',
    WARNING: '#F59E0B',
    TIP: '#10B981'
  }
  const color = colors[type] || colors.INFO

  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E0DED9',
      borderLeft: `3px solid ${color}`,
      borderRadius: '8px',
      padding: '16px 20px',
      marginBottom: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <div style={{
        fontFamily: MONO,
        fontSize: '10px',
        color,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontWeight: 600
      }}>
        {type}
      </div>
      <div style={{
        fontFamily: BODY,
        fontSize: '15px',
        color: '#0D0D0D',
        lineHeight: 1.5
      }}>
        {children}
      </div>
    </div>
  )
}
