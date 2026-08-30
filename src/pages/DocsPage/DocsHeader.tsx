const MONO = "'JetBrains Mono', monospace"
const DISPLAY = 'var(--font-display)'
const BODY = 'var(--font-body)'

export default function DocsHeader() {
  return (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ fontFamily: MONO, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9A9A9A', marginBottom: '16px' }}>
        DOCS / GETTING STARTED
      </div>
      <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 300, color: '#0D0D0D', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px' }}>
        Build with Bhasini.
      </h1>
      <p style={{ fontFamily: BODY, fontSize: '18px', color: '#686868', marginBottom: '32px' }}>
        Everything you need to build multilingual voice agents for India.
      </p>

      <div style={{ position: 'relative', maxWidth: '500px' }}>
        <input 
          placeholder="Search documentation..."
          style={{
            width: '100%',
            height: '48px',
            background: '#FFFFFF',
            border: '1px solid #E0DED9',
            borderRadius: '12px',
            padding: '0 48px 0 16px',
            fontFamily: BODY,
            fontSize: '15px',
            color: '#0D0D0D',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}
        />
        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '4px' }}>
          <kbd style={{ fontFamily: MONO, fontSize: '11px', background: '#F7F5F2', border: '1px solid #E0DED9', borderRadius: '4px', padding: '2px 6px', color: '#686868' }}>⌘</kbd>
          <kbd style={{ fontFamily: MONO, fontSize: '11px', background: '#F7F5F2', border: '1px solid #E0DED9', borderRadius: '4px', padding: '2px 6px', color: '#686868' }}>K</kbd>
        </div>
      </div>
    </div>
  )
}
