import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

export function Reveal({ children, delay = 0, y = 28, className, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.72, ease: EASE, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
