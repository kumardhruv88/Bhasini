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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top row: Search */}
      <div style={{ position: 'relative', maxWidth: '420px', width: '100%' }}>
        <Search size={16} color="#9A9A9A" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
        <input 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search voices..."
          style={{
            width: '100%',
            height: '48px',
            background: '#FFFFFF',
            border: '1px solid #E0DED9',
            borderRadius: '9999px',
            paddingLeft: '44px',
            paddingRight: '16px',
            fontFamily: BODY,
            fontSize: '15px',
            color: '#0D0D0D',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Filter Rows Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        
        {/* Language Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflowX: 'auto', paddingBottom: '4px', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          <span style={{ fontFamily: MONO, fontSize: '10px', color: '#9A9A9A', letterSpacing: '0.12em', textTransform: 'uppercase', marginRight: '4px' }}>LANG</span>
          {LANGUAGES.map(lang => (
            <Pill key={lang} label={lang} active={activeLang === lang} onClick={() => setActiveLang(lang)} />
          ))}
        </div>

        {/* Attribute Rows (Gender & Style) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            <span style={{ fontFamily: MONO, fontSize: '10px', color: '#9A9A9A', letterSpacing: '0.12em', textTransform: 'uppercase', marginRight: '4px' }}>GENDER</span>
            {GENDERS.map(gen => (
              <Pill key={gen} label={gen} active={activeGender === gen} onClick={() => setActiveGender(gen)} />
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            <span style={{ fontFamily: MONO, fontSize: '10px', color: '#9A9A9A', letterSpacing: '0.12em', textTransform: 'uppercase', marginRight: '4px' }}>STYLE</span>
            {STYLES.map(style => (
              <Pill key={style} label={style} active={activeStyle === style} onClick={() => setActiveStyle(style)} />
            ))}
          </div>

        </div>

      </div>

    </div>
  )
}
