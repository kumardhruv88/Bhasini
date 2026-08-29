import React from 'react'

export function AgentsFeatureGrid() {
  return (
    <section style={{ padding: '80px 32px', maxWidth: '1160px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '64px', flexWrap: 'wrap', gap: '40px' }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B6B6B', marginBottom: '12px' }}>BhasiniAgents</div>
          <h2 style={{ 
            fontSize: 'clamp(32px, 4vw, 42px)', 
            fontWeight: 500, 
            fontFamily: 'var(--font-display)', 
            lineHeight: 1.1, 
            letterSpacing: '-0.03em', 
            margin: '0 0 24px 0', 
            color: '#0D0D0D'
          }}>
            Deploy agents that talk, type, and take action
          </h2>
          <button style={{ 
            background: '#0D0D0D', color: '#FFF', 
            padding: '12px 24px', borderRadius: '99px', 
            border: 'none', fontWeight: 600, fontSize: '14px', 
            cursor: 'pointer', fontFamily: 'var(--font-body)',
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#2A2A2A'}
          onMouseLeave={e => e.currentTarget.style.background = '#0D0D0D'}
          >
            Learn more
          </button>
        </div>
        <div style={{ flex: '1 1 400px', paddingTop: '32px' }}>
          <p style={{ fontSize: '16px', color: '#4A4A4A', margin: 0, lineHeight: 1.6 }}>
            Configure, deploy and monitor natural, human-sounding agents in Indian languages with leading accuracy and ultra-low latency across voice or chat.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '16px' }}>
        
        {/* Large Left Card - Chat UI Mockup */}
        <div style={{ 
          gridColumn: 'span 6', 
          background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.15\'/%3E%3C/svg%3E"), radial-gradient(circle at 30% 70%, #42C785 0%, #173B25 60%, #0D0D0D 100%)',
          backgroundBlendMode: 'overlay, normal',
          borderRadius: '24px', 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          padding: '32px',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'
        }}>
           <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ alignSelf: 'flex-end', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '12px 16px', borderRadius: '16px 16px 4px 16px', color: '#FFF', fontSize: '14px', border: '1px solid rgba(255,255,255,0.2)' }}>
                Can I get a refund?
              </div>
              <div style={{ alignSelf: 'flex-start', background: '#FFF', padding: '12px 16px', borderRadius: '16px 16px 16px 4px', color: '#0D0D0D', fontSize: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                Sure. Can you share your order<br/>number please?
              </div>
              <div style={{ alignSelf: 'flex-end', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '12px 16px', borderRadius: '16px 16px 4px 16px', color: '#FFF', fontSize: '14px', border: '1px solid rgba(255,255,255,0.2)' }}>
                It's EL4543490
              </div>
              <div style={{ alignSelf: 'flex-start', background: '#FFF', padding: '12px 16px', borderRadius: '16px 16px 16px 4px', color: '#0D0D0D', fontSize: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                Thank you. I have initiated the<br/>order refund process.
              </div>
              <div style={{ alignSelf: 'flex-start', background: '#FFF', padding: '12px 16px', borderRadius: '99px', color: '#1A73E8', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#1A73E8', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>$</span> Refund completed
              </div>
           </div>
        </div>

        {/* Large Right Card - Analytics Mockup */}
        <div style={{ 
          gridColumn: 'span 6', 
          background: '#F9F8F6', 
          borderRadius: '24px', 
          border: '1px solid #EBE9E4', 
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ 
            background: '#FFF', 
            borderRadius: '16px', 
            padding: '24px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
            border: '1px solid #EAE8E3',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ marginBottom: '24px' }}>
               <div style={{ fontSize: '13px', fontWeight: 600, color: '#0D0D0D', marginBottom: '4px' }}>Resolution Rate</div>
               <div style={{ fontSize: '28px', color: '#6B6B6B' }}>83.4%</div>
            </div>
            
            <div style={{ flex: 1, position: 'relative', borderBottom: '1px solid #EAE8E3', borderLeft: '1px solid #EAE8E3' }}>
              {/* Fake grid lines */}
              <div style={{ position: 'absolute', top: '33%', left: 0, right: 0, borderTop: '1px dashed #EAE8E3' }}></div>
              <div style={{ position: 'absolute', top: '66%', left: 0, right: 0, borderTop: '1px dashed #EAE8E3' }}></div>
              
              {/* Lines */}
              <svg width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
                <path d="M0,60 Q20,50 40,55 T80,45 T120,50 T160,35 T200,45 T240,40 T280,45 L320,45" fill="none" stroke="#FF6B35" strokeWidth="2" />
                <path d="M0,80 Q20,85 40,75 T80,80 T120,70 T160,85 T200,80 T240,90 T280,85 L320,85" fill="none" stroke="#1A73E8" strokeWidth="2" />
                
                {/* Tooltip dots */}
                <circle cx="200" cy="45" r="4" fill="#FF6B35" stroke="#FFF" strokeWidth="2" />
                <circle cx="200" cy="80" r="4" fill="#1A73E8" stroke="#FFF" strokeWidth="2" />
                <line x1="200" y1="45" x2="200" y2="100%" stroke="#EAE8E3" strokeWidth="1" />
              </svg>

              {/* Tooltip UI */}
              <div style={{ position: 'absolute', top: '20px', left: '130px', background: '#FFF', padding: '8px 12px', borderRadius: '8px', border: '1px solid #EAE8E3', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: '12px', fontWeight: 600 }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                   <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF6B35' }}></span> V1: 87.37%
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                   <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1A73E8' }}></span> V2: 61.71%
                 </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '10px', color: '#9E9E9E', fontWeight: 600 }}>
               <span>17 Aug</span>
               <span>24 Aug</span>
            </div>
          </div>
        </div>

        {/* Small Cards Row */}
        {[
          { title: 'Testing', desc: 'Simulate real-world conversations to validate agents behave as expected before deployment.', icon: '🧪' },
          { title: 'Guardrails', desc: 'Establish clear behavioral and compliance rules that keep agent responses aligned with policy.', icon: '🛡️' },
          { title: 'Workflows', desc: 'Handle complex conversation flows, apply business logic and connect securely to systems.', icon: '⚡' },
        ].map((card, i) => (
          <div key={i} style={{ 
            gridColumn: 'span 4', 
            background: '#F9F8F6', 
            borderRadius: '24px', 
            border: '1px solid #EBE9E4', 
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#FFF', border: '1px solid #EAE8E3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
              {card.icon}
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 8px 0', color: '#0D0D0D' }}>{card.title}</h4>
              <p style={{ fontSize: '13px', color: '#6B6B6B', margin: 0, lineHeight: 1.5 }}>{card.desc}</p>
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}
