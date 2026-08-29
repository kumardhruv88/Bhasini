// All reusable Framer Motion animation variants for Bhasini
import { Variants } from 'framer-motion';

// Page-level entrance
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

// Staggered children (sections, cards)
export const staggerContainer: Variants = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const fadeUpItem: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// The signature floating orb — endless gentle float
export const orbFloat = {
  animate: {
    y: [0, -18, 0],
    scale: [1, 1.03, 1],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
};

// Orb breathing when agent is "listening"
export const orbListening = {
  animate: {
    scale: [1, 1.08, 1],
    opacity: [0.9, 1, 0.9],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

// Orb pulsing when agent is "speaking"
export const orbSpeaking = {
  animate: {
    scale: [1, 1.15, 1, 1.1, 1],
    transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
  },
};

// Card hover lift
export const cardHover = {
  initial: { y: 0, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' },
  hover: { y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.12)', transition: { duration: 0.2 } },
};

// Tab content switch
export const tabContent: Variants = {
  initial: { opacity: 0, x: 12 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, x: -12, transition: { duration: 0.2 } },
};

// Transcript message appear
export const transcriptMessage: Variants = {
  initial: { opacity: 0, x: 20, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

// Logo scroll marquee (for trusted-by section)
export const marqueeVariants = {
  animate: {
    x: ['0%', '-50%'],
    transition: { duration: 30, repeat: Infinity, ease: 'linear' },
  },
};
