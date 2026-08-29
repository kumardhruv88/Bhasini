import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, PhoneCall } from 'lucide-react'
import { TrustedBySection } from './TrustedBySection'
import { TwoPlatformsSection } from './TwoPlatformsSection'
import { CreativeFeatureGrid } from './CreativeFeatureGrid'
import { AgentsFeatureGrid } from './AgentsFeatureGrid'
import { ApiPlatformSection } from './ApiPlatformSection'
import { ResearchSection } from './ResearchSection'
import { SafetySection } from './SafetySection'
import { pageVariants } from '../../design-system/motion'
import Navbar from '../../components/layout/Navbar'

// Types
type Tab = 'creative' | 'agents' | 'api'

// Sub-components
const Bubble = ({ 
  size, gradient, icon: Icon, scale = 1, opacity = 1, blur = 0, onClick 
}: { 
  size: number, gradient: string, icon?: any, scale?: number, opacity?: number, blur?: number, onClick?: () => void 
}) => {
  return (
    <motion.div
      animate={{ scale, opacity, filter: `blur(${blur}px)` }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E"), ${gradient}`,
        backgroundBlendMode: 'overlay, normal',
        boxShadow: 'inset -15px -20px 40px rgba(0,0,0,0.4), inset 10px 10px 20px rgba(255,255,255,0.7), 0 20px 40px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: `${-size / 2}px`,
        marginLeft: `${-size / 2}px`,
        cursor: onClick ? 'pointer' : 'default',
        transformOrigin: 'center center'
      }}
    >
      {Icon && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
          style={{
            width: '48px', height: '48px',
            borderRadius: '50%',
            background: Icon === PhoneCall ? '#0D0D0D' : '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 16px rgba(0,0,0,0.12)'
          }}
        >
          <Icon size={20} color={Icon === PhoneCall ? '#FFF' : '#0D0D0D'} fill={Icon === PhoneCall ? '#FFF' : '#0D0D0D'} />
        </motion.div>
      )}
    </motion.div>
  )
}

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<Tab>('creative')
  const [creativeIndex, setCreativeIndex] = useState(2) // 0: Pink, 1: Copper, 2: Green

  // Data
  const creativeBubbles = [
    {
      id: 0,
      gradient: 'radial-gradient(circle at 35% 25%, #FFFFFF 0%, #F5D3D8 40%, #CFA5D1 90%, #A582AD 100%)',
      title: 'Narration',
      desc: 'Expressive voices that bring audiobooks and podcasts to life.'
    },
    {
      id: 1,
      gradient: 'radial-gradient(circle at 35% 25%, #FFD6A5 0%, #E07A5F 45%, #3D405B 85%, #1F2022 100%)',
      title: 'Conversational',
      desc: 'Natural voices perfect for informal scenarios.'
    },
    {
      id: 2,
      gradient: 'radial-gradient(circle at 30% 20%, #FFF3B0 0%, #E09F3E 35%, #68B684 65%, #337CA0 100%)',
      title: 'Social Media',
      desc: 'Trendy, attention-grabbing voices for short-form content.'
    }
  ]

  const bottomLinks = ['AI Voice Generator', 'Text to Speech', 'Music', 'Speech to Text', 'Voice Cloning', 'Dubbing']

  return (
    <motion.div
      className="page-wrapper"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ overflow: 'hidden' }}
    >
      <Navbar />
      
      <main style={{ paddingTop: '120px', paddingBottom: '80px', background: 'var(--color-bg)' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 32px' }}>
          
          {/* HEADER SECTION */}
          <div style={{ 
            display: 'flex', 
            gap: '64px', 
            alignItems: 'flex-start', 
            flexWrap: 'wrap', 
            marginBottom: '56px' 
          }}>
            <div style={{ flex: '1 1 480px' }}>
              <h1 style={{ 
                fontSize: 'clamp(44px, 5.5vw, 68px)', 
                fontWeight: 500, 
                fontFamily: 'var(--font-display)', 
                lineHeight: 1.05, 
                letterSpacing: '-0.03em', 
                margin: '0 0 32px 0', 
                color: '#0D0D0D' 
              }}>
                Voice Intelligence.<br/>In Every Indian Language.
              </h1>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button style={{ 
                  background: '#0D0D0D', color: '#FFF', 
                  padding: '14px 28px', borderRadius: '99px', 
                  border: 'none', fontWeight: 600, fontSize: '15px', 
                  cursor: 'pointer', fontFamily: 'var(--font-body)',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#2A2A2A'}
                onMouseLeave={e => e.currentTarget.style.background = '#0D0D0D'}>
                  Sign up
                </button>
                <button style={{ 
                  background: '#FFF', color: '#0D0D0D', 
                  padding: '14px 28px', borderRadius: '99px', 
                  border: '1px solid #E0DED9', fontWeight: 600, fontSize: '15px', 
                  cursor: 'pointer', fontFamily: 'var(--font-body)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#F9F8F6'}
                onMouseLeave={e => e.currentTarget.style.background = '#FFF'}>
                  Book a demo
                </button>
              </div>
            </div>
            
            <div style={{ flex: '1 1 400px', paddingTop: '12px' }}>
              <p style={{ 
                fontSize: '18px', 
                lineHeight: 1.6, 
                color: '#4A4A4A', 
                margin: 0,
                fontFamily: 'var(--font-body)'
              }}>
                Powering the best enterprises, creators, and developers. From BhasiniAgents for customer experience, BhasiniCreative for content creation, to the leading AI voice generator in regional languages.
              </p>
            </div>
          </div>

          {/* INTERACTIVE CARD */}
          <div style={{ 
            background: '#F9F8F6', 
            borderRadius: '40px', 
            padding: '16px 16px 24px 16px', 
            border: '1px solid #EBE9E4', 
            boxShadow: '0 4px 32px rgba(0,0,0,0.04)' 
          }}>
            
            {/* Top Tab Bar */}
            <div style={{ 
              background: '#EAE8E3', 
              borderRadius: '99px', 
              padding: '6px', 
              display: 'flex',
              gap: '4px',
              maxWidth: '800px',
              margin: '0 auto 40px auto'
            }}>
              {[
                { id: 'creative', label: 'BhasiniCreative', color: '#FF6B35' },
                { id: 'agents', label: 'BhasiniAgents', color: '#1A73E8' },
                { id: 'api', label: 'BhasiniAPI', color: '#9E9E9E' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  style={{
                    flex: 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '12px 16px', borderRadius: '99px',
                    background: activeTab === tab.id ? '#FFFFFF' : 'transparent',
                    boxShadow: activeTab === tab.id ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
                    border: 'none', cursor: 'pointer',
                    color: activeTab === tab.id ? '#0D0D0D' : '#6B6B6B',
                    fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-body)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: tab.color }} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Stage Area */}
            <div style={{ 
              height: '420px', 
              position: 'relative', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              
              <AnimatePresence mode="wait">
                {activeTab === 'creative' && (
                  <motion.div
                    key="creative-stage"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                  >
                    {/* Render the 3 Bubbles */}
                    {creativeBubbles.map((bubble, i) => {
                      // Calculate position based on creativeIndex
                      const offset = i - creativeIndex
                      const isCenter = offset === 0
                      
                      let x = 0
                      let scale = 1
                      let opacity = 1
                      let blur = 0
                      
                      if (offset === 0) {
                        x = 0; scale = 1; opacity = 1; blur = 0;
                      } else if (offset === -1) {
                        x = -240; scale = 0.65; opacity = 0.9; blur = 0;
                      } else if (offset === -2) {
                        x = -420; scale = 0.45; opacity = 0.6; blur = 2;
                      } else if (offset === 1) {
                        x = 240; scale = 0.65; opacity = 0.9; blur = 0;
                      } else if (offset === 2) {
                        x = 420; scale = 0.45; opacity = 0.6; blur = 2;
                      } else {
                        opacity = 0; scale = 0;
                      }

                      return (
                        <div key={bubble.id} style={{
                          position: 'absolute',
                          top: '40%',
                          left: '50%',
                          zIndex: isCenter ? 10 : 5 - Math.abs(offset)
                        }}>
                          <motion.div
                            animate={{ x, scale, opacity, filter: `blur(${blur}px)` }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <Bubble 
                              size={280} 
                              gradient={bubble.gradient} 
                              icon={isCenter ? Play : undefined} 
                              onClick={() => setCreativeIndex(i)}
                            />
                          </motion.div>
                        </div>
                      )
                    })}

                    {/* Captions */}
                    <div style={{
                      position: 'absolute',
                      bottom: '40px',
                      left: 0, right: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '32px'
                    }}>
                      <button 
                        onClick={() => setCreativeIndex(Math.max(0, creativeIndex - 1))}
                        style={{ 
                          background: 'none', border: 'none', cursor: creativeIndex > 0 ? 'pointer' : 'default', 
                          opacity: creativeIndex > 0 ? 0.6 : 0.2, padding: '8px'
                        }}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      
                      <div style={{ width: '320px', textAlign: 'center' }}>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={creativeIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                          >
                            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0D0D0D', margin: '0 0 6px 0', fontFamily: 'var(--font-body)' }}>
                              {creativeBubbles[creativeIndex].title} <span style={{ opacity: 0.5, fontSize: '12px' }}>↗</span>
                            </h3>
                            <p style={{ fontSize: '13px', color: '#6B6B6B', margin: 0, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
                              {creativeBubbles[creativeIndex].desc}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <button 
                        onClick={() => setCreativeIndex(Math.min(2, creativeIndex + 1))}
                        style={{ 
                          background: 'none', border: 'none', cursor: creativeIndex < 2 ? 'pointer' : 'default', 
                          opacity: creativeIndex < 2 ? 0.6 : 0.2, padding: '8px'
                        }}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'agents' && (
                  <motion.div
                    key="agents-stage"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '40%',
                      left: '50%',
                    }}>
                      <Bubble 
                        size={320} 
                        gradient="radial-gradient(circle at 40% 30%, #E2F5E5 0%, #81C784 40%, #1A73E8 85%, #0D47A1 100%)" 
                        icon={PhoneCall} 
                      />
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: '40px',
                      left: 0, right: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #FFF, #4CAF50, #1976D2)' }} />
                          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0D0D0D', margin: 0, fontFamily: 'var(--font-body)' }}>
                            BhasiniLabs Concierge <span style={{ opacity: 0.4, fontSize: '12px' }}>▼</span>
                          </h3>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '16px' }}>
                          <span style={{ fontSize: '14px', color: '#0D0D0D', fontWeight: 600, padding: '4px 12px', background: '#FFF', borderRadius: '99px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>Voice</span>
                          <span style={{ fontSize: '14px', color: '#6B6B6B', fontWeight: 500, padding: '4px 12px' }}>Chat</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'api' && (
                  <motion.div
                    key="api-stage"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <div style={{ 
                      background: '#FFFFFF', 
                      borderRadius: '24px', 
                      padding: '32px', 
                      boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                      width: '600px',
                      maxWidth: '100%',
                      marginTop: '-40px'
                    }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.6, color: '#333' }}>
                        <span style={{ color: '#E91E63' }}>import</span> {'{'} BhasiniClient {'}'} <span style={{ color: '#E91E63' }}>from</span> <span style={{ color: '#2E7D32' }}>"@bhasini/sdk"</span>;
                        <br/><br/>
                        <span style={{ color: '#1565C0' }}>const</span> bhasini = <span style={{ color: '#E91E63' }}>new</span> BhasiniClient();<br/>
                        <span style={{ color: '#1565C0' }}>const</span> audio = <span style={{ color: '#E91E63' }}>await</span> bhasini<br/>
                        &nbsp;&nbsp;.textToSpeech.convert(<span style={{ color: '#2E7D32' }}>"NOpBlngIN09m6vDvFkFC"</span>, {'{'}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;text: <span style={{ color: '#2E7D32' }}>"In the ancient land of Eldoria, where skies shimmered..."</span>,<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;modelId: <span style={{ color: '#2E7D32' }}>"bhasini_v3"</span>,<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;languageCode: <span style={{ color: '#2E7D32' }}>"en"</span>,<br/>
                        &nbsp;&nbsp;{'}'});
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', borderTop: '1px solid #E0DED9', paddingTop: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0D0D0D', fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-body)' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
                          TypeScript <span style={{ opacity: 0.5, fontSize: '12px' }}>▼</span>
                        </div>
                        <button style={{ 
                          background: '#0D0D0D', color: '#FFF', 
                          padding: '10px 20px', borderRadius: '99px', 
                          border: 'none', fontWeight: 600, fontSize: '13px', 
                          cursor: 'pointer', fontFamily: 'var(--font-body)'
                        }}>
                          Run code
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Navigation */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '0 16px',
              marginTop: '16px',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', paddingLeft: '8px' }}>
                {bottomLinks.map((link, i) => (
                  <a 
                    key={link} 
                    href="#" 
                    style={{ 
                      textDecoration: 'none', 
                      color: i === 0 ? '#0D0D0D' : '#6B6B6B', 
                      fontWeight: i === 0 ? 600 : 500,
                      fontSize: '14px',
                      fontFamily: 'var(--font-body)',
                      background: i === 0 ? '#FFFFFF' : 'transparent',
                      padding: i === 0 ? '8px 16px' : '8px 0',
                      borderRadius: i === 0 ? '99px' : '0',
                      boxShadow: i === 0 ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                      transition: 'color 0.2s'
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
              
              <button style={{ 
                background: '#0D0D0D', color: '#FFF', 
                padding: '10px 24px', borderRadius: '99px', 
                border: 'none', fontWeight: 600, fontSize: '14px', 
                cursor: 'pointer', fontFamily: 'var(--font-body)',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#2A2A2A'}
              onMouseLeave={e => e.currentTarget.style.background = '#0D0D0D'}
              >
                Sign up
              </button>
            </div>
            
          </div>

      {/* Render New Sections */}
      <TrustedBySection />
      <TwoPlatformsSection />
      <CreativeFeatureGrid />
      <AgentsFeatureGrid />
      <ApiPlatformSection />
      <ResearchSection />
      <SafetySection />
      
        </div>
      </main>
    </motion.div>
  )
}
