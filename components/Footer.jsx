"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <footer ref={ref} className="bg-[var(--color-bg)] pt-32 pb-12 px-6 lg:px-16 overflow-hidden z-10 relative">
      
      {/* Animated Divider */}
      <div className="max-w-7xl mx-auto mb-20 relative h-[1px]">
        <motion.div 
          initial={{ width: "0%" }}
          animate={isInView ? { width: "100%" } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 h-full bg-[rgba(61,64,91,0.2)]"
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-24">
        
        {/* Left Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="font-display font-black text-4xl text-[var(--color-text)] tracking-tighter" data-cursor="VIEW">
            FAA.
          </div>
          <div className="font-sans font-bold text-[var(--color-accent)] uppercase tracking-widest text-xs">
            SEO Analyst • Performance Marketing • AI Native Developer
          </div>
          
          <div className="pt-4 space-y-2 opacity-80 text-sm">
            <div><span className="font-bold">Location:</span> Chennai, India</div>
            <div><span className="font-bold">Status:</span> Available for freelance projects and collaborations.</div>
          </div>
        </motion.div>

        {/* Center Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col space-y-4 md:items-center font-sans font-bold uppercase tracking-wider text-sm opacity-80"
        >
          <a href="#" className="hover:text-[var(--color-accent)] transition-colors">SEO</a>
          <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Performance Marketing</a>
          <a href="#" className="hover:text-[var(--color-accent)] transition-colors">AI Native Development</a>
          <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Web Development</a>
        </motion.div>

        {/* Right Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col space-y-4 md:items-end font-sans font-bold text-lg"
        >
          {["LinkedIn", "GitHub", "Instagram", "WhatsApp", "Email"].map((link) => (
            <motion.a 
              key={link}
              href="#" 
              whileHover={{ x: -10, color: "var(--color-accent)" }}
              transition={{ duration: 0.2 }}
              data-cursor="OPEN"
              className="inline-block transition-colors"
            >
              {link}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs font-sans opacity-50 uppercase tracking-widest space-y-4 md:space-y-0"
      >
        <div>© 2026 FAA. All Rights Reserved.</div>
        <div>Built with Next.js, GSAP, Three.js, and modern web technologies.</div>
      </motion.div>

    </footer>
  );
}
