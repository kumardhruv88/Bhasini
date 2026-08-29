import Navbar from '../../components/layout/Navbar'
import { motion } from 'framer-motion'
import { pageVariants } from '../../design-system/motion'

export default function LandingPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar />
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        {/* Sections will be added in subsequent prompts */}
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          color: 'var(--color-text-muted)'
        }}>
          Hero section coming in Prompt 3
        </div>
      </main>
    </motion.div>
  )
}
