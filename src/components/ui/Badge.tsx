import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent' | 'blue' | 'success' | 'outline';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-pill px-2.5 py-0.5 text-xs font-semibold transition-colors font-body';
  
  const variants = {
    default: 'bg-card text-text',
    accent: 'bg-[#FFF2EC] text-accent',
    blue: 'bg-[#EBF3FE] text-blue',
    success: 'bg-green-100 text-green-700',
    outline: 'border border-border text-text',
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
