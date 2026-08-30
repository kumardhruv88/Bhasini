import { Search } from 'lucide-react'

const BODY = 'var(--font-body)'
const MONO = "'JetBrains Mono', monospace"

const LANGUAGES = ['All', 'Hindi', 'English', 'Tamil', 'Telugu', 'Marathi', 'Bengali', 'Punjabi', 'Kannada', 'Malayalam']
const GENDERS = ['All', 'Female', 'Male']
const STYLES = ['Warm', 'Professional', 'Conversational', 'Energetic', 'Calm']

interface VoiceFiltersProps {
  searchQuery: string
  setSearchQuery: (val: string) => void
  activeLang: string
  setActiveLang: (val: string) => void
  activeGender: string
  setActiveGender: (val: string) => void
  activeStyle: string
  setActiveStyle: (val: string) => void
}

export default function VoiceFilters({
  searchQuery, setSearchQuery,
  activeLang, setActiveLang,
  activeGender, setActiveGender,
  activeStyle, setActiveStyle
}: VoiceFiltersProps) {

  const Pill = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
    <button
      onClick={onClick}
      style={{
        height: '32px',
        padding: '0 14px',
        borderRadius: '9999px',
        border: active ? '1px solid #0D0D0D' : '1px solid #E0DED9',
        background: active ? '#0D0D0D' : '#FFFFFF',
        color: active ? '#FFFFFF' : '#686868',
        fontFamily: BODY,
        fontSize: '13px',
        fontWeight: active ? 500 : 400,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all 150ms ease'
      }}
    >
      {label}
    </button>
  )

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '16px',
      background: '#FFFFFF',
      padding: '16px 20px',
      borderRadius: '20px',
      border: '1px solid #E0DED9',
      boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
    }}>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 240px', minWidth: '240px' }}>
          <Search size={16} color="#9A9A9A" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search voices..."
            style={{
              width: '100%',
              height: '40px',
              background: '#F7F5F2',
              border: '1px solid transparent',
              borderRadius: '10px',
              paddingLeft: '44px',
              paddingRight: '16px',
              fontFamily: BODY,
              fontSize: '14px',
              color: '#0D0D0D',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border 150ms ease'
            }}
            onFocus={e => e.target.style.border = '1px solid #E0DED9'}
            onBlur={e => e.target.style.border = '1px solid transparent'}
          />
        </div>

        {/* Language Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none', flex: '2 1 400px' }}>
          <span style={{ fontFamily: MONO, fontSize: '10px', color: '#9A9A9A', letterSpacing: '0.12em', textTransform: 'uppercase', marginRight: '4px' }}>LANG</span>
          {LANGUAGES.map(lang => (
            <Pill key={lang} label={lang} active={activeLang === lang} onClick={() => setActiveLang(lang)} />
          ))}
        </div>
      </div>

      <div style={{ height: '1px', background: '#E0DED9', width: '100%' }} />

      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Gender Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          <span style={{ fontFamily: MONO, fontSize: '10px', color: '#9A9A9A', letterSpacing: '0.12em', textTransform: 'uppercase', marginRight: '4px' }}>GENDER</span>
          {GENDERS.map(gen => (
            <Pill key={gen} label={gen} active={activeGender === gen} onClick={() => setActiveGender(gen)} />
          ))}
        </div>

        {/* Style Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          <span style={{ fontFamily: MONO, fontSize: '10px', color: '#9A9A9A', letterSpacing: '0.12em', textTransform: 'uppercase', marginRight: '4px' }}>STYLE</span>
          {STYLES.map(style => (
            <Pill key={style} label={style} active={activeStyle === style} onClick={() => setActiveStyle(style)} />
          ))}
        </div>
      </div>

    </div>
  )
}
