"use client";

import React from "react";
import { motion } from "framer-motion";

export default function IdentityReveal() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-32 px-6 lg:px-16 bg-[var(--color-bg)] z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center space-y-8"
        >
          <div className="font-sans font-bold text-[var(--color-accent)] uppercase tracking-[0.2em] text-sm">
            Identity Reveal
          </div>
          
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-[var(--color-text)] leading-[1.1] tracking-tighter">
            I am a multidisciplinary builder focused on <span className="text-[var(--color-secondary)]">organic growth</span>, <span className="text-[var(--color-accent)]">paid performance</span>, and <span className="text-[var(--color-highlight)]">intelligent automation</span>.
          </h2>
          
          <p className="font-sans text-xl md:text-2xl text-[var(--color-text)] opacity-70 max-w-3xl mx-auto pt-8">
            Combining data-driven marketing strategies with modern engineering to create products and campaigns that perform at the highest level.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
