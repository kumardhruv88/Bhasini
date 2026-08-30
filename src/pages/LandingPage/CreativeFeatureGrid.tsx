import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Globe, Headphones, Zap } from 'lucide-react'

export function CreativeFeatureGrid() {
  const [langIndex, setLangIndex] = useState(0)
  
  const leftCardData = [
    { text: "दिल्ली की गर्मी में भी, पहाड़ों की ठंडक का ख़्वाब\nदेखना — यही तो ज़िंदगी की ख़ूबसूरती है।", sub: "सुनो, समझो, महसूस करो।", label: "Generating speech in Hindi..." },
    { text: "சென்னை மழையில், சுடச்சுட காபி குடிப்பது\nஎவ்வளவு ஆனந்தம் தெரியுமா?", sub: "கேளுங்கள், உணருங்கள்.", label: "Generating speech in Tamil..." },
    { text: "హైదరాబాద్ బిర్యానీ ఘుమఘుమలు, చార్మినార్\nఅందం — అదొక అద్భుతం.", sub: "వినండి, అనుభూతి చెందండి.", label: "Generating speech in Telugu..." },
    { text: "पुण्याची मिसळ आणि पावसाळ्याची संध्याकाळ,\nखरंच खूप भारी वाटतं.", sub: "ऐका, समजून घ्या, अनुभवा.", label: "Generating speech in Marathi..." }
  ]

  useEffect(() => {
    const int = setInterval(() => {
      setLangIndex(prev => (prev + 1) % 4)
    }, 4000)
    return () => clearInterval(int)
  }, [])

  const [rightLang, setRightLang] = useState('Hindi')
  const [rightVoice, setRightVoice] = useState('Priya Sharma')
  const [isPlaying, setIsPlaying] = useState(false)
  
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const [voiceDropdownOpen, setVoiceDropdownOpen] = useState(false)

  const voicesMap: Record<string, string[]> = {
    'Hindi': ['Priya Sharma', 'Rahul Kumar', 'Amit Singh'],
    'Tamil': ['Meena Lakshmi', 'Karthik Raja'],
    'Telugu': ['Anusha Rao', 'Vijay Kumar'],
    'Marathi': ['Sneha Patil', 'Rohan Deshmukh']
  }

  const rightTextMap: Record<string, string> = {
    'Hindi': '"नमस्ते! मैं आपका AI travel guide हूँ।\nकेरल के backwaters हों या Ladakh की\nवादियाँ — मैं हर जगह साथ हूँ। [warmly]\nबताइए, कहाँ जाना है?"',
    'Tamil': '"வணக்கம்! நான் உங்கள் AI பயண வழிகாட்டி.\nகேரளாவின் உப்பங்கழிகளாக இருந்தாலும் சரி,\nலடாக்கின் பள்ளத்தாக்குகளாக இருந்தாலும் சரி — நான் எப்பொழுதும் உங்களுடன் இருப்பேன். [warmly]\nசொல்லுங்கள், எங்கே செல்ல வேண்டும்?"',
    'Telugu': '"నమస్కారం! నేను మీ AI ట్రావెల్ గైడ్‌ని.\nకేరళ బ్యాక్ వాటర్స్ అయినా, లడఖ్ లోయలైనా\n— నేను ఎప్పుడూ మీతోనే ఉంటాను. [warmly]\nచెప్పండి, ఎక్కడికి వెళ్లాలి?"',
    'Marathi': '"नमस्कार! मी तुमचा AI ट्रॅव्हल गाईड आहे.\nकेरळचे बॅकवॉटर असो वा लडाखच्या दऱ्या —\nमी नेहमी तुमच्या सोबत आहे. [warmly]\nसांगा, कुठे जायचे आहे?"'
  }

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => setIsPlaying(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isPlaying])


  return (
    <section style={{ padding: '80px 32px', maxWidth: '1160px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '64px', flexWrap: 'wrap', gap: '40px' }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#6B6B6B', marginBottom: '12px' }}>BhasiniCreative</div>
          <h2 style={{ 
            fontSize: 'clamp(32px, 4vw, 42px)', 
            fontWeight: 500, 
            fontFamily: 'var(--font-display)', 
            lineHeight: 1.1, 
            letterSpacing: '-0.03em', 
            margin: '0 0 24px 0', 
            color: '#0D0D0D'
          }}>
            Create, edit, and localize in one AI platform
          </h2>
          <button style={{ 
            background: '#0D0D0D', color: '#FFF', 
            padding: '12px 24px', borderRadius: '99px', 
            border: 'none', fontWeight: 600, fontSize: '14px', 
            cursor: 'pointer', fontFamily: 'var(--font-body)',
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#2A2A2A'}
          onMouseLeave={e => e.currentTarget.style.background = '#0D0D0D'}
          >
            Learn more
          </button>
        </div>
        <div style={{ flex: '1 1 400px', paddingTop: '32px' }}>
          <p style={{ fontSize: '16px', color: '#4A4A4A', margin: 0, lineHeight: 1.6 }}>
            Generate ultra-realistic speech in 22+ Indian languages, turn ideas into regional videos, or design immersive conversational experiences. Craft your next ad, campaign, or audiobook with our creative platform.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '16px' }}>
        
        <div style={{ 
          gridColumn: 'span 6', 
          background: '#F9F8F6', 
          borderRadius: '24px', 
          border: '1px solid #EBE9E4', 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '400px'
        }}>
          <div style={{ padding: '32px', flex: 1, position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={langIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p style={{ color: '#6B6B6B', fontSize: '15px', lineHeight: 1.6, margin: '0 0 24px 0', whiteSpace: 'pre-line' }}>
                  {leftCardData[langIndex].text}
                </p>
                <p style={{ color: '#C8C5C0', fontSize: '15px', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
                  {leftCardData[langIndex].sub}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div style={{ padding: '24px', background: 'linear-gradient(to bottom, transparent, #EFEFED)' }}>
            <div style={{ 
              height: '40px', 
              borderRadius: '8px', 
              background: '#FFF',
              marginBottom: '16px',
              border: '2px solid #FFF',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <motion.div 
                key={langIndex}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4, ease: 'linear' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #1A73E8 0%, #FF3CAC 50%, #FF6B35 100%)',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
               <div style={{ flex: 1, background: '#FFF', borderRadius: '8px', padding: '12px', fontSize: '13px', color: '#6B6B6B', border: '1px solid #EAE8E3' }}>
                 <AnimatePresence mode="wait">
                   <motion.span
                     key={langIndex}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                   >
                     {leftCardData[langIndex].label}
                   </motion.span>
                 </AnimatePresence>
               </div>
               <div style={{ width: '44px', height: '44px', background: '#FFF', borderRadius: '8px', border: '1px solid #EAE8E3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                   style={{ width: '16px', height: '16px', border: '2px solid #C8C5C0', borderTopColor: '#0D0D0D', borderRadius: '50%' }}
                 />
               </div>
            </div>
          </div>
        </div>

        {/* Large Right Card - Playground Mockup */}
        <div style={{ 
          gridColumn: 'span 6', 
          background: '#F9F8F6', 
          borderRadius: '24px', 
          border: '1px solid #EBE9E4', 
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ 
            background: '#FFF', 
            borderRadius: '16px', 
            padding: '24px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
            border: '1px solid #EAE8E3'
          }}>
            <p style={{ color: '#0D0D0D', fontSize: '15px', lineHeight: 1.6, margin: '0 0 24px 0', whiteSpace: 'pre-line' }}>
              {rightTextMap[rightLang]}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #EAE8E3', paddingTop: '16px' }}>
               <div style={{ display: 'flex', gap: '16px' }}>
                 
                 {/* Custom Language Select */}
                 <div style={{ position: 'relative' }}>
                   <div 
                     onClick={() => { setLangDropdownOpen(!langDropdownOpen); setVoiceDropdownOpen(false) }}
                     style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#0D0D0D', fontWeight: 600, fontSize: '13px', fontFamily: 'var(--font-body)' }}
                   >
                     <span style={{ fontSize: '10px', color: '#6B6B6B', fontWeight: 700, letterSpacing: '0.05em' }}>IN</span>
                     {rightLang} <span style={{ fontSize: '10px' }}>▼</span>
                   </div>
                   <AnimatePresence>
                     {langDropdownOpen && (
                       <motion.div
                         initial={{ opacity: 0, y: -5 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -5 }}
                         style={{ position: 'absolute', top: '100%', left: 0, marginTop: '8px', background: '#FFF', border: '1px solid #EAE8E3', borderRadius: '12px', padding: '6px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', zIndex: 50, minWidth: '120px' }}
                       >
                         {Object.keys(voicesMap).map(lang => (
                           <div
                             key={lang}
                             onClick={() => {
                               setRightLang(lang)
                               setRightVoice(voicesMap[lang][0])
                               setLangDropdownOpen(false)
                             }}
                             style={{ padding: '8px 12px', fontSize: '13px', cursor: 'pointer', borderRadius: '6px', fontFamily: 'var(--font-body)', fontWeight: 500, background: rightLang === lang ? '#F5F5F5' : 'transparent', color: '#0D0D0D' }}
                             onMouseEnter={e => e.currentTarget.style.background = '#F5F5F5'}
                             onMouseLeave={e => e.currentTarget.style.background = rightLang === lang ? '#F5F5F5' : 'transparent'}
                           >
                             <span style={{ fontSize: '10px', color: '#6B6B6B', fontWeight: 700, letterSpacing: '0.05em', marginRight: '4px' }}>IN</span>
                             {lang}
                           </div>
                         ))}
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>

                 {/* Custom Voice Select */}
                 <div style={{ position: 'relative' }}>
                   <div 
                     onClick={() => { setVoiceDropdownOpen(!voiceDropdownOpen); setLangDropdownOpen(false) }}
                     style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#0D0D0D', fontWeight: 600, fontSize: '13px', fontFamily: 'var(--font-body)' }}
                   >
                     {rightVoice} <span style={{ fontSize: '10px' }}>▼</span>
                   </div>
                   <AnimatePresence>
                     {voiceDropdownOpen && (
                       <motion.div
                         initial={{ opacity: 0, y: -5 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -5 }}
                         style={{ position: 'absolute', top: '100%', left: 0, marginTop: '8px', background: '#FFF', border: '1px solid #EAE8E3', borderRadius: '12px', padding: '6px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', zIndex: 50, minWidth: '160px' }}
                       >
                         {voicesMap[rightLang].map(voice => (
                           <div
                             key={voice}
                             onClick={() => {
                               setRightVoice(voice)
                               setVoiceDropdownOpen(false)
                             }}
                             style={{ padding: '8px 12px', fontSize: '13px', cursor: 'pointer', borderRadius: '6px', fontFamily: 'var(--font-body)', fontWeight: 500, background: rightVoice === voice ? '#F5F5F5' : 'transparent', color: '#0D0D0D' }}
                             onMouseEnter={e => e.currentTarget.style.background = '#F5F5F5'}
                             onMouseLeave={e => e.currentTarget.style.background = rightVoice === voice ? '#F5F5F5' : 'transparent'}
                           >
                             {voice}
                           </div>
                         ))}
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
                 
               </div>
               
               <button 
                 onClick={() => setIsPlaying(true)}
                 style={{ 
                   background: isPlaying ? '#22C55E' : '#0D0D0D', color: '#FFF', 
                   padding: '8px 16px', borderRadius: '99px', 
                   border: 'none', fontWeight: 600, fontSize: '13px', 
                   cursor: isPlaying ? 'default' : 'pointer',
                   transition: 'background 0.2s',
                   width: '80px'
                 }}
               >
                 {isPlaying ? 'Playing...' : 'Play'}
               </button>
            </div>
          </div>
        </div>

        {/* Small Cards Row */}
        {[
          { title: 'Voices', desc: 'Clone your voice or explore 100+ native Indian language voices from the library.', icon: <Mic size={20} color="#6B6B6B" strokeWidth={1.5} /> },
          { title: 'Translation', desc: 'Seamlessly translate and dub videos across 22+ official languages.', icon: <Globe size={20} color="#6B6B6B" strokeWidth={1.5} /> },
          { title: 'Audio Studio', desc: 'Generate studio-quality voiceovers and podcasts with advanced pacing control.', icon: <Headphones size={20} color="#6B6B6B" strokeWidth={1.5} /> },
          { title: 'Workflows', desc: 'Automate bulk translation and audio generation with powerful API integrations.', icon: <Zap size={20} color="#6B6B6B" strokeWidth={1.5} /> },
        ].map((card, i) => (
          <div key={i} style={{ 
            gridColumn: 'span 3', 
            background: '#F9F8F6', 
            borderRadius: '24px', 
            border: '1px solid #EBE9E4', 
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#FFF', border: '1px solid #EAE8E3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
              {card.icon}
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 8px 0', color: '#0D0D0D' }}>{card.title}</h4>
              <p style={{ fontSize: '13px', color: '#6B6B6B', margin: 0, lineHeight: 1.5 }}>{card.desc}</p>
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}
