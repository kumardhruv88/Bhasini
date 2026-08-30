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
        
        {/* Voices API */}
        <h3 style={{ fontFamily: DISPLAY, fontSize: '20px', fontWeight: 500, color: '#0D0D0D', marginBottom: '16px', marginTop: '32px' }}>Voices API</h3>
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

        {/* Agents API */}
        <h3 style={{ fontFamily: DISPLAY, fontSize: '20px', fontWeight: 500, color: '#0D0D0D', marginBottom: '16px', marginTop: '48px' }}>Agents API</h3>
        <div style={{ border: '1px solid #E0DED9', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}>
          <div style={{ background: '#F7F5F2', padding: '16px 20px', borderBottom: '1px solid #E0DED9', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontFamily: MONO, fontSize: '11px', fontWeight: 700, color: '#F97316', background: 'rgba(249, 115, 22, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>POST</div>
            <div style={{ fontFamily: MONO, fontSize: '14px', color: '#0D0D0D' }}>/v1/agents</div>
          </div>
          <div style={{ padding: '20px' }}>
            <p style={{ fontFamily: BODY, fontSize: '15px', color: '#686868', marginBottom: '20px' }}>
              Create a new multilingual voice agent.
            </p>
          </div>
        </div>

        {/* Calls API */}
        <h3 style={{ fontFamily: DISPLAY, fontSize: '20px', fontWeight: 500, color: '#0D0D0D', marginBottom: '16px', marginTop: '48px' }}>Calls API</h3>
        <div style={{ border: '1px solid #E0DED9', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}>
          <div style={{ background: '#F7F5F2', padding: '16px 20px', borderBottom: '1px solid #E0DED9', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontFamily: MONO, fontSize: '11px', fontWeight: 700, color: '#F97316', background: 'rgba(249, 115, 22, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>POST</div>
            <div style={{ fontFamily: MONO, fontSize: '14px', color: '#0D0D0D' }}>/v1/calls/outbound</div>
          </div>
          <div style={{ padding: '20px' }}>
            <p style={{ fontFamily: BODY, fontSize: '15px', color: '#686868', marginBottom: '20px' }}>
              Initiate an outbound call from an agent.
            </p>
          </div>
        </div>

        {/* Evaluations API */}
        <h3 style={{ fontFamily: DISPLAY, fontSize: '20px', fontWeight: 500, color: '#0D0D0D', marginBottom: '16px', marginTop: '48px' }}>Evaluations API</h3>
        <div style={{ border: '1px solid #E0DED9', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}>
          <div style={{ background: '#F7F5F2', padding: '16px 20px', borderBottom: '1px solid #E0DED9', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontFamily: MONO, fontSize: '11px', fontWeight: 700, color: '#16A34A', background: 'rgba(22, 163, 74, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>GET</div>
            <div style={{ fontFamily: MONO, fontSize: '14px', color: '#0D0D0D' }}>/v1/evaluations</div>
          </div>
          <div style={{ padding: '20px' }}>
            <p style={{ fontFamily: BODY, fontSize: '15px', color: '#686868', marginBottom: '20px' }}>
              Retrieve automated evaluation scores for agent conversations.
            </p>
          </div>
        </div>

        <DocsCallout type="TIP">
          Use the Evaluation Kit before deploying an agent to production.
        </DocsCallout>
      </section>

      {/* Docs Footer */}
      <div style={{ borderTop: '1px solid #E0DED9', paddingTop: '40px', marginTop: '80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '64px' }}>
          <a href="#introduction" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
            <span style={{ fontFamily: MONO, fontSize: '10px', color: '#9A9A9A', letterSpacing: '0.12em', marginBottom: '8px', textTransform: 'uppercase' }}>Previous</span>
            <span style={{ fontFamily: BODY, fontSize: '16px', color: '#0D0D0D', fontWeight: 500 }}>← Introduction</span>
          </a>
          <a href="#quickstart" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textDecoration: 'none' }}>
            <span style={{ fontFamily: MONO, fontSize: '10px', color: '#9A9A9A', letterSpacing: '0.12em', marginBottom: '8px', textTransform: 'uppercase' }}>Next</span>
            <span style={{ fontFamily: BODY, fontSize: '16px', color: '#FF6B35', fontWeight: 500 }}>Quickstart →</span>
          </a>
        </div>

        <div style={{ background: '#0D0D0D', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: DISPLAY, fontSize: '24px', fontWeight: 400, color: '#FFFFFF', marginBottom: '24px' }}>Still have questions?</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button style={{ height: '40px', padding: '0 20px', background: '#FFFFFF', color: '#0D0D0D', border: 'none', borderRadius: '9999px', fontFamily: BODY, fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
              Contact support
            </button>
            <button style={{ height: '40px', padding: '0 20px', background: 'transparent', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '9999px', fontFamily: BODY, fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
              Explore agents
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
