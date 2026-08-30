import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Navbar from '../../components/layout/Navbar/Navbar'
import DocsSidebar from './DocsSidebar'
import DocsHeader from './DocsHeader'
import DocsContent from './DocsContent'
import OnThisPage from './OnThisPage'
import '../../styles/docs.css' // We will create this for layout tweaks

export default function DocsPage() {
  const [activeSection] = useState('Introduction')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <Navbar />
      
      {/* Mobile Top Bar */}
      <div className="docs-mobile-topbar" style={{
        display: 'none',
        position: 'sticky',
        top: '64px',
        height: '48px',
        background: '#F7F5F2',
        borderBottom: '1px solid #E0DED9',
        zIndex: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px'
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 500, color: '#0D0D0D' }}>Docs</div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#0D0D0D', cursor: 'pointer' }}
        >
          <Menu size={16} /> Menu
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 50
              }}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                width: '80%',
                maxWidth: '300px',
                background: '#F7F5F2',
                zIndex: 51,
                padding: '24px 0',
                overflowY: 'auto'
              }}
            >
              <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0D0D0D' }}>
                  <X size={20} />
                </button>
              </div>
              {/* Reuse sidebar contents */}
              <div style={{ padding: '0 16px' }}>
                <DocsSidebar activeSection={activeSection} isMobile />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingTop: '0', display: 'flex', justifyContent: 'center' }}>
        
        {/* Container for max width if needed, or let it span */}
        <div style={{ width: '100%', maxWidth: '1440px', display: 'flex', position: 'relative' }}>
          
          <DocsSidebar activeSection={activeSection} />
          
          <main style={{ flex: 1, padding: '48px 40px', maxWidth: '840px', margin: '0 auto' }} className="docs-main-content">
            <DocsHeader />
            <DocsContent />
          </main>

          <OnThisPage />
          
        </div>
      </div>
    </>
  )
}
