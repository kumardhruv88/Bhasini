export default function LanguagePill({ language, size = 'sm' }: { language: string, size?: 'sm' | 'md' }) {
  const isSm = size === 'sm'
  return (
    <span style={{ 
      fontFamily: 'var(--font-body)', 
      fontSize: isSm ? '10px' : '12px', 
      padding: isSm ? '3px 8px' : '3px 10px', 
      background: '#F7F5F2', 
      border: '1px solid #E0DED9', 
      borderRadius: '9999px', 
      color: '#6B6B6B',
      whiteSpace: 'nowrap',
      width: 'fit-content'
    }}>
      {language}
    </span>
  )
}
