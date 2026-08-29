import React from 'react'

export function ApiPlatformSection() {
  return (
    <section style={{ padding: '80px 32px', maxWidth: '1160px', margin: '0 auto', borderTop: '1px solid #E0DED9' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '64px', flexWrap: 'wrap', gap: '40px' }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B6B6B', marginBottom: '12px' }}>BhasiniAPI</div>
          <h2 style={{ 
            fontSize: 'clamp(32px, 4vw, 42px)', 
            fontWeight: 500, 
            fontFamily: 'var(--font-display)', 
            lineHeight: 1.1, 
            letterSpacing: '-0.03em', 
            margin: '0 0 24px 0', 
            color: '#0D0D0D'
          }}>
            Or build anything with<br/>a powerful host of APIs
          </h2>
        </div>
        <div style={{ paddingTop: '32px' }}>
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
            Explore docs
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '0', border: '1px solid #EAE8E3', borderRadius: '24px', overflow: 'hidden' }}>
        
        {/* Row 1: TTS API */}
        <div style={{ gridColumn: 'span 5', padding: '48px', borderRight: '1px solid #EAE8E3', borderBottom: '1px solid #EAE8E3', background: '#FFF' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0D0D0D', marginBottom: '16px' }}>Text to Speech API</h3>
          <p style={{ fontSize: '14px', color: '#6B6B6B', lineHeight: 1.6, marginBottom: '32px' }}>
            Independently rated the leading Text to Speech models. Choose a model to optimize for consistency, latency or emotional control. All support 22+ Indian languages.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <div>
               <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0D0D0D', marginBottom: '8px' }}>Bhasini Flash</h4>
               <p style={{ fontSize: '12px', color: '#6B6B6B', lineHeight: 1.5, margin: 0 }}>75ms latency for<br/>conversational usecases</p>
            </div>
            <div>
               <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0D0D0D', marginBottom: '8px' }}>Bhasini Multilingual</h4>
               <p style={{ fontSize: '12px', color: '#6B6B6B', lineHeight: 1.5, margin: 0 }}>Best lifelike consistent speech</p>
            </div>
          </div>
        </div>
        <div style={{ gridColumn: 'span 7', padding: '48px', borderBottom: '1px solid #EAE8E3', background: '#F9F8F6', display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            background: '#FFF', borderRadius: '16px', padding: '24px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.04)', border: '1px solid #EAE8E3', 
            width: '100%', fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.6, color: '#333' 
          }}>
            <span style={{ color: '#E91E63' }}>import</span> {'{'} BhasiniClient {'}'} <span style={{ color: '#E91E63' }}>from</span> <span style={{ color: '#2E7D32' }}>"@bhasini/sdk"</span>;
            <br/><br/>
            <span style={{ color: '#1565C0' }}>const</span> client = <span style={{ color: '#E91E63' }}>new</span> BhasiniClient({'{'} apiKey: <span style={{ color: '#2E7D32' }}>"YOUR_API_KEY"</span> {'}'});<br/><br/>
            <span style={{ color: '#E91E63' }}>await</span> client.textToSpeech.convert(<span style={{ color: '#2E7D32' }}>"JBFqnCBsd6RMkjVDRZzb"</span>, {'{'}<br/>
            &nbsp;&nbsp;outputFormat: <span style={{ color: '#2E7D32' }}>"mp3_44100_128"</span>,<br/>
            &nbsp;&nbsp;text: <span style={{ color: '#2E7D32' }}>"The first move is what sets everything in motion."</span>,<br/>
            &nbsp;&nbsp;modelId: <span style={{ color: '#2E7D32' }}>"bhasini_multilingual_v2"</span>,<br/>
            {'}'});
          </div>
        </div>

        {/* Row 2: STT API */}
        <div style={{ gridColumn: 'span 5', padding: '48px', borderRight: '1px solid #EAE8E3', background: '#FFF' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0D0D0D', marginBottom: '16px' }}>Speech to Text API</h3>
          <p style={{ fontSize: '14px', color: '#6B6B6B', lineHeight: 1.6, marginBottom: '32px' }}>
            The most accurate ASR model for Indian languages. Low cost and supporting speaker diarization and character level timestamps.
          </p>
          <div>
             <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0D0D0D', marginBottom: '8px' }}>Bhasini Scribe</h4>
             <p style={{ fontSize: '12px', color: '#6B6B6B', lineHeight: 1.5, margin: 0 }}>98% accuracy across dialects</p>
          </div>
        </div>
        <div style={{ gridColumn: 'span 7', padding: '48px', background: '#F9F8F6', display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            background: '#FFF', borderRadius: '16px', padding: '24px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.04)', border: '1px solid #EAE8E3', 
            width: '100%', fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.6, color: '#333' 
          }}>
            <span style={{ color: '#E91E63' }}>import</span> {'{'} BhasiniClient {'}'} <span style={{ color: '#E91E63' }}>from</span> <span style={{ color: '#2E7D32' }}>"@bhasini/sdk"</span>;
            <br/><br/>
            <span style={{ color: '#1565C0' }}>const</span> transcribe = <span style={{ color: '#E91E63' }}>new</span> BhasiniClient();<br/><br/>
            <span style={{ color: '#1565C0' }}>const</span> result = <span style={{ color: '#E91E63' }}>await</span> transcribe.speechToText.create({'{'}<br/>
            &nbsp;&nbsp;audioUrl: <span style={{ color: '#2E7D32' }}>"https://audio.example.com/recording.wav"</span>,<br/>
            &nbsp;&nbsp;diarize: <span style={{ color: '#E91E63' }}>true</span>,<br/>
            &nbsp;&nbsp;languageCode: <span style={{ color: '#2E7D32' }}>"hi"</span>,<br/>
            {'}'});
          </div>
        </div>

      </div>
    </section>
  )
}
