import React from 'react'

export function TwoPlatformsSection() {
  return (
    <section style={{ padding: '80px 32px', maxWidth: '1160px', margin: '0 auto' }}>
      
      <h2 style={{ 
        fontSize: 'clamp(32px, 4vw, 42px)', 
        fontWeight: 500, 
        fontFamily: 'var(--font-display)', 
        lineHeight: 1.1, 
        letterSpacing: '-0.03em', 
        margin: '0 0 64px 0', 
        color: '#0D0D0D',
        maxWidth: '600px'
      }}>
        Two platforms built on the same research foundation
      </h2>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 12px 0', color: '#0D0D0D' }}>BhasiniCreative</h3>
          <p style={{ fontSize: '16px', color: '#6B6B6B', margin: 0, lineHeight: 1.5 }}>
            Generate ultra-realistic speech, translate content, and create immersive audio experiences in Indian languages.
          </p>
        </div>
        <div style={{ flex: '1 1 300px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 12px 0', color: '#0D0D0D' }}>BhasiniAgents</h3>
          <p style={{ fontSize: '16px', color: '#6B6B6B', margin: 0, lineHeight: 1.5 }}>
            Configure, deploy and monitor powerful conversational voice agents tailored for regional support.
          </p>
        </div>
      </div>

      {/* Visual Dashboard Mockup */}
      <div style={{ 
        background: '#F9F8F6', 
        borderRadius: '32px', 
        padding: '32px', 
        border: '1px solid #EBE9E4', 
        boxShadow: '0 4px 32px rgba(0,0,0,0.04)',
        display: 'flex',
        gap: '24px',
        overflow: 'hidden',
        height: '400px'
      }}>
        {/* Creative Dashboard Mockup */}
        <div style={{ 
          flex: 1, 
          background: '#FFF', 
          borderRadius: '16px', 
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          border: '1px solid #EAE8E3',
          display: 'flex',
          overflow: 'hidden'
        }}>
          {/* Sidebar */}
          <div style={{ width: '140px', borderRight: '1px solid #EAE8E3', padding: '16px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px' }}>
               <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF6B35' }}></span>
               <span style={{ fontSize: '12px', fontWeight: 700 }}>BhasiniCreative</span>
            </div>
            {['Home', 'Voices', 'Studio', 'Flows', 'Templates'].map((item, i) => (
              <div key={item} style={{ padding: '8px', fontSize: '12px', color: i === 0 ? '#0D0D0D' : '#6B6B6B', fontWeight: i === 0 ? 600 : 500, background: i === 0 ? '#F3F2EE' : 'transparent', borderRadius: '6px', marginBottom: '4px' }}>
                {item}
              </div>
            ))}
          </div>
          {/* Main Area */}
          <div style={{ flex: 1, padding: '24px' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 24px 0' }}>What would you like to create?</h4>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1, height: '120px', background: '#F9F8F6', borderRadius: '12px', border: '1px solid #EAE8E3', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ height: '4px', background: '#FF6B35', width: '30%', borderRadius: '2px' }}></div>
                <div style={{ fontSize: '12px', fontWeight: 600 }}>Speech</div>
              </div>
              <div style={{ flex: 1, height: '120px', background: '#F9F8F6', borderRadius: '12px', border: '1px solid #EAE8E3', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ height: '4px', background: '#1A73E8', width: '50%', borderRadius: '2px' }}></div>
                <div style={{ fontSize: '12px', fontWeight: 600 }}>Translation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Agents Dashboard Mockup */}
        <div style={{ 
          flex: 1.2, 
          background: '#FFF', 
          borderRadius: '16px', 
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          border: '1px solid #EAE8E3',
          display: 'flex',
          overflow: 'hidden'
        }}>
          {/* Sidebar */}
          <div style={{ width: '140px', borderRight: '1px solid #EAE8E3', padding: '16px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px' }}>
               <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#1A73E8' }}></span>
               <span style={{ fontSize: '12px', fontWeight: 700 }}>BhasiniAgents</span>
            </div>
            {['Home', 'Support Agent', 'Sales Agent', 'Configure', 'Knowledge'].map((item, i) => (
              <div key={item} style={{ padding: '8px', fontSize: '12px', color: i === 0 ? '#0D0D0D' : '#6B6B6B', fontWeight: i === 0 ? 600 : 500, background: i === 0 ? '#F3F2EE' : 'transparent', borderRadius: '6px', marginBottom: '4px' }}>
                {item}
              </div>
            ))}
          </div>
          {/* Main Area */}
          <div style={{ flex: 1, padding: '24px' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 16px 0' }}>Good afternoon, Dhruv</h4>
            
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#0D0D0D', borderBottom: '2px solid #0D0D0D', paddingBottom: '4px' }}>General</div>
              <div style={{ fontSize: '12px', fontWeight: 500, color: '#6B6B6B', paddingBottom: '4px' }}>Evaluation</div>
              <div style={{ fontSize: '12px', fontWeight: 500, color: '#6B6B6B', paddingBottom: '4px' }}>Data Collection</div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <div style={{ flex: 1, padding: '12px', border: '1px solid #EAE8E3', borderRadius: '8px' }}>
                 <div style={{ fontSize: '10px', color: '#6B6B6B', marginBottom: '4px' }}>Calls</div>
                 <div style={{ fontSize: '20px', fontWeight: 700 }}>77,258</div>
              </div>
              <div style={{ flex: 1, padding: '12px', border: '1px solid #EAE8E3', borderRadius: '8px' }}>
                 <div style={{ fontSize: '10px', color: '#6B6B6B', marginBottom: '4px' }}>CSAT Score</div>
                 <div style={{ fontSize: '20px', fontWeight: 700 }}>4.7</div>
              </div>
            </div>

            {/* Line Chart Mockup */}
            <div style={{ height: '80px', border: '1px solid #EAE8E3', borderRadius: '8px', padding: '12px', position: 'relative' }}>
              <svg width="100%" height="100%" preserveAspectRatio="none">
                <path d="M0,40 Q40,10 80,30 T160,20 T240,40 T320,10" fill="none" stroke="#1A73E8" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
