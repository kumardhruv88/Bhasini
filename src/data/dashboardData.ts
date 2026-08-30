export interface Agent {
  id: string
  name: string
  status: 'live' | 'paused' | 'offline'
  type: string
  languages: string[]
  calls: number
  resolutionRate: number
  latency: number
  lastActive: string
}

export interface CallRow {
  time: string
  agent: string
  language: string
  duration: string
  outcome: 'Resolved' | 'Escalated' | 'Failed'
  latency: string
}

export interface KPI {
  label: string
  value: string
  change: string
  positive: boolean
  sparkline: number[]
}

export const kpis: KPI[] = [
  { label: 'CALLS / 24H', value: '12,842', change: '+18.4% from yesterday', positive: true,
    sparkline: [60, 72, 65, 80, 91, 78, 95, 88, 102, 115, 108, 124] },
  { label: 'SUCCESSFUL', value: '11,903', change: '+12.8% from yesterday', positive: true,
    sparkline: [55, 68, 60, 74, 84, 72, 88, 81, 96, 108, 100, 116] },
  { label: 'AVG LATENCY', value: '642ms', change: '-8.2% improvement', positive: true,
    sparkline: [80, 74, 78, 70, 68, 72, 65, 69, 63, 66, 62, 64] },
  { label: 'RESOLUTION RATE', value: '91.7%', change: '+4.6% from yesterday', positive: true,
    sparkline: [82, 84, 83, 86, 87, 85, 89, 88, 90, 91, 90, 92] },
]

export const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  calls:    [9200, 10400, 11100, 9800, 12100, 11500, 12842],
  resolved: [8400, 9600, 10300, 8900, 11200, 10600, 11903],
}

export const liveLanguages = [
  { lang: 'Hindi',   count: 14 },
  { lang: 'English', count: 6  },
  { lang: 'Tamil',   count: 4  },
  { lang: 'Telugu',  count: 3  },
]

export const agents: Agent[] = [
  { id: 'a1', name: 'BharatCare Support', status: 'live', type: 'Customer Support', languages: ['Hindi', 'English', 'Hinglish'], calls: 4291, resolutionRate: 93.4, latency: 581, lastActive: '12 sec ago' },
  { id: 'a2', name: 'RailAssist', status: 'live', type: 'Travel & Transit', languages: ['Hindi', 'Marathi', 'English'], calls: 2840, resolutionRate: 89.1, latency: 624, lastActive: '28 sec ago' },
  { id: 'a3', name: 'Kisan Mitra', status: 'live', type: 'Agriculture', languages: ['Hindi', 'Punjabi', 'Haryanvi'], calls: 1932, resolutionRate: 91.8, latency: 698, lastActive: '1 min ago' },
  { id: 'a4', name: 'FinServe Assistant', status: 'paused', type: 'Banking & Finance', languages: ['Hindi', 'English', 'Tamil'], calls: 3779, resolutionRate: 87.6, latency: 542, lastActive: '14 min ago' },
]

export const recentCalls: CallRow[] = [
  { time: '19:42', agent: 'BharatCare Support', language: 'Hindi',   duration: '04:28', outcome: 'Resolved',  latency: '612ms' },
  { time: '19:38', agent: 'RailAssist',         language: 'Marathi', duration: '02:51', outcome: 'Resolved',  latency: '584ms' },
  { time: '19:31', agent: 'Kisan Mitra',        language: 'Hindi',   duration: '06:12', outcome: 'Escalated', latency: '721ms' },
  { time: '19:27', agent: 'FinServe Assistant', language: 'English', duration: '01:48', outcome: 'Resolved',  latency: '491ms' },
  { time: '19:19', agent: 'BharatCare Support', language: 'Hinglish',duration: '03:14', outcome: 'Resolved',  latency: '628ms' },
  { time: '19:11', agent: 'RailAssist',         language: 'Hindi',   duration: '05:07', outcome: 'Failed',    latency: '841ms' },
]
