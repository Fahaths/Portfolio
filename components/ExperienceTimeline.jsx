"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceTimeline() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    // Draw line
    gsap.to(lineRef.current, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 50%",
        end: "bottom 50%",
        scrub: 1,
      }
    });

    // Reveal cards
    const cards = gsap.utils.toArray(".timeline-card");
    cards.forEach((card, i) => {
      const xOffset = i % 2 === 0 ? 100 : -100;
      
      gsap.fromTo(card, 
        { opacity: 0, x: xOffset },
        {
          opacity: 1, 
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const experiences = [
    { role: "Senior SEO Analyst", company: "TechNova Agency", year: "2024 - Present", desc: "Leading technical SEO and content strategy for enterprise clients." },
    { role: "Performance Marketer", company: "GrowthX Media", year: "2022 - 2024", desc: "Managed $500k+ monthly ad spend across Google and Meta." },
    { role: "Web Developer", company: "Freelance", year: "2020 - 2022", desc: "Built full-stack React applications for various startups." }
  ];

  return (
    <section ref={containerRef} className="py-32 px-6 lg:px-16 max-w-5xl mx-auto relative z-10">
      <div className="mb-24 text-center" data-cursor="VIEW">
        <h2 className="font-display text-5xl md:text-7xl font-black text-[var(--color-text)] mb-4">The Journey</h2>
        <p className="font-sans text-xl opacity-60">From code to conversions.</p>
      </div>

      <div className="relative pl-8 md:pl-0">
        {/* Center Line Container */}
        <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-[rgba(61,64,91,0.1)]">
          {/* Animated Line */}
          <div ref={lineRef} className="absolute top-0 left-0 w-full bg-[var(--color-accent)]" style={{ height: "0%" }} />
        </div>

        <div className="space-y-32">
          {experiences.map((exp, i) => (
            <div key={i} className={`relative flex flex-col md:flex-row items-center ${i % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
              
              {/* Timeline Dot */}
              <div className="absolute left-[-35px] md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full border-4 border-[var(--color-bg)] bg-[var(--color-text)] z-10" />
              
              <div className={`timeline-card w-full md:w-[40%] p-8 bg-[rgba(255,255,255,0.95)] border border-[rgba(255,255,255,0.5)] rounded-3xl shadow-xl ${i % 2 === 0 ? "md:mr-12" : "md:ml-12"}`} data-cursor="OPEN">
                <div className="font-sans text-sm font-bold text-[var(--color-accent)] mb-2 uppercase tracking-widest">{exp.year}</div>
                <h3 className="font-display text-3xl font-black text-[var(--color-text)] mb-2">{exp.role}</h3>
                <div className="font-sans text-xl font-medium text-[var(--color-secondary)] mb-4">{exp.company}</div>
                <p className="font-sans text-base text-[var(--color-text)]/70">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
