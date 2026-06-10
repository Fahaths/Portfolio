"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, Sparkles, Map, MousePointer } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// 1. Career Journey Transit Stations (Metro Milestones)
const stations = [
  {
    role: "Digital Marketing Intern",
    company: "Growth Agencies",
    period: "2022",
    description: "Started my journey learning the foundations of SEO, analytics, and digital growth.",
    skills: ["Digital Marketing Basics", "SEO Fundamentals", "Website Audits", "Social Media Ads", "Ad Copywriting", "GSC Setup"],
    technologies: ["Canva", "Google Analytics", "WordPress", "Meta Ads Manager"],
    achievements: [
      "Assisted in managing 5+ client content calendars.",
      "Setup Google Search Console tracking for new client sites.",
      "Helped optimize ad creatives resulting in a CTR improvement of 15%."
    ],
    color: "#81B29A" // Sage Green
  },
  {
    role: "SEO Analyst",
    company: "Digital Growth Firm",
    period: "2022 - 2024",
    description: "Focused on search visibility, website performance, and organic growth strategies.",
    skills: ["Technical SEO", "Local SEO", "GSC", "GTM", "Analytics", "Site Audits", "Keyword Research"],
    technologies: ["Semrush", "Ahrefs", "Google Search Console", "Screaming Frog", "GA4"],
    achievements: [
      "Ranked 50+ keywords on page 1 of Google Search.",
      "Scaled organic traffic by 150% for ecommerce clients.",
      "Conducted 30+ comprehensive technical audits resolving indexing bottlenecks."
    ],
    color: "#F2CC8F" // Gold/Yellow
  },
  {
    role: "Performance Marketing",
    company: "Growth Agency",
    period: "2024 - 2025",
    description: "Expanded into paid acquisition and lead generation campaigns.",
    skills: ["Meta Ads", "Google Ads", "LinkedIn Ads", "Conversion Tracking", "Funnel Optimization", "Budget Allocation"],
    technologies: ["Google Ads", "Meta Ads Manager", "Google Tag Manager", "GA4", "Looker Studio"],
    achievements: [
      "Managed ₹1L+ monthly ad spend across Meta & Google Ads.",
      "Achieved an average of 8.2x ROAS across retail accounts.",
      "Built automated conversion tracking funnels using Google Tag Manager."
    ],
    color: "#E07A5F" // Coral
  },
  {
    role: "AI Native Developer",
    company: "Freelance & Ventures",
    period: "2025 - Present",
    description: "Building AI-powered experiences and automation systems.",
    skills: ["React", "Next.js", "AI Workflows", "Automations", "Prompt Engineering", "LLM Integration", "RAG Systems"],
    technologies: ["OpenAI API", "LangChain", "Python", "Next.js", "Node.js", "Vercel AI SDK"],
    achievements: [
      "Automated client lead generation pipelines saving 15+ hours weekly.",
      "Built bespoke AI tools and next-gen agentic workflows for content creation.",
      "Integrated OpenAI and LangChain solutions into custom web applications."
    ],
    color: "#818CF8" // Soft Indigo
  }
];

export default function CareerUniverse() {
  const wrapperRef = useRef(null);
  const mobileContainerRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // Desktop horizontal track scrub
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    // Reset progress track width and train position
    gsap.set("#metro-track-progress", { width: "0%" });
    gsap.set("#metro-train", { left: "0%" });

    const tl = gsap.timeline({
      scrollTrigger: {
        id: "career-subway-trigger",
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=3000", // Pinned scroll depth
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          let idx = 0;
          if (p >= 0.82) idx = 3;
          else if (p >= 0.48) idx = 2;
          else if (p >= 0.15) idx = 1;
          else idx = 0;

          setActiveIndex(idx);
        }
      }
    });

    // Animate progress line and train node in perfect sync
    tl.to("#metro-track-progress", { width: "100%", ease: "none" })
      .to("#metro-train", { left: "100%", ease: "none" }, "<");

    return () => {
      ScrollTrigger.getById("career-subway-trigger")?.kill();
    };
  }, []);

  // Mobile vertical track scrub
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    // Reset vertical height
    gsap.set("#mobile-progress-line", { height: "0%" });

    const tlMobile = gsap.timeline({
      scrollTrigger: {
        trigger: mobileContainerRef.current,
        start: "top 65%",
        end: "bottom 65%",
        scrub: 1,
      }
    });

    tlMobile.to("#mobile-progress-line", { height: "100%", ease: "none" });

    return () => {
      tlMobile.scrollTrigger?.kill();
    };
  }, []);

  // Smooth scroll teleportation handler on click
  const handleStationClick = (index) => {
    if (window.innerWidth < 768) {
      const block = document.getElementById(`mobile-station-${index}`);
      if (block) {
        block.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const trigger = ScrollTrigger.getById("career-subway-trigger");
    if (trigger) {
      const startY = trigger.start;
      const totalScroll = 3000;
      const targetPercent = [0.0, 0.33, 0.66, 1.0][index];
      const targetY = startY + totalScroll * targetPercent;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* A. DESKTOP VIEWPORT (Horizontal Metro Scroll Journey) */}
      <section
        ref={wrapperRef}
        className="hidden md:flex relative w-full h-screen bg-[#0A0D14] overflow-hidden items-center justify-center z-10 select-none border-b border-white/5"
      >
        {/* Ambient Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
            backgroundSize: "60px 60px"
          }}
        />

        {/* Dynamic Chapter Title Overlay */}
        <div className="absolute top-10 left-10 z-30 pointer-events-none">
          <span className="text-[9px] font-bold tracking-[0.25em] text-white/40 uppercase block">Subway Route</span>
          <h2 className="font-display text-2xl md:text-3xl font-black text-white tracking-tight">
            Career Journey
          </h2>
        </div>

        {/* Scroll helper pill */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-4 py-2 font-sans text-[10px] font-bold uppercase tracking-widest text-white/70"
          >
            <MousePointer size={11} className="opacity-40" />
            <span>Scroll to Travel the Line • Click to Jump</span>
          </motion.div>
        </div>

        {/* Grid Map Frame */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-12 gap-16 px-16 items-center z-10">
          
          {/* 1. Left Station Details (40% width) */}
          <div className="col-span-5 flex flex-col justify-center min-h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="w-full bg-white/5 border border-white/10 backdrop-blur-lg rounded-[2rem] p-8 shadow-2xl relative"
              >
                {/* Time range */}
                <span
                  className="text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-white/5 border"
                  style={{ color: stations[activeIndex].color, borderColor: `${stations[activeIndex].color}30` }}
                >
                  {stations[activeIndex].period}
                </span>

                {/* Role & Company */}
                <h3 className="font-display text-2xl md:text-3xl font-black mt-4 text-white leading-tight">
                  {stations[activeIndex].role}
                </h3>
                <span className="font-sans text-xs text-white/50 block mt-1">
                  {stations[activeIndex].company}
                </span>

                {/* Description */}
                <p className="font-sans text-xs text-white/70 mt-4 leading-relaxed">
                  {stations[activeIndex].description}
                </p>

                {/* Impact Achievements */}
                <div className="mt-5 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 flex items-center gap-1.5">
                    <Sparkles size={11} style={{ color: stations[activeIndex].color }} /> Major Impact
                  </span>
                  <ul className="space-y-1.5 font-sans text-xs text-white/80 pl-4 list-disc marker:text-white/20">
                    {stations[activeIndex].achievements.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Skills/Technologies Chips */}
                <div className="mt-5 pt-4 border-t border-white/5 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                    Core Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {stations[activeIndex].technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="font-sans font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded bg-white/5"
                        style={{ color: stations[activeIndex].color }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 2. Right subway route line (60% width) */}
          <div className="col-span-7 flex flex-col justify-center relative pl-8 select-none">
            
            {/* Header branding */}
            <div className="mb-16 pointer-events-none">
              <span className="font-mono text-[9px] text-[var(--color-accent)] font-bold uppercase tracking-widest block mb-2">Transit Route Map</span>
              <h4 className="font-display text-3xl font-black text-white">FAA Central Line</h4>
              <p className="font-sans text-xs text-white/40 mt-1">S. Fahath Professional Evolution Track</p>
            </div>

            {/* Metro Track Horizontal Bar */}
            <div className="w-[85%] relative h-10 mt-6 flex items-center">
              
              {/* Backing Track (Gray) */}
              <div className="absolute top-[17px] left-0 right-0 h-1.5 bg-white/10 rounded-full z-0" />
              
              {/* Progress Track (Glowing Gradient) */}
              <div
                id="metro-track-progress"
                className="absolute top-[17px] left-0 h-1.5 bg-gradient-to-r from-[#81B29A] via-[#E07A5F] to-[#818CF8] rounded-full z-0 origin-left"
                style={{ width: "0%" }}
              />

              {/* Glowing Train Indicator */}
              <div
                id="metro-train"
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0A0D14] border-4 z-10 pointer-events-none flex items-center justify-center transition-all duration-300"
                style={{
                  left: "0%",
                  transform: "translate(-50%, -50%)",
                  borderColor: stations[activeIndex].color,
                  boxShadow: `0 0 15px ${stations[activeIndex].color}80`
                }}
              >
                {/* Train inner lights */}
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>

              {/* Station circles along the track line */}
              {stations.map((st, i) => {
                const isReached = activeIndex >= i;
                const isActive = activeIndex === i;

                return (
                  <div
                    key={i}
                    onClick={() => handleStationClick(i)}
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{ left: `${i * 33.33}%` }}
                  >
                    <div className="relative group cursor-pointer -translate-x-1/2">
                      
                      {/* Station Circle */}
                      <div
                        className={`w-5 h-5 rounded-full bg-[#0A0D14] border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                          isActive
                            ? "border-white shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                            : isReached
                            ? "border-[var(--station-color)]"
                            : "border-white/20 hover:border-white/40"
                        }`}
                        style={{
                          "--station-color": st.color
                        }}
                      >
                        {/* Glowing Active Center */}
                        {isReached && (
                          <motion.div
                            layoutId="active-marker"
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: st.color }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </div>

                      {/* Station Title Label */}
                      <span
                        className={`absolute top-7 left-1/2 -translate-x-1/2 font-display text-[9px] font-black uppercase tracking-wider whitespace-nowrap transition-colors duration-300 ${
                          isActive
                            ? "text-white opacity-100"
                            : isReached
                            ? "text-white/60"
                            : "text-white/25 group-hover:text-white/50"
                        }`}
                      >
                        {st.role.split(" ").slice(-1)[0]}
                      </span>

                      {/* Station Year/Period Label */}
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[8px] font-bold text-white/30 whitespace-nowrap">
                        {st.period.split(" ").slice(-1)[0]}
                      </span>
                    </div>
                  </div>
                );
              })}

            </div>

          </div>

        </div>
      </section>

      {/* B. MOBILE VIEWPORT (Vertical Subway Stack Journey) */}
      <section
        ref={mobileContainerRef}
        className="block md:hidden relative w-full h-auto bg-[#0A0D14] px-6 py-24 z-10 border-b border-white/5 select-none"
      >
        {/* Header Title */}
        <div className="mb-20">
          <span className="text-[9px] font-bold tracking-[0.25em] text-white/40 uppercase block">Subway Route</span>
          <h2 className="font-display text-3xl font-black text-white tracking-tight">
            Career Journey
          </h2>
          <p className="font-sans text-xs text-white/40 mt-1">Scroll down to trace the professional evolution</p>
        </div>

        {/* Subway Map Track Container */}
        <div className="relative pl-12 pr-2">
          
          {/* Backing Track (Vertical Line) */}
          <div className="absolute left-[29px] top-6 bottom-6 w-1.5 bg-white/10 rounded-full z-0" />
          
          {/* Progress Track (Vertical Line Drawing) */}
          <div
            id="mobile-progress-line"
            className="absolute left-[29px] top-6 w-1.5 bg-gradient-to-b from-[#81B29A] via-[#E07A5F] to-[#818CF8] rounded-full z-0 origin-top"
            style={{ height: "0%" }}
          />

          {/* Station blocks */}
          <div className="space-y-16">
            {stations.map((st, i) => (
              <div
                key={i}
                id={`mobile-station-${i}`}
                className="relative flex flex-col items-start w-full"
              >
                
                {/* Station circle positioned on the line */}
                <div
                  onClick={() => handleStationClick(i)}
                  className="absolute left-[-29px] top-1.5 -translate-x-1/2 w-5 h-5 rounded-full bg-[#0A0D14] border-2 border-[rgba(255,255,255,0.2)] flex items-center justify-center z-10"
                >
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: st.color }} />
                </div>

                {/* Inline Glassmorphism Details Card (Revealed as scrolled in) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ type: "spring", stiffness: 90, damping: 15 }}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl relative"
                >
                  {/* Period tag */}
                  <span
                    className="text-[8px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-white/5 border"
                    style={{ color: st.color, borderColor: `${st.color}30` }}
                  >
                    {st.period}
                  </span>

                  {/* Role Title */}
                  <h4 className="font-display text-lg font-black text-white mt-3 leading-tight">
                    {st.role}
                  </h4>
                  <span className="font-sans text-[10px] text-white/50 block mt-0.5">{st.company}</span>

                  {/* Description */}
                  <p className="font-sans text-xs text-white/70 mt-3 leading-relaxed">
                    {st.description}
                  </p>

                  {/* Achievements */}
                  <div className="mt-4 space-y-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 flex items-center gap-1">
                      <Sparkles size={10} style={{ color: st.color }} /> Achievements
                    </span>
                    <ul className="space-y-1 font-sans text-[11px] text-white/80 pl-3 list-disc marker:text-white/20">
                      {st.achievements.map((item, idx) => (
                        <li key={idx} className="leading-relaxed">{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Core skills */}
                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/40">
                      Technologies
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {st.technologies.map((t, idx) => (
                        <span
                          key={idx}
                          className="font-sans font-bold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5"
                          style={{ color: st.color }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
