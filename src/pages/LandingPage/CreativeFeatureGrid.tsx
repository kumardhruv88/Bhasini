import React from 'react'

export function CreativeFeatureGrid() {
  return (
    <section style={{ padding: '80px 32px', maxWidth: '1160px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '64px', flexWrap: 'wrap', gap: '40px' }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B6B6B', marginBottom: '12px' }}>BhasiniCreative</div>
          <h2 style={{ 
            fontSize: 'clamp(32px, 4vw, 42px)', 
            fontWeight: 500, 
            fontFamily: 'var(--font-display)', 
            lineHeight: 1.1, 
            letterSpacing: '-0.03em', 
            margin: '0 0 24px 0', 
            color: '#0D0D0D'
          }}>
            Create, edit, and localize in one AI platform
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
            Generate ultra-realistic speech in 22+ Indian languages, turn ideas into regional videos, or design immersive conversational experiences. Craft your next ad, campaign, or audiobook with our creative platform.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '16px' }}>
        
        {/* Large Left Card - TTS Editor Mockup */}
        <div style={{ 
          gridColumn: 'span 6', 
          background: '#F9F8F6', 
          borderRadius: '24px', 
          border: '1px solid #EBE9E4', 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '400px'
        }}>
          <div style={{ padding: '32px', flex: 1 }}>
            <p style={{ color: '#6B6B6B', fontSize: '15px', lineHeight: 1.6, margin: '0 0 24px 0' }}>
              Amidst the outer atmosphere of the planet Aurora, the sky shimmered with fractured light, as though the planet's veil were made of stained glass suspended in space.
            </p>
            <p style={{ color: '#C8C5C0', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
              Sensors pulsed with irregular patterns, the kind no algorithm could quite reconcile.
            </p>
          </div>
          <div style={{ padding: '24px', background: 'linear-gradient(to bottom, transparent, #EFEFED)' }}>
            <div style={{ 
              height: '40px', 
              borderRadius: '8px', 
              background: 'linear-gradient(90deg, #1A73E8 0%, #FF3CAC 50%, #FF6B35 100%)',
              marginBottom: '16px',
              border: '2px solid #FFF',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}></div>
            <div style={{ display: 'flex', gap: '12px' }}>
               <div style={{ flex: 1, background: '#FFF', borderRadius: '8px', padding: '12px', fontSize: '13px', color: '#6B6B6B', border: '1px solid #EAE8E3' }}>
                 Generating speech in Hindi...
               </div>
               <div style={{ width: '44px', height: '44px', background: '#FFF', borderRadius: '8px', border: '1px solid #EAE8E3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <div style={{ width: '16px', height: '16px', border: '2px solid #C8C5C0', borderTopColor: '#0D0D0D', borderRadius: '50%' }}></div>
               </div>
            </div>
          </div>
        </div>

        {/* Large Right Card - Playground Mockup */}
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
            border: '1px solid #EAE8E3'
          }}>
            <p style={{ color: '#0D0D0D', fontSize: '15px', lineHeight: 1.6, margin: '0 0 24px 0' }}>
              In the ancient land of Eldoria, where skies shimmered and forests whispered secrets to the wind, lived a dragon named Zephyros. <span style={{ color: '#9E9E9E' }}>[sarcastically]</span> Not the "burn it all down" kind... <span style={{ color: '#9E9E9E' }}>[giggles]</span> but he was gentle, wise, with eyes like old stars.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #EAE8E3', paddingTop: '16px' }}>
               <div style={{ display: 'flex', gap: '16px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
                   <span style={{ fontSize: '16px' }}>🇮🇳</span> Hindi <span style={{ opacity: 0.5, fontSize: '10px' }}>▼</span>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
                   <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B35, #1A73E8)' }}></span> Priya Sharma <span style={{ opacity: 0.5, fontSize: '10px' }}>▼</span>
                 </div>
               </div>
               <button style={{ 
                 background: '#0D0D0D', color: '#FFF', 
                 padding: '8px 16px', borderRadius: '99px', 
                 border: 'none', fontWeight: 600, fontSize: '13px', 
                 cursor: 'pointer'
               }}>
                 Play
               </button>
            </div>
          </div>
        </div>

        {/* Small Cards Row */}
        {[
          { title: 'Voices', desc: 'Clone your voice or explore 100+ native Indian language voices from the library.', icon: '🎙️' },
          { title: 'Translation', desc: 'Seamlessly translate and dub videos across 22+ official languages.', icon: '🌍' },
          { title: 'Audio Studio', desc: 'Generate studio-quality voiceovers and podcasts with advanced pacing control.', icon: '🎧' },
          { title: 'Workflows', desc: 'Automate bulk translation and audio generation with powerful API integrations.', icon: '⚡' },
        ].map((card, i) => (
          <div key={i} style={{ 
            gridColumn: 'span 3', 
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
