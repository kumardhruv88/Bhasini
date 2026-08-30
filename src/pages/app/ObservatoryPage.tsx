import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Check, AlertTriangle } from 'lucide-react'
import AppShell from '../../components/app/AppShell'
import {
  liveConversations, selectedTranscript, timelineEvents,
  observatoryMetrics, latencyBreakdown, qualitySignals, LiveConversation
} from '../../data/observatoryData'
import ConversationRow from '../../components/app/ui/ConversationRow'
import TranscriptBubble from '../../components/app/ui/TranscriptBubble'
import TelemetryMetric from '../../components/app/ui/TelemetryMetric'

const MONO = "'JetBrains Mono', monospace"
const DISPLAY = 'var(--font-display)'
const BODY = 'var(--font-body)'

const filterOptions = ['All', 'Hindi', 'English', 'Tamil', 'Escalated']



export default function ObservatoryPage() {
  const [selectedCall, setSelectedCall] = useState<LiveConversation>(liveConversations[0])
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = liveConversations.filter(c =>
    (filter === 'All' || c.language === filter || (filter === 'Escalated' && c.status === 'escalated')) &&
    (search === '' || c.id.toLowerCase().includes(search.toLowerCase()) || c.agent.toLowerCase().includes(search.toLowerCase()))
  )

  const totalMs = latencyBreakdown.reduce((a, b) => a + b.ms, 0)

  return (
    <AppShell>
      <div style={{ padding: '40px 32px 60px' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.16em', color: '#9E9E9E', textTransform: 'uppercase', marginBottom: '10px' }}>OBSERVATORY / LIVE</div>
            <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 300, letterSpacing: '-0.03em', color: '#0D0D0D', marginBottom: '6px' }}>Observe every conversation.</h1>
            <p style={{ fontFamily: BODY, fontSize: '14px', fontWeight: 300, color: '#6B6B6B' }}>Real-time visibility into voice agents, latency, language and outcomes.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.20)', borderRadius: '9999px' }}>
              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E' }} />
              <span style={{ fontFamily: BODY, fontSize: '12px', fontWeight: 600, color: '#22C55E' }}>Streaming</span>
            </div>
          </div>
        </div>

        {/* ── Top Metrics Row ── */}
        <div className="metrics-grid" style={{ display: 'flex', gap: '1px', background: '#E0DED9', borderRadius: '14px', overflow: 'hidden', marginBottom: '24px', border: '1px solid #E0DED9' }}>
          {observatoryMetrics.map((m) => (
            <div key={m.label} style={{ flex: 1, background: 'white', padding: '16px 20px' }}>
              <div style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.16em', color: '#9E9E9E', textTransform: 'uppercase', marginBottom: '6px' }}>{m.label}</div>
              <div style={{ fontFamily: DISPLAY, fontSize: '24px', fontWeight: 300, letterSpacing: '-0.03em', color: '#0D0D0D' }}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* ── Three Column Layout ── */}
        <div className="three-col-layout" style={{ display: 'grid', gridTemplateColumns: '280px minmax(0,1fr) 300px', gap: '12px', alignItems: 'start' }}>

          {/* LEFT: Live Conversations */}
          <div style={{ background: 'white', border: '1px solid #E0DED9', borderRadius: '18px', overflow: 'hidden' }}>
            <div style={{ padding: '20px 20px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span style={{ fontFamily: DISPLAY, fontSize: '15px', fontWeight: 500, color: '#0D0D0D' }}>Live conversations</span>
                <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.12em', color: '#FF6B35', textTransform: 'uppercase' }}>27 ACTIVE</span>
              </div>
              {/* Search */}
              <div style={{ position: 'relative', marginBottom: '12px' }}>
                <Search size={13} color="#C8C5C0" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search calls..."
                  style={{ width: '100%', height: '36px', paddingLeft: '32px', paddingRight: '12px', border: '1px solid #E0DED9', borderRadius: '10px', fontFamily: BODY, fontSize: '12px', color: '#0D0D0D', outline: 'none', boxSizing: 'border-box', background: '#FAFAFA' }} />
              </div>
              {/* Filters */}
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {filterOptions.map(f => (
                  <button key={f} onClick={() => setFilter(f)} style={{ padding: '4px 10px', borderRadius: '9999px', border: `1px solid ${filter === f ? '#0D0D0D' : '#E0DED9'}`, background: filter === f ? '#0D0D0D' : 'transparent', color: filter === f ? 'white' : '#6B6B6B', fontFamily: BODY, fontSize: '11px', cursor: 'pointer', transition: 'all 150ms' }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            {/* Conversation list */}
            <div>
              {filtered.map((c) => (
                <ConversationRow 
                  key={c.id} 
                  conversation={c} 
                  isSelected={selectedCall.id === c.id} 
                  onClick={() => setSelectedCall(c)} 
                />
              ))}
            </div>
          </div>

          {/* CENTER: Transcript */}
          <div style={{ background: 'white', border: '1px solid #E0DED9', borderRadius: '18px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid #F0EFED', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: MONO, fontSize: '11px', color: '#0D0D0D', fontWeight: 600, marginBottom: '3px' }}>{selectedCall.id}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E' }} />
                  <span style={{ fontFamily: MONO, fontSize: '9px', color: '#22C55E', letterSpacing: '0.14em' }}>LIVE</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['Mute', 'Pause', 'End'].map(a => (
                  <button key={a} style={{ padding: '6px 12px', borderRadius: '9999px', border: '1px solid #E0DED9', background: 'transparent', fontFamily: BODY, fontSize: '12px', color: '#6B6B6B', cursor: 'pointer', transition: 'all 150ms' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#0D0D0D'; e.currentTarget.style.color = '#0D0D0D' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#E0DED9'; e.currentTarget.style.color = '#6B6B6B' }}>
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: '340px' }}>
              <AnimatePresence>
                {selectedTranscript.map((msg, i) => (
                  <TranscriptBubble key={i} message={msg} index={i} />
                ))}
              </AnimatePresence>
            </div>

            {/* Live waveform */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #F0EFED', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: MONO, fontSize: '9px', color: '#C8C5C0', letterSpacing: '0.12em' }}>LIVE</span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '2px', height: '20px' }}>
                {Array.from({ length: 40 }, (_, i) => i).map((i) => (
                  <motion.div key={i}
                    animate={{ height: [`${Math.random() * 12 + 3}px`, `${Math.random() * 14 + 2}px`, `${Math.random() * 10 + 4}px`] }}
                    transition={{ duration: 0.5 + Math.random() * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.02 }}
                    style={{ width: '2px', borderRadius: '9999px', background: '#E0DED9' }}
                  />
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div style={{ padding: '20px 24px', borderTop: '1px solid #F0EFED' }}>
              <div style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.16em', color: '#9E9E9E', textTransform: 'uppercase', marginBottom: '16px' }}>CONVERSATION TIMELINE</div>
              <div style={{ position: 'relative', paddingLeft: '20px' }}>
                <div style={{ position: 'absolute', left: '6px', top: '6px', bottom: '6px', width: '1px', background: '#F0EFED' }} />
                {timelineEvents.map((ev, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '10px', alignItems: 'flex-start' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: i === timelineEvents.length - 1 ? '#FF6B35' : '#C8C5C0', marginLeft: '-17px', flexShrink: 0, marginTop: '4px' }} />
                    <div>
                      <div style={{ fontFamily: MONO, fontSize: '9px', color: '#C8C5C0', marginBottom: '1px' }}>{ev.time}</div>
                      <div style={{ fontFamily: BODY, fontSize: '12px', color: '#4A4A4A' }}>{ev.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Telemetry */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Latency breakdown */}
            <div style={{ background: 'white', border: '1px solid #E0DED9', borderRadius: '18px', padding: '20px' }}>
              <div style={{ fontFamily: DISPLAY, fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '4px' }}>Call telemetry</div>
              <div style={{ fontFamily: MONO, fontSize: '9px', color: '#9E9E9E', letterSpacing: '0.14em', marginBottom: '16px' }}>LATENCY</div>
              <div style={{ fontFamily: DISPLAY, fontSize: '28px', fontWeight: 300, letterSpacing: '-0.03em', color: '#0D0D0D', marginBottom: '16px' }}>642ms</div>
              {latencyBreakdown.map((l) => (
                <TelemetryMetric 
                  key={l.label} 
                  label={l.label} 
                  ms={l.ms} 
                  totalMs={totalMs} 
                  color={l.color} 
                />
              ))}
            </div>

            {/* Voice/Model info */}
            <div style={{ background: 'white', border: '1px solid #E0DED9', borderRadius: '18px', padding: '20px' }}>
              {[
                { label: 'VOICE',      val: 'Aarohi' },
                { label: 'MODEL',      val: 'Bhasini Voice v2' },
                { label: 'LANGUAGE',   val: 'Hindi' },
                { label: 'CONFIDENCE', val: '96.8%' },
                { label: 'INTENT',     val: 'Claim status' },
                { label: 'SENTIMENT',  val: 'Neutral' },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', marginBottom: '10px', borderBottom: '1px solid #F0EFED' }}>
                  <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em', color: '#9E9E9E', textTransform: 'uppercase' }}>{r.label}</span>
                  <span style={{ fontFamily: BODY, fontSize: '12px', color: '#0D0D0D', fontWeight: 500 }}>{r.val}</span>
                </div>
              ))}
            </div>

            {/* Quality signals */}
            <div style={{ background: 'white', border: '1px solid #E0DED9', borderRadius: '18px', padding: '20px' }}>
              <div style={{ fontFamily: DISPLAY, fontSize: '14px', fontWeight: 500, color: '#0D0D0D', marginBottom: '14px' }}>Quality signals</div>
              {qualitySignals.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: s.ok ? 'rgba(34,197,94,0.10)' : 'rgba(245,158,11,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {s.ok ? <Check size={10} color="#22C55E" /> : <AlertTriangle size={10} color="#F59E0B" />}
                  </div>
                  <span style={{ fontFamily: BODY, fontSize: '12px', color: '#4A4A4A' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .three-col-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .metrics-grid { flex-direction: column !important; }
        }
      `}</style>
    </AppShell>
  )
}
