"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  MessageCircle, 
  Mail, 
  Linkedin, 
  Github, 
  ExternalLink, 
  MapPin, 
  Phone, 
  Search, 
  TrendingUp, 
  Users, 
  Award, 
  ChevronRight,
  Send,
  Sparkles
} from "lucide-react";

// -------------------------------------------------------------
// Component 1: Custom Interlocking F-A Monogram Logo
// -------------------------------------------------------------
function BrandLogo() {
  return (
    <a href="#" className="flex items-center space-x-3 select-none group focus:outline-none">
      <div className="relative flex items-center justify-center font-display font-black text-3xl tracking-tighter">
        <span className="text-[var(--text-charcoal)]">F</span>
        <span className="text-[var(--accent-gold)]">A</span>
      </div>
    </a>
  );
}

// -------------------------------------------------------------
// Component 2: Soft Scroll-revealed Container
// -------------------------------------------------------------
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
}
function EditorialReveal({ children, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default function EyeComfortVintagePortfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const lastScrollY = useRef(0);

  // Auto-hide scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setIsNavHidden(true);
      } else {
        setIsNavHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // About Timeline Career journey
  const careerTimeline = [
    {
      date: "Sep 2025 – Present",
      role: "SEO Analyst & Performance Marketer",
      company: "Crux Creations",
      url: "https://cruxcreations.com",
      desc: "Leading conversion-focused, data-backed campaigns across Google and Meta Ads. Structuring on-page audits, localized maps optimization, and parasite SEO platforms to scale brand visibility and tighten client CPL.",
      skills: ["Google Ads Engine", "Meta Ad Buying", "Technical SEO", "Parasite SEO Frameworks"],
    },
    {
      date: "Jun 2025 – Aug 2025",
      role: "SEO Analyst Intern",
      company: "Crux Creations",
      url: "https://cruxcreations.com",
      desc: "Conducted key competitor intelligence analysis, keyword research schemas, backlink reviews, and analytics collection across Google Search Console and Analytics 4.",
      skills: ["Keyword Mapping", "On-Page SEO Auditing", "GSC Reports", "GA4 Audits"],
    }
  ];

  // Projects / Cases
  const works = [
    {
      num: "01",
      name: "Search Dominance & Parasite SEO Overhaul",
      type: "Technical SEO & Structure",
      desc: "Crafted structured technical keyword mappings, structured metadata layouts, and parasite SEO setups that elevated target brand searches into top organic positions. Implemented advanced tracking parameters through Google Search Console to monitor rankings.",
      tools: ["Technical SEO", "GA4", "Search Console", "Parasite SEO", "Ahrefs"],
      metric: "Rankings Improved by 180%",
    },
    {
      num: "02",
      name: "Healthcare Specialty Ad Funnel Funnels",
      type: "Performance Marketing",
      desc: "Engineered scalable, high-intent patient acquisition ad flows on Google & Meta Ads. Tailored Specialty Lead Generation for women's health, urology, and orthopedics. Supported by master checkup packages and bells palsy awareness ads.",
      tools: ["Google Ads", "Meta Ads", "Radiused Targeting", "Patient Funnels"],
      metric: "CPL Reduced by 34%",
    },
    {
      num: "03",
      name: "Workshop & Seminar Registration Scaling",
      type: "Event Performance Marketing",
      desc: "Architected customized conversion registration funnels designed specifically to capture high-value sign-ups for the Healthcare Workshop Campaigns in Trichy and the advanced HealthTeach Program.",
      tools: ["Meta Ads", "Retargeting", "Custom Audits", "Figma Ad Creative"],
      metric: "1,200+ Registrations Secured",
    },
    {
      num: "04",
      name: "Coworking & Hyperlocal B2B Radius Leads",
      type: "Hyperlocal B2B Leads",
      desc: "Designed hyperlocal targeting schemas focused on physical inquiries and verified corporate walk-ins for Offisbay (Mount Road & Perungudi) and TheLaunchpod. Blended radius display ads with high-performance copy.",
      tools: ["Google Display", "Meta Radius Ads", "Local SEO Maps", "Lead Nurturing"],
      metric: "2.4x Qualified Inquiries",
    },
    {
      num: "05",
      name: "Conversion-Focused Creative Concepts & Shoots",
      type: "Creative-Led Performance support",
      desc: "Developed high-CTR (Click-Through-Rate) creative assets. Formulated Instagram Reels scripts, photography templates, and personal branding strategies inside studio environments to reduce algorithm fatigue.",
      tools: ["Creative Direction", "Reel Shoots", "CTR Analytics", "Personal Branding"],
      metric: "Average CTR Lift of 45%",
    }
  ];

  // Education Records
  const academics = [
    {
      year: "2023 – 2025",
      title: "Master of Computer Applications (MCA)",
      institution: "Measi Institute of Information Technology",
      url: "https://measiit.edu.in",
      desc: "Graduated with First Class Distinction. Developed specialized skills in object-oriented structures, web applications, database performance, and software development practices.",
    },
    {
      year: "2020 – 2023",
      title: "Bachelor of Commerce (Computer Application)",
      institution: "Shanmuga Industries Arts & Science College",
      url: "http://www.shanmugacollege.edu.in",
      desc: "Built a solid academic foundation at the intersection of business, marketing strategy, accounting systems, and computer application tools.",
    }
  ];

  const certifications = [
    { title: "Meta Certified Digital Buying Professional", issuer: "Meta Certified" },
    { title: "Google Ads Search Certification", issuer: "Google Academy" },
    { title: "Google Analytics 4 (GA4) Certification", issuer: "Google Academy" },
    { title: "Bespoke Web Systems & Next.js Frameworks", issuer: "Advanced Development Log" }
  ];

  // Blogger insights
  const insights = [
    {
      title: "Algorithm Decryption: The Rise of Parasite SEO Frameworks",
      summary: "An analytical study detailing how scaling keywords through trusted external authorities elevates visibility faster than traditional domains in 2026.",
      category: "SEO Strategy",
      link: "https://fahath-s.blogspot.com/"
    },
    {
      title: "Performance Ads in Healthcare: Broad vs. Micro-Targeting Model",
      summary: "Analyzing actual clinical patient funnels to understand why broad semantic modeling beats micro-targeted segmentation under competitive ad auctions.",
      category: "Paid Funnels",
      link: "https://fahath-s.blogspot.com/"
    },
    {
      title: "Click-Through Optimization: Overcoming Ad creative Fatigue",
      summary: "A blueprint outlining studio-led visual aesthetics and structural ad script structures designed to capture user scroll hooks in under 3 seconds.",
      category: "Creative ROI",
      link: "https://fahath-s.blogspot.com/"
    }
  ];

  // Form check
  const checkValidity = () => {
    if (formRef.current) {
      const name = (formRef.current.elements.namedItem("from_name") as HTMLInputElement)?.value.trim();
      const email = (formRef.current.elements.namedItem("reply_to") as HTMLInputElement)?.value.trim();
      const msg = (formRef.current.elements.namedItem("message") as HTMLTextAreaElement)?.value.trim();
      
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setIsValid(name.length > 0 && emailValid && msg.length > 0);
    }
  };

  // Submit form via EmailJS
  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);

    const SERVICE_ID = "service_yyrvdgc";
    const TEMPLATE_ID = "template_48iy5z5";
    const PUBLIC_KEY = "XSvrzesvssLKA5CWJ";

    setTimeout(async () => {
      try {
        if (!formRef.current) return;
        const { default: emailjs } = await import("@emailjs/browser");
        
        await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
          publicKey: PUBLIC_KEY,
        });

        alert("Letter Transmitted Successfully. It is resting safely in my mailbox.");
        formRef.current.reset();
        setIsValid(false);
        setIsTransmitting(false);
      } catch (error: any) {
        alert("Transmission encountered friction: " + (error.text || error.message));
        setIsTransmitting(false);
      }
    }, 900);
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-cream)]">
      
      {/* -------------------------------------------------------------
          MODULE 1: NAVBAR (Floating Pill Center-Dock)
          ------------------------------------------------------------- */}
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 }
        }}
        animate={isNavHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        style={{ x: "-50%" }}
        className="navbar fixed top-5 left-1/2 w-[90%] max-w-7xl rounded-full bg-[var(--bg-cream)]/80 backdrop-blur-md border border-[var(--border-vintage)] z-50 flex justify-between items-center shadow-sm"
      >
        <BrandLogo />

        {/* Desktop links matching the pill curve with center expanding underlines */}
        <div className="hidden md:flex items-center space-x-8">
          {["about", "works", "education", "blogger", "contact"].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={() => setActiveSection(section)}
              className={`font-display text-xs uppercase font-semibold tracking-wider relative py-1 transition-colors duration-300 ${
                activeSection === section ? "text-[var(--accent-gold)]" : "text-[var(--text-charcoal)] hover:text-[var(--accent-gold)]"
              }`}
            >
              {section}
              {activeSection === section && (
                <motion.span
                  layoutId="editorialUnderline"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-[var(--accent-gold)] rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 md:hidden focus:outline-none z-50"
          aria-label="Toggle Menu"
        >
          <span className="block w-5 h-[1.5px] bg-[var(--text-charcoal)] transition-all duration-300" style={{ transform: isNavOpen ? "rotate(45deg) translateY(6px)" : "" }} />
          <span className="block w-5 h-[1.5px] bg-[var(--text-charcoal)] transition-all duration-300" style={{ opacity: isNavOpen ? 0 : 1 }} />
          <span className="block w-5 h-[1.5px] bg-[var(--text-charcoal)] transition-all duration-300" style={{ transform: isNavOpen ? "rotate(-45deg) translateY(-6px)" : "" }} />
        </button>

        {/* Mobile navigation drawer - matching the floating style */}
        <AnimatePresence>
          {isNavOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute top-16 left-0 right-0 bg-[var(--bg-cream)] border border-[var(--border-vintage)] rounded-2xl flex flex-col items-center py-6 space-y-5 md:hidden shadow-lg"
            >
              {["about", "works", "education", "blogger", "contact"].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={() => {
                    setIsNavOpen(false);
                    setActiveSection(section);
                  }}
                  className="font-display text-xs uppercase font-bold tracking-widest text-[var(--text-charcoal)] hover:text-[var(--accent-gold)]"
                >
                  {section}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* -------------------------------------------------------------
          MODULE 2: HERO SECTION (Asymmetrical Two-Column Editorial)
          ------------------------------------------------------------- */}
      <section className="hero-section bg-[var(--bg-cream)]">
        
        {/* Left column abstract wave background elements - slowly floating */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-6 w-72 h-36 pointer-events-none opacity-[0.08] text-[var(--accent-gold)]"
        >
          <svg viewBox="0 0 100 50" fill="none" className="w-full h-full stroke-current" strokeWidth="1">
            <path d="M 0 35 Q 25 10 50 35 T 100 35" />
            <path d="M 0 42 Q 25 17 50 42 T 100 42" />
            <path d="M 0 28 Q 25 3 50 28 T 100 28" />
          </svg>
        </motion.div>

        <div className="hero-container">
          
          {/* Column Left (Text) */}
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1, 
                transition: { staggerChildren: 0.15 } 
              }
            }}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center items-start z-30"
          >


            {/* Main Heading */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="hero-title"
            >
              Fahath.s
            </motion.h1>

            {/* Sub-heading stacked role */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="hero-role mt-2"
            >
              <span>I build websites that</span>
              <span className="accent">rank &amp; convert.</span>
            </motion.div>
            
            <motion.div 
               variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.1 } }
              }}
              className="font-display font-semibold text-[var(--accent-gold)] tracking-wide uppercase text-xs md:text-sm mb-6"
            >
              Performance Marketing · SEO · Web Development
            </motion.div>

            {/* Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }
              }}
              className="hero-description mb-8"
            >
              Scaling data-driven ad channels (Meta, Google Ads) and building high-performance web solutions. Managed $50K+ in ad spend across Meta &amp; Google.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.3 } }
              }}
              className="flex flex-wrap items-center gap-4"
            >
              <a href="#works" className="editorial-btn-primary px-8 py-3.5 rounded-full text-sm">
                View My Work
              </a>
              <a href="#contact" className="editorial-btn-secondary px-8 py-3.5 rounded-full text-sm">
                Let's Talk
              </a>
            </motion.div>
          </motion.div>

          {/* Column Right (Visual) */}
          <div className="relative w-full h-full flex items-end justify-center">
            
            {/* Portrait Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
              className="hero-image-wrapper"
            >
              <div className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden border border-[var(--accent-gold)]/40 shadow-[0_0_50px_rgba(0,229,160,0.2)] bg-gradient-to-b from-zinc-800/20 to-[#0a0a0a] backdrop-blur-sm z-0 flex items-end justify-center">
                 {/* dot grid */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,160,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,160,0.05)_1px,transparent_1px)] bg-[size:16px_16px]" />
                 
                 {/* Portrait image inside the container to perfectly crop bottom corners */}
                 <img
                   src="/hero-profile-v3.webp"
                   alt="Fahath Portrait"
                   className="relative z-10 w-[90%] h-[95%] object-contain object-bottom drop-shadow-2xl"
                 />
              </div>

              {/* FLOATING ELEMENTS */}
              
              {/* Element 1: Upward trending growth line chart (Ad Scale) - Top Right */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="floating-card absolute top-[15%] left-[80%] lg:left-[95%] bg-zinc-900 border border-[var(--accent-gold)]/50 rounded-xl p-4 shadow-[0_0_20px_rgba(0,229,160,0.15)] z-20 flex flex-col justify-center space-y-3 hidden md:flex"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display text-[10px] lg:text-xs uppercase tracking-widest text-white font-bold">Ad Scale</span>
                  <span className="font-mono text-[9px] lg:text-[10px] font-bold text-[var(--accent-gold)]">+42% ROAS</span>
                </div>
                {/* Minimalist continuous vector trend line */}
                <svg viewBox="0 0 100 30" fill="none" className="w-full h-8 stroke-[var(--accent-gold)] drop-shadow-[0_0_6px_rgba(0,229,160,0.5)]" strokeWidth="3">
                  <path d="M 5 25 L 25 20 L 40 26 L 60 12 L 75 16 L 95 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>

              {/* Element 2: Line-art search box representation - Center-left intersection */}
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="floating-card absolute right-[85%] lg:right-[95%] top-[40%] bg-zinc-900 border border-[var(--accent-gold)]/50 rounded-full p-2 lg:p-3 shadow-[0_0_20px_rgba(0,229,160,0.15)] text-[var(--accent-gold)] flex items-center justify-center z-20 hidden md:flex"
                style={{ width: "fit-content" }}
              >
                <Search className="w-4 h-4 lg:w-5 lg:h-5 stroke-[1.5]" />
              </motion.div>

              {/* Element 3: GA4 Audience Metrics - Bottom Left */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="floating-card absolute bottom-[8%] right-[80%] lg:right-[90%] bg-zinc-900 border border-[var(--accent-gold)]/50 rounded-xl p-4 shadow-[0_0_20px_rgba(0,229,160,0.15)] flex flex-col justify-center space-y-3 z-20 hidden md:flex"
              >
                <div className="flex justify-between items-center text-[10px] lg:text-xs font-display uppercase tracking-widest text-white font-bold mb-2">
                  <span>Audience Core</span>
                  <span className="text-[var(--accent-gold)]">GA4</span>
                </div>
                
                {/* Metric bars */}
                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between text-[9px] lg:text-[10px] text-white/80 font-mono">
                    <span>Converting</span>
                    <span className="text-[var(--accent-gold)] font-bold">75%</span>
                  </div>
                  <div className="h-1.5 lg:h-2 bg-zinc-800 rounded-full w-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full bg-[var(--accent-gold)] rounded-full w-[75%] shadow-[0_0_8px_rgba(0,229,160,0.6)]" />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between text-[9px] lg:text-[10px] text-white/50 font-mono">
                    <span>Bouncing</span>
                    <span>25%</span>
                  </div>
                  <div className="h-1.5 lg:h-2 bg-zinc-950 rounded-full w-full overflow-hidden relative border border-zinc-700">
                    <div className="absolute top-0 left-0 h-full bg-zinc-500 rounded-full w-[25%]" />
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          MODULE 3: ABOUT MODULE (Timeline Career Track)
          ------------------------------------------------------------- */}
      <section id="about" className="py-28 relative border-t border-[var(--border-vintage)] bg-[var(--bg-cream-rich)]/25 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col space-y-2 mb-16">
            <span className="font-display text-xs uppercase tracking-[0.2em] text-[var(--accent-gold)] font-bold">/ 01 CHRONICLE</span>
            <h3 className="font-display text-4xl md:text-5xl font-black text-[var(--text-charcoal)]">The Journey</h3>
            <p className="font-sans text-base text-[var(--text-charcoal)]/85 max-w-xl pt-2">
              Trace my professional growth chronologically from a starting intern up to full-time specialist placements.
            </p>
          </div>

          {/* Timeline Track */}
          <div className="relative border-l border-[var(--border-vintage)] ml-2 md:ml-6 space-y-12 pb-4">
            {careerTimeline.map((item, index) => (
              <EditorialReveal key={index} delay={index * 0.1}>
                <div className="relative pl-6 md:pl-10 group">
                  {/* Circle node marker on line */}
                  <div className="absolute -left-[9.5px] top-1.5 w-4.5 h-4.5 rounded-full border-[3px] border-[var(--bg-cream)] bg-[var(--accent-olive)] group-hover:bg-[var(--accent-gold)] transition-colors duration-300" />
                  
                  {/* Timeline content details */}
                  <div className="space-y-3">
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent-gold)] font-bold">
                      {item.date}
                    </span>

                    <div className="space-y-1">
                      <h4 className="font-display text-xl md:text-2xl font-bold text-[var(--text-charcoal)]">
                        {item.role}
                      </h4>
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-display text-sm text-[var(--accent-gold)] hover:underline inline-flex items-center space-x-1"
                      >
                        <span>{item.company}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <p className="font-sans text-base text-[var(--text-charcoal)]/80 leading-relaxed max-w-2xl">
                      {item.desc}
                    </p>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.skills.map((skill) => (
                        <span 
                          key={skill} 
                          className="font-display text-[9px] uppercase tracking-wider bg-[var(--bg-cream)] border border-[var(--border-vintage)] text-[var(--text-charcoal)] px-2.5 py-0.5 rounded-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          MODULE 4: WORKS MODULE (Flat Responsive Grid with high spacing)
          ------------------------------------------------------------- */}
      <section id="works" className="py-28 relative border-t border-[var(--border-vintage)] px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="flex flex-col space-y-2">
              <span className="font-display text-xs uppercase tracking-[0.2em] text-[var(--accent-gold)] font-bold">/ 02 WORKS PORTFOLIO</span>
              <h3 className="font-display text-4xl md:text-5xl font-black text-[var(--text-charcoal)]">Campaign Catalog</h3>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-charcoal)]/80 mt-2 md:mt-0 font-bold">
              [ Grid Index / 05 Items ]
            </span>
          </div>

          {/* Grid system with high spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work, idx) => (
              <motion.div
                key={work.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="editorial-card p-8 rounded-lg flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Top Category tag & index */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--accent-gold)] font-bold bg-[var(--bg-cream)] px-2 py-0.5 border border-[var(--border-vintage)] rounded-sm">
                      {work.type}
                    </span>
                    <span className="font-serif italic text-lg text-[var(--accent-gold)] opacity-70">
                      {work.num}
                    </span>
                  </div>

                  <h4 className="font-display text-xl font-bold text-[var(--text-charcoal)] leading-snug">
                    {work.name}
                  </h4>
                  <p className="font-sans text-xs text-[var(--text-charcoal)]/80 leading-relaxed">
                    {work.desc}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[var(--border-vintage)]">
                  {/* Tools tag pill list */}
                  <div className="flex flex-wrap gap-1.5">
                    {work.tools.map((t) => (
                      <span 
                        key={t}
                        className="font-display text-[8.5px] uppercase tracking-wider text-[var(--text-charcoal)]/70 bg-[var(--bg-cream-rich)] px-1.5 py-0.5 border border-transparent rounded-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Highlights Metric */}
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                    <span className="text-[var(--text-charcoal)]/80">Outcome:</span>
                    <span className="text-[var(--accent-gold)] font-bold">{work.metric}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          MODULE 5: EDUCATION MODULE (Balanced Matrix Grid)
          ------------------------------------------------------------- */}
      <section id="education" className="py-28 relative border-t border-[var(--border-vintage)] bg-[var(--bg-cream-rich)]/25 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col space-y-2 mb-16">
            <span className="font-display text-xs uppercase tracking-[0.2em] text-[var(--accent-gold)] font-bold">/ 03 BALANCED GRID</span>
            <h3 className="font-display text-4xl md:text-5xl font-black text-[var(--text-charcoal)]">Education & Credentials</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Academics (Formal) */}
            <div className="lg:col-span-7 space-y-8">
              <h4 className="font-display text-xs uppercase tracking-widest text-[var(--text-charcoal)] font-bold pb-2 border-b border-[var(--border-vintage)]">
                Formal Degrees
              </h4>

              <div className="space-y-8">
                {academics.map((acad, idx) => (
                  <EditorialReveal key={idx} delay={idx * 0.1}>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-xs text-[var(--accent-gold)] font-bold">
                          {acad.year}
                        </span>
                        <a 
                          href={acad.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-display text-[10px] uppercase tracking-wider text-[var(--accent-gold)] hover:underline inline-flex items-center space-x-1 font-bold"
                        >
                          <span>Institute Web</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <h5 className="font-display text-lg md:text-xl font-bold text-[var(--text-charcoal)] leading-snug">
                        {acad.title}
                      </h5>
                      <p className="font-serif italic text-xs text-[var(--text-charcoal)]/80">
                        {acad.institution}
                      </p>
                      <p className="font-sans text-sm text-[var(--text-charcoal)]/85 leading-relaxed">
                        {acad.desc}
                      </p>
                    </div>
                  </EditorialReveal>
                ))}
              </div>
            </div>

            {/* Right Column: Practical Industry Credentials */}
            <div className="lg:col-span-5 space-y-8">
              <h4 className="font-display text-xs uppercase tracking-widest text-[var(--text-charcoal)] font-bold pb-2 border-b border-[var(--border-vintage)]">
                Professional Certifications
              </h4>

              <div className="grid grid-cols-1 gap-4">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="p-4 bg-[var(--bg-surface)] border border-[var(--border-vintage)] rounded flex items-center space-x-4 shadow-sm"
                  >
                    <div className="p-2.5 bg-[var(--bg-cream-rich)] border border-[var(--border-vintage)] rounded text-[var(--accent-gold)]">
                      <Award className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <div className="flex-grow">
                      <h6 className="font-display text-sm font-bold text-[var(--text-charcoal)] leading-snug">
                        {cert.title}
                      </h6>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-charcoal)]/70">
                        Authority: {cert.issuer}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          MODULE 6: BLOGGER MODULE (Magazine Editorial Slider)
          ------------------------------------------------------------- */}
      <section id="blogger" className="py-28 relative border-t border-[var(--border-vintage)] px-6 md:px-12 bg-[var(--bg-cream)]">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col space-y-2 mb-16">
            <span className="font-display text-xs uppercase tracking-[0.2em] text-[var(--accent-gold)] font-bold">/ 04 INTELLECT</span>
            <h3 className="font-display text-4xl md:text-5xl font-black text-[var(--text-charcoal)]">The Blogger Hub</h3>
            <p className="font-sans text-base text-[var(--text-charcoal)]/80 max-w-xl pt-2">
              Review published articles, marketing formulas, and analytical models cataloged on SEO frameworks and digital ad models.
            </p>
          </div>

          {/* Magazine-style row layout */}
          <div className="space-y-6">
            {insights.map((item, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="editorial-card p-6 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[var(--accent-gold)] group"
              >
                <div className="space-y-2 max-w-3xl">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--accent-gold)] font-bold bg-[var(--bg-cream)] px-2 py-0.5 border border-[var(--border-vintage)] rounded-sm">
                    {item.category}
                  </span>
                  <h4 className="font-display text-lg md:text-xl font-bold text-[var(--text-charcoal)] group-hover:text-[var(--accent-gold)] transition-colors duration-300 leading-snug">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-[var(--text-charcoal)]/70 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="flex items-center justify-end min-w-[140px] pt-4 md:pt-0 border-t border-[var(--border-vintage)] md:border-t-0">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-xs uppercase font-bold tracking-widest text-[var(--accent-gold)] group-hover:text-[var(--text-charcoal)] transition-colors duration-300 flex items-center space-x-1.5"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          MODULE 7: CONTACT MODULE (Prominent Center Block)
          ------------------------------------------------------------- */}
      <section id="contact" className="py-28 relative border-t border-[var(--border-vintage)] bg-[var(--bg-cream-rich)]/25 px-6 md:px-12 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-20 text-center flex flex-col items-center">
          
          <div className="max-w-2xl flex flex-col items-center space-y-6">
            <span className="font-display text-xs uppercase tracking-[0.2em] text-[var(--accent-gold)] font-bold">/ 05 ENGAGEMENT</span>
            <h3 className="font-display text-4xl md:text-5xl font-black text-[var(--text-charcoal)]">Ready to Defy Limits?</h3>
            <p className="font-sans text-base text-[var(--text-charcoal)]/80 leading-relaxed">
              Connect directly to scale your ad channels or build custom technical web systems. Start a real-time campaign scoping call or send me a secure message directly.
            </p>
            
            {/* Primary Action Button: WhatsApp in deep jungle green with subtle neon glow */}
            <div className="pt-6">
              <motion.a
                href="https://wa.me/919840031124"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-[var(--accent-olive)] hover:bg-[#127E61] text-[var(--bg-cream)] font-display text-xs uppercase tracking-widest font-bold rounded-full shadow-[0_4px_15px_rgba(29,205,159,0.15)] hover:shadow-[0_6px_20px_rgba(29,205,159,0.3)] transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 text-[var(--bg-cream)]" />
                <span>Connect on WhatsApp</span>
              </motion.a>
            </div>
          </div>

          {/* Inline Email Form inside flat surface container */}
          <div className="w-full max-w-2xl mt-12 bg-[var(--bg-surface)] border border-[var(--border-vintage)] rounded-lg p-6 md:p-8 text-left">
            <form
              ref={formRef}
              onSubmit={handleTransmit}
              onInput={checkValidity}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="from_name" className="font-display text-[9.5px] uppercase tracking-widest text-[var(--text-charcoal)]/80 font-bold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    required
                    placeholder="e.g. S. Fahad"
                    className="bg-[var(--bg-cream-rich)] border border-[var(--border-vintage)] focus:border-[var(--accent-gold)] focus:outline-none rounded px-3.5 py-2.5 text-xs text-[var(--text-charcoal)] placeholder-[var(--text-taupe)] w-full transition-colors duration-300"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="reply_to" className="font-display text-[9.5px] uppercase tracking-widest text-[var(--text-charcoal)]/80 font-bold">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="reply_to"
                    name="reply_to"
                    required
                    placeholder="e.g. contact@business.com"
                    className="bg-[var(--bg-cream-rich)] border border-[var(--border-vintage)] focus:border-[var(--accent-gold)] focus:outline-none rounded px-3.5 py-2.5 text-xs text-[var(--text-charcoal)] placeholder-[var(--text-taupe)] w-full transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="subject" className="font-display text-[9.5px] uppercase tracking-widest text-[var(--text-charcoal)]/80 font-bold">
                  Campaign Scope / Development Need
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="e.g. Search Momentum Optimization / Google Ads Scoping"
                  className="bg-[var(--bg-cream-rich)] border border-[var(--border-vintage)] focus:border-[var(--accent-gold)] focus:outline-none rounded px-3.5 py-2.5 text-xs text-[var(--text-charcoal)] placeholder-[var(--text-taupe)] w-full transition-colors duration-300"
                />
              </div>

              {/* Recipient info hidden */}
              <input type="hidden" name="to_name" value="Fahad" />

              {/* Message */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="message" className="font-display text-[9.5px] uppercase tracking-widest text-[var(--text-charcoal)]/80 font-bold">
                  Your Brief *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Provide details about your marketing funnels, budgets, timeline..."
                  className="bg-[var(--bg-cream-rich)] border border-[var(--border-vintage)] focus:border-[var(--accent-gold)] focus:outline-none rounded px-3.5 py-2.5 text-xs text-[var(--text-charcoal)] placeholder-[var(--text-taupe)] w-full transition-colors duration-300 resize-none"
                />
              </div>

              {/* Submit button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isTransmitting}
                  className={`editorial-btn-primary px-8 py-3 rounded text-xs tracking-wider flex items-center space-x-2 transition-all duration-300 ${
                    isTransmitting ? "opacity-75 cursor-wait" : ""
                  } ${isValid ? "ring-2 ring-[var(--accent-gold)]/30" : ""}`}
                >
                  <Send className="w-3.5 h-3.5 text-[#000000]" />
                  <span>{isTransmitting ? "TRANSMITTING..." : "TRANSMIT LETTER"}</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          MODULE 8: FOOTER
          ------------------------------------------------------------- */}
      <footer className="bg-[var(--bg-cream)] border-t border-[var(--border-vintage)] py-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 text-sm text-[var(--text-charcoal)]/80">
          
          {/* Copyright left */}
          <div className="space-y-0.5 text-center md:text-left">
            <span className="font-display font-bold text-[var(--text-charcoal)]">
              Fahad S. &copy; 2026
            </span>
            <p className="text-[10px] text-[var(--text-charcoal)]/60 leading-none">
              Performance Marketer, SEO Analyst & Web Developer. All rights reserved.
            </p>
          </div>

          {/* Core branding sign-off center */}
          <span className="font-display text-[9px] uppercase tracking-widest text-[var(--text-charcoal)]/70 text-center">
            Next.js &bull; TypeScript &bull; Tailwind CSS &bull; Framer Motion
          </span>

          {/* Social links right */}
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.linkedin.com/in/fahath-s-digital-marketer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-[var(--bg-surface)] border border-[var(--border-vintage)] rounded text-[var(--text-charcoal)]/70 hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            
            <a 
              href="https://github.com/Fahaths" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-[var(--bg-surface)] border border-[var(--border-vintage)] rounded text-[var(--text-charcoal)]/70 hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a 
              href="https://fahath-s.blogspot.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-[var(--bg-surface)] border border-[var(--border-vintage)] rounded text-[var(--text-charcoal)]/70 hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] font-mono text-[10px] leading-none uppercase font-extrabold hover:no-underline transition-all duration-300"
              aria-label="Blogger"
            >
              B!
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
