import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause } from 'lucide-react'
import Navbar from '../../components/layout/Navbar/Navbar'
import VoiceFilters from './VoiceFilters'
import VoiceCard, { VoiceData } from './VoiceCard'
import { voicesData } from '../../data/voicesData'

const MONO = "'JetBrains Mono', monospace"
const DISPLAY = 'var(--font-display)'
const BODY = 'var(--font-body)'

export default function VoicesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeLang, setActiveLang] = useState('All')
  const [activeGender, setActiveGender] = useState('All')
  const [activeStyle, setActiveStyle] = useState('All')
  const [selectedVoice, setSelectedVoice] = useState<VoiceData | null>(null)
  const [demoLang, setDemoLang] = useState<'Hindi' | 'English' | 'Tamil'>('Hindi')
  const [demoPlaying, setDemoPlaying] = useState(false)

  const featuredVoices = voicesData.slice(0, 3)
  const [heroVoiceIndex, setHeroVoiceIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroVoiceIndex(prev => (prev + 1) % 4)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const heroVoice = voicesData[heroVoiceIndex]
  const heroGradients = [
    'linear-gradient(135deg, #FF6B35, #FF3CAC)', // Aarohi (Warm)
    'linear-gradient(135deg, #3B82F6, #8B5CF6)', // Kabir (Professional)
    'linear-gradient(135deg, #10B981, #3B82F6)', // Meera (Conversational)
    'linear-gradient(135deg, #F59E0B, #FF6B35)'  // Arjun (Energetic)
  ]
  const currentGradient = heroGradients[heroVoiceIndex]

  const filteredVoices = voicesData.filter(v => {
    if (searchQuery && !v.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (activeLang !== 'All' && !v.languages.includes(activeLang)) return false
    if (activeGender !== 'All' && v.gender !== activeGender.toUpperCase()) return false
    if (activeStyle !== 'All' && v.style !== activeStyle.toUpperCase()) return false
    return true
  })

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: '#F7F5F2', minHeight: '100vh', paddingTop: '70px', paddingBottom: '100px' }}>
        
        {/* HERO SECTION */}
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '80px 32px 40px', display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center' }}>
          
          {/* Left Text */}
          <div style={{ flex: '1 1 500px', overflowY: 'auto', padding: '32px', msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="no-scrollbar">
            <div style={{ fontFamily: MONO, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#9A9A9A', marginBottom: '16px' }}>
              VOICE LIBRARY
            </div>
            <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(48px, 6vw, 68px)', fontWeight: 300, letterSpacing: '-0.045em', lineHeight: 1.02, color: '#0D0D0D', marginBottom: '24px' }}>
              Voices that sound like India.
            </h1>
            <p style={{ fontFamily: BODY, fontSize: '18px', maxWidth: '620px', lineHeight: 1.65, color: '#686868', fontWeight: 400 }}>
              Natural, expressive voices built for Indian languages, accents, and real conversations.
            </p>
          </div>

          {/* Right Visual (Soft Orb + Meta) */}
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '320px', height: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              {/* Orb */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroVoiceIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 0.04, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                  style={{
                    position: 'absolute',
                    width: '240px',
                    height: '240px',
                    borderRadius: '50%',
                    background: currentGradient,
                    filter: 'blur(30px)',
                    zIndex: 0
                  }} 
                />
              </AnimatePresence>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={`inner-${heroVoiceIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  style={{
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    background: currentGradient,
                    maskImage: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.65), transparent 35%)',
                    WebkitMaskImage: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.65), transparent 85%)',
                    zIndex: 1,
                    boxShadow: 'inset 0 0 40px rgba(255,255,255,0.4)',
                    marginBottom: '32px'
                  }} 
                />
              </AnimatePresence>

              {/* Waveform graphic mock */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', zIndex: 1, marginBottom: '24px' }}>
                <div style={{ width: '3px', height: '12px', background: '#0D0D0D', borderRadius: '2px', opacity: 0.2 }} />
                <div style={{ width: '3px', height: '24px', background: '#0D0D0D', borderRadius: '2px', opacity: 0.4 }} />
                <div style={{ width: '3px', height: '40px', background: '#FF6B35', borderRadius: '2px' }} />
                <div style={{ width: '3px', height: '28px', background: '#0D0D0D', borderRadius: '2px', opacity: 0.6 }} />
                <div style={{ width: '3px', height: '16px', background: '#0D0D0D', borderRadius: '2px', opacity: 0.3 }} />
              </div>

              {/* Metadata */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`meta-${heroVoiceIndex}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.4 }}
                  style={{ zIndex: 1, textAlign: 'center' }}
                >
                  <div style={{ fontFamily: DISPLAY, fontSize: '16px', fontWeight: 600, color: '#0D0D0D', letterSpacing: '-0.01em', marginBottom: '6px', textTransform: 'uppercase' }}>
                    {heroVoice.name}
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: '10px', color: '#9A9A9A', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    {heroVoice.languages[0]} · {heroVoice.gender} · {heroVoice.style}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* CONTROLS AREA (Search + Filters) */}
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px 40px' }}>
          <VoiceFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeLang={activeLang}
            setActiveLang={setActiveLang}
            activeGender={activeGender}
            setActiveGender={setActiveGender}
            activeStyle={activeStyle}
            setActiveStyle={setActiveStyle}
          />
        </div>

        {/* FEATURED VOICES */}
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '40px 32px 80px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontFamily: DISPLAY, fontSize: '28px', fontWeight: 400, color: '#0D0D0D', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                Featured voices
              </h2>
              <p style={{ fontFamily: BODY, fontSize: '15px', color: '#686868' }}>
                Our most natural voices for production conversations.
              </p>
            </div>
            <button style={{ background: 'none', border: 'none', fontFamily: BODY, fontSize: '14px', fontWeight: 500, color: '#FF6B35', cursor: 'pointer' }}>
              View all →
            </button>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '24px' 
          }}>
            {featuredVoices.map(voice => (
              <div key={voice.id} onClick={() => setSelectedVoice(voice)} style={{ cursor: 'pointer' }}>
                <VoiceCard voice={voice} />
              </div>
            ))}
          </div>
        </div>

        {/* VOICE LIBRARY GRID */}
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '40px 32px 80px', borderTop: '1px solid #E0DED9' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontFamily: DISPLAY, fontSize: '28px', fontWeight: 400, color: '#0D0D0D', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                Explore all voices
              </h2>
              <p style={{ fontFamily: BODY, fontSize: '15px', color: '#686868' }}>
                {filteredVoices.length} {filteredVoices.length === 1 ? 'voice' : 'voices'}
              </p>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '20px' 
          }}>
            {filteredVoices.map(voice => (
              <div key={voice.id} onClick={() => setSelectedVoice(voice)} style={{ cursor: 'pointer' }}>
                <VoiceCard voice={voice} />
              </div>
            ))}
          </div>
        </div>

        {/* LANGUAGE COVERAGE */}
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '80px 32px', borderTop: '1px solid #E0DED9', display: 'flex', flexWrap: 'wrap', gap: '60px' }}>
          
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ fontFamily: MONO, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#9A9A9A', marginBottom: '16px' }}>
              BUILT FOR BHARAT
            </div>
            <h2 style={{ fontFamily: DISPLAY, fontSize: '40px', fontWeight: 300, color: '#0D0D0D', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '20px' }}>
              One platform.<br/>India's many voices.
            </h2>
            <p style={{ fontFamily: BODY, fontSize: '16px', color: '#686868', lineHeight: 1.6, maxWidth: '440px', marginBottom: '40px' }}>
              Design conversations that move naturally across languages, regions and accents.
            </p>

            {/* Interactive Demo */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E0DED9', borderRadius: '20px', padding: '24px' }}>
              <h3 style={{ fontFamily: DISPLAY, fontSize: '18px', fontWeight: 500, color: '#0D0D0D', letterSpacing: '-0.01em', marginBottom: '20px' }}>
                One agent. Multiple languages.
              </h3>
              
              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                {['Hindi', 'English', 'Tamil'].map(l => (
                  <button key={l} onClick={() => setDemoLang(l as any)} style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: demoLang === l ? '#0D0D0D' : 'transparent',
                    color: demoLang === l ? '#FFFFFF' : '#686868',
                    fontFamily: MONO,
                    fontSize: '11px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 150ms ease'
                  }}>
                    {l}
                  </button>
                ))}
              </div>

              <div style={{ padding: '20px', background: '#F7F5F2', borderRadius: '14px', fontFamily: BODY, fontSize: '15px', color: '#0D0D0D', lineHeight: 1.5 }}>
                {demoLang === 'Hindi' && "Namaste, main aapki kaise madad kar sakti hoon?"}
                {demoLang === 'English' && "Hello, how can I help you today?"}
                {demoLang === 'Tamil' && "வணக்கம், நான் உங்களுக்கு எப்படி உதவலாம்?"}
              </div>

              <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button onClick={() => setDemoPlaying(!demoPlaying)} style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0D0D0D', color: '#FFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  {demoPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" style={{ marginLeft: '2px' }} />}
                </button>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '3px', height: '24px', opacity: demoPlaying ? 1 : 0.4 }}>
                  {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div key={i} animate={{ height: demoPlaying ? ['6px', `${Math.random() * 18 + 6}px`, '6px'] : '6px' }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }} style={{ width: '4px', background: demoPlaying ? '#FF6B35' : '#D0CDD5', borderRadius: '2px' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ flex: '1 1 500px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
              {[
                { name: 'Hindi', script: 'हिन्दी', voices: 8 },
                { name: 'Tamil', script: 'தமிழ்', voices: 4 },
                { name: 'Telugu', script: 'తెలుగు', voices: 4 },
                { name: 'Marathi', script: 'मराठी', voices: 3 },
                { name: 'Bengali', script: 'বাংলা', voices: 3 },
                { name: 'Gujarati', script: 'ગુજરાતી', voices: 2 },
                { name: 'Kannada', script: 'ಕನ್ನಡ', voices: 2 },
                { name: 'Malayalam', script: 'മലയാളം', voices: 2 },
                { name: 'Punjabi', script: 'ਪੰਜਾਬੀ', voices: 2 },
                { name: 'Odia', script: 'ଓଡ଼ିଆ', voices: 1 },
                { name: 'Assamese', script: 'অসমীয়া', voices: 1 },
                { name: 'Urdu', script: 'اردو', voices: 1 },
              ].map(lang => (
                <div key={lang.name} style={{ background: '#FFFFFF', border: '1px solid #E0DED9', borderRadius: '16px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ fontFamily: DISPLAY, fontSize: '16px', fontWeight: 500, color: '#0D0D0D' }}>{lang.name}</div>
                    <div style={{ fontFamily: BODY, fontSize: '18px', color: '#9A9A9A' }}>{lang.script}</div>
                  </div>
                  <div style={{ fontFamily: BODY, fontSize: '13px', color: '#686868', marginBottom: '12px' }}>{lang.voices} voices</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }} />
                    <div style={{ fontFamily: MONO, fontSize: '9px', color: '#22C55E', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Available</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <div style={{ maxWidth: '800px', margin: '40px auto 0', padding: '0 32px' }}>
          <div style={{ 
            background: '#0D0D0D', 
            borderRadius: '24px', 
            padding: '48px', 
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%',
              background: 'radial-gradient(ellipse at center, rgba(255,107,53,0.1) 0%, rgba(0,0,0,0) 70%)',
              pointerEvents: 'none'
            }} />
            
            <h2 style={{ fontFamily: DISPLAY, fontSize: '32px', fontWeight: 300, color: '#FFFFFF', letterSpacing: '-0.03em', marginBottom: '12px', position: 'relative' }}>
              Give your agent a voice.
            </h2>
            <p style={{ fontFamily: BODY, fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '32px', position: 'relative' }}>
              Choose a voice, connect a language, and start building.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', position: 'relative' }}>
              <button style={{ height: '40px', padding: '0 20px', background: '#FFFFFF', color: '#0D0D0D', border: 'none', borderRadius: '9999px', fontFamily: BODY, fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                Create an agent
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* VOICE DETAIL DRAWER */}
      <AnimatePresence>
        {selectedVoice && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVoice(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(4px)',
                zIndex: 999
              }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                maxWidth: '480px',
                background: '#FFFFFF',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '-4px 0 24px rgba(0,0,0,0.05)',
                borderLeft: '1px solid #E0DED9'
              }}
            >
              <div style={{ padding: '32px 32px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #E0DED9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: selectedVoice.gradient }} />
                  <div>
                    <h3 style={{ fontFamily: DISPLAY, fontSize: '20px', fontWeight: 500, color: '#0D0D0D' }}>{selectedVoice.name}</h3>
                    <p style={{ fontFamily: BODY, fontSize: '14px', color: '#686868' }}>{selectedVoice.title}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedVoice(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0D0D0D' }}>
                  <X size={24} />
                </button>
              </div>

              <div style={{ padding: '32px 24px', flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
                  {[selectedVoice.gender, selectedVoice.languages[0], selectedVoice.style].map((m, i) => (
                    <span key={i} style={{ fontFamily: MONO, fontSize: '10px', color: '#686868', background: '#F7F5F2', padding: '6px 12px', borderRadius: '9999px', letterSpacing: '0.1em' }}>
                      {m}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '24px', marginBottom: '40px' }}>
                  <div>
                    <div style={{ fontFamily: MONO, fontSize: '10px', color: '#9A9A9A', letterSpacing: '0.12em', marginBottom: '4px' }}>LATENCY</div>
                    <div style={{ fontFamily: DISPLAY, fontSize: '24px', fontWeight: 300 }}>{selectedVoice.latency}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: MONO, fontSize: '10px', color: '#9A9A9A', letterSpacing: '0.12em', marginBottom: '4px' }}>QUALITY</div>
                    <div style={{ fontFamily: DISPLAY, fontSize: '24px', fontWeight: 300 }}>{selectedVoice.quality}</div>
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ fontFamily: MONO, fontSize: '10px', color: '#9A9A9A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>Speaks</h4>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {selectedVoice.languages.map(l => (
                      <span key={l} style={{ fontFamily: BODY, fontSize: '14px', color: '#0D0D0D', background: '#F7F5F2', padding: '8px 16px', borderRadius: '8px' }}>{l}</span>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ fontFamily: MONO, fontSize: '10px', color: '#9A9A9A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>Voice character</h4>
                  <p style={{ fontFamily: BODY, fontSize: '15px', color: '#686868', lineHeight: 1.6 }}>
                    {selectedVoice.description}
                  </p>
                </div>

                <div style={{ padding: '24px', background: '#F7F5F2', borderRadius: '16px' }}>
                  <div style={{ fontFamily: MONO, fontSize: '10px', color: '#9A9A9A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>Preview</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#0D0D0D', color: '#FFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Play size={20} fill="currentColor" style={{ marginLeft: '4px' }} />
                    </button>
                    <div style={{ flex: 1, height: '4px', background: '#E0DED9', borderRadius: '2px', position: 'relative' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%', background: '#FF6B35', borderRadius: '2px' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ padding: '24px 32px', borderTop: '1px solid #E0DED9', background: '#F7F5F2' }}>
                <button style={{
                  width: '100%',
                  height: '48px',
                  background: '#0D0D0D',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '24px',
                  fontFamily: BODY,
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'transform 150ms ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Use this voice
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
