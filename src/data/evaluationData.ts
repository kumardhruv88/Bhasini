export interface EvalSuite {
  id: string
  name: string
  tests: number
  passRate: number
  lastRun: string
}

export interface TestCase {
  id: string
  title: string
  status: 'passed' | 'failed' | 'pending'
}

export interface EvalMessage {
  speaker: 'USER' | 'AGENT'
  text: string
  language: string
}

export interface EvalRun {
  id: string
  suite: string
  tests: number
  passRate: number
  latency: string
  date: string
}

export interface EvalSignal {
  label: string
  score: number
  status: 'good' | 'warn' | 'fail'
  note: string
}

export const evalMetrics = [
  { label: 'TEST CASES',   value: '128', change: '+8',     positive: true  },
  { label: 'PASSED',       value: '113', change: '+6',     positive: true  },
  { label: 'PASS RATE',    value: '88.3%', change: '+2.1%', positive: true },
  { label: 'AVG LATENCY',  value: '684ms', change: '-11ms', positive: true },
]

export const evalSuites: EvalSuite[] = [
  { id: 'es1', name: 'Hindi Customer Support',  tests: 32, passRate: 94, lastRun: '12 min ago'  },
  { id: 'es2', name: 'Intent Recognition',       tests: 48, passRate: 91, lastRun: '24 min ago' },
  { id: 'es3', name: 'Adversarial Conversations',tests: 24, passRate: 79, lastRun: '1 hr ago'   },
  { id: 'es4', name: 'Multilingual Switching',   tests: 24, passRate: 88, lastRun: '2 hrs ago'  },
]

export const testCases: TestCase[] = [
  { id: 'TC-001', title: 'Claim status request', status: 'passed' },
  { id: 'TC-002', title: 'Angry customer',        status: 'passed' },
  { id: 'TC-003', title: 'Language switch',        status: 'passed' },
  { id: 'TC-004', title: 'Invalid claim ID',       status: 'failed' },
  { id: 'TC-005', title: 'Escalation trigger',     status: 'pending' },
  { id: 'TC-006', title: 'Multiple intents',       status: 'passed' },
]

export const simulationMessages: EvalMessage[] = [
  { speaker: 'USER',  text: 'Hindi mein baat karte hain.',      language: 'Hindi'  },
  { speaker: 'AGENT', text: 'Bilkul, main Hindi mein baat karta hoon. Kya seva chahiye aapko?', language: 'Hindi' },
  { speaker: 'USER',  text: 'Actually Tamil la pesalama?',      language: 'Tamil'  },
  { speaker: 'AGENT', text: 'ஆம், தமிழில் பேசலாம். நான் உதவ தயார்.', language: 'Tamil' },
]

export const evalSignals: EvalSignal[] = [
  { label: 'Intent accuracy',      score: 98, status: 'good', note: 'Correctly identified intent in all turns' },
  { label: 'Language accuracy',    score: 96, status: 'good', note: 'Language switch detected in 1.2s'         },
  { label: 'Response relevance',   score: 94, status: 'good', note: 'Responses were contextually appropriate'  },
  { label: 'Hallucination risk',   score: 97, status: 'good', note: 'No factual drift detected'                },
  { label: 'Latency',              score: 91, status: 'good', note: 'Avg 641ms, within SLA threshold'          },
  { label: 'Interruption handling',score: 88, status: 'warn', note: 'Minor overlap in turn 2'                  },
  { label: 'Tone consistency',     score: 89, status: 'good', note: 'Professional tone maintained'             },
]

export const recentRuns: EvalRun[] = [
  { id: '#RUN-1284', suite: 'Hindi Customer Support',  tests: 32, passRate: 94, latency: '641ms', date: 'Today, 18:42' },
  { id: '#RUN-1283', suite: 'Intent Recognition',       tests: 48, passRate: 91, latency: '688ms', date: 'Today, 17:20' },
  { id: '#RUN-1282', suite: 'Adversarial Conversations',tests: 24, passRate: 79, latency: '712ms', date: 'Today, 15:00' },
  { id: '#RUN-1281', suite: 'Multilingual Switching',   tests: 24, passRate: 88, latency: '664ms', date: 'Yesterday, 22:10' },
]
