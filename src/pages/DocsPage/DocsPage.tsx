import { useState } from 'react'
import Navbar from '../../components/layout/Navbar/Navbar'
import DocsSidebar from './DocsSidebar'
import DocsHeader from './DocsHeader'
import DocsContent from './DocsContent'
import OnThisPage from './OnThisPage'
import '../../styles/docs.css' // We will create this for layout tweaks

export default function DocsPage() {
  const [activeSection] = useState('Introduction')

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingTop: '64px', display: 'flex', justifyContent: 'center' }}>
        
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
