import React from 'react'

export function SafetySection() {
  return (
    <section style={{ padding: '80px 32px 120px 32px', maxWidth: '1160px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
        <h2 style={{ 
          fontSize: 'clamp(32px, 4vw, 42px)', 
          fontWeight: 500, 
          fontFamily: 'var(--font-display)', 
          letterSpacing: '-0.03em', 
          margin: 0, 
          color: '#0D0D0D'
        }}>
          Safety, built in
        </h2>
        <button style={{ 
          background: '#FFF', color: '#0D0D0D', 
          padding: '12px 24px', borderRadius: '99px', 
          border: '1px solid #E0DED9', fontWeight: 600, fontSize: '14px', 
          cursor: 'pointer', fontFamily: 'var(--font-body)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          transition: 'background 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#F9F8F6'}
        onMouseLeave={e => e.currentTarget.style.background = '#FFF'}
        >
          Learn more
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        
        {/* Moderation */}
        <div style={{ background: '#F9F8F6', borderRadius: '24px', padding: '40px 32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
            <svg width="160" height="160" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
               {/* Cone wireframe */}
               <ellipse cx="150" cy="100" rx="20" ry="60" stroke="#0D0D0D" strokeWidth="1" strokeDasharray="2 2"/>
               <ellipse cx="150" cy="100" rx="20" ry="60" stroke="#0D0D0D" strokeWidth="1" strokeDasharray="4 0" strokeDashoffset="0" pathLength="100" />
               <path d="M50 100 L150 40 M50 100 L150 160" stroke="#0D0D0D" strokeWidth="1" />
               <ellipse cx="70" cy="100" rx="10" ry="30" stroke="#0D0D0D" strokeWidth="1" />
               <line x1="20" y1="100" x2="180" y2="100" stroke="#0D0D0D" strokeWidth="1" strokeDasharray="2 2" />
               <line x1="50" y1="140" x2="100" y2="60" stroke="#0D0D0D" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          </div>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#0D0D0D', marginBottom: '12px' }}>Moderation</h4>
            <p style={{ fontSize: '14px', color: '#6B6B6B', margin: 0, lineHeight: 1.6 }}>We actively monitor content generated with our technology to ensure safety.</p>
          </div>
        </div>

        {/* Accountability */}
        <div style={{ background: '#F9F8F6', borderRadius: '24px', padding: '40px 32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
            <svg width="160" height="160" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
               {/* Cube wireframe */}
               <rect x="50" y="50" width="80" height="80" stroke="#0D0D0D" strokeWidth="1" fill="none" />
               <rect x="70" y="30" width="80" height="80" stroke="#0D0D0D" strokeWidth="1" fill="none" strokeDasharray="2 2" />
               <line x1="50" y1="50" x2="70" y2="30" stroke="#0D0D0D" strokeWidth="1" />
               <line x1="130" y1="50" x2="150" y2="30" stroke="#0D0D0D" strokeWidth="1" />
               <line x1="50" y1="130" x2="70" y2="110" stroke="#0D0D0D" strokeWidth="1" />
               <line x1="130" y1="130" x2="150" y2="110" stroke="#0D0D0D" strokeWidth="1" />
               {/* Internal subdivisions */}
               <line x1="90" y1="50" x2="90" y2="130" stroke="#0D0D0D" strokeWidth="1" />
               <line x1="50" y1="90" x2="130" y2="90" stroke="#0D0D0D" strokeWidth="1" />
               <line x1="110" y1="30" x2="110" y2="110" stroke="#0D0D0D" strokeWidth="1" strokeDasharray="2 2" />
               <line x1="70" y1="70" x2="150" y2="70" stroke="#0D0D0D" strokeWidth="1" strokeDasharray="2 2" />
               <line x1="90" y1="50" x2="110" y2="30" stroke="#0D0D0D" strokeWidth="1" />
               <line x1="90" y1="130" x2="110" y2="110" stroke="#0D0D0D" strokeWidth="1" />
               <line x1="50" y1="90" x2="70" y2="70" stroke="#0D0D0D" strokeWidth="1" />
               <line x1="130" y1="90" x2="150" y2="70" stroke="#0D0D0D" strokeWidth="1" />
               {/* Diagonals */}
               <line x1="50" y1="50" x2="130" y2="130" stroke="#0D0D0D" strokeWidth="0.5" />
               <line x1="130" y1="50" x2="50" y2="130" stroke="#0D0D0D" strokeWidth="0.5" />
            </svg>
          </div>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#0D0D0D', marginBottom: '12px' }}>Accountability</h4>
            <p style={{ fontSize: '14px', color: '#6B6B6B', margin: 0, lineHeight: 1.6 }}>We believe misuse must have consequences. Our tracking ensures accountability.</p>
          </div>
        </div>

        {/* Provenance */}
        <div style={{ background: '#F9F8F6', borderRadius: '24px', padding: '40px 32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
            <svg width="160" height="160" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
               {/* Nested circles wireframe */}
               {[60, 50, 40, 30, 20, 10].map((r, i) => (
                 <circle key={r} cx={100 - (i * 10)} cy="100" r={r} stroke="#0D0D0D" strokeWidth="1" strokeDasharray={i % 2 === 0 ? "2 2" : "none"} />
               ))}
            </svg>
          </div>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#0D0D0D', marginBottom: '12px' }}>Provenance</h4>
            <p style={{ fontSize: '14px', color: '#6B6B6B', margin: 0, lineHeight: 1.6 }}>We believe that you should know if audio is AI-generated.</p>
          </div>
        </div>

      </div>
    </section>
  )
}
