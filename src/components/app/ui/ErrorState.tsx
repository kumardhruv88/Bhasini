import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
}

export default function ErrorState({ title = 'Something went wrong', message, onRetry }: ErrorStateProps) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '32px', 
      textAlign: 'center', 
      background: 'rgba(239, 68, 68, 0.02)', 
      border: '1px solid rgba(239, 68, 68, 0.1)', 
      borderRadius: '18px' 
    }}>
      <div style={{ 
        width: '48px', 
        height: '48px', 
        borderRadius: '50%', 
        background: 'rgba(239, 68, 68, 0.1)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: '16px' 
      }}>
        <AlertCircle size={24} color="#EF4444" strokeWidth={1.5} />
      </div>
      <h3 style={{ 
        fontFamily: 'var(--font-display)', 
        fontSize: '16px', 
        fontWeight: 500, 
        color: '#EF4444', 
        marginBottom: '6px' 
      }}>
        {title}
      </h3>
      <p style={{ 
        fontFamily: 'var(--font-body)', 
        fontSize: '13px', 
        color: '#6B6B6B', 
        maxWidth: '400px', 
        marginBottom: onRetry ? '16px' : '0' 
      }}>
        {message}
      </p>
      {onRetry && (
        <button onClick={onRetry} style={{ 
          padding: '8px 16px', 
          background: 'white', 
          border: '1px solid #E0DED9', 
          borderRadius: '9999px', 
          fontFamily: 'var(--font-body)', 
          fontSize: '12px', 
          fontWeight: 500, 
          color: '#0D0D0D', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }}>
          <RefreshCw size={12} /> Try again
        </button>
      )}
    </div>
  )
}
