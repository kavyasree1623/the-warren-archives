import React from 'react';
import { motion } from 'motion/react';

interface RevealSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export default function RevealSection({ 
  children, 
  delay = 0.1, 
  direction = 'up' 
}: RevealSectionProps) {
  // Cinematic initial offset coordinates for smooth premium entries
  const getInitialOffset = () => {
    switch (direction) {
      case 'up': return { y: 45 };
      case 'down': return { y: -45 };
      case 'left': return { x: 45 };
      case 'right': return { x: -45 };
      case 'none': return {};
      default: return { y: 45 };
    }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...getInitialOffset() 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ 
        once: true, 
        amount: 0.08, // Trigger early when the section starts entering screen
        margin: "0px 0px -80px 0px" // Cinematic anticipation margin
      }}
      transition={{ 
        duration: 1.1, 
        delay, 
        ease: [0.16, 1, 0.3, 1] // Custom fluid cinematic cubic bezier ease
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
