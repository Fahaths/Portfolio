"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function CareerUniverse() {
  const containerRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      let sections = gsap.utils.toArray(".career-panel");

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + galleryRef.current.offsetWidth
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="absolute top-10 left-10 z-10 font-display font-black text-3xl opacity-20 uppercase tracking-widest">
        Career Universe
      </div>
      
      <div ref={galleryRef} className="flex flex-col md:flex-row w-full md:w-[300vw] h-auto md:h-screen">
        
        {/* World 1: SEO Analyst */}
        <div className="career-panel w-full md:w-screen h-auto md:h-screen flex items-center justify-center relative overflow-hidden p-8 border-b md:border-b-0 md:border-r border-[rgba(61,64,91,0.1)]">
          {/* Background Arrows */}
          <div className="absolute inset-0 z-0 flex flex-col justify-around pointer-events-none opacity-5">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ x: [0, 100], y: [0, -100] }}
                transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                className="font-black text-[15rem] leading-none text-[var(--color-text)]"
              >
                ↗ ↗ ↗ ↗
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-16 max-w-7xl w-full">
            <div>
              <h2 className="font-display text-5xl md:text-8xl font-black text-[var(--color-secondary)] leading-none mb-6">SEO Analyst</h2>
              <p className="font-sans text-xl opacity-80 mb-8 max-w-md">The Organic Growth Engine. Scaling brands through technical foundations, content siloing, and data-driven insights.</p>
              
              <div className="space-y-4">
                <div className="font-sans font-bold text-lg">Position #20 → Position #1</div>
                <div className="h-2 w-full bg-[rgba(61,64,91,0.1)] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "10%" }} whileInView={{ width: "95%" }} transition={{ duration: 2 }}
                    className="h-full bg-[var(--color-secondary)]" 
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center space-y-8">
              <div className="p-8 bg-white border border-[rgba(61,64,91,0.1)] shadow-2xl">
                <div className="text-sm font-bold uppercase tracking-widest text-[var(--color-accent)]">Traffic Growth</div>
                <div className="font-display text-6xl font-black">+150%</div>
              </div>
              <div className="p-8 bg-white border border-[rgba(61,64,91,0.1)] shadow-2xl translate-x-8">
                <div className="text-sm font-bold uppercase tracking-widest text-[var(--color-accent)]">Keywords Ranked</div>
                <div className="font-display text-6xl font-black">+350</div>
              </div>
            </div>
          </div>
        </div>

        {/* World 2: Performance Marketing */}
        <div className="career-panel w-full md:w-screen h-auto md:h-screen flex items-center justify-center relative overflow-hidden p-8 border-b md:border-b-0 md:border-r border-[rgba(61,64,91,0.1)]">
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5 pointer-events-none">
             <div className="w-[800px] h-[800px] rounded-full border-[20px] border-[var(--color-accent)]" />
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-16 max-w-7xl w-full">
            <div>
              <h2 className="font-display text-5xl md:text-8xl font-black text-[var(--color-accent)] leading-none mb-6">Performance Marketing</h2>
              <p className="font-sans text-xl opacity-80 mb-8 max-w-md">The Paid Growth Machine. Converting targeted ad spend into highly profitable revenue streams.</p>
              
              <div className="space-y-2 font-sans font-bold uppercase tracking-widest opacity-60">
                <div>Ad Spend → Optimization → Conversion → Revenue</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               {[
                 { label: "ROAS", val: "8.2x" },
                 { label: "CTR", val: "4.5%" },
                 { label: "CPC", val: "$0.85" },
                 { label: "Conversions", val: "5,000+" }
               ].map((metric, i) => (
                 <motion.div 
                   key={i}
                   initial={{ scale: 0.8, opacity: 0 }}
                   whileInView={{ scale: 1, opacity: 1 }}
                   transition={{ delay: i * 0.2 }}
                   className="p-6 bg-white border border-[rgba(61,64,91,0.1)] shadow-xl flex flex-col justify-center items-center text-center"
                 >
                   <div className="text-sm font-bold uppercase tracking-widest opacity-60">{metric.label}</div>
                   <div className="font-display text-4xl font-black">{metric.val}</div>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>

        {/* World 3: AI Native Developer */}
        <div className="career-panel w-full md:w-screen h-auto md:h-screen flex items-center justify-center relative overflow-hidden p-8">
          <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--color-text)_1px,_transparent_1px)]" style={{ backgroundSize: '40px 40px' }} />

          <div className="relative z-10 grid md:grid-cols-2 gap-16 max-w-7xl w-full">
            <div>
              <h2 className="font-display text-5xl md:text-8xl font-black text-[var(--color-text)] leading-none mb-6">AI Native Developer</h2>
              <p className="font-sans text-xl opacity-80 mb-8 max-w-md">The Intelligent Product Ecosystem. Building automated workflows, React components, and dynamic agent systems.</p>
              
              <div className="space-y-2 font-sans font-bold uppercase tracking-widest opacity-60">
                <div>Prompt → Workflow → Agent → Product</div>
              </div>
            </div>

            <div className="relative h-64 flex items-center justify-center">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="w-48 h-48 border-4 border-dashed border-[var(--color-text)] rounded-full flex items-center justify-center"
               >
                 <div className="w-32 h-32 border-4 border-[var(--color-accent)] rounded-full flex items-center justify-center animate-pulse">
                   <div className="w-16 h-16 bg-[var(--color-secondary)] rounded-full" />
                 </div>
               </motion.div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
