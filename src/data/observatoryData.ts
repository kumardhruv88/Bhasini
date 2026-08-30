export interface LiveConversation {
  id: string
  agent: string
  language: string
  duration: string
  status: 'live' | 'resolved' | 'escalated'
}

export interface TranscriptMessage {
  speaker: 'USER' | 'AGENT'
  text: string
  timestamp: string
  language: string
}

export interface TimelineEvent {
  time: string
  event: string
}

export const liveConversations: LiveConversation[] = [
  { id: '#CALL-8291', agent: 'BharatCare', language: 'Hindi',   duration: '02:41', status: 'live' },
  { id: '#CALL-8290', agent: 'RailAssist', language: 'Marathi', duration: '01:28', status: 'live' },
  { id: '#CALL-8289', agent: 'Kisan Mitra', language: 'Punjabi', duration: '04:02', status: 'live' },
  { id: '#CALL-8288', agent: 'FinServe', language: 'English', duration: '00:47', status: 'live' },
  { id: '#CALL-8287', agent: 'BharatCare', language: 'Hinglish', duration: '03:18', status: 'escalated' },
  { id: '#CALL-8286', agent: 'RailAssist', language: 'Tamil',  duration: '02:09', status: 'live' },
]

export const selectedTranscript: TranscriptMessage[] = [
  { speaker: 'USER',  text: 'Mujhe apne claim ka status check karna hai.',               timestamp: '19:42:01', language: 'Hindi' },
  { speaker: 'AGENT', text: 'Bilkul. Main aapka claim status check karta hoon. Kripya apna policy number bataiye.',  timestamp: '19:42:03', language: 'Hindi' },
  { speaker: 'USER',  text: 'Policy number hai P-4872934.',                              timestamp: '19:42:10', language: 'Hindi' },
  { speaker: 'AGENT', text: 'Dhanyavaad. Aapka claim #CLM-28741 currently under review hai. 3-5 business days mein update aayega.', timestamp: '19:42:14', language: 'Hindi' },
  { speaker: 'USER',  text: 'Koi urgent issue hai toh kya karna chahiye?',               timestamp: '19:42:20', language: 'Hindi' },
  { speaker: 'AGENT', text: 'Urgent cases ke liye aap 1800-XXX-XXXX pe call kar sakte hain. Main ticket escalate kar deta hoon.', timestamp: '19:42:24', language: 'Hindi' },
]

export const timelineEvents: TimelineEvent[] = [
  { time: '19:40:01', event: 'Call connected' },
  { time: '19:40:03', event: 'Language detected → Hindi' },
  { time: '19:40:07', event: 'Intent → Claim status' },
  { time: '19:40:18', event: 'Agent response generated' },
  { time: '19:41:12', event: 'Knowledge base queried' },
  { time: '19:42:18', event: 'User speaking' },
]

export const observatoryMetrics = [
  { label: 'ACTIVE CALLS', value: '27' },
  { label: 'CALLS / MIN',  value: '18.4' },
  { label: 'AVG LATENCY',  value: '642ms' },
  { label: 'ERROR RATE',   value: '0.8%' },
  { label: 'LANGUAGES',    value: '8' },
]

export const latencyBreakdown = [
  { label: 'STT',     ms: 108, color: '#FF6B35' },
  { label: 'LLM',     ms: 281, color: '#0D0D0D' },
  { label: 'TTS',     ms: 173, color: '#6B6B6B' },
  { label: 'Network', ms:  80, color: '#C8C5C0' },
]

export const qualitySignals = [
  { label: 'No interruption',   ok: true  },
  { label: 'Intent matched',    ok: true  },
  { label: 'Language detected', ok: true  },
  { label: 'Long response',     ok: false },
]
