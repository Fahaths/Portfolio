"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { TrendingUp, Target, Cpu, Layout, ArrowRight, CheckCircle2, Sparkles, ArrowDown } from "lucide-react";

// Lightweight Count-Up Component
function CountUp({ end, duration = 1.5, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
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
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const [activeLayer, setActiveLayer] = useState(0);
  const [particles, setParticles] = useState([]);

  // Generate background floating particles
  useEffect(() => {
    const list = [];
    const colors = ["rgba(61, 64, 91, 0.4)", "rgba(224, 122, 95, 0.4)", "rgba(129, 178, 154, 0.4)"];
    for (let i = 0; i < 30; i++) {
      list.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        color: colors[i % colors.length],
        delay: Math.random() * 5
      });
    }
    setParticles(list);
  }, []);

  // Map scroll progress to the active layer indices
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.20) {
      setActiveLayer(0);
    } else if (latest < 0.45) {
      setActiveLayer(1);
    } else if (latest < 0.75) {
      setActiveLayer(2);
    } else {
      setActiveLayer(3);
    }
  });

  // Layer transition configs
  const transitionConfig = { duration: 0.6, ease: [0.22, 1, 0.36, 1] };

  const renderLayer = () => {
    switch (activeLayer) {
      case 0: // Showcase Intro
        return (
          <motion.div
            key="showcase-layer"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={transitionConfig}
            className="w-full max-w-4xl text-center space-y-10 px-6"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, ...transitionConfig }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(61,64,91,0.25)] border border-[rgba(244,241,222,0.08)] text-xs font-semibold text-[rgba(244,241,222,0.75)] tracking-widest uppercase"
            >
              <Sparkles size={12} className="text-[#F2CC8F] animate-pulse" />
              Expertise Storyboard
            </motion.div>

            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, ...transitionConfig }}
              className="font-display text-6xl md:text-8xl font-black text-[#F4F1DE] tracking-tighter leading-none select-none"
            >
              SHOWCASE<span className="text-[#E07A5F] animate-pulse">.....</span>
            </motion.h2>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, ...transitionConfig }}
              className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
            >
              {[
                { name: "SEO Analyst", icon: <TrendingUp size={16} />, color: "text-[#3D405B] border-[rgba(61,64,91,0.45)] bg-[rgba(61,64,91,0.25)] shadow-[0_0_20px_rgba(61,64,91,0.45)]" },
                { name: "Performance Marketer", icon: <Target size={16} />, color: "text-[#E07A5F] border-[rgba(224,122,95,0.45)] bg-[rgba(61,64,91,0.25)] shadow-[0_0_20px_rgba(224,122,95,0.45)]" },
                { name: "AI Native Developer", icon: <Cpu size={16} />, color: "text-[#81B29A] border-[rgba(129,178,154,0.45)] bg-[rgba(61,64,91,0.25)] shadow-[0_0_20px_rgba(129,178,154,0.45)]" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: idx * 0.4, ease: "easeInOut" }}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl border text-sm font-bold tracking-wider uppercase backdrop-blur-md ${item.color}`}
                >
                  {item.icon}
                  {item.name}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );

      case 1: // SEO (Navy #3D405B Theme)
        return (
          <motion.div
            key="seo-layer"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={transitionConfig}
            className="w-full max-w-6xl px-6 flex flex-col items-center justify-center gap-8"
          >
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-[rgba(244,241,222,0.75)] uppercase tracking-widest bg-[rgba(61,64,91,0.25)] border border-[rgba(244,241,222,0.08)] px-3 py-1 rounded-full">Search Engine Optimization</span>
              <h3 className="font-display text-4xl md:text-6xl font-black text-[#F4F1DE] tracking-tight">SEO EXPERTISE</h3>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* On-Page Card */}
              <div className="bg-[rgba(61,64,91,0.25)] border border-[rgba(244,241,222,0.08)] rounded-[2rem] p-6 backdrop-blur-xl shadow-[0_10px_40px_rgba(61,64,91,0.45)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[rgba(61,64,91,0.05)] rounded-full blur-2xl pointer-events-none" />
                <h4 className="font-display text-xl font-bold text-[#F4F1DE] border-b border-[rgba(244,241,222,0.08)] pb-3 mb-4">On-Page SEO</h4>
                <ul className="space-y-2.5">
                  {[
                    "Search Intent Optimization",
                    "Content Depth Optimization",
                    "Title & Meta Optimization",
                    "Heading & URL Structure",
                    "Internal & External Linking",
                    "Image Alt Text & Schema"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[rgba(244,241,222,0.75)] font-medium">
                      <CheckCircle2 size={12} className="text-[#F2CC8F] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Off-Page Card */}
              <div className="bg-[rgba(61,64,91,0.25)] border border-[rgba(244,241,222,0.08)] rounded-[2rem] p-6 backdrop-blur-xl shadow-[0_10px_40px_rgba(61,64,91,0.45)] relative overflow-hidden group flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[rgba(61,64,91,0.05)] rounded-full blur-2xl pointer-events-none" />
                <div>
                  <h4 className="font-display text-xl font-bold text-[#F4F1DE] border-b border-[rgba(244,241,222,0.08)] pb-3 mb-4">Off-Page SEO</h4>
                  <ul className="space-y-2.5">
                    {["Blog Outreach Campaigns", "Reddit & Quora Marketing", "Indexed Authority Links", "Safe & Natural Link Building"].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-[rgba(244,241,222,0.75)] font-medium">
                        <CheckCircle2 size={12} className="text-[#F2CC8F] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-[rgba(244,241,222,0.08)] text-center">
                  <div className="font-display text-4xl font-black text-[#F2CC8F] drop-shadow-md">
                    <CountUp end="1000" suffix="+" duration={1.5} />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[rgba(244,241,222,0.5)] tracking-wider">Backlinks Safely Built</span>
                </div>
              </div>

              {/* Local SEO Card */}
              <div className="bg-[rgba(61,64,91,0.25)] border border-[rgba(244,241,222,0.08)] rounded-[2rem] p-6 backdrop-blur-xl shadow-[0_10px_40px_rgba(61,64,91,0.45)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[rgba(61,64,91,0.05)] rounded-full blur-2xl pointer-events-none" />
                <h4 className="font-display text-xl font-bold text-[#F4F1DE] border-b border-[rgba(244,241,222,0.08)] pb-3 mb-4">Local SEO</h4>
                <ul className="space-y-2.5">
                  {[
                    "Google Business Profile Optimization",
                    "NAP Consistency Checks",
                    "Local Keyword Target Campaigns",
                    "Customer Review Strategy",
                    "Localized Content Creation",
                    "Local Citations & Maps Ranking"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[rgba(244,241,222,0.75)] font-medium">
                      <CheckCircle2 size={12} className="text-[#F2CC8F] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        );

      case 2: // Performance Marketing (Coral #E07A5F Theme)
        return (
          <motion.div
            key="perf-layer"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={transitionConfig}
            className="w-full max-w-6xl px-6 flex flex-col items-center justify-center gap-8"
          >
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-[#E07A5F] uppercase tracking-widest bg-[rgba(61,64,91,0.25)] border border-[rgba(224,122,95,0.45)] px-3 py-1 rounded-full">Paid Advertising & Funnels</span>
              <h3 className="font-display text-4xl md:text-6xl font-black text-[#F4F1DE] tracking-tight">PERFORMANCE MARKETING</h3>
              <div className="pt-2">
                <div className="font-display text-5xl md:text-7xl font-black text-[#F2CC8F] drop-shadow-md">
                  <CountUp end="200000" prefix="₹" suffix="+" duration={1.5} />
                </div>
                <span className="text-xs font-bold text-[rgba(244,241,222,0.5)] uppercase tracking-widest">Monthly Ad Spend Managed</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  title: "Meta Ads",
                  icon: (
                    <svg className="w-5 h-5 text-[#1877F2] fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M15.42 7.72c-.89 0-1.74.45-2.27 1.2a3.78 3.78 0 0 0-2.28-1.2 3.32 3.32 0 0 0-3.32 3.32 3.32 3.32 0 0 0 3.32 3.32c.89 0 1.74-.45 2.28-1.2a3.78 3.78 0 0 0 2.27 1.2 3.32 3.32 0 0 0 3.32-3.32 3.32 3.32 0 0 0-3.32-3.32zm0 5.12c-.99 0-1.8-.81-1.8-1.8s.81-1.8 1.8-1.8 1.8.81 1.8 1.8-.81 1.8-1.8 1.8zm-4.56 0c-.99 0-1.8-.81-1.8-1.8s.81-1.8 1.8-1.8 1.8.81 1.8 1.8-.81 1.8-1.8 1.8z"/>
                    </svg>
                  ),
                  desc: "20+ Healthcare Lead Campaigns\n5+ Workspace Rental\n10+ Local Events\n20+ WhatsApp Conversion",
                  color: "border-[rgba(244,241,222,0.08)] bg-[rgba(61,64,91,0.25)] shadow-[0_8px_30px_rgba(224,122,95,0.45)]"
                },
                {
                  title: "Google Ads",
                  icon: (
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  ),
                  desc: "Performance Max Campaigns\nYouTube Video Ads\nSearch & Shopping Funnels",
                  color: "border-[rgba(244,241,222,0.08)] bg-[rgba(61,64,91,0.25)] shadow-[0_8px_30px_rgba(224,122,95,0.45)]"
                },
                {
                  title: "LinkedIn Ads",
                  icon: (
                    <svg className="w-5 h-5 text-[#0A66C2] fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8.3 19H5.3V10h3v9zM6.8 8.7c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zm12.2 10.3h-3v-5.6c0-1.3-.1-3-1.8-3-1.8 0-2.1 1.4-2.1 2.9V19h-3V10h2.9v1.3h.1c.4-.7 1.4-1.5 2.8-1.5 3 0 3.5 2 3.5 4.6v5.6z"/>
                    </svg>
                  ),
                  desc: "B2B Lead Generation\nAccount-Based Targeting\nCorporate Pipeline Building",
                  color: "border-[rgba(244,241,222,0.08)] bg-[rgba(61,64,91,0.25)] shadow-[0_8px_30px_rgba(224,122,95,0.45)]"
                },
                {
                  title: "JioHotstar Ads",
                  icon: (
                    <svg className="w-5 h-5 text-[#FFCC00] fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-11 11V8l6 3-6 3z"/>
                    </svg>
                  ),
                  desc: "Broad Scale Awareness\nVideo Stream Placements\nCricket Tournament Sponsoring",
                  color: "border-[rgba(244,241,222,0.08)] bg-[rgba(61,64,91,0.25)] shadow-[0_8px_30px_rgba(224,122,95,0.45)]"
                }
              ].map((item, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border backdrop-blur-xl ${item.color}`}>
                  <div className="flex items-center gap-2.5 mb-3">
                    {item.icon}
                    <h4 className="font-display text-base font-bold text-[#F4F1DE] leading-none">{item.title}</h4>
                  </div>
                  <div className="space-y-2">
                    {item.desc.split("\n").map((line, lIdx) => (
                      <div key={lIdx} className="flex items-start gap-2 text-xs text-[rgba(244,241,222,0.75)] font-medium">
                        <span className="text-[#E07A5F] mt-0.5">•</span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 3: // AI Native Developer (Sage #81B29A Theme)
        return (
          <motion.div
            key="ai-layer"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={transitionConfig}
            className="w-full max-w-4xl px-6 flex flex-col items-center justify-center gap-6"
          >
            <div className="text-center space-y-1.5">
              <span className="text-[10px] font-bold text-[#81B29A] uppercase tracking-widest bg-[rgba(61,64,91,0.25)] border border-[rgba(129,178,154,0.45)] px-3 py-0.5 rounded-full">Next-Gen Applications</span>
              <h3 className="font-display text-3xl md:text-5xl font-black text-[#F4F1DE] tracking-tight">AI NATIVE DEVELOPER</h3>
            </div>

            <div className="w-full bg-[rgba(61,64,91,0.25)] border border-[rgba(244,241,222,0.08)] rounded-[2rem] p-6 md:p-8 backdrop-blur-xl shadow-[0_0_60px_rgba(129,178,154,0.45)] flex flex-col md:flex-row gap-8 items-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(129,178,154,0.05)] rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex-1 space-y-4 text-left z-10">
                <div className="flex items-center gap-2">
                  <Cpu size={14} className="text-[#81B29A]" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#81B29A]">Featured Platform</span>
                </div>
                <h4 className="font-display text-2xl md:text-3xl font-black text-[#F4F1DE] leading-none">
                  AL FAHATH <br/>BAGS & FOOTWEAR
                </h4>
                <p className="font-sans text-xs text-[rgba(244,241,222,0.5)] uppercase tracking-widest font-bold">E-Catalog Platform</p>
                
                {/* Tech Stack list */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["React", "Next.js", "AI Workflows", "Automation"].map((tech, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-0.5 rounded-full border border-[rgba(244,241,222,0.08)] bg-[rgba(61,64,91,0.15)] text-[9px] text-[rgba(244,241,222,0.75)] font-semibold uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <a
                    href="https://github.com/Fahaths"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#F4F1DE] text-[#161A23] rounded-full font-sans font-bold text-[10px] uppercase tracking-wider hover:bg-[#81B29A] hover:scale-105 transition-all shadow-xl"
                  >
                    View Project <ArrowRight size={12} />
                  </a>
                </div>
              </div>

              {/* Preview mockup card layout */}
              <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-3 z-10">
                {[
                  { title: "Modern UI", desc: "Premium styling, glass cards" },
                  { title: "Responsive Design", desc: "Optimized for mobile & desk" },
                  { title: "Product Showcase", desc: "Interactive rich catalog" },
                  { title: "Retail Solution", desc: "Ready for business expansion" }
                ].map((tag, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-[rgba(244,241,222,0.04)] bg-[#161A23]/60 rounded-2xl flex flex-col gap-1.5 items-start hover:border-[rgba(129,178,154,0.5)] transition-all cursor-default"
                  >
                    <Layout size={14} className="text-[#F2CC8F]" />
                    <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-[rgba(244,241,222,0.9)]">{tag.title}</span>
                    <span className="text-[9px] text-[rgba(244,241,222,0.5)] font-medium">{tag.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0F1117] text-[#F4F1DE] overflow-clip z-10 border-b border-[rgba(244,241,222,0.06)]"
      style={{ height: "500vh" }} // 500vh container mapping progress
    >
      {/* Subtle background floating particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="w-full h-full opacity-60">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes floatParticle {
              0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
              50% { transform: translateY(-30px) translateX(15px); opacity: 0.35; }
            }
            .floating-dot {
              animation: floatParticle 8s ease-in-out infinite;
            }
          `}} />
          {particles.map((p) => (
            <circle
              key={p.id}
              cx={`${p.x}%`}
              cy={`${p.y}%`}
              r={p.size}
              fill={p.color}
              className="floating-dot"
              style={{
                animationDelay: `${p.delay}s`,
                animationDuration: `${5 + (p.id % 5) * 2}s`
              }}
            />
          ))}
        </svg>
      </div>

      {/* Sticky Content Container */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {renderLayer()}
        </AnimatePresence>

        {/* Desktop Step dots indicators */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeLayer === idx 
                  ? "bg-[#F2CC8F] scale-150 shadow-[0_0_10px_rgba(242,204,143,0.8)]" 
                  : "bg-[rgba(244,241,222,0.25)]"
              }`}
            />
          ))}
        </div>

        {/* Scroll down mouse/arrow indicator at layer 0 */}
        {activeLayer === 0 && (
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2 opacity-50"
          >
            <span className="font-sans text-[8px] font-bold uppercase tracking-[0.25em] text-[rgba(244,241,222,0.5)]">Scroll Down</span>
            <ArrowDown size={12} className="text-[#F2CC8F]" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
