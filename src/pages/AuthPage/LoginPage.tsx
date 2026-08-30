import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'

const langSamples = [
  { lang: 'Hindi', text: 'नमस्ते! कैसे मदद करूँ?', script: 'Devanagari' },
  { lang: 'Tamil', text: 'வணக்கம்! எப்படி உதவட்டுமா?', script: 'Tamil' },
  { lang: 'Telugu', text: 'నమస్కారం! ఎలా సహాయం చేయాలి?', script: 'Telugu' },
  { lang: 'Marathi', text: 'नमस्कार! कशी मदत करू?', script: 'Devanagari' },
  { lang: 'Punjabi', text: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਕਿਵੇਂ ਮਦਦ ਕਰਾਂ?', script: 'Gurmukhi' },
  { lang: 'English', text: 'Hello! How can I help you today?', script: 'Latin' },
  { lang: 'Hinglish', text: 'Namaste! Main aapki kaise help karu?', script: 'Mixed' },
]

// Shared dark left panel for auth pages
export function AuthLeftPanel() {
  const [langIdx, setLangIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLangIdx(i => (i + 1) % langSamples.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      width: '50%', background: '#0D0D0D', display: 'flex',
      flexDirection: 'column', justifyContent: 'space-between',
      padding: '48px', position: 'relative', overflow: 'hidden',
    }}
      className="auth-left-panel"
    >
      {/* Background orbs */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.25) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,115,232,0.20) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 1 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
          Bhasini
        </span>
        <span style={{ padding: '3px 9px', background: 'linear-gradient(90deg, #FF6B35, #FF3CAC)', borderRadius: '9999px', fontSize: '10px', fontWeight: 700, color: 'white', fontFamily: 'var(--font-body)' }}>
          BETA
        </span>
      </div>

      {/* Middle hero */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 42px)',
          fontWeight: 300, letterSpacing: '-0.02em', color: 'white',
          lineHeight: 1.25, marginBottom: '24px', whiteSpace: 'pre-line',
        }}>
          {'Voice agents that\nunderstand India.'}
        </h2>

        <AnimatePresence mode="wait">
          <motion.div key={langIdx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(255,107,53,0.7)', textTransform: 'uppercase', marginBottom: '8px' }}>
              {langSamples[langIdx].lang}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 300, color: 'rgba(255,255,255,0.80)', lineHeight: 1.5, fontStyle: 'italic' }}>
              {langSamples[langIdx].text}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '32px', marginTop: '40px' }}>
          {[{ value: '8+', label: 'Languages' }, { value: '20+', label: 'Agent Types' }, { value: '77k+', label: 'Daily Calls' }].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 300, color: 'white', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.40)', fontWeight: 400 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div style={{ padding: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.70)', lineHeight: 1.6, marginBottom: '14px' }}>
          "Bhasini reduced our support call handling time by 68% with Hindi voice agents."
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: 'white' }}>
            RS
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: 'white' }}>Rahul Sharma</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>Razorpay Engineering</div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) { .auth-left-panel { display: none !important; } }
      `}</style>
    </div>
  )
}

// ────── LOGIN PAGE ──────
export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

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
          {/* Top section */}
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 300, letterSpacing: '-0.02em', color: '#0D0D0D', marginBottom: '8px' }}>
              Welcome back
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 300, color: '#6B6B6B', marginBottom: '6px' }}>
              Sign in to your Bhasini account
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#9E9E9E' }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ color: '#FF6B35', fontWeight: 500, textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
                Sign up free
              </Link>
            </p>
          </div>

          {/* Google button */}
          <button
            style={{ width: '100%', height: '48px', background: 'white', border: '1.5px solid #E0DED9', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: '#0D0D0D', transition: 'all 200ms', marginBottom: '24px' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#C8C5C0'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#E0DED9'; e.currentTarget.style.boxShadow = 'none' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#4285F4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'white' }}>G</div>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', background: '#E0DED9' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9E9E9E', whiteSpace: 'nowrap' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: '#E0DED9' }} />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: '#4A4A4A', marginBottom: '6px', display: 'block' }}>
              Email address
            </label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ width: '100%', height: '48px', padding: '0 16px', background: 'white', border: '1.5px solid #E0DED9', borderRadius: '12px', fontFamily: 'var(--font-body)', fontSize: '15px', color: '#0D0D0D', outline: 'none', transition: 'all 200ms', boxSizing: 'border-box' }}
              onFocus={e => { e.target.style.borderColor = '#FF6B35'; e.target.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.12)' }}
              onBlur={e => { e.target.style.borderColor = '#E0DED9'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '8px' }}>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: '#4A4A4A', marginBottom: '6px', display: 'block' }}>
              Password
            </label>
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
          </div>

          {/* Forgot */}
          <div style={{ textAlign: 'right', marginBottom: '24px' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#FF6B35', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
              Forgot password?
            </span>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
            onClick={handleSubmit} disabled={loading}
            style={{ width: '100%', height: '48px', background: '#0D0D0D', color: 'white', border: 'none', borderRadius: '9999px', fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: loading ? 0.85 : 1 }}>
            {loading && <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', animation: 'spin 0.8s linear infinite' }} />}
            {loading ? 'Signing in...' : 'Sign in'}
          </motion.button>

          <p style={{ marginTop: '20px', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9E9E9E', lineHeight: 1.6 }}>
            By signing in, you agree to our Terms of Service<br />and Privacy Policy
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
