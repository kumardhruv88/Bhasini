import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import AppShell from '../../components/app/AppShell'
import { kpis, chartData, liveLanguages, agents, recentCalls } from '../../data/dashboardData'
import MetricCard from '../../components/app/ui/MetricCard'
import AgentCard from '../../components/app/ui/AgentCard'
import Skeleton from '../../components/app/ui/Skeleton'

const MONO = "'JetBrains Mono', monospace"
const DISPLAY = 'var(--font-display)'
const BODY = 'var(--font-body)'



// ── SVG Chart ──
function PerformanceChart() {
  const data = chartData
  const max = Math.max(...data.calls)
  const w = 560; const h = 260; const padLeft = 0; const padBottom = 24
  const drawLine = (vals: number[], color: string, opacity = 1) => {
    const pts = vals.map((v, i) => {
      const x = padLeft + (i / (vals.length - 1)) * (w - padLeft)
      const y = ((max - v) / max) * (h - padBottom)
      return `${x},${y}`
    }).join(' ')
    return <polyline points={pts} stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={opacity} />
  }
  return (
    <div style={{ position: 'relative' }}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: `${h}px`, overflow: 'visible' }}>
        {/* Grid lines */}
        {[0, 1, 2, 3].map(i => {
          const y = (i / 3) * (h - padBottom)
          return <line key={i} x1={0} y1={y} x2={w} y2={y} stroke="#F0EFED" strokeWidth="1" />
        })}
        {drawLine(data.calls, '#0D0D0D')}
        {drawLine(data.resolved, '#FF6B35', 0.7)}
        {/* X labels */}
        {data.labels.map((l, i) => (
          <text key={i} x={padLeft + (i / (data.labels.length - 1)) * (w - padLeft)} y={h - 4} textAnchor="middle" fontSize="10" fontFamily={MONO} fill="#C8C5C0" letterSpacing="0.08em">{l}</text>
        ))}
      </svg>
      {/* Legend */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '12px' }}>
        {[{ color: '#0D0D0D', label: 'Calls' }, { color: '#FF6B35', label: 'Resolved' }].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '20px', height: '2px', background: l.color, borderRadius: '9999px' }} />
            <span style={{ fontFamily: BODY, fontSize: '11px', color: '#9E9E9E' }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const [chartRange, setChartRange] = useState<'7D' | '30D' | '90D'>('7D')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <AppShell>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '48px 32px 80px' }}>
          <div style={{ marginBottom: '40px' }}>
            <Skeleton width="200px" height="12px" style={{ marginBottom: '16px' }} />
            <Skeleton width="400px" height="44px" style={{ marginBottom: '12px' }} />
            <Skeleton width="300px" height="16px" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
            {[1, 2, 3, 4].map(i => <Skeleton key={i} height="150px" borderRadius="18px" />)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <Skeleton height="350px" borderRadius="18px" />
            <Skeleton height="350px" borderRadius="18px" />
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '48px 32px 80px' }}>

        {/* ── Page Header ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.16em', color: '#9E9E9E', textTransform: 'uppercase', marginBottom: '10px' }}>
              ● WORKSPACE OVERVIEW
            </div>
            <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 300, letterSpacing: '-0.035em', lineHeight: 1.08, color: '#0D0D0D', marginBottom: '8px' }}>
              Good evening, Dhruv.
            </h1>
            <p style={{ fontFamily: BODY, fontSize: '15px', fontWeight: 300, color: '#6B6B6B' }}>
              Here's what your voice agents are doing today.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            <button onClick={() => navigate('/agents')} style={{ height: '44px', padding: '0 20px', background: '#0D0D0D', color: 'white', border: 'none', borderRadius: '9999px', fontFamily: BODY, fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'transform 150ms, box-shadow 150ms' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
              <Plus size={14} /> Create voice agent
            </button>
            <button style={{ height: '44px', padding: '0 20px', background: 'transparent', border: '1px solid #E0DED9', borderRadius: '9999px', fontFamily: BODY, fontSize: '13px', color: '#4A4A4A', cursor: 'pointer', transition: 'border-color 150ms' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#C8C5C0'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#E0DED9'}>
              View documentation
            </button>
          </div>
        </div>

        {/* ── Section 1: KPI Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {kpis.map((kpi) => <MetricCard key={kpi.label} {...kpi} />)}
        </div>

        {/* ── Section 2: Agent Performance + Live Status ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '24px' }}>

          {/* Left: chart */}
          <div style={{ background: 'white', border: '1px solid #E0DED9', borderRadius: '18px', padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontFamily: DISPLAY, fontSize: '18px', fontWeight: 400, color: '#0D0D0D', marginBottom: '4px', letterSpacing: '-0.01em' }}>Agent performance</h2>
                <p style={{ fontFamily: BODY, fontSize: '13px', color: '#9E9E9E', fontWeight: 300 }}>Conversation volume and resolution over the last 7 days.</p>
              </div>
              {/* Range toggle */}
              <div style={{ display: 'inline-flex', background: '#EFEFED', borderRadius: '9999px', padding: '3px', gap: '2px' }}>
                {(['7D', '30D', '90D'] as const).map(r => (
                  <button key={r} onClick={() => setChartRange(r)} style={{ padding: '6px 14px', borderRadius: '9999px', border: 'none', cursor: 'pointer', fontFamily: BODY, fontSize: '12px', fontWeight: chartRange === r ? 600 : 400, background: chartRange === r ? 'white' : 'transparent', color: chartRange === r ? '#0D0D0D' : '#9E9E9E', boxShadow: chartRange === r ? '0 1px 3px rgba(0,0,0,0.07)' : 'none', transition: 'all 150ms' }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <PerformanceChart />
          </div>

          {/* Right: Live Now white card */}
          <div style={{ background: 'white', border: '1px solid #E0DED9', borderRadius: '18px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontFamily: DISPLAY, fontSize: '18px', fontWeight: 400, color: '#0D0D0D', letterSpacing: '-0.01em' }}>Live now</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                  style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E' }} />
                <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.16em', color: '#9E9E9E', textTransform: 'uppercase' }}>REAL-TIME</span>
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontFamily: DISPLAY, fontSize: '48px', fontWeight: 300, color: '#0D0D0D', letterSpacing: '-0.04em', lineHeight: 1 }}>27</span>
              <div style={{ fontFamily: BODY, fontSize: '13px', color: '#9E9E9E', marginTop: '4px' }}>active conversations</div>
            </div>
            {liveLanguages.map((l) => (
              <div key={l.lang} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontFamily: BODY, fontSize: '12px', color: '#6B6B6B' }}>{l.lang}</span>
                  <span style={{ fontFamily: MONO, fontSize: '11px', color: '#9E9E9E' }}>{l.count}</span>
                </div>
                <div style={{ height: '3px', background: '#F0EFED', borderRadius: '9999px' }}>
                  <div style={{ height: '100%', width: `${(l.count / 27) * 100}%`, background: '#FF6B35', borderRadius: '9999px', transition: 'width 0.5s ease' }} />
                </div>
              </div>
            ))}
            <button onClick={() => navigate('/app/observatory')}
              style={{ marginTop: 'auto', paddingTop: '16px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: BODY, fontSize: '13px', fontWeight: 500, color: '#FF6B35', padding: 0 }}>
              Open Observatory <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* ── Section 3: Your Agents ── */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontFamily: DISPLAY, fontSize: '20px', fontWeight: 400, color: '#0D0D0D', marginBottom: '3px', letterSpacing: '-0.01em' }}>Your agents</h2>
              <p style={{ fontFamily: BODY, fontSize: '13px', color: '#9E9E9E', fontWeight: 300 }}>Monitor the agents currently deployed in your workspace.</p>
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: BODY, fontSize: '13px', color: '#FF6B35', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View all <ArrowUpRight size={13} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {agents.map((agent) => (
              <AgentCard key={agent.id} {...agent} />
            ))}
          </div>
        </div>

        {/* ── Section 4: Recent Conversations ── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontFamily: DISPLAY, fontSize: '20px', fontWeight: 400, color: '#0D0D0D', marginBottom: '3px', letterSpacing: '-0.01em' }}>Recent conversations</h2>
              <p style={{ fontFamily: BODY, fontSize: '13px', color: '#9E9E9E', fontWeight: 300 }}>Latest calls across your deployed agents.</p>
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: BODY, fontSize: '13px', color: '#FF6B35', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View all calls <ArrowUpRight size={13} />
            </button>
          </div>
          <div style={{ background: 'white', border: '1px solid #E0DED9', borderRadius: '18px', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px 80px 100px 90px', gap: '16px', padding: '12px 24px', borderBottom: '1px solid #F0EFED' }}>
              {['TIME', 'AGENT', 'LANGUAGE', 'DURATION', 'OUTCOME', 'LATENCY'].map(h => (
                <span key={h} style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em', color: '#C8C5C0', textTransform: 'uppercase' }}>{h}</span>
              ))}
            </div>
            {recentCalls.map((call, i) => {
              const outcomeColor = call.outcome === 'Resolved' ? '#22C55E' : call.outcome === 'Escalated' ? '#FF6B35' : '#EF4444'
              const outcomeBg = call.outcome === 'Resolved' ? 'rgba(34,197,94,0.08)' : call.outcome === 'Escalated' ? 'rgba(255,107,53,0.08)' : 'rgba(239,68,68,0.08)'
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px 80px 100px 90px', gap: '16px', padding: '0 24px', height: '58px', alignItems: 'center', borderBottom: i < recentCalls.length - 1 ? '1px solid #F0EFED' : 'none', transition: 'background 150ms', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <span style={{ fontFamily: MONO, fontSize: '11px', color: '#9E9E9E' }}>{call.time}</span>
                  <span style={{ fontFamily: BODY, fontSize: '13px', color: '#0D0D0D', fontWeight: 400 }}>{call.agent}</span>
                  <span style={{ fontFamily: BODY, fontSize: '12px', padding: '3px 10px', background: '#F7F5F2', border: '1px solid #E0DED9', borderRadius: '9999px', color: '#6B6B6B', width: 'fit-content' }}>{call.language}</span>
                  <span style={{ fontFamily: MONO, fontSize: '11px', color: '#6B6B6B' }}>{call.duration}</span>
                  <span style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 600, padding: '3px 10px', background: outcomeBg, borderRadius: '9999px', color: outcomeColor, width: 'fit-content' }}>{call.outcome}</span>
                  <span style={{ fontFamily: MONO, fontSize: '11px', color: '#9E9E9E' }}>{call.latency}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .kpi-grid { grid-template-columns: repeat(2,1fr) !important; }
          .agent-grid { grid-template-columns: repeat(2,1fr) !important; }
          .perf-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .kpi-grid, .agent-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AppShell>
  )
}
