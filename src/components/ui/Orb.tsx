import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { orbFloat, orbListening, orbSpeaking } from '../../design-system/motion';

export type OrbState = 'idle' | 'listening' | 'speaking';

export interface OrbProps {
  className?: string;
  size?: number;
  gradient?: string[];
  state?: OrbState;
}

export function Orb({ 
  className, 
  size = 120, 
  gradient = ['#FF6B35', '#FF9A3C', '#FFC53D'], // Default to Saffron gradient
  state = 'idle'
}: OrbProps) {
  
  const stateVariant = {
    idle: orbFloat.animate,
    listening: orbListening.animate,
    speaking: orbSpeaking.animate,
  };

  return (
    <div 
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {/* Glow layer */}
      <motion.div
        className="absolute inset-0 rounded-pill opacity-40 blur-2xl"
        style={{
          background: `linear-gradient(135deg, ${gradient.join(', ')})`,
        }}
        animate={stateVariant[state]}
      />
      
      {/* Core orb */}
      <motion.div
        className="relative z-10 w-3/4 h-3/4 rounded-pill shadow-xl"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${gradient[0]}, ${gradient[gradient.length - 1]})`,
        }}
        animate={stateVariant[state]}
      />
    </div>
  );
}
