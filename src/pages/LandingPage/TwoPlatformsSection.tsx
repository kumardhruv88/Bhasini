import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function TwoPlatformsSection() {
  const [creativeTab, setCreativeTab] = useState('Home')
  const [agentsTab, setAgentsTab] = useState('Home')
  const [agentSubTab, setAgentSubTab] = useState('General')
  const [isInteracting, setIsInteracting] = useState(false)

  const creativeTabs = ['Home', 'Voices', 'Studio', 'Flows', 'Templates']
  const agentsTabs = ['Home', 'Support Agent', 'Sales Agent', 'Configure', 'Knowledge']
  const subTabs = ['General', 'Evaluation', 'Data Collection']

  useEffect(() => {
    if (isInteracting) return
    const int = setInterval(() => {
      setCreativeTab(prev => creativeTabs[(creativeTabs.indexOf(prev) + 1) % creativeTabs.length])
    }, 4000)
    return () => clearInterval(int)
  }, [isInteracting])

  useEffect(() => {
    if (isInteracting) return
    const int = setInterval(() => {
      setAgentsTab(prev => agentsTabs[(agentsTabs.indexOf(prev) + 1) % agentsTabs.length])
    }, 4500)
    return () => clearInterval(int)
  }, [isInteracting])

  useEffect(() => {
    if (isInteracting || agentsTab !== 'Home') return
    const int = setInterval(() => {
      setAgentSubTab(prev => subTabs[(subTabs.indexOf(prev) + 1) % subTabs.length])
    }, 2500)
    return () => clearInterval(int)
  }, [isInteracting, agentsTab])
  return (
    <section style={{ padding: '80px 32px', maxWidth: '1160px', margin: '0 auto' }}>
      
      <h2 style={{ 
        fontSize: 'clamp(32px, 4vw, 42px)', 
        fontWeight: 500, 
        fontFamily: 'var(--font-display)', 
        lineHeight: 1.1, 
        letterSpacing: '-0.03em', 
        margin: '0 0 64px 0', 
        color: '#0D0D0D',
        maxWidth: '600px'
      }}>
        Two platforms built on the same research foundation
      </h2>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 12px 0', color: '#0D0D0D' }}>BhasiniCreative</h3>
          <p style={{ fontSize: '16px', color: '#6B6B6B', margin: 0, lineHeight: 1.5 }}>
            Generate ultra-realistic speech, translate content, and create immersive audio experiences in Indian languages.
          </p>
        </div>
        <div style={{ flex: '1 1 300px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 12px 0', color: '#0D0D0D' }}>BhasiniAgents</h3>
          <p style={{ fontSize: '16px', color: '#6B6B6B', margin: 0, lineHeight: 1.5 }}>
            Configure, deploy and monitor powerful conversational voice agents tailored for regional support.
          </p>
        </div>
      </div>

      {/* Visual Dashboard Mockup */}
      <div style={{ 
        background: '#F9F8F6', 
        borderRadius: '32px', 
        padding: '32px', 
        border: '1px solid #EBE9E4', 
        boxShadow: '0 4px 32px rgba(0,0,0,0.04)',
        display: 'flex',
        gap: '24px',
        overflow: 'hidden',
        height: '400px'
      }}>
        {/* Creative Dashboard Mockup */}
        <div style={{ 
          flex: 1, 
          background: '#FFF', 
          borderRadius: '16px', 
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          border: '1px solid #EAE8E3',
          display: 'flex',
          overflow: 'hidden'
        }}>
          {/* Sidebar */}
          <div style={{ width: '140px', borderRight: '1px solid #EAE8E3', padding: '16px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px' }}>
               <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF6B35' }}></span>
               <span style={{ fontSize: '12px', fontWeight: 700 }}>BhasiniCreative</span>
            </div>
            {creativeTabs.map((item) => (
              <div 
                key={item} 
                onClick={() => { setCreativeTab(item); setIsInteracting(true) }}
                style={{ 
                  padding: '8px', fontSize: '12px', cursor: 'pointer',
                  color: creativeTab === item ? '#0D0D0D' : '#6B6B6B', 
                  fontWeight: creativeTab === item ? 600 : 500, 
                  background: creativeTab === item ? '#F3F2EE' : 'transparent', 
                  borderRadius: '6px', marginBottom: '4px',
                  transition: 'all 0.2s'
                }}
              >
                {item}
              </div>
            ))}
          </div>
          {/* Main Area */}
          <div style={{ flex: 1, padding: '24px', position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={creativeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h4 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 24px 0' }}>
                  {creativeTab === 'Home' ? 'What would you like to create?' : `Manage ${creativeTab}`}
                </h4>
                
                {creativeTab === 'Home' && (
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 1, height: '120px', background: '#F9F8F6', borderRadius: '12px', border: '1px solid #EAE8E3', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ height: '4px', background: '#FF6B35', width: '30%', borderRadius: '2px' }}></div>
                      <div style={{ fontSize: '12px', fontWeight: 600 }}>Speech</div>
                    </div>
                    <div style={{ flex: 1, height: '120px', background: '#F9F8F6', borderRadius: '12px', border: '1px solid #EAE8E3', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ height: '4px', background: '#1A73E8', width: '50%', borderRadius: '2px' }}></div>
                      <div style={{ fontSize: '12px', fontWeight: 600 }}>Translation</div>
                    </div>
                  </div>
                )}

                {creativeTab !== 'Home' && (
                  <div style={{ background: '#F9F8F6', borderRadius: '12px', border: '1px dashed #D3D1CB', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9E9E9E', fontSize: '13px', position: 'relative', overflow: 'hidden' }}>
                    {creativeTab === 'Voices' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', padding: '16px' }}>
                         <div style={{ background: '#EAE8E3', height: '20px', width: '100%', borderRadius: '4px' }}></div>
                         <div style={{ background: '#EAE8E3', height: '20px', width: '80%', borderRadius: '4px' }}></div>
                         <div style={{ background: '#EAE8E3', height: '20px', width: '60%', borderRadius: '4px' }}></div>
                      </div>
                    )}
                    {creativeTab === 'Studio' && (
                      <div style={{ display: 'flex', gap: '8px', width: '100%', padding: '16px', alignItems: 'center', justifyContent: 'center' }}>
                         <div style={{ background: '#FF6B35', height: '40px', width: '8px', borderRadius: '4px' }}></div>
                         <div style={{ background: '#FF6B35', height: '80px', width: '8px', borderRadius: '4px' }}></div>
                         <div style={{ background: '#FF6B35', height: '60px', width: '8px', borderRadius: '4px' }}></div>
                         <div style={{ background: '#FF6B35', height: '30px', width: '8px', borderRadius: '4px' }}></div>
                      </div>
                    )}
                    {creativeTab !== 'Voices' && creativeTab !== 'Studio' && `No recent ${creativeTab.toLowerCase()} found.`}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Agents Dashboard Mockup */}
        <div style={{ 
          flex: 1.2, 
          background: '#FFF', 
          borderRadius: '16px', 
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          border: '1px solid #EAE8E3',
          display: 'flex',
          overflow: 'hidden'
        }}>
          {/* Sidebar */}
          <div style={{ width: '140px', borderRight: '1px solid #EAE8E3', padding: '16px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px' }}>
               <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#1A73E8' }}></span>
               <span style={{ fontSize: '12px', fontWeight: 700 }}>BhasiniAgents</span>
            </div>
            {agentsTabs.map((item) => (
              <div 
                key={item} 
                onClick={() => { setAgentsTab(item); setIsInteracting(true) }}
                style={{ 
                  padding: '8px', fontSize: '12px', cursor: 'pointer',
                  color: agentsTab === item ? '#0D0D0D' : '#6B6B6B', 
                  fontWeight: agentsTab === item ? 600 : 500, 
                  background: agentsTab === item ? '#F3F2EE' : 'transparent', 
                  borderRadius: '6px', marginBottom: '4px',
                  transition: 'all 0.2s'
                }}
              >
                {item}
              </div>
            ))}
          </div>
          {/* Main Area */}
          <div style={{ flex: 1, padding: '24px', position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={agentsTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h4 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 16px 0' }}>
                  {agentsTab === 'Home' ? 'Good afternoon, Dhruv' : agentsTab}
                </h4>
                
                {agentsTab === 'Home' ? (
                  <>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                      {subTabs.map(tab => (
                        <div 
                          key={tab}
                          onClick={() => { setAgentSubTab(tab); setIsInteracting(true) }}
                          style={{ 
                            fontSize: '12px', 
                            fontWeight: agentSubTab === tab ? 600 : 500, 
                            color: agentSubTab === tab ? '#0D0D0D' : '#6B6B6B', 
                            borderBottom: agentSubTab === tab ? '2px solid #0D0D0D' : '2px solid transparent', 
                            paddingBottom: '4px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          {tab}
                        </div>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={agentSubTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {agentSubTab === 'General' && (
                          <>
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                              <div style={{ flex: 1, padding: '12px', border: '1px solid #EAE8E3', borderRadius: '8px' }}>
                                 <div style={{ fontSize: '10px', color: '#6B6B6B', marginBottom: '4px' }}>Calls</div>
                                 <div style={{ fontSize: '20px', fontWeight: 700 }}>77,258</div>
                              </div>
                              <div style={{ flex: 1, padding: '12px', border: '1px solid #EAE8E3', borderRadius: '8px' }}>
                                 <div style={{ fontSize: '10px', color: '#6B6B6B', marginBottom: '4px' }}>CSAT Score</div>
                                 <div style={{ fontSize: '20px', fontWeight: 700 }}>4.7</div>
                              </div>
                            </div>
                            <div style={{ height: '80px', border: '1px solid #EAE8E3', borderRadius: '8px', padding: '12px', position: 'relative' }}>
                              <svg width="100%" height="100%" preserveAspectRatio="none">
                                <path d="M0,40 Q40,10 80,30 T160,20 T240,40 T320,10" fill="none" stroke="#1A73E8" strokeWidth="2" />
                              </svg>
                            </div>
                          </>
                        )}
                        {agentSubTab === 'Evaluation' && (
                          <>
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                              <div style={{ flex: 1, padding: '12px', border: '1px solid #EAE8E3', borderRadius: '8px' }}>
                                 <div style={{ fontSize: '10px', color: '#6B6B6B', marginBottom: '4px' }}>Resolution Rate</div>
                                 <div style={{ fontSize: '20px', fontWeight: 700 }}>89.2%</div>
                              </div>
                            </div>
                            <div style={{ height: '80px', border: '1px solid #EAE8E3', borderRadius: '8px', padding: '12px', position: 'relative' }}>
                              <svg width="100%" height="100%" preserveAspectRatio="none">
                                <path d="M0,80 Q40,40 80,50 T160,10 T240,30 T320,20" fill="none" stroke="#22C55E" strokeWidth="2" />
                              </svg>
                            </div>
                          </>
                        )}
                        {agentSubTab === 'Data Collection' && (
                          <>
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                              <div style={{ flex: 1, padding: '12px', border: '1px solid #EAE8E3', borderRadius: '8px' }}>
                                 <div style={{ fontSize: '10px', color: '#6B6B6B', marginBottom: '4px' }}>Entities Extracted</div>
                                 <div style={{ fontSize: '20px', fontWeight: 700 }}>142k</div>
                              </div>
                            </div>
                            <div style={{ height: '80px', border: '1px solid #EAE8E3', borderRadius: '8px', padding: '12px', position: 'relative' }}>
                              <svg width="100%" height="100%" preserveAspectRatio="none">
                                <path d="M0,70 Q40,60 80,40 T160,60 T240,20 T320,10" fill="none" stroke="#FF6B35" strokeWidth="2" />
                              </svg>
                            </div>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </>
                ) : (
                  <div style={{ background: '#F9F8F6', borderRadius: '12px', border: '1px dashed #D3D1CB', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9E9E9E', fontSize: '13px' }}>
                    {agentsTab} settings and configuration.
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  )
}
