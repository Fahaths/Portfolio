"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, TrendingUp, Target, Cpu, Layout, ArrowDown, Layers, ArrowRight, CheckCircle2, MapPin, Globe, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Custom High-Performance Count-Up Component (GPU-accelerated, 60fps)
function CountUp({ end, duration = 1.5, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Parse target integer from formatted text (e.g., ₹2,00,000+ -> 200000)
    const endVal = parseInt(end.replace(/,/g, "").replace(/\+/g, "").replace(/₹/g, ""), 10) || 0;
    if (endVal === 0) return;

    const startTime = performance.now();
    let animFrame;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Easing out quad
      const easedProgress = progress * (2 - progress);
      const current = Math.floor(easedProgress * endVal);
      setCount(current);

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      }
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [end, duration]);

  const formatted = count.toLocaleString("en-IN");
  return <span>{prefix}{formatted}{suffix}</span>;
}

export default function SkillsUniverse() {
  const containerRef = useRef(null);
  const pinContainerRef = useRef(null);
  const [activeLayer, setActiveLayer] = useState(0);
  const [particles, setParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const activeLayerRef = useRef(0);
  const isTransitioning = useRef(false);
  const triggerRef = useRef(null);

  // Sync activeLayer to ref
  useEffect(() => {
    activeLayerRef.current = activeLayer;
  }, [activeLayer]);

  // 1. Generate background floating particles once (hydration safe)
  useEffect(() => {
    const list = [];
    const colors = ["#81B29A", "#E07A5F", "#818CF8", "#F2CC8F"];
    for (let i = 0; i < 40; i++) {
      list.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.8,
        color: colors[i % colors.length],
        delay: Math.random() * 5
      });
    }
    setParticles(list);

    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // 2. Setup GSAP ScrollTrigger Pinned Layer Scrub (Desktop) with snap-locking
  useEffect(() => {
    if (isMobile || !pinContainerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: pinContainerRef.current,
      start: "top top",
      end: "+=6500", // Pinned depth for 13 layers (0 to 12)
      pin: true,
      scrub: 0.3,
      snap: {
        snapTo: 1 / 12,
        duration: { min: 0.2, max: 0.5 },
        delay: 0.05,
        ease: "power2.inOut"
      },
      onUpdate: (self) => {
        const p = self.progress;
        // Divide progress evenly into 13 segments (0 to 12)
        const index = Math.round(p * 12);
        setActiveLayer(index);
      }
    });

    triggerRef.current = trigger;

    return () => {
      trigger.kill();
      triggerRef.current = null;
    };
  }, [isMobile]);

  // 3. Setup Wheel and Keyboard Interceptors for Step-by-Step Locking (Desktop)
  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e) => {
      const trigger = triggerRef.current;
      if (!trigger) return;

      const scrollY = window.scrollY;
      const start = trigger.start;
      const end = trigger.end;

      if (scrollY >= start - 5 && scrollY <= end + 5) {
        const index = activeLayerRef.current;
        const delta = e.deltaY;

        if (delta > 0 && index < 12) {
          e.preventDefault();
          if (!isTransitioning.current) {
            isTransitioning.current = true;
            const nextIndex = index + 1;
            const targetScroll = start + (nextIndex * (end - start) / 12);

            if (window.lenis) {
              window.lenis.scrollTo(targetScroll, {
                duration: 0.8,
                onComplete: () => {
                  isTransitioning.current = false;
                }
              });
            } else {
              window.scrollTo({ top: targetScroll, behavior: "smooth" });
              setTimeout(() => {
                isTransitioning.current = false;
              }, 800);
            }
          }
        } else if (delta < 0 && index > 0) {
          e.preventDefault();
          if (!isTransitioning.current) {
            isTransitioning.current = true;
            const prevIndex = index - 1;
            const targetScroll = start + (prevIndex * (end - start) / 12);

            if (window.lenis) {
              window.lenis.scrollTo(targetScroll, {
                duration: 0.8,
                onComplete: () => {
                  isTransitioning.current = false;
                }
              });
            } else {
              window.scrollTo({ top: targetScroll, behavior: "smooth" });
              setTimeout(() => {
                isTransitioning.current = false;
              }, 800);
            }
          }
        }
      }
    };

    const handleKeyDown = (e) => {
      const trigger = triggerRef.current;
      if (!trigger) return;

      const scrollY = window.scrollY;
      const start = trigger.start;
      const end = trigger.end;

      if (scrollY >= start - 5 && scrollY <= end + 5) {
        const index = activeLayerRef.current;
        const key = e.key;

        if ((key === "ArrowDown" || key === "PageDown") && index < 12) {
          e.preventDefault();
          if (!isTransitioning.current) {
            isTransitioning.current = true;
            const nextIndex = index + 1;
            const targetScroll = start + (nextIndex * (end - start) / 12);

            if (window.lenis) {
              window.lenis.scrollTo(targetScroll, {
                duration: 0.8,
                onComplete: () => {
                  isTransitioning.current = false;
                }
              });
            } else {
              window.scrollTo({ top: targetScroll, behavior: "smooth" });
              setTimeout(() => {
                isTransitioning.current = false;
              }, 800);
            }
          }
        } else if ((key === "ArrowUp" || key === "PageUp") && index > 0) {
          e.preventDefault();
          if (!isTransitioning.current) {
            isTransitioning.current = true;
            const prevIndex = index - 1;
            const targetScroll = start + (prevIndex * (end - start) / 12);

            if (window.lenis) {
              window.lenis.scrollTo(targetScroll, {
                duration: 0.8,
                onComplete: () => {
                  isTransitioning.current = false;
                }
              });
            } else {
              window.scrollTo({ top: targetScroll, behavior: "smooth" });
              setTimeout(() => {
                isTransitioning.current = false;
              }, 800);
            }
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobile]);

  // Transitions constants
  const layerTransition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] };
  const dissolveTransition = { duration: 0.9, ease: [0.22, 1, 0.36, 1] };

  // Content render helper for 13 desktop layers
  const renderLayer = () => {
    switch (activeLayer) {
      case 0: // LAYER 1: Show-Case.....
        return (
          <motion.div
            key="layer-0"
            initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
            transition={layerTransition}
            className="text-center space-y-8"
          >
            <h2 className="font-display text-5xl md:text-7xl font-black text-white tracking-tighter leading-none select-none">
              Show-Case<span className="text-[#81B29A] animate-pulse">.....</span>
            </h2>
            <div className="flex flex-col items-center gap-4 text-white/60 font-sans text-sm md:text-base font-semibold tracking-wider uppercase">
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0 }} className="flex items-center gap-2"><TrendingUp size={16} className="text-[#81B29A]" /> SEO Analyst</motion.span>
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} className="flex items-center gap-2"><Target size={16} className="text-[#E07A5F]" /> Performance Marketer</motion.span>
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="flex items-center gap-2"><Cpu size={16} className="text-[#818CF8]" /> AI Native Developer</motion.span>
            </div>
          </motion.div>
        );

      case 1: // LAYER 2: SEO Large Center Card
        return (
          <motion.div
            key="layer-1"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={layerTransition}
            className="w-full max-w-4xl h-[60vh] bg-white/5 border border-white/10 rounded-[3rem] flex items-center justify-center backdrop-blur-xl shadow-2xl overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#81B29A]/10 to-transparent opacity-50" />
            <h3 className="font-display text-8xl md:text-9xl font-black text-white tracking-tighter drop-shadow-2xl z-10">
              SEO
            </h3>
          </motion.div>
        );

      case 2: // LAYER 3: SEO Expands into On-Page, Off-Page, Local
        return (
          <motion.div
            key="layer-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={layerTransition}
            className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4"
          >
            {["On-Page SEO", "Off-Page SEO", "Local SEO"].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: idx * 0.15, ...layerTransition }}
                className="h-64 bg-white/5 border border-[#81B29A]/30 rounded-[2.5rem] flex items-center justify-center shadow-2xl backdrop-blur-md"
              >
                <h4 className="font-display text-2xl font-black text-white">{item}</h4>
              </motion.div>
            ))}
          </motion.div>
        );

      case 3: // LAYER 4: On-Page active, reveals items
        return (
          <motion.div
            key="layer-3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={layerTransition}
            className="w-full max-w-3xl bg-white/5 border border-[#81B29A]/40 rounded-[2.5rem] p-12 backdrop-blur-xl shadow-2xl"
          >
            <h4 className="font-display text-4xl font-black text-white mb-8 border-b border-white/10 pb-4">On-Page SEO</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {[
                "Search Intent Optimization",
                "Content Depth Optimization",
                "Title Tag Optimization",
                "Meta Description Optimization",
                "Heading Structure Optimization",
                "URL Structure Optimization",
                "Internal Linking",
                "External Linking",
                "Image Alt Text Optimization",
                "Schema Markup"
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={18} className="text-[#81B29A] mt-0.5 shrink-0" />
                  <span className="font-sans text-xs md:text-sm text-white/80 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 4: // LAYER 5: Off-Page expands
        return (
          <motion.div
            key="layer-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={layerTransition}
            className="w-full max-w-3xl bg-white/5 border border-[#81B29A]/40 rounded-[2.5rem] p-12 backdrop-blur-xl shadow-2xl text-center space-y-10"
          >
            <h4 className="font-display text-4xl font-black text-white">Off-Page SEO</h4>
            
            <div>
              <div className="font-display text-7xl md:text-8xl font-black text-[#81B29A] drop-shadow-lg">
                <CountUp end="1000" suffix="+" duration={2} />
              </div>
              <span className="font-sans text-sm tracking-widest text-white/60 uppercase font-bold">Backlinks Built</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {["Blog Outreach", "Reddit Marketing", "Indexed Authority Links", "Link Building"].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 font-sans text-xs text-white/80"
                >
                  ✓ {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 5: // LAYER 6: Local SEO with Map Glow
        return (
          <motion.div
            key="layer-5"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }} // Prepare for dissolve
            transition={layerTransition}
            className="w-full max-w-3xl bg-white/5 border border-[#81B29A]/40 rounded-[2.5rem] p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden"
          >
            {/* Map Glow Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
              <div className="w-96 h-96 rounded-full border-[1px] border-[#81B29A] animate-ping" style={{ animationDuration: '4s' }} />
              <div className="absolute w-64 h-64 rounded-full border-[1px] border-[#81B29A] animate-[ping_3s_linear_infinite]" />
              <div className="absolute w-32 h-32 rounded-full border-[1px] border-[#81B29A] animate-[ping_2s_linear_infinite]" />
            </div>

            <div className="relative z-10 space-y-8">
              <div className="text-center">
                <MapPin size={32} className="text-[#81B29A] mx-auto mb-4" />
                <h4 className="font-display text-4xl font-black text-white">Local SEO</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                {[
                  "Google Business Profile Optimization",
                  "NAP Consistency",
                  "Local Keyword Targeting",
                  "Customer Reviews",
                  "Localized Content",
                  "Local Citations",
                  "Google Maps Optimization"
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center gap-3 backdrop-blur-sm"
                  >
                    <CheckCircle2 size={14} className="text-[#81B29A] shrink-0" />
                    <span className="font-sans text-xs text-white/90 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 6: // LAYER 7: PERFORMANCE MARKETING HERO (Particle reformed)
        return (
          <motion.div
            key="layer-6"
            initial={{ scale: 0.5, opacity: 0, filter: "blur(20px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -50 }}
            transition={dissolveTransition}
            className="w-full max-w-4xl bg-[#E07A5F]/10 border border-[#E07A5F]/30 rounded-[3rem] p-16 backdrop-blur-2xl shadow-[0_0_80px_rgba(224,122,95,0.15)] text-center space-y-8"
          >
            <div className="w-24 h-24 rounded-full bg-[#E07A5F]/20 border border-[#E07A5F]/40 flex items-center justify-center mx-auto shadow-inner animate-pulse">
              <Target size={40} className="text-[#E07A5F]" />
            </div>
            <h3 className="font-display text-5xl md:text-7xl font-black text-white tracking-tight">
              PERFORMANCE MARKETING
            </h3>
            <div className="space-y-2">
              <div className="font-display text-6xl font-black text-[#E07A5F]">
                <CountUp end="200000" prefix="₹" suffix="+" duration={2} />
              </div>
              <p className="font-sans text-sm tracking-widest uppercase text-white/60 font-bold">Monthly Ad Spend Managed</p>
            </div>
          </motion.div>
        );

      case 7: // LAYER 8: Meta Ads expands
        return (
          <motion.div
            key="layer-7"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -50 }}
            transition={layerTransition}
            className="w-full max-w-4xl text-center space-y-10"
          >
            <h4 className="font-display text-5xl font-black text-white border-b border-white/10 pb-6 inline-block">--head Meta Ads</h4>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { count: "20", label: "Healthcare Lead Campaigns" },
                { count: "5", label: "Rental Workspace Campaigns" },
                { count: "10", label: "Event Campaigns" },
                { count: "5", label: "Traffic Campaigns" },
                { count: "10", label: "Boost Campaigns" },
                { count: "20", label: "WhatsApp Conversion Campaigns" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 border border-[#E07A5F]/30 rounded-3xl p-6 shadow-xl"
                >
                  <div className="font-display text-4xl font-black text-white mb-2"><CountUp end={item.count} suffix="+" /></div>
                  <div className="font-sans text-[10px] uppercase tracking-wider text-white/60">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 8: // LAYER 9: Google Ads Morph
        return (
          <motion.div
            key="layer-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={layerTransition}
            className="w-full max-w-3xl bg-white/5 border border-[#E07A5F]/40 rounded-[2.5rem] p-12 backdrop-blur-xl shadow-2xl text-center space-y-8"
          >
            <h4 className="font-display text-5xl font-black text-white">--head Google Ads</h4>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="px-8 py-6 rounded-2xl bg-black/40 border border-white/10">
                <h5 className="font-display text-2xl font-black text-white">Performance Max</h5>
              </motion.div>
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }} className="px-8 py-6 rounded-2xl bg-black/40 border border-white/10">
                <h5 className="font-display text-2xl font-black text-white">YouTube Ads</h5>
              </motion.div>
            </div>
          </motion.div>
        );

      case 9: // LAYER 10: LinkedIn Ads Morph
        return (
          <motion.div
            key="layer-9"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={layerTransition}
            className="w-full max-w-2xl bg-[#0077B5]/10 border border-[#0077B5]/30 rounded-[2.5rem] p-12 backdrop-blur-xl shadow-2xl text-center space-y-8"
          >
            <h4 className="font-display text-5xl font-black text-white">--head LinkedIn Ads</h4>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="p-8 rounded-2xl bg-black/40 border border-[#0077B5]/40 inline-block">
              <h5 className="font-sans text-lg uppercase tracking-widest font-bold text-white">Lead Generation Campaigns</h5>
              <p className="font-sans text-xs text-white/50 mt-3 max-w-sm">Professional corporate visual style targeting B2B pipelines.</p>
            </motion.div>
          </motion.div>
        );

      case 10: // LAYER 11: JioHotstar Ads
        return (
          <motion.div
            key="layer-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }} // Prepare for dissolve
            transition={layerTransition}
            className="w-full max-w-2xl bg-white/5 border border-[#E07A5F]/30 rounded-[2.5rem] p-12 backdrop-blur-xl shadow-2xl text-center space-y-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <div className="w-64 h-64 rounded-full border-2 border-[#E07A5F]/20 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute w-96 h-96 rounded-full border border-[#E07A5F]/10 animate-[ping_4s_linear_infinite]" />
            </div>

            <div className="relative z-10">
              <h4 className="font-display text-5xl font-black text-white mb-8">--head JioHotstar Ads</h4>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="inline-block px-10 py-5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
                <h5 className="font-sans text-sm uppercase tracking-widest font-bold text-white">Brand Awareness Campaigns</h5>
              </motion.div>
            </div>
          </motion.div>
        );

      case 11: // LAYER 12: AI NATIVE DEVELOPER (Particle reformed)
        return (
          <motion.div
            key="layer-11"
            initial={{ scale: 0.5, opacity: 0, filter: "blur(20px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -50 }}
            transition={dissolveTransition}
            className="w-full max-w-4xl bg-[#818CF8]/10 border border-[#818CF8]/30 rounded-[3rem] p-16 backdrop-blur-2xl shadow-[0_0_80px_rgba(129,140,248,0.15)] text-center space-y-8"
          >
            <div className="w-24 h-24 rounded-full bg-[#818CF8]/20 border border-[#818CF8]/40 flex items-center justify-center mx-auto shadow-inner animate-pulse">
              <Cpu size={40} className="text-[#818CF8]" />
            </div>
            <h3 className="font-display text-5xl md:text-7xl font-black text-white tracking-tight">
              AI NATIVE DEVELOPER
            </h3>
            <p className="font-sans text-sm tracking-widest uppercase text-white/60 font-bold max-w-lg mx-auto">
              Engineering modern React applications & automated LLM workflows
            </p>
          </motion.div>
        );

      case 12: // LAYER 13: Featured Project Al Fahath
        return (
          <motion.div
            key="layer-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={layerTransition}
            className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-[3rem] p-12 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="flex-1 space-y-6 text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded border border-[#818CF8]/40 text-[#818CF8] bg-[#818CF8]/10 inline-block">
                Featured Project
              </span>
              <h3 className="font-display text-4xl md:text-5xl font-black text-white leading-none">
                AL FAHATH <br/>BAGS & FOOTWEAR
              </h3>
              <p className="font-sans text-sm text-white/50 uppercase tracking-widest font-bold">E-Catalog Platform</p>
              
              <div className="pt-6">
                <a
                  href="https://github.com/Fahaths"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0B111E] rounded-full font-sans font-bold text-xs uppercase tracking-wider hover:bg-white/95 hover:scale-105 transition-all shadow-xl group"
                >
                  View Project <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Modern UI", "Responsive Design", "Product Showcase", "Retail Business Solution"].map((tag, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 border border-white/5 bg-black/30 rounded-2xl flex flex-col gap-2 items-start"
                >
                  <Layout size={16} className="text-[#818CF8]" />
                  <span className="font-sans font-bold text-[11px] uppercase tracking-wider text-white/80">{tag}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0B111E] flex flex-col justify-center items-center overflow-hidden z-10 border-b border-white/5"
    >
      {/* CSS custom keyframe animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatDust {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.15; }
          50% { transform: translateY(-25px) translateX(12px); opacity: 0.45; }
        }
        .network-dust {
          animation: floatDust 7s ease-in-out infinite;
        }
      `}} />

      {/* 1. Subtle Colored Particle Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {particles.map((p) => (
          <circle
            key={p.id}
            cx={`${p.x}%`}
            cy={`${p.y}%`}
            r={p.size}
            fill={p.color}
            className="network-dust"
            style={{
              animationDelay: `${p.delay}s`,
              animationDuration: `${4.5 + (p.id % 4) * 1.5}s`,
              filter: "blur(0.5px)"
            }}
          />
        ))}
      </svg>

      {/* Numerical Index Indicators for Desktop */}
      {!isMobile && (
        <div className="absolute top-10 right-10 z-30 text-white/30 font-sans text-[10px] uppercase font-bold tracking-widest flex items-center gap-1">
          Progress: {Math.round(((activeLayer + 1) / 13) * 100)}%
        </div>
      )}

      {/* A. DESKTOP PINNED STORYBOARD */}
      {!isMobile ? (
        <div ref={pinContainerRef} className="w-full flex items-center justify-center h-screen z-10 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer}
              className="w-full flex items-center justify-center absolute inset-0 px-8"
            >
              {renderLayer()}
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator Sidebar */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
            {Array.from({ length: 13 }).map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeLayer === idx ? "bg-white scale-150 shadow-[0_0_8px_white]" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* B. MOBILE NON-PINNED ACCESSIBLE SUMMARY SCROLL */
        <div className="w-full max-w-xl px-6 py-24 space-y-14 z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            className="text-center space-y-4 bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-md"
          >
            <h3 className="font-display text-4xl font-black text-white tracking-tighter">
              Show-Case<span className="text-[#81B29A] animate-pulse">.....</span>
            </h3>
            <p className="font-sans text-xs text-white/60 leading-relaxed font-bold tracking-wider uppercase">
              SEO Analyst • Performance Marketer • AI Native Developer
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-md space-y-6"
          >
            <div className="flex justify-between items-start border-b border-white/5 pb-4">
              <h4 className="font-display text-2xl font-black text-white">SEO</h4>
              <TrendingUp className="text-[#81B29A]" size={24} />
            </div>
            <div className="space-y-4">
              <div>
                <span className="font-display text-4xl font-black text-white">1000+</span>
                <span className="font-sans text-[10px] text-white/40 block uppercase tracking-wider">Backlinks Built</span>
              </div>
              <div className="space-y-3 font-sans text-xs text-white/70">
                <p><strong>On-Page:</strong> Search intent matching, meta optimization, HTML structure.</p>
                <p><strong>Off-Page:</strong> Reddit outreach, authority link building.</p>
                <p><strong>Local SEO:</strong> Google Business Profile, maps ranking.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-md space-y-6"
          >
            <div className="flex justify-between items-start border-b border-white/5 pb-4">
              <h4 className="font-display text-2xl font-black text-white">PERFORMANCE MARKETING</h4>
              <Target className="text-[#E07A5F]" size={24} />
            </div>
            <div className="space-y-4">
              <div>
                <span className="font-display text-4xl font-black text-white">₹2,00,000+</span>
                <span className="font-sans text-[10px] text-white/40 block uppercase tracking-wider">Monthly Ad Spend</span>
              </div>
              <div className="space-y-3 font-sans text-xs text-white/70">
                <p><strong>Meta Ads:</strong> Healthcare leads, WhatsApp conversions.</p>
                <p><strong>Google Ads:</strong> Search and Performance Max campaigns.</p>
                <p><strong>LinkedIn & JioHotstar:</strong> B2B leads & awareness.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-md space-y-6"
          >
            <div className="flex justify-between items-start border-b border-white/5 pb-4">
              <h4 className="font-display text-2xl font-black text-white">AI NATIVE DEVELOPER</h4>
              <Cpu className="text-[#818CF8]" size={24} />
            </div>
            <p className="font-sans text-xs text-white/70 leading-relaxed">
              Developing modern React applications & automated LLM workflows.
            </p>
            <div className="p-4 border border-white/5 bg-black/40 rounded-2xl space-y-2 mt-4">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#818CF8]">Featured Project</span>
              <h5 className="font-sans font-black text-sm text-white uppercase tracking-wider">Al Fahath Bags & Footwear</h5>
              <a
                href="https://github.com/Fahaths"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans font-bold text-[10px] text-white uppercase tracking-wider hover:underline pt-2"
              >
                View Project <ArrowRight size={12} />
              </a>
            </div>
          </motion.div>
        </div>
      )}

      {/* Floating scroll indicator for desktop (active only on initial layer) */}
      {!isMobile && activeLayer === 0 && (
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2 opacity-50"
        >
          <span className="font-sans text-[8px] font-bold uppercase tracking-[0.25em] text-white">Scroll Down</span>
          <ArrowDown size={12} className="text-white" />
        </motion.div>
      )}
    </section>
  );
}
