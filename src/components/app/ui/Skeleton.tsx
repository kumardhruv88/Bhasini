import { motion } from 'framer-motion'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  className?: string
  style?: React.CSSProperties
}

export default function Skeleton({ width = '100%', height = '100%', borderRadius = '4px', className, style }: SkeletonProps) {
  return (
    <motion.div
      className={className}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        width,
        height,
        borderRadius,
        background: '#EFEFED',
        ...style
      }}
    />
  )
}
