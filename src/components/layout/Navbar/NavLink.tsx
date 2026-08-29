import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const MotionLink = motion(Link);

export default function NavLink({ href, label, isActive, onClick, children }: NavLinkProps) {
  return (
    <MotionLink
      to={href}
      onClick={onClick}
      whileHover={{ color: 'var(--color-text)', opacity: 1 }}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        fontWeight: isActive ? 600 : 500,
        color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '6px 4px',
        borderRadius: 'var(--radius-sm)',
        transition: 'color 150ms ease, opacity 150ms ease',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      {label}
      {children}
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          style={{
            position: 'absolute',
            bottom: '-2px',
            left: 0,
            right: 0,
            height: '2px',
            background: 'var(--color-accent)',
            borderRadius: '1px'
          }}
        />
      )}
    </MotionLink>
  );
}
