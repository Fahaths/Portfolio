"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "SEO Analyst",
  "Performance Marketing Specialist",
  "AI Native Developer"
];

function ScrambleText({ text }) {
  const [displayText, setDisplayText] = useState("");
  const chars = "!<>-_\\\\/[]{}—=+*^?#_";
  
  useEffect(() => {
    let frame = 0;
    const length = text.length;
    let timeout;

    const animate = () => {
      let output = "";
      let complete = 0;
      for (let i = 0; i < length; i++) {
        if (frame >= i * 2) {
          output += text[i];
          complete++;
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setDisplayText(output);
      
      if (complete === length) return;
      frame++;
      timeout = setTimeout(animate, 30);
    };
    
    timeout = setTimeout(animate, 500); 
    return () => clearTimeout(timeout);
  }, [text]);

  return <span>{displayText}</span>;
}

export default function HeroKinetic() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden bg-transparent z-10 pt-20">
      
      <div className="max-w-6xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }} // delay after preloader
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-[var(--color-text)] tracking-tighter leading-[1.1] mb-4">
            <span className="block mb-2 text-opacity-80">I&apos;m</span>
            <div className="h-[1.2em] relative text-[var(--color-accent)] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ y: "100%", opacity: 0, rotateX: -90 }}
                  animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                  exit={{ y: "-100%", opacity: 0, rotateX: 90 }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0 w-full text-center origin-bottom"
                >
                  {words[index] === "SEO" ? <ScrambleText text={words[index]} /> : words[index]}
                </motion.div>
              </AnimatePresence>
            </div>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 4 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto px-4 sm:px-0"
          >
            <a 
              data-cursor="OPEN" 
              href="#contact" 
              className="px-8 py-4 bg-[var(--color-text)] text-white rounded-full font-sans font-bold text-lg hover:scale-105 transition-transform w-full sm:w-auto text-center"
            >
              Let&apos;s Talk
            </a>
            <a 
              data-cursor="OPEN" 
              href="/Fahath_s_Digital_Marketer.pdf" 
              download="Fahath_S_Digital_Marketer.pdf"
              className="px-8 py-4 border border-[var(--color-text)]/20 text-[var(--color-text)] rounded-full font-sans font-bold text-lg hover:bg-[var(--color-text)]/5 hover:border-[var(--color-text)] transition-all w-full sm:w-auto text-center"
            >
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
