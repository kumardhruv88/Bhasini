import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { AuthLeftPanel } from './LoginPage'

function calcStrength(pw: string): number {
  if (!pw) return 0
  if (pw.length < 6) return 1
  const hasNum = /\d/.test(pw)
  const hasSym = /[^a-zA-Z0-9]/.test(pw)
  if (pw.length >= 8 && hasNum && hasSym) return 4
  if (pw.length >= 6 && (hasNum || hasSym)) return 3
  return 2
}

const strengthColors = ['#EFEFED', '#EF4444', '#F59E0B', '#F59E0B', '#22C55E']
const strengthLabels = ['', 'Too short', 'Weak', 'Fair', 'Strong']

const plans = [
  { id: 'free', name: 'Free', price: '₹0/mo' },
  { id: 'starter', name: 'Starter', price: '₹999/mo' },
  { id: 'growth', name: 'Growth', price: '₹4,999/mo' },
]

export default function SignupPage() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('free')
  const [loading, setLoading] = useState(false)

  const strength = calcStrength(password)

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/app/home')
    }, 1500)
  }

  return (
    <div style={{ height: '100vh', display: 'flex', overflow: 'hidden', fontFamily: 'var(--font-body)', WebkitFontSmoothing: 'antialiased' }}>
      <AuthLeftPanel />

      {/* Right panel */}
      <div style={{ flex: 1, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>
          {/* Top */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', marginBottom: '8px' }}>
              Create your account
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 300, color: '#6B6B6B', marginBottom: '6px' }}>
              Start building Indian voice agents today.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#9E9E9E' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#FF6B35', fontWeight: 500, textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
                Sign in
              </Link>
            </p>
          </div>

          {/* Google button */}
          <button
            style={{ width: '100%', height: '48px', background: 'white', border: '1.5px solid #E0DED9', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: '#0D0D0D', transition: 'all 200ms', marginBottom: '24px' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#C8C5C0'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#E0DED9'; e.currentTarget.style.boxShadow = 'none' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#4285F4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'white' }}>G</div>
            Sign up with Google
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', background: '#E0DED9' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9E9E9E', whiteSpace: 'nowrap' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: '#E0DED9' }} />
          </div>

          {/* Full name */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: '#4A4A4A', marginBottom: '6px', display: 'block' }}>Full name</label>
            <input
              type="text" value={fullName} onChange={e => setFullName(e.target.value)}
              placeholder="Dhruv Kumar"
              style={{ width: '100%', height: '48px', padding: '0 16px', background: 'white', border: '1.5px solid #E0DED9', borderRadius: '12px', fontFamily: 'var(--font-body)', fontSize: '15px', color: '#0D0D0D', outline: 'none', transition: 'all 200ms', boxSizing: 'border-box' }}
              onFocus={e => { e.target.style.borderColor = '#FF6B35'; e.target.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.12)' }}
              onBlur={e => { e.target.style.borderColor = '#E0DED9'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: '#4A4A4A', marginBottom: '6px', display: 'block' }}>Email address</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ width: '100%', height: '48px', padding: '0 16px', background: 'white', border: '1.5px solid #E0DED9', borderRadius: '12px', fontFamily: 'var(--font-body)', fontSize: '15px', color: '#0D0D0D', outline: 'none', transition: 'all 200ms', boxSizing: 'border-box' }}
              onFocus={e => { e.target.style.borderColor = '#FF6B35'; e.target.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.12)' }}
              onBlur={e => { e.target.style.borderColor = '#E0DED9'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          {/* Password + strength */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: '#4A4A4A', marginBottom: '6px', display: 'block' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', height: '48px', padding: '0 48px 0 16px', background: 'white', border: '1.5px solid #E0DED9', borderRadius: '12px', fontFamily: 'var(--font-body)', fontSize: '15px', color: '#0D0D0D', outline: 'none', transition: 'all 200ms', boxSizing: 'border-box' }}
                onFocus={e => { e.target.style.borderColor = '#FF6B35'; e.target.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.12)' }}
                onBlur={e => { e.target.style.borderColor = '#E0DED9'; e.target.style.boxShadow = 'none' }}
              />
              <button onClick={() => setShowPassword(s => !s)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9E9E9E', display: 'flex', alignItems: 'center', transition: 'color 150ms' }}
                onMouseEnter={e => e.currentTarget.style.color = '#4A4A4A'}
                onMouseLeave={e => e.currentTarget.style.color = '#9E9E9E'}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {/* Strength bar */}
            <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
              {[1, 2, 3, 4].map(seg => (
                <div key={seg} style={{ flex: 1, height: '3px', borderRadius: '9999px', background: strength >= seg ? strengthColors[strength] : '#EFEFED', transition: 'background 300ms' }} />
              ))}
            </div>
            {password.length > 0 && (
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: strengthColors[strength], marginTop: '4px', transition: 'color 300ms' }}>
                {strengthLabels[strength]}
              </div>
            )}
          </div>

          {/* Plan selector */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: '#4A4A4A', marginBottom: '10px', display: 'block' }}>Choose your plan</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {plans.map(plan => (
                <button key={plan.id} onClick={() => setSelectedPlan(plan.id)}
                  style={{
                    flex: 1, padding: '12px 8px', borderRadius: '12px', cursor: 'pointer', textAlign: 'center',
                    border: `1.5px solid ${selectedPlan === plan.id ? '#0D0D0D' : '#E0DED9'}`,
                    background: selectedPlan === plan.id ? '#FAFAFA' : 'white',
                    transition: 'all 200ms',
                  }}
                  onMouseEnter={e => { if (selectedPlan !== plan.id) e.currentTarget.style.borderColor = '#C8C5C0' }}
                  onMouseLeave={e => { if (selectedPlan !== plan.id) e.currentTarget.style.borderColor = '#E0DED9' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: '#0D0D0D' }}>{plan.name}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9E9E9E', marginTop: '2px' }}>{plan.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
            onClick={handleSubmit} disabled={loading}
            style={{ width: '100%', height: '48px', background: '#0D0D0D', color: 'white', border: 'none', borderRadius: '9999px', fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: loading ? 0.85 : 1 }}>
            {loading && <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', animation: 'spin 0.8s linear infinite' }} />}
            {loading ? 'Creating account...' : 'Create account'}
          </motion.button>

          <p style={{ marginTop: '20px', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9E9E9E', lineHeight: 1.6 }}>
            By creating an account, you agree to our Terms of Service<br />and Privacy Policy. We'll send occasional product updates.
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
