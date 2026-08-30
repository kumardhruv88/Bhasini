interface TelemetryMetricProps {
  label: string
  ms: number
  totalMs: number
  color: string
}

export default function TelemetryMetric({ label, ms, totalMs, color }: TelemetryMetricProps) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#9E9E9E', letterSpacing: '0.12em' }}>
          {label}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#4A4A4A' }}>
          {ms}ms
        </span>
      </div>
      <div style={{ height: '4px', background: '#F0EFED', borderRadius: '9999px' }}>
        <div style={{ height: '100%', width: `${(ms / totalMs) * 100}%`, background: color, borderRadius: '9999px' }} />
      </div>
    </div>
  )
}
