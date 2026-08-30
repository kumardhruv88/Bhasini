import { useState } from 'react'

const MONO = "'JetBrains Mono', monospace"

interface DocsCodeBlockProps {
  code: string
  language?: string
}

export default function DocsCodeBlock({ code, language = 'bash' }: DocsCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      background: '#0D0D0D',
      borderRadius: '14px',
      overflow: 'hidden',
      marginBottom: '24px'
    }}>
      {/* Top Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ fontFamily: MONO, fontSize: '11px', color: '#9A9A9A' }}>
          {language}
        </div>
        <button 
          onClick={handleCopy}
          style={{ 
            fontFamily: MONO, 
            fontSize: '11px', 
            color: copied ? '#22C55E' : '#9A9A9A',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 150ms ease'
          }}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Code Area */}
      <div style={{ padding: '16px 20px', overflowX: 'auto' }}>
        <pre style={{ margin: 0 }}>
          <code style={{ 
            fontFamily: MONO, 
            fontSize: '13px', 
            lineHeight: 1.5, 
            color: '#F0EFED',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all'
          }}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  )
}
