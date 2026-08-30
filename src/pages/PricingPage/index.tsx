import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Plus, Minus } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'

interface PricingFeature { text: string; included: boolean; note?: string }
interface PricingTier {
  id: string; name: string; badge?: string
  monthlyPrice: number | null; annualPrice: number | null
  description: string; cta: string
  ctaVariant: 'primary' | 'ghost' | 'enterprise'
  highlighted: boolean
  features: PricingFeature[]
  limits: { calls: string; languages: string; latency: string; voices: string }
}

const tiers: PricingTier[] = [
  {
    id: 'free', name: 'Free', monthlyPrice: 0, annualPrice: 0,
    description: 'Perfect for exploring Bhasini and building your first voice agent.',
    cta: 'Get started free', ctaVariant: 'ghost', highlighted: false,
    limits: { calls: '500 calls/month', languages: '3 languages', latency: 'Standard', voices: '10 voices' },
    features: [
      { text: '500 voice agent calls', included: true },
      { text: '3 Indian languages', included: true },
      { text: 'BhasiniCreative basic access', included: true },
      { text: 'Community support', included: true },
      { text: 'API access', included: true },
      { text: 'Custom voice cloning', included: false },
      { text: 'Priority latency (<800ms)', included: false },
      { text: 'Analytics dashboard', included: false },
      { text: 'Phone number deployment', included: false },
      { text: 'WhatsApp integration', included: false },
    ],
  },
  {
    id: 'starter', name: 'Starter', monthlyPrice: 999, annualPrice: 799,
    description: 'For indie developers and small teams building production agents.',
    cta: 'Start building', ctaVariant: 'ghost', highlighted: false,
    limits: { calls: '5,000 calls/month', languages: '5 languages', latency: '< 1s', voices: '50 voices' },
    features: [
      { text: '5,000 voice agent calls', included: true },
      { text: '5 Indian languages', included: true },
      { text: 'BhasiniCreative full access', included: true },
      { text: 'Email support', included: true },
      { text: 'API access + webhooks', included: true },
      { text: 'Custom voice cloning', included: true, note: '3 voices' },
      { text: 'Priority latency (<800ms)', included: false },
      { text: 'Analytics dashboard', included: true },
      { text: 'Phone number deployment', included: false },
      { text: 'WhatsApp integration', included: false },
    ],
  },
  {
    id: 'growth', name: 'Growth', badge: 'Most Popular', monthlyPrice: 4999, annualPrice: 3999,
    description: 'For growing startups deploying agents at scale across India.',
    cta: 'Start free trial', ctaVariant: 'primary', highlighted: true,
    limits: { calls: '50,000 calls/month', languages: '8+ languages', latency: '< 800ms', voices: 'Unlimited' },
    features: [
      { text: '50,000 voice agent calls', included: true },
      { text: 'All 8+ Indian languages', included: true },
      { text: 'BhasiniCreative + BhasiniAgents', included: true },
      { text: 'Priority support + Slack', included: true },
      { text: 'Full API + advanced webhooks', included: true },
      { text: 'Custom voice cloning', included: true, note: 'Unlimited' },
      { text: 'Flash latency (< 800ms)', included: true },
      { text: 'Advanced analytics + eval kit', included: true },
      { text: 'Phone number deployment', included: true, note: '5 numbers' },
      { text: 'WhatsApp integration', included: true },
    ],
  },
  {
    id: 'enterprise', name: 'Enterprise', monthlyPrice: null, annualPrice: null,
    description: 'Custom infrastructure for large enterprises, banks, and governments.',
    cta: 'Talk to sales', ctaVariant: 'ghost', highlighted: false,
    limits: { calls: 'Unlimited', languages: 'All + custom', latency: 'Ultra-low SLA', voices: 'Custom models' },
    features: [
      { text: 'Unlimited calls + SLA guarantee', included: true },
      { text: 'All languages + custom dialect', included: true },
      { text: 'Dedicated infrastructure', included: true },
      { text: '24/7 dedicated support', included: true },
      { text: 'Custom API + on-premise', included: true },
      { text: 'Custom voice model training', included: true },
      { text: 'Sub-500ms guaranteed latency', included: true },
      { text: 'Enterprise analytics + SOC2', included: true },
      { text: 'Unlimited phone numbers', included: true },
      { text: 'WhatsApp + all channels', included: true },
    ],
  },
]

const faqs = [
  { q: 'What counts as a "call"?', a: 'One call = one complete voice conversation session. Whether it\'s 30 seconds or 30 minutes, it counts as one call. Concurrent calls on Growth+ are unlimited.' },
  { q: 'Can I switch plans anytime?', a: 'Yes. Upgrade immediately and get prorated credit. Downgrade takes effect at the next billing cycle. No lock-in contracts.' },
  { q: 'Do you support all Indian languages?', a: 'Free and Starter include Hindi, English, and Hinglish. Growth adds Tamil, Telugu, Marathi, Punjabi, and Haryanvi. Enterprise can add custom dialect models.' },
  { q: 'What is the Eval Kit?', a: 'The Eval Kit lets you test your agent\'s accuracy, latency, and conversation quality with simulated calls before going live. Available on Growth and Enterprise.' },
  { q: 'Is there a free trial for Growth?', a: 'Yes — 14-day free trial on Growth with no credit card required. All features included. Cancels automatically if you don\'t upgrade.' },
  { q: 'How does voice cloning work?', a: 'Upload 5+ minutes of clean audio. Our model trains a voice clone in under 2 hours. Starter gets 3 clones, Growth gets unlimited.' },
  { q: 'What are the payment options?', a: 'All major Indian payment methods: UPI, Razorpay, Net Banking, Credit/Debit cards. Invoices in INR. GST invoice available for business accounts.' },
]

type TableCell = string | boolean
const tableData: { section: string; rows: { feature: string; vals: TableCell[] }[] }[] = [
  {
    section: 'Voice Agents',
    rows: [
      { feature: 'Monthly calls', vals: ['500', '5,000', '50,000', 'Unlimited'] },
      { feature: 'Languages', vals: ['Hindi, English', '+3', 'All 8+', 'All + custom'] },
      { feature: 'Latency', vals: ['Standard', '< 1s', '< 800ms Flash', '< 500ms'] },
      { feature: 'Phone deployment', vals: [false, false, '5 numbers', 'Unlimited'] },
      { feature: 'WhatsApp', vals: [false, false, true, true] },
      { feature: 'Outbound calling', vals: [false, false, true, true] },
    ],
  },
  {
    section: 'Creative',
    rows: [
      { feature: 'TTS characters', vals: ['10k/mo', '100k/mo', '1M/mo', 'Unlimited'] },
      { feature: 'Voice cloning', vals: [false, '3 voices', 'Unlimited', 'Custom model'] },
      { feature: 'Music generation', vals: ['Basic', true, true, true] },
      { feature: 'Video synthesis', vals: [false, false, true, true] },
    ],
  },
  {
    section: 'Platform',
    rows: [
      { feature: 'API access', vals: [true, true, true, true] },
      { feature: 'Analytics', vals: ['Basic', true, 'Advanced', 'Enterprise'] },
      { feature: 'Eval kit', vals: [false, false, true, true] },
      { feature: 'Observatory', vals: [false, false, true, true] },
      { feature: 'SSO / SAML', vals: [false, false, false, true] },
      { feature: 'Audit logs', vals: [false, false, true, true] },
    ],
  },
  {
    section: 'Support',
    rows: [
      { feature: 'Community forum', vals: [true, true, true, true] },
      { feature: 'Email support', vals: [false, true, 'Priority', 'Dedicated'] },
      { feature: 'Slack channel', vals: [false, false, true, true] },
      { feature: 'SLA guarantee', vals: [false, false, '99.9%', '99.99%'] },
      { feature: 'Onboarding', vals: [false, false, false, 'Custom'] },
    ],
  },
]

function TableCell({ val, isGrowth }: { val: TableCell; isGrowth: boolean }) {
  if (typeof val === 'boolean') {
    return val
      ? <Check size={16} color="#22C55E" />
      : <Minus size={16} color="#C8C5C0" />
  }
  return (
    <span style={{
      fontFamily: 'var(--font-body)', fontSize: '13px', color: '#4A4A4A',
      fontWeight: isGrowth ? 600 : 400,
    }}>{val}</span>
  )
}

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
  const [hoveredTier, setHoveredTier] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const navigate = useNavigate()

  return (
    <div style={{ paddingTop: '64px', background: '#F7F5F2', minHeight: '100vh', fontFamily: 'var(--font-body)', WebkitFontSmoothing: 'antialiased' }}>
      <Navbar />

      {/* ── Section 1: Header ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 32px 64px', textAlign: 'center' }}>
        {/* Eyebrow */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px 5px 8px', background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.18)', borderRadius: '9999px', marginBottom: '24px' }}>
          <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
            style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FF6B35' }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#FF6B35' }}>
            Simple, transparent pricing
          </span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 300, letterSpacing: '-0.03em', color: '#0D0D0D', lineHeight: 1.05, marginBottom: '20px' }}>
          Pay as you grow
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 300, color: '#6B6B6B', lineHeight: 1.65, maxWidth: '480px', margin: '0 auto 40px' }}>
          No per-seat fees. No surprise charges. Start free and scale to enterprise.
        </p>

        {/* Billing toggle */}
        <div style={{ display: 'inline-flex', background: '#EFEFED', borderRadius: '9999px', padding: '4px', gap: '2px' }}>
          {(['monthly', 'annual'] as const).map(b => (
            <button key={b} onClick={() => setBilling(b)}
              style={{
                padding: '10px 24px', borderRadius: '9999px', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: '14px', transition: 'all 200ms ease',
                background: billing === b ? 'white' : 'transparent',
                color: billing === b ? '#0D0D0D' : '#6B6B6B',
                fontWeight: billing === b ? 600 : 400,
                boxShadow: billing === b ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
              {b === 'monthly' ? 'Monthly' : (
                <>Annual
                  <span style={{ background: 'linear-gradient(90deg, #FF6B35, #FF3CAC)', color: 'white', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>
                    Save 20%
                  </span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Section 2: Cards Grid ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px 80px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', alignItems: 'start' }}>
        {tiers.map((tier, idx) => {
          const hl = tier.highlighted
          const isHovered = hoveredTier === tier.id
          return (
            <motion.div key={tier.id}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onMouseEnter={() => setHoveredTier(tier.id)}
              onMouseLeave={() => setHoveredTier(null)}
              style={{
                background: hl ? '#0D0D0D' : 'white',
                border: hl ? '1px solid #0D0D0D' : `1px solid ${isHovered ? '#C8C5C0' : '#E0DED9'}`,
                borderRadius: '24px', padding: '28px', position: 'relative',
                transition: 'all 250ms ease',
                transform: hl ? (isHovered ? 'translateY(-12px)' : 'translateY(-8px)') : (isHovered ? 'translateY(-3px)' : 'none'),
                boxShadow: hl ? '0 24px 64px rgba(0,0,0,0.20)' : (isHovered ? '0 8px 32px rgba(0,0,0,0.08)' : 'none'),
              }}>
              {/* Header */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 500, color: hl ? 'white' : '#0D0D0D', letterSpacing: '-0.01em' }}>
                    {tier.name}
                  </span>
                  {tier.badge && (
                    <span style={{ padding: '3px 10px', background: '#FF6B35', color: 'white', fontSize: '10px', fontWeight: 700, borderRadius: '9999px', fontFamily: 'var(--font-body)', letterSpacing: '0.03em' }}>
                      {tier.badge}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div style={{ marginBottom: '10px' }}>
                  {tier.monthlyPrice === null ? (
                    <>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '52px', fontWeight: 300, letterSpacing: '-0.04em', color: hl ? 'white' : '#0D0D0D', lineHeight: 1 }}>Custom</div>
                      <div style={{ fontSize: '13px', color: hl ? 'rgba(255,255,255,0.5)' : '#9E9E9E', marginTop: '4px' }}>Contact for pricing</div>
                    </>
                  ) : tier.monthlyPrice === 0 ? (
                    <>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '52px', fontWeight: 300, letterSpacing: '-0.04em', color: hl ? 'white' : '#0D0D0D', lineHeight: 1 }}>₹0</div>
                      <div style={{ fontSize: '13px', color: hl ? 'rgba(255,255,255,0.5)' : '#9E9E9E', marginTop: '4px' }}>Free forever</div>
                    </>
                  ) : (
                    <AnimatePresence mode="wait">
                      <motion.div key={billing} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400, color: '#FF6B35' }}>₹</span>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: '52px', fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 1, color: hl ? 'white' : '#0D0D0D' }}>
                            {billing === 'monthly' ? tier.monthlyPrice : tier.annualPrice}
                          </span>
                          <span style={{ fontSize: '13px', fontWeight: 400, color: hl ? 'rgba(255,255,255,0.5)' : '#9E9E9E', alignSelf: 'flex-end', paddingBottom: '8px' }}>/mo</span>
                        </div>
                        {billing === 'annual' && tier.monthlyPrice && tier.annualPrice && (
                          <div style={{ fontSize: '11px', color: 'rgba(255,107,53,0.9)', marginTop: '4px' }}>
                            Save ₹{(tier.monthlyPrice - tier.annualPrice) * 12}/yr
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>

                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: hl ? 'rgba(255,255,255,0.65)' : '#6B6B6B' }}>
                  {tier.description}
                </p>
              </div>

              {/* Limit pills */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '24px' }}>
                {Object.entries(tier.limits).map(([k, v]) => (
                  <div key={k} style={{
                    padding: '8px 10px', borderRadius: '10px',
                    background: hl ? 'rgba(255,255,255,0.07)' : '#FAFAFA',
                    border: hl ? '1px solid rgba(255,255,255,0.10)' : '1px solid #F0EFED',
                  }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: hl ? 'white' : '#0D0D0D', marginBottom: '1px' }}>{v}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 400, color: hl ? 'rgba(255,255,255,0.45)' : '#9E9E9E', textTransform: 'capitalize' }}>{k}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                onClick={() => tier.id === 'enterprise' ? navigate('/signup?plan=enterprise') : navigate('/signup')}
                style={{
                  width: '100%', height: '48px', borderRadius: '9999px', cursor: 'pointer',
                  fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, marginBottom: '24px',
                  transition: 'all 200ms',
                  ...(hl
                    ? { background: 'white', color: '#0D0D0D', border: 'none' }
                    : tier.id === 'enterprise'
                      ? { background: 'transparent', border: '1.5px solid #E0DED9', color: '#0D0D0D' }
                      : { background: 'transparent', border: '1.5px solid #E0DED9', color: '#0D0D0D' }),
                }}>
                {tier.cta}
              </motion.button>

              {/* Divider */}
              <div style={{ height: '1px', background: hl ? 'rgba(255,255,255,0.08)' : '#F0EFED', marginBottom: '24px' }} />

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: hl ? 'rgba(255,255,255,0.35)' : '#9E9E9E', marginBottom: '4px' }}>
                  What's included
                </div>
                {tier.features.map((f, fi) => (
                  <div key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{
                      width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0, marginTop: '1px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: f.included ? 'rgba(34,197,94,0.12)' : (hl ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
                      border: f.included ? '1px solid rgba(34,197,94,0.20)' : 'none',
                    }}>
                      {f.included ? <Check size={9} color="#22C55E" /> : <X size={9} color={hl ? 'rgba(255,255,255,0.25)' : '#C8C5C0'} />}
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 400, lineHeight: 1.4, color: f.included ? (hl ? 'white' : '#2A2A2A') : (hl ? 'rgba(255,255,255,0.35)' : '#B0B0B0') }}>
                      {f.text}
                      {f.note && (
                        <span style={{ fontSize: '10px', fontWeight: 700, padding: '1px 7px', borderRadius: '9999px', background: 'rgba(255,107,53,0.12)', color: '#FF6B35', marginLeft: '6px' }}>
                          {f.note}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ── Section 3: Comparison Table ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px 80px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', marginBottom: '8px' }}>
          Compare all features
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#6B6B6B', fontWeight: 300, marginBottom: '40px' }}>
          See exactly what you get with each plan.
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: 'white', borderRadius: '20px', overflow: 'hidden', border: '1px solid #E0DED9' }}>
            <thead>
              <tr style={{ background: '#FAFAFA', borderBottom: '1px solid #E0DED9' }}>
                <th style={{ padding: '20px 28px', textAlign: 'left', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.14em', color: '#9E9E9E', textTransform: 'uppercase', fontWeight: 500 }}>
                  Feature
                </th>
                {['Free', 'Starter', 'Growth', 'Enterprise'].map(n => (
                  <th key={n} style={{ padding: '20px', textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 500, color: n === 'Growth' ? '#FF6B35' : '#0D0D0D' }}>
                    {n}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map(section => (
                <>
                  <tr key={`s-${section.section}`} style={{ background: '#F7F5F2' }}>
                    <td colSpan={5} style={{ padding: '12px 28px', fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.16em', color: '#9E9E9E', textTransform: 'uppercase' }}>
                      {section.section}
                    </td>
                  </tr>
                  {section.rows.map(row => (
                    <tr key={row.feature}
                      onMouseEnter={() => setHoveredRow(row.feature)}
                      onMouseLeave={() => setHoveredRow(null)}
                      style={{ borderBottom: '1px solid #F5F5F5', background: hoveredRow === row.feature ? '#FAFAFA' : 'white', transition: 'background 150ms' }}>
                      <td style={{ padding: '16px 28px', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 400, color: '#2A2A2A' }}>
                        {row.feature}
                      </td>
                      {row.vals.map((val, vi) => (
                        <td key={vi} style={{ textAlign: 'center', padding: '16px 20px' }}>
                          <TableCell val={val} isGrowth={vi === 2} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Section 4: FAQ ── */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 32px 100px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 300, letterSpacing: '-0.02em', textAlign: 'center', marginBottom: '48px', color: '#0D0D0D' }}>
          Frequently asked
        </h2>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: '1px solid #E0DED9' }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', textAlign: 'left' }}
            >
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 400, color: openFaq === i ? '#FF6B35' : '#0D0D0D', transition: 'color 150ms' }}>
                {faq.q}
              </span>
              <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.25 }} style={{ flexShrink: 0, marginLeft: '16px' }}>
                <Plus size={18} color="#9E9E9E" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {openFaq === i && (
                <motion.div key="answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: 'hidden' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 300, lineHeight: 1.7, color: '#6B6B6B', paddingBottom: '20px', margin: 0 }}>
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* ── Section 5: Bottom CTA ── */}
      <div style={{ background: '#0D0D0D', padding: '80px 32px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 300, letterSpacing: '-0.03em', color: 'white', marginBottom: '16px' }}>
          Start building for free today
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300, color: 'rgba(255,255,255,0.55)', marginBottom: '40px' }}>
          No credit card. No lock-in. Deploy your first Hindi voice agent in minutes.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button onClick={() => navigate('/signup')}
            style={{ height: '52px', padding: '0 32px', background: '#FF6B35', color: 'white', border: 'none', borderRadius: '9999px', fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, cursor: 'pointer', transition: 'background 200ms' }}
            onMouseEnter={e => e.currentTarget.style.background = '#E85A25'}
            onMouseLeave={e => e.currentTarget.style.background = '#FF6B35'}>
            Get started free
          </button>
          <button style={{ height: '52px', padding: '0 32px', background: 'transparent', border: '1.5px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.8)', borderRadius: '9999px', fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 500, cursor: 'pointer', transition: 'all 200ms' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'white'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}>
            Talk to sales
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 639px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
