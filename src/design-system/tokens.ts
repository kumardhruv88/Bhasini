// src/design-system/tokens.ts
// Single source of truth for ALL visual decisions in Bhasini

export const colors = {
  // Base
  bg: '#F7F5F2',
  bgDark: '#0D0D0D',
  text: '#0D0D0D',
  textMuted: '#6B6B6B',
  textSubtle: '#9E9E9E',
  
  // Cards & surfaces
  cardBg: '#EFEFED',
  cardBgDark: '#1A1A1A',
  border: '#E0DED9',
  borderDark: '#2A2A2A',
  
  // Accent — Saffron (Bhasini primary)
  accent: '#FF6B35',
  accentLight: '#FF8F5E',
  accentBg: '#FFF2EC',
  
  // Secondary accent — Google Blue (signals voice/Google integration)
  blue: '#1A73E8',
  blueLight: '#4D90F0',
  blueBg: '#EBF3FE',
  
  // Semantic
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  
  // Orb gradients — each agent category has its own orb palette
  orbs: {
    medical: ['#FF6B9D', '#C44AFF', '#7B2FFF'],        // pink-purple
    tourism: ['#FF6B35', '#FF9A3C', '#FFC53D'],          // warm orange-gold
    support: ['#3CCFCF', '#1A73E8', '#7B2FFF'],          // teal-blue-purple
    realEstate: ['#22C55E', '#1A73E8', '#0EA5E9'],       // green-blue
    travel: ['#FF6B35', '#FF3CAC', '#784BA0'],            // sunset
    depression: ['#6366F1', '#8B5CF6', '#C084FC'],        // calm indigo-purple
    narration: ['#F97316', '#FB923C', '#FBBF24'],         // warm amber
    default: ['#A78BFA', '#7C3AED', '#4C1D95'],           // violet
  }
} as const;

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
  40: '160px',
} as const;

export const radii = {
  sm: '6px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  full: '9999px',   // pill buttons, orbs
} as const;

export const shadows = {
  sm: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
  md: '0 4px 16px rgba(0,0,0,0.08)',
  lg: '0 12px 40px rgba(0,0,0,0.10)',
  orb: '0 24px 80px rgba(255,107,53,0.25)',   // saffron glow for orbs
  card: '0 2px 12px rgba(0,0,0,0.05)',
} as const;

export const typography = {
  fontDisplay: "'Plus Jakarta Sans', sans-serif",
  fontBody: "'DM Sans', sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  
  // Scale (px → rem at 16px base)
  scale: {
    xs:   { size: '12px', lineHeight: '16px', weight: 400 },
    sm:   { size: '14px', lineHeight: '20px', weight: 400 },
    base: { size: '16px', lineHeight: '24px', weight: 400 },
    md:   { size: '18px', lineHeight: '28px', weight: 400 },
    lg:   { size: '20px', lineHeight: '30px', weight: 500 },
    xl:   { size: '24px', lineHeight: '32px', weight: 600 },
    '2xl':{ size: '32px', lineHeight: '40px', weight: 700 },
    '3xl':{ size: '40px', lineHeight: '48px', weight: 700 },
    '4xl':{ size: '56px', lineHeight: '64px', weight: 800 },
    '5xl':{ size: '72px', lineHeight: '80px', weight: 800 },
  }
} as const;

export const buttons = {
  // Sizes
  sm: { height: '32px', px: '16px', fontSize: '13px', fontWeight: 500 },
  md: { height: '40px', px: '20px', fontSize: '14px', fontWeight: 500 },
  lg: { height: '48px', px: '28px', fontSize: '16px', fontWeight: 600 },
  xl: { height: '56px', px: '36px', fontSize: '18px', fontWeight: 600 },
  
  // Variants
  variants: {
    primary:  { bg: '#0D0D0D', text: '#FFFFFF', hover: '#2A2A2A', border: 'transparent' },
    ghost:    { bg: 'transparent', text: '#0D0D0D', hover: '#F0EFED', border: '#0D0D0D' },
    accent:   { bg: '#FF6B35', text: '#FFFFFF', hover: '#E85A25', border: 'transparent' },
    subtle:   { bg: '#EFEFED', text: '#0D0D0D', hover: '#E5E3E0', border: 'transparent' },
  }
} as const;

export const zIndex = {
  behind: -1,
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  toast: 500,
} as const;

export const animation = {
  duration: {
    instant: '80ms',
    fast: '150ms',
    normal: '250ms',
    slow: '400ms',
    slower: '600ms',
  },
  easing: {
    default: 'cubic-bezier(0.16, 1, 0.3, 1)',   // spring-like
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  }
} as const;
