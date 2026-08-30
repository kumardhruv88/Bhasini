

export function TrustedBySection() {
  const logos = ['Razorpay', 'PhonePe', 'Zomato', 'MakeMyTrip', 'Practo', 'IRCTC', 'Meesho', 'Zepto', 'Ola', 'upGrad', 'Nykaa', "BYJU'S", 'Paytm', 'Swiggy', 'PolicyBazaar', 'Groww', 'Vedantu', 'Juspay']
  
  return (
    <section style={{ padding: '80px 32px', maxWidth: '1160px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 500, color: '#0D0D0D', margin: 0, fontFamily: 'var(--font-body)' }}>
          Trusted by leading developers and enterprises
        </h2>
        <button style={{ 
          background: '#FFF', color: '#0D0D0D', 
          padding: '10px 20px', borderRadius: '99px', 
          border: '1px solid #E0DED9', fontWeight: 600, fontSize: '14px', 
          cursor: 'pointer', fontFamily: 'var(--font-body)',
          transition: 'all 0.2s',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#F9F8F6'}
        onMouseLeave={e => e.currentTarget.style.background = '#FFF'}
        >
          Read all stories
        </button>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
        gap: '40px', 
        alignItems: 'center', 
        justifyItems: 'center',
        opacity: 0.4,
        filter: 'grayscale(100%)'
      }}>
        {logos.map(logo => (
           <div key={logo} style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '-0.04em' }}>{logo}</div>
        ))}
      </div>
      <div style={{ width: '100%', height: '1px', background: '#EAE8E3', margin: '80px 0 0 0' }} />
    </section>
  )
}
