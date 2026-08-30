import { useState, useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { Search, Play, Check, X } from 'lucide-react'
import AppShell from '../../components/app/AppShell'
import { evalMetrics, evalSuites, testCases, simulationMessages, evalSignals, recentRuns, EvalSuite, TestCase } from '../../data/evaluationData'
import MetricCard from '../../components/app/ui/MetricCard'
import TranscriptBubble from '../../components/app/ui/TranscriptBubble'

const MONO = "'JetBrains Mono', monospace"
const DISPLAY = 'var(--font-display)'
const BODY = 'var(--font-body)'

type RunState = 'idle' | 'running' | 'done'

function AnimatedScore({ value }: { value: number }) {
  const spring = useSpring(0, { bounce: 0, duration: 1500 })
  const display = useTransform(spring, (current) => Math.round(current))

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  return <motion.span>{display}</motion.span>
}

export default function EvalPage() {
  const [selectedSuite, setSelectedSuite] = useState<EvalSuite>(evalSuites[0])
  const [selectedTest, setSelectedTest] = useState<TestCase>(testCases[0])
  const [runnerOpen, setRunnerOpen] = useState(false)
  const [runState, setRunState] = useState<RunState>('idle')
  const [testSearch, setTestSearch] = useState('')

  const handleRunTest = () => {
    setRunState('running')
    setTimeout(() => setRunState('done'), 2200)
  }

  const filteredTests = testCases.filter(t =>
    testSearch === '' || t.title.toLowerCase().includes(testSearch.toLowerCase()) || t.id.toLowerCase().includes(testSearch.toLowerCase())
  )

  const statusIcon = (status: TestCase['status']) => {
    if (status === 'passed') return <Check size={12} color="#22C55E" />
    if (status === 'failed') return <X size={12} color="#EF4444" />
    return <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C8C5C0', border: '2px solid #E0DED9' }} />
  }

  const signalColor = (s: typeof evalSignals[0]['status']) =>
    s === 'good' ? '#22C55E' : s === 'warn' ? '#F59E0B' : '#EF4444'

  return (
    <AppShell>
      <div style={{ padding: '40px 32px 60px' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.16em', color: '#9E9E9E', textTransform: 'uppercase', marginBottom: '10px' }}>EVALUATION KIT</div>
            <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 300, letterSpacing: '-0.03em', color: '#0D0D0D', marginBottom: '6px' }}>Test before you deploy.</h1>
            <p style={{ fontFamily: BODY, fontSize: '14px', fontWeight: 300, color: '#6B6B6B', maxWidth: '520px' }}>
              Run structured conversations against your voice agent and measure accuracy, latency and quality.
            </p>
          </div>
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
            style={{ height: '44px', padding: '0 20px', background: '#0D0D0D', color: 'white', border: 'none', borderRadius: '9999px', fontFamily: BODY, fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            + New evaluation
          </motion.button>
        </div>

        {/* ── Eval Metrics ── */}
        <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '32px' }}>
          {evalMetrics.map((m) => (
            <MetricCard key={m.label} label={m.label} value={m.value} change={m.change} positive={m.positive} />
          ))}
        </div>

        {/* ── Suites grid ── */}
        {!runnerOpen && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontFamily: DISPLAY, fontSize: '20px', fontWeight: 400, color: '#0D0D0D', letterSpacing: '-0.01em', marginBottom: '4px' }}>Evaluation suites</h2>
              <p style={{ fontFamily: BODY, fontSize: '13px', color: '#9E9E9E', fontWeight: 300 }}>Reusable test scenarios for your agents.</p>
            </div>
            <div className="suites-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}>
              {evalSuites.map((suite) => (
                <motion.div key={suite.id} whileHover={{ y: -2 }} style={{ background: 'white', border: `1px solid ${selectedSuite.id === suite.id ? '#0D0D0D' : '#E0DED9'}`, borderRadius: '18px', padding: '20px', cursor: 'pointer', transition: 'border-color 150ms' }}
                  onClick={() => { setSelectedSuite(suite); setRunnerOpen(true); setRunState('idle') }}>
                  <div style={{ fontFamily: DISPLAY, fontSize: '14px', fontWeight: 500, color: '#0D0D0D', marginBottom: '14px', letterSpacing: '-0.01em' }}>{suite.name}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                    {[{ l: 'Tests', v: suite.tests }, { l: 'Pass rate', v: `${suite.passRate}%` }].map(s => (
                      <div key={s.l}>
                        <div style={{ fontFamily: DISPLAY, fontSize: '20px', fontWeight: 300, color: '#0D0D0D', letterSpacing: '-0.02em' }}>{s.v}</div>
                        <div style={{ fontFamily: MONO, fontSize: '9px', color: '#9E9E9E', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontFamily: BODY, fontSize: '11px', color: '#C8C5C0', marginBottom: '14px' }}>Last run {suite.lastRun}</div>
                  <div style={{ borderTop: '1px solid #F0EFED', paddingTop: '14px', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: BODY, fontSize: '12px', color: '#FF6B35', fontWeight: 500, cursor: 'pointer' }}>
                    Run suite →
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ── Evaluation Runner ── */}
        {runnerOpen && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <button onClick={() => { setRunnerOpen(false); setRunState('idle') }}
                style={{ fontFamily: BODY, fontSize: '13px', color: '#FF6B35', background: 'none', border: 'none', cursor: 'pointer' }}>← Back to suites</button>
              <span style={{ fontFamily: DISPLAY, fontSize: '16px', fontWeight: 500, color: '#0D0D0D' }}>{selectedSuite.name}</span>
            </div>

            <div className="eval-layout" style={{ display: 'grid', gridTemplateColumns: '260px minmax(0,1fr) 280px', gap: '12px', alignItems: 'start' }}>

              {/* LEFT: Test Cases */}
              <div style={{ background: 'white', border: '1px solid #E0DED9', borderRadius: '18px', overflow: 'hidden' }}>
                <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #F0EFED' }}>
                  <div style={{ fontFamily: DISPLAY, fontSize: '14px', fontWeight: 500, color: '#0D0D0D', marginBottom: '10px' }}>Test cases</div>
                  <div style={{ position: 'relative' }}>
                    <Search size={12} color="#C8C5C0" style={{ position: 'absolute', left: '9px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input value={testSearch} onChange={e => setTestSearch(e.target.value)} placeholder="Search test cases..."
                      style={{ width: '100%', height: '32px', paddingLeft: '28px', paddingRight: '10px', border: '1px solid #E0DED9', borderRadius: '9px', fontFamily: BODY, fontSize: '12px', color: '#0D0D0D', outline: 'none', boxSizing: 'border-box', background: '#FAFAFA' }} />
                  </div>
                </div>
                {filteredTests.map((tc) => {
                  const isActive = selectedTest.id === tc.id
                  return (
                    <div key={tc.id} onClick={() => setSelectedTest(tc)}
                      style={{ padding: '12px 16px', cursor: 'pointer', borderLeft: isActive ? '3px solid #FF6B35' : '3px solid transparent', background: isActive ? '#FAFAFA' : 'transparent', borderBottom: '1px solid #F0EFED', transition: 'all 150ms', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: tc.status === 'passed' ? 'rgba(34,197,94,0.10)' : tc.status === 'failed' ? 'rgba(239,68,68,0.10)' : '#F0EFED', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {statusIcon(tc.status)}
                      </div>
                      <div>
                        <div style={{ fontFamily: MONO, fontSize: '9px', color: '#C8C5C0' }}>{tc.id}</div>
                        <div style={{ fontFamily: BODY, fontSize: '12px', color: '#0D0D0D' }}>{tc.title}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* CENTER: Simulation */}
              <div style={{ background: 'white', border: '1px solid #E0DED9', borderRadius: '18px', overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #F0EFED' }}>
                  <div style={{ fontFamily: DISPLAY, fontSize: '15px', fontWeight: 500, color: '#0D0D0D', marginBottom: '4px' }}>
                    {selectedTest.id} · {selectedTest.title}
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: '9px', color: '#9E9E9E', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>EXPECTED:</div>
                  <div style={{ fontFamily: BODY, fontSize: '12px', color: '#6B6B6B', fontWeight: 300 }}>Agent should correctly switch from Hindi to Tamil.</div>
                </div>
                <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '260px' }}>
                  {simulationMessages.map((msg, i) => (
                    <TranscriptBubble key={i} message={msg as any} index={i} />
                  ))}
                </div>
                <div style={{ padding: '16px 24px', borderTop: '1px solid #F0EFED', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={handleRunTest} disabled={runState === 'running'}
                    style={{ height: '40px', padding: '0 20px', background: '#0D0D0D', color: 'white', border: 'none', borderRadius: '9999px', fontFamily: BODY, fontSize: '13px', fontWeight: 500, cursor: runState === 'running' ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {runState === 'running' ? (
                      <><div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', animation: 'spin 0.8s linear infinite' }} /> Running...</>
                    ) : (
                      <><Play size={13} /> Run test</>
                    )}
                  </motion.button>
                  {runState === 'done' && <span style={{ fontFamily: BODY, fontSize: '12px', color: '#22C55E', fontWeight: 500 }}>Test complete</span>}
                </div>
              </div>

              {/* RIGHT: Evaluation Result */}
              <div style={{ background: '#0D0D0D', borderRadius: '18px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '12px' }}>EVALUATION</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                    <span style={{ fontFamily: DISPLAY, fontSize: '48px', fontWeight: 300, color: 'white', letterSpacing: '-0.04em', lineHeight: 1 }}>
                      <AnimatedScore value={94} />
                    </span>
                    <span style={{ fontFamily: BODY, fontSize: '18px', color: 'rgba(255,255,255,0.40)' }}>/100</span>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.20)', borderRadius: '9999px' }}>
                    <Check size={11} color="#22C55E" />
                    <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em', color: '#22C55E', textTransform: 'uppercase', fontWeight: 600 }}>PASS</span>
                  </div>
                </div>

                {/* Score bars */}
                <div>
                  {[{ label: 'Accuracy', score: 98 }, { label: 'Latency', score: 91 }, { label: 'Language', score: 96 }, { label: 'Tone', score: 89 }].map((s) => (
                    <div key={s.label} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontFamily: BODY, fontSize: '12px', color: 'rgba(255,255,255,0.60)' }}>{s.label}</span>
                        <span style={{ fontFamily: MONO, fontSize: '10px', color: 'rgba(255,255,255,0.80)' }}>{s.score}%</span>
                      </div>
                      <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${s.score}%` }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
                          style={{ height: '100%', background: s.score >= 90 ? '#22C55E' : '#F59E0B', borderRadius: '9999px' }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontFamily: BODY, fontSize: '12px', color: 'rgba(255,255,255,0.60)', lineHeight: 1.6, fontWeight: 300 }}>
                    "Agent correctly detected the language switch and responded in Tamil within the expected latency."
                  </div>
                </div>

                {/* Signals */}
                <div>
                  <div style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.30)', textTransform: 'uppercase', marginBottom: '12px' }}>EVALUATION SIGNALS</div>
                  {evalSignals.map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: signalColor(s.status), flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: BODY, fontSize: '11px', color: 'rgba(255,255,255,0.75)', marginBottom: '1px' }}>{s.label}</div>
                        <div style={{ fontFamily: BODY, fontSize: '10px', color: 'rgba(255,255,255,0.30)', fontWeight: 300 }}>{s.note}</div>
                      </div>
                      <span style={{ fontFamily: MONO, fontSize: '10px', color: signalColor(s.status) }}>{s.score}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Recent Runs table ── */}
        <div>
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontFamily: DISPLAY, fontSize: '20px', fontWeight: 400, color: '#0D0D0D', letterSpacing: '-0.01em', marginBottom: '4px' }}>Recent runs</h2>
            <p style={{ fontFamily: BODY, fontSize: '13px', color: '#9E9E9E', fontWeight: 300 }}>History of evaluation runs across all suites.</p>
          </div>
          <div style={{ background: 'white', border: '1px solid #E0DED9', borderRadius: '18px', overflowX: 'auto' }}>
            <div style={{ minWidth: '800px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px 100px 100px 160px', gap: '16px', padding: '12px 24px', borderBottom: '1px solid #F0EFED', background: '#FAFAFA' }}>
              {['RUN', 'SUITE', 'TESTS', 'PASS RATE', 'LATENCY', 'DATE'].map(h => (
                <span key={h} style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em', color: '#C8C5C0', textTransform: 'uppercase' }}>{h}</span>
              ))}
            </div>
            {recentRuns.map((run, i) => (
              <div key={run.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px 100px 100px 160px', gap: '16px', padding: '0 24px', height: '56px', alignItems: 'center', borderBottom: i < recentRuns.length - 1 ? '1px solid #F0EFED' : 'none', cursor: 'pointer', transition: 'background 150ms' }}
                onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <span style={{ fontFamily: MONO, fontSize: '11px', color: '#6B6B6B' }}>{run.id}</span>
                <span style={{ fontFamily: BODY, fontSize: '13px', color: '#0D0D0D' }}>{run.suite}</span>
                <span style={{ fontFamily: MONO, fontSize: '11px', color: '#9E9E9E' }}>{run.tests}</span>
                <span style={{ fontFamily: BODY, fontSize: '12px', fontWeight: 600, padding: '3px 10px', background: 'rgba(34,197,94,0.08)', borderRadius: '9999px', color: '#22C55E', width: 'fit-content' }}>{run.passRate}%</span>
                <span style={{ fontFamily: MONO, fontSize: '11px', color: '#9E9E9E' }}>{run.latency}</span>
                <span style={{ fontFamily: BODY, fontSize: '12px', color: '#9E9E9E' }}>{run.date}</span>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 1100px) {
          .metrics-grid, .suites-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .eval-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .metrics-grid, .suites-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AppShell>
  )
}
