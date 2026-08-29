import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Bot, Mic, CreditCard, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navbarReveal } from '../../../design-system/motion';
import NavLink from './NavLink';

interface NavItem {
  label: string;
  href: string;
  hasDropdown: boolean;
  icon?: React.ReactNode;
}

interface DropdownItem {
  icon: string;
  label: string;
  desc: string;
  href: string;
}

const navLinks: NavItem[] = [
  { label: 'Products', href: '/products', hasDropdown: true },
  { label: 'Agents', href: '/agents', hasDropdown: false },
  { label: 'Voices', href: '/voices', hasDropdown: false },
  { label: 'Pricing', href: '/pricing', hasDropdown: false },
  { label: 'Docs', href: '/docs', hasDropdown: false },
];

const productsDropdown: DropdownItem[] = [
  { icon: '🎙️', label: 'BhasiniCreative', desc: 'Generate speech, music & video', href: '/products/creative' },
  { icon: '🤖', label: 'BhasiniAgents', desc: 'Deploy conversational voice agents', href: '/products/agents' },
  { icon: '</>', label: 'BhasiniAPI', desc: 'Build with our voice API', href: '/products/api' },
  { icon: '📊', label: 'Observatory', desc: 'Monitor agent performance', href: '/products/observatory' },
];

const indianLanguages = ['हिं', 'EN', 'தமி', 'తెలు', 'मरा', 'ਪੰਜ'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const checkIsActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const Logo = (
    <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
      <motion.div
        whileHover={{ opacity: 0.8 }}
        transition={{ duration: 0.15 }}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            fontWeight: 800,
            color: 'var(--color-text)',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>||</span>
          <span>Bhasini</span>
        </span>
        <span
          style={{
            marginLeft: '8px',
            background: 'linear-gradient(90deg, #FF6B35 0%, #FF3CAC 100%)',
            color: 'white',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '2px 8px',
            borderRadius: '9999px',
          }}
        >
          BETA
        </span>
      </motion.div>
    </Link>
  );

  return (
    <>
      <motion.header
        variants={navbarReveal}
        initial="initial"
        animate="animate"
        style={{
          height: 'var(--nav-height)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 'var(--z-sticky)',
          background: scrolled ? 'rgba(247,245,242,0.92)' : 'rgba(247,245,242,0.0)',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(224,222,217,0.8)' : '1px solid transparent',
          transition: 'all 300ms var(--ease-out)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            padding: '0 32px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
          }}
        >
          {/* LEFT SECTION */}
          {Logo}

          {/* CENTER SECTION (Desktop) */}
          <div className="hidden lg:flex" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.label}
                    ref={productsRef}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    <NavLink href={link.href} label={link.label} isActive={checkIsActive(link.href)}>
                      <ChevronDown
                        size={14}
                        style={{
                          transform: productsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 200ms',
                        }}
                      />
                    </NavLink>
                    
                    <AnimatePresence>
                      {productsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
                          exit={{ opacity: 0, y: -4, scale: 0.97, transition: { duration: 0.15 } }}
                          style={{
                            position: 'absolute',
                            top: 'calc(100% + 8px)',
                            left: '-16px',
                            background: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-xl)',
                            boxShadow: 'var(--shadow-lg)',
                            padding: '8px',
                            minWidth: '220px',
                            zIndex: 'var(--z-dropdown)',
                          }}
                        >
                          {productsDropdown.map((item) => (
                            <div
                              key={item.label}
                              onClick={() => { setProductsOpen(false); navigate(item.href); }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '10px 12px',
                                borderRadius: 'var(--radius-lg)',
                                cursor: 'pointer',
                                transition: 'background 150ms ease',
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-card)')}
                              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                            >
                              <div
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  background: 'var(--color-card)',
                                  borderRadius: 'var(--radius-md)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '18px',
                                  flexShrink: 0,
                                }}
                              >
                                {item.icon}
                              </div>
                              <div>
                                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text)' }}>
                                  {item.label}
                                </div>
                                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '1px' }}>
                                  {item.desc}
                                </div>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <NavLink key={link.label} href={link.href} label={link.label} isActive={checkIsActive(link.href)} />
              );
            })}
          </div>

          {/* RIGHT SECTION (Desktop) */}
          <div className="hidden lg:flex" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                height: '36px',
                padding: '0 18px',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text)',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                borderRadius: 'var(--radius-pill)',
                transition: 'background 150ms ease, color 150ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-card)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Log in
            </button>
            <button
              onClick={() => navigate('/signup')}
              style={{
                height: '36px',
                padding: '0 18px',
                background: 'var(--color-text)',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                borderRadius: 'var(--radius-pill)',
                transition: 'background 150ms ease, transform 150ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2A2A2A';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-text)';
                e.currentTarget.style.transform = 'translateY(0px)';
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(0px)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
            >
              Sign up
            </button>
          </div>

          {/* MOBILE HAMBURGER */}
          <div className="flex lg:hidden" style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-card)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.2 } }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8, transition: { duration: 0.15 } }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.2 } }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8, transition: { duration: 0.15 } }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 199,
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: 'min(320px, 85vw)',
                height: '100vh',
                background: 'var(--color-bg)',
                zIndex: 'var(--z-modal)',
                boxShadow: 'var(--shadow-xl)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  height: '64px',
                  padding: '0 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                {Logo}
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-card)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ padding: '12px' }}>
                <Link
                  to="/agents"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '13px 12px',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: checkIsActive('/agents') ? 'var(--color-accent)' : 'var(--color-text)',
                    background: checkIsActive('/agents') ? 'var(--color-accent-bg)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'background 150ms',
                  }}
                  onMouseEnter={(e) => !checkIsActive('/agents') && (e.currentTarget.style.background = 'var(--color-card)')}
                  onMouseLeave={(e) => !checkIsActive('/agents') && (e.currentTarget.style.background = 'transparent')}
                >
                  <Bot size={18} color="var(--color-text-muted)" /> Agents
                </Link>
                <Link
                  to="/voices"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '13px 12px',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: checkIsActive('/voices') ? 'var(--color-accent)' : 'var(--color-text)',
                    background: checkIsActive('/voices') ? 'var(--color-accent-bg)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'background 150ms',
                  }}
                  onMouseEnter={(e) => !checkIsActive('/voices') && (e.currentTarget.style.background = 'var(--color-card)')}
                  onMouseLeave={(e) => !checkIsActive('/voices') && (e.currentTarget.style.background = 'transparent')}
                >
                  <Mic size={18} color="var(--color-text-muted)" /> Voices
                </Link>
                <Link
                  to="/pricing"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '13px 12px',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: checkIsActive('/pricing') ? 'var(--color-accent)' : 'var(--color-text)',
                    background: checkIsActive('/pricing') ? 'var(--color-accent-bg)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'background 150ms',
                  }}
                  onMouseEnter={(e) => !checkIsActive('/pricing') && (e.currentTarget.style.background = 'var(--color-card)')}
                  onMouseLeave={(e) => !checkIsActive('/pricing') && (e.currentTarget.style.background = 'transparent')}
                >
                  <CreditCard size={18} color="var(--color-text-muted)" /> Pricing
                </Link>
                <Link
                  to="/docs"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '13px 12px',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: checkIsActive('/docs') ? 'var(--color-accent)' : 'var(--color-text)',
                    background: checkIsActive('/docs') ? 'var(--color-accent-bg)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'background 150ms',
                  }}
                  onMouseEnter={(e) => !checkIsActive('/docs') && (e.currentTarget.style.background = 'var(--color-card)')}
                  onMouseLeave={(e) => !checkIsActive('/docs') && (e.currentTarget.style.background = 'transparent')}
                >
                  <BookOpen size={18} color="var(--color-text-muted)" /> Docs
                </Link>
              </div>

              <div
                style={{
                  marginTop: 'auto',
                  padding: '16px 12px 32px',
                  borderTop: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    onClick={() => { setMobileOpen(false); navigate('/login'); }}
                    style={{
                      width: '100%',
                      height: '44px',
                      background: 'var(--color-card)',
                      border: 'none',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      cursor: 'pointer',
                    }}
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => { setMobileOpen(false); navigate('/signup'); }}
                    style={{
                      width: '100%',
                      height: '44px',
                      background: 'var(--color-text)',
                      border: 'none',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'white',
                      cursor: 'pointer',
                    }}
                  >
                    Sign up
                  </button>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <div
                    style={{
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--color-text-subtle)',
                      marginBottom: '6px',
                    }}
                  >
                    Supported Languages
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {indianLanguages.map((lang) => (
                      <span
                        key={lang}
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '4px 10px',
                          background: 'var(--color-card)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-pill)',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {lang}
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
  );
}
