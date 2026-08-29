import React from 'react';
import { cn } from '../../lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cardHover } from '../../design-system/motion';

export interface CardProps extends HTMLMotionProps<'div'> {
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-2xl border border-border bg-bg shadow-sm overflow-hidden',
          className
        )}
        variants={hoverable ? cardHover : undefined}
        initial={hoverable ? 'initial' : undefined}
        whileHover={hoverable ? 'hover' : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = 'Card';
