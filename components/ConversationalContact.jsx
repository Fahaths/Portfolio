"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConversationalContact() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState("");

  const handleSelect = (service) => {
    setSelectedService(service);
    setStep(1);
  };

  const handleReset = () => {
    setStep(0);
    setSelectedService("");
  };

  return (
    <section id="contact" className="py-32 px-6 lg:px-16 max-w-4xl mx-auto relative z-10 min-h-[600px] flex flex-col justify-center">
      
      <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden" data-cursor="LET'S TALK">
        
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <h2 className="font-display text-4xl md:text-6xl font-black text-black">
                How can I help you?
              </h2>
              
              <div className="flex flex-wrap gap-4 mt-8">
                {["SEO Growth", "Paid Ads", "Website Development", "Consultation"].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSelect(item)}
                    className="px-6 py-3 rounded-full border-2 border-black text-black font-sans font-bold hover:bg-black hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <h2 className="font-display text-4xl md:text-5xl font-black text-black">
                Great. Let's discuss <span className="text-[var(--color-accent)]">{selectedService}</span>.
              </h2>
              <p className="font-sans text-xl text-gray-600">
                Send me an email directly or connect on LinkedIn to get the conversation started.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a href="mailto:hello@example.com" className="px-8 py-4 bg-black text-white rounded-full font-sans font-bold text-lg hover:scale-105 transition-transform text-center">
                  Email Me
                </a>
                <button onClick={handleReset} className="px-8 py-4 bg-transparent text-gray-400 hover:text-black font-sans font-bold text-lg text-center transition-colors">
                  Start Over
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <footer className="mt-24 text-center font-sans text-sm opacity-60 flex flex-col md:flex-row justify-between w-full">
        <div>© 2026 S. Fahath</div>
        <div>Awwwards-Level Digital Experience</div>
      </footer>
    </section>
  );
}
