"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--color-bg)]"
        >
          <div className="overflow-hidden flex items-center">
            {["F", "A", "A"].map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: "100%", opacity: 0, rotate: 10 }}
                animate={{ y: "0%", opacity: 1, rotate: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.2 + index * 0.15,
                }}
                className="text-[12vw] md:text-[8vw] font-display font-black text-[var(--color-text)] tracking-tighter"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
