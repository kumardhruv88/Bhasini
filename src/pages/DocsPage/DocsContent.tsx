import { useState } from 'react'
import DocsCallout from './DocsCallout'
import DocsCodeBlock from './DocsCodeBlock'

const DISPLAY = 'var(--font-display)'
const BODY = 'var(--font-body)'
const MONO = "'JetBrains Mono', monospace"

export default function DocsContent() {
  const [activeTab, setActiveTab] = useState<'JavaScript' | 'Python' | 'cURL'>('JavaScript')

  const codeSamples = {
    JavaScript: `import { Bhasini } from "@bhasini/sdk";

const bhasini = new Bhasini({
  apiKey: process.env.BHASINI_API_KEY
});

const agent = await bhasini.agents.create({
  name: "Support Agent",
  languages: ["hi", "en"],
  voice: "aarohi"
});`,
    Python: `from bhasini import Bhasini
import os

bhasini = Bhasini(api_key=os.environ.get("BHASINI_API_KEY"))

agent = bhasini.agents.create(
    name="Support Agent",
    languages=["hi", "en"],
    voice="aarohi"
)`,
    cURL: `curl -X POST https://api.bhasini.ai/v1/agents \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Support Agent",
    "languages": ["hi", "en"],
    "voice": "aarohi"
  }'`
  }

  return (
    <div style={{ paddingBottom: '100px' }}>
      
      {/* Introduction */}
      <section id="introduction" style={{ marginBottom: '64px' }}>
        <h2 style={{ fontFamily: DISPLAY, fontSize: '28px', fontWeight: 500, color: '#0D0D0D', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Introduction
        </h2>
        <p style={{ fontFamily: BODY, fontSize: '16px', color: '#686868', lineHeight: 1.6, marginBottom: '24px' }}>
          Build voice agents that understand the languages, accents and conversational patterns of India. Bhasini provides infrastructure for building multilingual voice agents.
        </p>
        
        {/* Architecture Diagram */}
        <div style={{ background: '#F7F5F2', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '32px', border: '1px solid #E0DED9' }}>
          <div style={{ fontFamily: BODY, fontSize: '14px', fontWeight: 500, color: '#0D0D0D', background: '#FFFFFF', padding: '6px 16px', borderRadius: '8px', border: '1px solid #E0DED9' }}>User</div>
          <div style={{ color: '#9A9A9A' }}>↓</div>
          <div style={{ fontFamily: BODY, fontSize: '14px', fontWeight: 500, color: '#FFFFFF', background: '#FF6B35', padding: '6px 16px', borderRadius: '8px' }}>Voice Agent</div>
          <div style={{ color: '#9A9A9A' }}>↓</div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontFamily: MONO, fontSize: '11px', color: '#686868' }}>Speech</span>
            <span style={{ color: '#9A9A9A' }}>→</span>
            <span style={{ fontFamily: MONO, fontSize: '11px', color: '#686868' }}>Language</span>
            <span style={{ color: '#9A9A9A' }}>→</span>
            <span style={{ fontFamily: MONO, fontSize: '11px', color: '#686868' }}>Reasoning</span>
            <span style={{ color: '#9A9A9A' }}>→</span>
            <span style={{ fontFamily: MONO, fontSize: '11px', color: '#686868' }}>Speech</span>
          </div>
          <div style={{ color: '#9A9A9A' }}>↓</div>
          <div style={{ fontFamily: BODY, fontSize: '14px', fontWeight: 500, color: '#0D0D0D', background: '#FFFFFF', padding: '6px 16px', borderRadius: '8px', border: '1px solid #E0DED9' }}>Response</div>
        </div>

        <DocsCallout type="INFO">
          Bhasini automatically detects the language being spoken when multilingual mode is enabled.
        </DocsCallout>
      </section>

      {/* Quickstart */}
      <section id="quickstart" style={{ marginBottom: '64px' }}>
        <h2 style={{ fontFamily: DISPLAY, fontSize: '28px', fontWeight: 500, color: '#0D0D0D', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Quickstart
        </h2>
        <p style={{ fontFamily: BODY, fontSize: '16px', color: '#686868', lineHeight: 1.6, marginBottom: '24px' }}>
          Follow these steps to deploy your first multilingual agent.
        </p>

        <ol style={{ paddingLeft: '20px', fontFamily: BODY, fontSize: '16px', color: '#686868', lineHeight: 1.8, marginBottom: '32px' }}>
          <li>Create an account</li>
          <li>Create a voice agent</li>
          <li>Choose a voice</li>
          <li>Select languages</li>
          <li>Configure instructions</li>
          <li>Test the agent</li>
          <li>Deploy</li>
        </ol>

        <div style={{ fontFamily: BODY, fontSize: '16px', color: '#0D0D0D', fontWeight: 500, marginBottom: '12px' }}>
          Install the SDK
        </div>
        <DocsCodeBlock code="npm install @bhasini/sdk" language="bash" />

        <div style={{ fontFamily: BODY, fontSize: '16px', color: '#0D0D0D', fontWeight: 500, marginBottom: '16px', marginTop: '32px' }}>
          Initialize and Create Agent
        </div>
        
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          {(['JavaScript', 'Python', 'cURL'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontFamily: BODY,
                fontSize: '13px',
                fontWeight: 500,
                padding: '6px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === tab ? '#EFEFED' : 'transparent',
                color: activeTab === tab ? '#0D0D0D' : '#686868',
                cursor: 'pointer',
                transition: 'background 150ms ease'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <DocsCodeBlock code={codeSamples[activeTab]} language={activeTab === 'cURL' ? 'bash' : activeTab.toLowerCase()} />
      </section>

      {/* Authentication */}
      <section id="authentication" style={{ marginBottom: '64px' }}>
        <h2 style={{ fontFamily: DISPLAY, fontSize: '28px', fontWeight: 500, color: '#0D0D0D', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Authentication
        </h2>
        <p style={{ fontFamily: BODY, fontSize: '16px', color: '#686868', lineHeight: 1.6, marginBottom: '24px' }}>
          All API requests must be authenticated using a Bearer token.
        </p>
        
        <DocsCallout type="WARNING">
          Never expose your API key in client-side browser code.
        </DocsCallout>

        <DocsCodeBlock code={`curl https://api.bhasini.ai/v1/agents \\
  -H "Authorization: Bearer YOUR_API_KEY"`} language="bash" />
      </section>

      {/* API Reference */}
      <section id="api" style={{ marginBottom: '64px' }}>
        <h2 style={{ fontFamily: DISPLAY, fontSize: '28px', fontWeight: 500, color: '#0D0D0D', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          API Reference
        </h2>
        
        {/* Endpoint */}
        <div style={{ border: '1px solid #E0DED9', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}>
          <div style={{ background: '#F7F5F2', padding: '16px 20px', borderBottom: '1px solid #E0DED9', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontFamily: MONO, fontSize: '11px', fontWeight: 700, color: '#16A34A', background: 'rgba(22, 163, 74, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>GET</div>
            <div style={{ fontFamily: MONO, fontSize: '14px', color: '#0D0D0D' }}>/v1/voices</div>
          </div>
          <div style={{ padding: '20px' }}>
            <p style={{ fontFamily: BODY, fontSize: '15px', color: '#686868', marginBottom: '20px' }}>
              Returns voices available for your workspace.
            </p>
            <h4 style={{ fontFamily: BODY, fontSize: '13px', fontWeight: 600, color: '#0D0D0D', marginBottom: '12px' }}>Response</h4>
            <DocsCodeBlock code={`{
  "data": [
    {
      "id": "voice_aarohi",
      "name": "Aarohi",
      "language": "hi-IN",
      "style": "warm"
    }
  ]
}`} language="json" />
          </div>
        </div>

        <DocsCallout type="TIP">
          Use the Evaluation Kit before deploying an agent to production.
        </DocsCallout>
      </section>

    </div>
  )
}
