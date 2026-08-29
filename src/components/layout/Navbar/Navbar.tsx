import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Bot, Mic, CreditCard, BookOpen, BarChart3 } from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────
interface DropdownItem {
  icon: string
  label: string
  desc: string
  href: string
}

const dropdownItems: DropdownItem[] = [
  { icon: '🎙️', label: 'BhasiniCreative', desc: 'Generate speech, music & video', href: '/products/creative' },
  { icon: '🤖', label: 'BhasiniAgents', desc: 'Deploy conversational voice agents', href: '/agents' },
  { icon: '⚡', label: 'BhasiniAPI', desc: 'Build with our voice API', href: '/docs' },
  { icon: '📊', label: 'Observatory', desc: 'Monitor agent performance', href: '/app/analytics' },
]

const navLinks = [
  { label: 'Products', href: '/products', hasDropdown: true },
  { label: 'Agents', href: '/agents', hasDropdown: false },
  { label: 'Voices', href: '/voices', hasDropdown: false },
  { label: 'Pricing', href: '/pricing', hasDropdown: false },
  { label: 'Docs', href: '/docs', hasDropdown: false },
]

const mobileNavLinks = [
  { label: 'Agents', href: '/agents', icon: <Bot size={18} /> },
  { label: 'Voices', href: '/voices', icon: <Mic size={18} /> },
  { label: 'Pricing', href: '/pricing', icon: <CreditCard size={18} /> },
  { label: 'Docs', href: '/docs', icon: <BookOpen size={18} /> },
  { label: 'Observatory', href: '/app/analytics', icon: <BarChart3 size={18} /> },
]

const languageChips = ['हिं', 'EN', 'தமி', 'తెలు', 'मरा', 'ਪੰਜ', 'HG']

// ─── Component ───────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const productsRef = useRef<HTMLDivElement>(null)

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false)
    setProductsOpen(false)
  }, [location.pathname])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Click outside dropdown
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  // ─── Styles ────────────────────────────────────────────────────
  const S = {
    header: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      height: '64px',
      zIndex: 200,
      backgroundColor: scrolled ? 'rgba(247,245,242,0.92)' : 'rgba(247,245,242,0)',
      backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(224,222,217,0.8)' : '1px solid transparent',
      transition: 'background-color 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease',
    },
    inner: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 32px',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '32px',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      textDecoration: 'none',
      flexShrink: 0,
    },
    logoText: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '20px',
      fontWeight: 800,
      color: '#0D0D0D',
      letterSpacing: '-0.02em',
      display: 'flex',
      alignItems: 'center',
      gap: '1px',
    },
    logoPipe: {
      color: '#9E9E9E',
      fontWeight: 400,
      marginRight: '1px',
    },
    betaBadge: {
      background: 'linear-gradient(90deg, #FF6B35 0%, #FF3CAC 100%)',
      color: 'white',
      fontSize: '9px',
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
      padding: '3px 8px',
      borderRadius: '9999px',
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      flex: 1,
      justifyContent: 'center',
    },
    navLinkBase: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '14px',
      fontWeight: 500,
      textDecoration: 'none',
      padding: '6px 10px',
      borderRadius: '8px',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      position: 'relative' as const,
      transition: 'color 150ms ease',
      whiteSpace: 'nowrap' as const,
    },
    authRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flexShrink: 0,
    },
    loginBtn: {
      height: '36px',
      padding: '0 16px',
      background: 'transparent',
      border: 'none',
      color: '#0D0D0D',
      fontSize: '14px',
      fontWeight: 500,
      fontFamily: "'DM Sans', sans-serif",
      cursor: 'pointer',
      borderRadius: '9999px',
      transition: 'background 150ms ease',
      whiteSpace: 'nowrap' as const,
    },
    signupBtn: {
      height: '36px',
      padding: '0 18px',
      background: '#0D0D0D',
      border: 'none',
      color: '#FFFFFF',
      fontSize: '14px',
      fontWeight: 600,
      fontFamily: "'DM Sans', sans-serif",
      cursor: 'pointer',
      borderRadius: '9999px',
      transition: 'background 150ms ease, transform 150ms ease',
      whiteSpace: 'nowrap' as const,
    },
    hamburger: {
      width: '40px',
      height: '40px',
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '10px',
      color: '#0D0D0D',
      padding: 0,
    },
    // Dropdown
    dropdownWrapper: {
      position: 'relative' as const,
    },
    dropdown: {
      position: 'absolute' as const,
      top: 'calc(100% + 10px)',
      left: '-16px',
      background: '#FFFFFF',
      border: '1px solid #E0DED9',
      borderRadius: '20px',
      boxShadow: '0 12px 40px rgba(0,0,0,0.10)',
      padding: '8px',
      minWidth: '230px',
      zIndex: 300,
    },
    dropdownItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 12px',
      borderRadius: '14px',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'background 150ms ease',
    },
    dropdownIcon: {
      width: '36px',
      height: '36px',
      background: '#EFEFED',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      flexShrink: 0,
    },
    // Mobile overlay
    overlay: {
      position: 'fixed' as const,
      inset: 0,
      background: 'rgba(0,0,0,0.4)',
      backdropFilter: 'blur(4px)',
      zIndex: 199,
    },
    drawer: {
      position: 'fixed' as const,
      top: 0,
      right: 0,
      width: 'min(320px, 85vw)',
      height: '100vh',
      background: '#F7F5F2',
      zIndex: 400,
      boxShadow: '0 24px 64px rgba(0,0,0,0.12)',
      display: 'flex',
      flexDirection: 'column' as const,
      overflow: 'hidden',
    },
  }

  return (
    <>
      {/* NAVBAR */}
      <motion.header
        style={S.header}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={S.inner}>

          {/* LOGO */}
          <Link to="/" style={S.logo}>
            <span style={S.logoText}>
              <span style={S.logoPipe}>||</span>Bhasini
            </span>
            <span style={S.betaBadge}>BETA</span>
          </Link>

          {/* DESKTOP NAV — hidden below 1024px via media query in globals.css */}
          <nav style={S.nav} className="desktop-nav">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              const linkColor = active ? '#0D0D0D' : '#6B6B6B'
              const linkWeight = active ? 600 : 500

              if (link.hasDropdown) {
                return (
                  <div key={link.label} style={S.dropdownWrapper} ref={productsRef}>
                    <button
                      style={{ ...S.navLinkBase, color: linkColor, fontWeight: linkWeight }}
                      onClick={() => setProductsOpen(p => !p)}
                      onMouseEnter={() => setProductsOpen(true)}
                    >
                      {link.label}
                      <motion.span
                        animate={{ rotate: productsOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <ChevronDown size={14} />
                      </motion.span>
                      {active && (
                        <motion.span
                          layoutId="nav-indicator"
                          style={{
                            position: 'absolute',
                            bottom: '-2px',
                            left: '10px',
                            right: '10px',
                            height: '2px',
                            background: '#FF6B35',
                            borderRadius: '1px',
                          }}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {productsOpen && (
                        <motion.div
                          style={S.dropdown}
                          initial={{ opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -4, scale: 0.97 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          onMouseLeave={() => setProductsOpen(false)}
                        >
                          {dropdownItems.map((item) => (
                            <div
                              key={item.label}
                              style={S.dropdownItem}
                              onClick={() => { navigate(item.href); setProductsOpen(false) }}
                              onMouseEnter={e => (e.currentTarget.style.background = '#EFEFED')}
                              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                            >
                              <div>
                                <div style={{
                                  fontSize: '13px', fontWeight: 600,
                                  color: '#0D0D0D', fontFamily: "'DM Sans', sans-serif"
                                }}>
                                  {item.label}
                                </div>
                                <div style={{
                                  fontSize: '11px', color: '#6B6B6B',
                                  marginTop: '1px', fontFamily: "'DM Sans', sans-serif"
                                }}>
                                  {item.desc}
                                </div>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  style={{ ...S.navLinkBase, color: linkColor, fontWeight: linkWeight }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#0D0D0D')}
                  onMouseLeave={e => (e.currentTarget.style.color = active ? '#0D0D0D' : '#6B6B6B')}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: '10px',
                        right: '10px',
                        height: '2px',
                        background: '#FF6B35',
                        borderRadius: '1px',
                      }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* DESKTOP AUTH BUTTONS */}
          <div style={S.authRow} className="desktop-nav">
            <button
              style={S.loginBtn}
              onClick={() => navigate('/login')}
              onMouseEnter={e => (e.currentTarget.style.background = '#EFEFED')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              Log in
            </button>
            <motion.button
              style={S.signupBtn}
              onClick={() => navigate('/signup')}
              whileHover={{ scale: 1.02, backgroundColor: '#2A2A2A' }}
              whileTap={{ scale: 0.98 }}
            >
              Sign up
            </motion.button>
          </div>

          {/* HAMBURGER — visible below 1024px */}
          <button
            className="mobile-menu-btn"
            style={{ ...S.hamburger, display: 'flex' }}
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span key="x"
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span key="menu"
                  initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

        </div>
      </motion.header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              style={S.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              style={S.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Drawer Header */}
              <div style={{
                height: '64px', padding: '0 20px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #E0DED9',
                flexShrink: 0,
              }}>
                <Link to="/" style={S.logo} onClick={() => setMobileOpen(false)}>
                  <span style={S.logoText}>
                    <span style={S.logoPipe}>||</span>Bhasini
                  </span>
                  <span style={S.betaBadge}>BETA</span>
                </Link>
                <button
                  style={{ ...S.hamburger, display: 'flex' }}
                  onClick={() => setMobileOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Nav Links */}
              <div style={{ padding: '12px', flex: 1, overflowY: 'auto' }}>
                {mobileNavLinks.map((link) => {
                  const active = isActive(link.href)
                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '13px 12px',
                        borderRadius: '14px',
                        fontSize: '16px',
                        fontWeight: 500,
                        color: active ? '#FF6B35' : '#0D0D0D',
                        background: active ? 'rgba(255,107,53,0.06)' : 'transparent',
                        textDecoration: 'none',
                        fontFamily: "'DM Sans', sans-serif",
                        transition: 'background 150ms',
                      }}
                      onClick={() => setMobileOpen(false)}
                      onMouseEnter={e => {
                        if (!active) e.currentTarget.style.background = '#EFEFED'
                      }}
                      onMouseLeave={e => {
                        if (!active) e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <span style={{ color: active ? '#FF6B35' : '#6B6B6B' }}>
                        {link.icon}
                      </span>
                      {link.label}
                    </Link>
                  )
                })}
              </div>

              {/* Drawer Footer */}
              <div style={{
                padding: '16px 12px 32px',
                borderTop: '1px solid #E0DED9',
                flexShrink: 0,
              }}>
                <button
                  style={{
                    width: '100%', height: '44px',
                    background: '#EFEFED', border: 'none',
                    borderRadius: '9999px', fontSize: '15px',
                    fontWeight: 600, color: '#0D0D0D',
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: 'pointer', marginBottom: '8px',
                  }}
                  onClick={() => { navigate('/login'); setMobileOpen(false) }}
                >
                  Log in
                </button>
                <button
                  style={{
                    width: '100%', height: '44px',
                    background: '#0D0D0D', border: 'none',
                    borderRadius: '9999px', fontSize: '15px',
                    fontWeight: 600, color: 'white',
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: 'pointer',
                  }}
                  onClick={() => { navigate('/signup'); setMobileOpen(false) }}
                >
                  Sign up
                </button>

                {/* Language chips */}
                <div style={{ marginTop: '16px' }}>
                  <div style={{
                    fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.10em', textTransform: 'uppercase',
                    color: '#9E9E9E', marginBottom: '8px',
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    Supported Languages
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {languageChips.map((chip) => (
                      <span key={chip} style={{
                        fontSize: '11px', fontWeight: 600,
                        padding: '4px 10px',
                        background: '#EFEFED',
                        border: '1px solid #E0DED9',
                        borderRadius: '9999px',
                        color: '#6B6B6B',
                        fontFamily: "'DM Sans', sans-serif",
                      }}>
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
