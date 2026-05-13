import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

const directionMap = {
  up:    { y: 40, x: 0  },
  down:  { y: -40, x: 0 },
  left:  { y: 0,  x: 40 },
  right: { y: 0,  x: -40 },
}

export default function FadeIn({ children, delay = 0, direction = 'up' }: FadeInProps) {
  const { x, y } = directionMap[direction]

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}