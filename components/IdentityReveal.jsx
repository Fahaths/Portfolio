"use client";

import React from "react";
import { motion } from "framer-motion";

export default function IdentityReveal() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-32 px-6 lg:px-16 bg-[var(--color-bg)] z-10">
      <div className="max-w-5xl w-full mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="font-display text-5xl md:text-7xl font-black tracking-tighter">
              <span className="bg-gradient-to-r from-[#81B29A] via-[#E07A5F] to-[#F2CC8F] bg-clip-text text-transparent">
                Who am I?
              </span>
            </h3>
          </motion.div>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            {/* Left Column: Photo */}
            <motion.div 
              variants={itemVariants} 
              className="md:col-span-4 flex justify-center"
            >
              <motion.div 
                whileHover={{ scale: 1.03, rotate: -1 }}
                transition={{ duration: 0.3 }}
                className="relative w-48 h-64 md:w-56 md:h-76 rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-text)]/5 bg-[var(--color-bg)] p-3"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-100">
                  <img 
                    src="/assets/images/fahath-profile.jpg" 
                    alt="Fahath S Profile" 
                    className="w-full h-full object-cover object-center" 
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Biography/Statement */}
            <motion.div 
              variants={itemVariants} 
              className="md:col-span-8 space-y-6 text-left"
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-[var(--color-text)] leading-[1.2] tracking-tighter">
                I am a multidisciplinary builder focused on <span className="text-[var(--color-secondary)]">organic growth</span>, <span className="text-[var(--color-accent)]">paid performance</span>, and <span className="text-[var(--color-highlight)]">intelligent automation</span>.
              </h2>
              
              <p className="font-sans text-lg md:text-xl text-[var(--color-text)] opacity-70 leading-relaxed">
                Combining data-driven marketing strategies with modern engineering to create products and campaigns that perform at the highest level.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
