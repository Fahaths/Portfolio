"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function WhatsAppContact() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleWhatsApp = () => {
    setIsGenerating(true);

    const message = `Hi Faa 👋\n\nI came across your portfolio and would like to discuss a project.\n\nLet's connect.`;
    const targetNumber = "1234567890"; // Replace with actual WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${targetNumber}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(waUrl, "_blank");
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 py-32 z-10 bg-[var(--color-bg)]">
      
      <AnimatePresence mode="wait">
        {!isGenerating ? (
          <motion.div
            key="cta"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl"
          >
            <h2 className="font-display text-6xl md:text-8xl font-black text-[var(--color-text)] mb-8 tracking-tighter">
              Ready to Scale?
            </h2>
            <p className="font-sans text-2xl text-[var(--color-text)] opacity-70 mb-16 max-w-3xl mx-auto">
              Whether it's SEO, Performance Marketing, AI Automation, or Web Development, let's build something that drives real business growth.
            </p>

            <button
              onClick={handleWhatsApp}
              data-cursor="OPEN"
              className="group relative inline-flex items-center justify-center space-x-4 px-12 py-6 bg-[var(--color-text)] text-white rounded-full font-sans font-bold text-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-2xl"
            >
              {/* Glow Accent Border Effect */}
              <div className="absolute inset-0 border-[3px] border-[var(--color-accent)] rounded-full opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 transition-all duration-300" />
              
              <span className="relative z-10">Let's Talk on WhatsApp</span>
              
              {/* Arrow Slide */}
              <motion.span 
                className="relative z-10"
                initial={{ x: 0 }}
                whileHover={{ x: 10 }}
              >
                <ArrowRight size={24} />
              </motion.span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="generating"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center space-y-8"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-4 border-[rgba(61,64,91,0.2)] border-t-[var(--color-accent)] rounded-full"
            />
            <h3 className="font-display text-4xl font-black text-[var(--color-text)]">Generating Message...</h3>
            <p className="font-sans text-xl text-[var(--color-text)] opacity-60">Connecting you securely to WhatsApp.</p>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
