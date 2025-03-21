'use client';

import { motion } from 'motion/react';

export default function Arrow() {
  return (
    <motion.div
      animate={{ y: [0, 10, 2, 10, 0] }}
      className="hidden sm:inline absolute bottom-[70px] left-1/2 transform -translate-x-1/2"
      initial={{ y: 0 }}
      transition={{
        duration: 1.75,
        repeat: Infinity,
        repeatDelay: 4,
        repeatType: 'loop',
        ease: [0.34, 1.56, 0.64, 1],
      }}
    >
      <svg
        fill="none"
        height="69"
        viewBox="0 0 52 69"
        width="52"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M43 43.1793L40.0037 40.1453L28.125 52.152V8.60693H23.875V52.152L12.0175 40.1238L9 43.1793L26 60.3931L43 43.1793Z"
          fill="black"
        />
      </svg>
    </motion.div>
  );
}
