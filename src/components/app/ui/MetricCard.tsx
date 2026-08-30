import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

// Tiny SVG sparkline
function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  if (!data || data.length === 0) return null
  
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 80; const h = 28
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * h
    return `${x},${y}`
  }).join(' ')
  
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline points={pts} stroke={positive ? '#22C55E' : '#EF4444'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

interface MetricCardProps {
  label: string
  value: string | number
  change?: string
  positive?: boolean
  sparkline?: number[]
}

export default function MetricCard({ label, value, change, positive = true, sparkline }: MetricCardProps) {
  return (
    <motion.div whileHover={{ y: -2 }} style={{
      background: 'white', border: '1px solid #E0DED9', borderRadius: '18px',
      padding: '22px', minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', fontWeight: 500, letterSpacing: '0.16em', color: '#9E9E9E', textTransform: 'uppercase' }}>
          {label}
        </span>
        {change && (
          positive ? <TrendingUp size={14} color="#22C55E" strokeWidth={1.75} /> : <TrendingDown size={14} color="#EF4444" strokeWidth={1.75} />
        )}
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 300, letterSpacing: '-0.03em', color: '#0D0D0D', lineHeight: 1, marginBottom: '6px' }}>
          {value}
        </div>
        {(change || sparkline) && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {change && (
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: positive ? '#22C55E' : '#EF4444', fontWeight: 500 }}>
                {change}
              </span>
            )}
            {sparkline && <Sparkline data={sparkline} positive={positive} />}
          </div>
        )}
      </div>
    </motion.div>
  )
}
