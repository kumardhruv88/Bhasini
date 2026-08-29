import { motion } from 'framer-motion'
import { pageVariants } from '../../design-system/motion'
import Navbar from '../../components/layout/Navbar'

export default function LandingPage() {
  return (
    <motion.div
      className="page-wrapper"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        
        {/* ── PLACEHOLDER: Hero section — added in Prompt 4 ── */}
        <section style={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-bg)',
          flexDirection: 'column',
          gap: '16px',
          padding: '80px 32px',
        }}>
          
          {/* Show the logo big as a placeholder */}
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '64px',
            fontWeight: 800,
            color: '#0D0D0D',
            letterSpacing: '-0.03em',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <span style={{ color: '#9E9E9E', fontWeight: 400 }}>||</span>
            <span>Bha</span>
            <span style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #FF3CAC 50%, #784BA0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>sini</span>
          </div>
          
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '18px',
            color: '#6B6B6B',
            margin: 0,
            letterSpacing: '0.04em',
          }}>
            Voice Intelligence. In Every Indian Language.
          </p>

          {/* Language pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' }}>
            {[
              { script: 'हिं', color: '#FF6B35' },
              { script: 'EN', color: '#1A73E8' },
              { script: 'தமி', color: '#22C55E' },
              { script: 'తెలు', color: '#F59E0B' },
              { script: 'मरा', color: '#EF4444' },
              { script: 'ਪੰਜ', color: '#06B6D4' },
            ].map(({ script, color }) => (
              <span key={script} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                padding: '6px 14px',
                background: 'white',
                border: '1px solid #E0DED9',
                borderRadius: '9999px',
                color: '#0D0D0D',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <span style={{
                  width: '7px', height: '7px',
                  borderRadius: '50%',
                  background: color,
                  flexShrink: 0,
                  display: 'inline-block',
                }} />
                {script}
              </span>
            ))}
          </div>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            color: '#9E9E9E',
            margin: '16px 0 0',
          }}>
            Hero section + all sections load in Prompt 4 →
          </p>
        </section>

      </main>
    </motion.div>
  )
}
