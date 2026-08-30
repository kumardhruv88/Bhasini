import { ReactNode, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

interface AppShellProps { children: ReactNode }

export default function AppShell({ children }: AppShellProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(window.innerWidth > 1024)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024
      setIsMobile(mobile)
      if (mobile) setIsSidebarExpanded(false)
      else setIsSidebarExpanded(true)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F5F2' }}>
      {isMobile && isSidebarExpanded && (
        <div 
          onClick={() => setIsSidebarExpanded(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 90 }} 
        />
      )}
      
      <Sidebar isExpanded={isMobile ? true : isSidebarExpanded} onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)} isMobile={isMobile} isMobileHidden={isMobile && !isSidebarExpanded} />
      
      <motion.div 
        animate={{ 
          marginLeft: isMobile ? 0 : (isSidebarExpanded ? '248px' : '72px'),
          width: isMobile ? '100%' : `calc(100% - ${isSidebarExpanded ? '248px' : '72px'})` 
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <Topbar onMenuClick={isMobile ? () => setIsSidebarExpanded(true) : undefined} />
        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: 1, padding: '0', overflowX: 'hidden' }}
        >
          {children}
        </motion.main>
      </motion.div>
    </div>
  )
}
