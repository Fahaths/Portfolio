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
  Sparkles,
  Gauge,
  Code2,
  Server
} from "lucide-react";

// -------------------------------------------------------------
// Component 0: Sequential Typewriter Effect
// -------------------------------------------------------------
function SequentialTypewriter({ roles }: { roles: string[] }) {
  const [step, setStep] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (step >= roles.length) return;

    let timeout: NodeJS.Timeout;

    if (!isFadingOut && charIndex < roles[step].length) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev + roles[step].charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, 50);
    } else if (!isFadingOut && charIndex === roles[step].length) {
      timeout = setTimeout(() => {
        setIsFadingOut(true);
      }, 1500);
    } else if (isFadingOut) {
      timeout = setTimeout(() => {
        setDisplayText("");
        setCharIndex(0);
        setIsFadingOut(false);
        setStep((prev) => prev + 1);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isFadingOut, step, roles]);

  if (step >= roles.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-wrap items-center gap-x-2 md:gap-x-3 text-[var(--accent-gold)] font-display font-semibold tracking-wide"
      >
        <span>{roles[0]}</span>
        <span className="opacity-50">·</span>
        <span>{roles[1]}</span>
        <span className="opacity-50">·</span>
        <span>{roles[2]}</span>
      </motion.div>
    );
  }

  return (
    <motion.div 
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center text-[var(--accent-gold)] font-display font-semibold tracking-wide"
    >
      {displayText}
      <motion.span 
        animate={{ opacity: [1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="w-[2px] h-4 bg-[var(--accent-gold)] ml-1 inline-block"
      />
    </motion.div>
  );
}


// -------------------------------------------------------------
// Component 1: Custom Interlocking F-A Monogram Logo
// -------------------------------------------------------------
function BrandLogo() {
  return (
    <a href="#" className="flex items-center space-x-3 select-none group focus:outline-none">
      <div className="relative flex items-center justify-center font-display font-extrabold text-3xl tracking-tighter">
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
  className?: string;
}
function EditorialReveal({ children, delay = 0, className = "" }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ endValue, suffix = "", duration = 1500, className = "" }: { endValue: number, suffix?: string, duration?: number, className?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    let startTimestamp: number | null = null;
    let frameId: number;
    let hasStarted = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          hasStarted = true;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeProgress * endValue));
            if (progress < 1) {
              frameId = window.requestAnimationFrame(step);
            }
          };
          frameId = window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [endValue, duration]);

  return <span ref={ref} className={className}>{count}{suffix}</span>;
}

export default function EyeComfortVintagePortfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [activeWorkTab, setActiveWorkTab] = useState("Performance Marketing");
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
              className="hero-role mt-2 font-display text-[var(--text-charcoal)]"
            >
              <span>I build systems that</span>
              <span className="accent text-[var(--accent-gold)] drop-shadow-sm">execute &amp; scale.</span>
            </motion.div>
            
            <div className="font-display tracking-widest uppercase text-xs md:text-sm mb-6 h-6 flex items-center">
              <SequentialTypewriter roles={["Performance Marketer", "SEO Analyst", "Web Developer"]} />
            </div>

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
              <a href="#works" className="editorial-btn-primary px-8 text-sm inline-flex items-center justify-center h-[52px] rounded-full">
                View My Work
              </a>
              <a href="#contact" className="editorial-btn-secondary px-8 text-sm inline-flex items-center justify-center h-[52px] rounded-full">
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
                   className="relative z-10 drop-shadow-2xl mt-auto w-[95%] h-[85%] object-contain object-bottom lg:w-[90%] lg:h-[95%]"
                 />
              </div>

              {/* FLOATING ELEMENTS */}
              
              {/* Widget 1: Code Repository (Bottom Left) */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="floating-card absolute bottom-[-2%] md:bottom-[-5%] left-[5px] md:-left-12 p-3 z-20 flex flex-col w-[160px] md:w-[190px] rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-2 mb-2 border-b border-[var(--border-vintage)] pb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/80" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                  <div className="w-2 h-2 rounded-full bg-green-500/80" />
                  <span className="font-display text-[8px] md:text-[9px] text-[var(--text-taupe)] uppercase tracking-wider ml-2">style.css</span>
                </div>
                <div className="font-mono text-[9px] md:text-[10px] leading-relaxed">
                  <div className="text-[var(--text-charcoal)]">.project-card {'{'}</div>
                  <div className="pl-3 text-[var(--accent-gold)]">display: grid;</div>
                  <div className="pl-3 text-[var(--text-charcoal)]">border-radius: 8px;</div>
                  <div className="text-[var(--text-charcoal)]">{'}'}</div>
                </div>
              </motion.div>

              {/* Widget 2: Deployment Status (Top Right) */}
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="floating-card absolute top-[-10px] md:top-[12%] right-[-10px] md:-right-12 p-3 z-20 flex flex-col w-[150px] md:w-[170px] rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-2 mb-1.5">
                  <motion.div 
                    animate={{ opacity: [1, 0.4, 1] }} 
                    transition={{ duration: 2, repeat: Infinity }} 
                    className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" 
                  />
                  <span className="font-display text-[9px] md:text-[10px] uppercase tracking-widest text-[var(--text-charcoal)] font-semibold">Deployment</span>
                </div>
                <div className="font-display text-[8px] md:text-[9px] text-[var(--text-taupe)] uppercase tracking-wider">
                  Status: <span className="text-[var(--text-charcoal)] font-semibold">Active [git]</span>
                </div>
              </motion.div>

              {/* Widget 3: UX/UI Performance (Center Left) */}
              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="floating-card absolute top-[35%] md:top-[38%] left-[-5px] md:-left-28 p-3 z-20 flex items-center space-x-3 w-[150px] md:w-[180px] rounded-xl shadow-lg"
              >
                <div className="p-2 rounded-lg bg-[var(--bg-cream-rich)] border border-[var(--border-vintage)] text-[var(--text-charcoal)]">
                  <Gauge className="w-4 h-4 md:w-5 md:h-5 stroke-[1.5]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-[8px] md:text-[9px] uppercase tracking-widest text-[var(--text-taupe)] font-semibold">UX/UI Perf.</span>
                  <span className="font-display text-[9px] md:text-[10px] text-[var(--text-charcoal)] font-bold">Load: 1.2s</span>
                </div>
              </motion.div>

              {/* Widget 4: GA4 Audience Metrics (Top Left) */}
              <motion.div
                animate={{ y: [3, -3, 3] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="floating-card absolute top-[2%] md:top-[8%] left-[-10px] md:-left-16 p-3 z-20 flex flex-col space-y-3 w-[150px] md:w-[180px] rounded-xl shadow-lg"
              >
                <div className="flex justify-between items-center text-[9px] font-display uppercase tracking-widest text-[var(--text-charcoal)] font-semibold mb-1">
                  <span>Audience</span>
                  <span className="text-[var(--accent-gold)] bg-[var(--accent-gold)]/10 px-1.5 py-0.5 rounded text-[8px] border border-[var(--accent-gold)]/20">GA4</span>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between text-[8px] md:text-[9px] text-[var(--text-taupe)] font-display uppercase tracking-wider">
                    <span>Core</span>
                    <span className="text-[var(--text-charcoal)] font-bold">75%</span>
                  </div>
                  <div className="h-1 bg-[var(--bg-cream-rich)] rounded-full w-full overflow-hidden relative border border-[var(--border-vintage)]">
                    <div className="absolute top-0 left-0 h-full bg-[var(--text-charcoal)] rounded-full w-[75%]" />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between text-[8px] md:text-[9px] text-[var(--text-taupe)] font-display uppercase tracking-wider">
                    <span>Bounce</span>
                    <span>50%</span>
                  </div>
                  <div className="h-1 bg-[var(--bg-cream-rich)] rounded-full w-full overflow-hidden relative border border-[var(--border-vintage)]">
                    <div className="absolute top-0 left-0 h-full bg-[var(--text-taupe)] rounded-full w-[50%]" />
                  </div>
                </div>
              </motion.div>

              {/* Widget 5: Ad Scale Trend (Middle Right) */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="floating-card absolute top-[45%] md:top-[50%] right-[-15px] md:-right-20 p-3 z-20 flex flex-col space-y-2 w-[140px] md:w-[170px] rounded-xl shadow-lg"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display text-[8px] md:text-[9px] uppercase tracking-widest text-[var(--text-taupe)] font-semibold">Ad Scale</span>
                  <span className="font-display text-[9px] md:text-[10px] font-bold text-[var(--accent-gold)]">+42% ROAS</span>
                </div>
                <svg viewBox="0 0 100 30" fill="none" className="w-full h-5 md:h-7 stroke-[var(--text-charcoal)]" strokeWidth="2.5">
                  <path d="M 5 25 L 25 20 L 40 26 L 60 12 L 75 16 L 95 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          MODULE 3: ABOUT MODULE (Asymmetric Structural Split)
          ------------------------------------------------------------- */}
      <section id="about" className="py-24 px-6 lg:px-16 relative border-t border-[var(--border-vintage)] bg-[#0B0F19] overflow-hidden">
        <div className="w-full max-w-7xl mx-auto relative z-10">
          
          {/* Module Header */}
          <div className="mb-20">
            <span className="font-display text-xs uppercase tracking-[0.2em] text-[#9CA3AF] font-semibold mb-6 block">
              01. THE JOURNEY
            </span>
            <h3 className="font-display text-4xl lg:text-5xl font-black text-[#F3F4F6] tracking-tight leading-[1.15]">
              From Execution to Strategy.
            </h3>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            
            {/* Left Column (The Impact Statement & Metrics Matrix) - 40% */}
            <div className="w-full lg:w-[40%] flex flex-col">
              <EditorialReveal delay={0.1}>
                <p className="font-display text-2xl lg:text-3xl font-bold text-[#F3F4F6] leading-tight">
                  From executing basics to driving the full digital stack. Fast.
                </p>
              </EditorialReveal>

              <div className="mt-12 lg:mt-16 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Metric 1 */}
                <div className="bg-transparent backdrop-blur-md border border-[#F3F4F6]/5 p-6 rounded-xl transition-all duration-300 hover:border-[#2563EB]/30 hover:shadow-[inset_0_0_20px_rgba(37,99,235,0.05)]">
                  <AnimatedCounter endValue={42} suffix="+" className="text-3xl font-bold font-display text-[#F3F4F6]" duration={1500} />
                  <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mt-2">Total Projects Delivered</p>
                </div>
                {/* Metric 2 */}
                <div className="bg-transparent backdrop-blur-md border border-[#F3F4F6]/5 p-6 rounded-xl transition-all duration-300 hover:border-[#2563EB]/30 hover:shadow-[inset_0_0_20px_rgba(37,99,235,0.05)]">
                  <AnimatedCounter endValue={15} suffix="+" className="text-3xl font-bold font-display text-[#2563EB]" duration={1500} />
                  <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mt-2">Ad Campaigns Scaled</p>
                </div>
                {/* Metric 3 */}
                <div className="bg-transparent backdrop-blur-md border border-[#F3F4F6]/5 p-6 rounded-xl transition-all duration-300 hover:border-[#2563EB]/30 hover:shadow-[inset_0_0_20px_rgba(37,99,235,0.05)]">
                  <AnimatedCounter endValue={20} suffix="+" className="text-3xl font-bold font-display text-[#F3F4F6]" duration={1500} />
                  <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mt-2">SEO Optimization Audits</p>
                </div>
                {/* Metric 4 */}
                <div className="bg-transparent backdrop-blur-md border border-[#F3F4F6]/5 p-6 rounded-xl transition-all duration-300 hover:border-[#2563EB]/30 hover:shadow-[inset_0_0_20px_rgba(37,99,235,0.05)]">
                  <AnimatedCounter endValue={12} suffix="+" className="text-3xl font-bold font-display text-[#2563EB]" duration={1500} />
                  <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mt-2">Web Architectures Built</p>
                </div>
              </div>
            </div>

            {/* Right Column (The Story Summary) - 60% */}
            <div className="w-full lg:w-[60%] flex flex-col gap-8">
              
              {/* Milestone 1 */}
              <EditorialReveal delay={0.2} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline gap-x-4">
                  <h4 className="font-display text-xl font-bold text-[#F3F4F6]">The Sandbox / Intern</h4>
                  <span className="text-sm font-mono text-[#9CA3AF]">Crux Creations • Pre-September 2025</span>
                </div>
                <p className="font-sans text-[#9CA3AF] leading-relaxed">
                  My journey started in the sandbox of digital marketing, mastering the core mechanics of technical SEO, high-authority link building, and user intent parameters.
                </p>
              </EditorialReveal>

              {/* Milestone 2 */}
              <EditorialReveal delay={0.3} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline gap-x-4">
                  <h4 className="font-display text-xl font-bold text-[#F3F4F6]">The Shift / SEO Analyst</h4>
                  <span className="text-sm font-mono text-[#2563EB]">Crux Creations (Full-Time) • September 1, 2025 - Present</span>
                </div>
                <p className="font-sans text-[#F3F4F6] leading-relaxed">
                  That foundation quickly accelerated into a full-time role as an SEO Analyst, where I expanded my scope to bridge the gap between frontend development and advanced search visibility frameworks.
                </p>
              </EditorialReveal>

              {/* Engineered Skillsets Matrix Deck */}
              <EditorialReveal delay={0.5} className="pt-6 border-t border-[var(--border-vintage)]/30">
                <h5 className="font-display text-sm uppercase tracking-widest text-[#9CA3AF] font-bold mb-6">Engineered Skillsets</h5>
                <div className="flex flex-wrap gap-4">
                  {[
                    "Google Ads (Smart Bidding & PMax)",
                    "Meta Ads Manager",
                    "Google Analytics 4 (GA4)",
                    "Technical SEO & Indexing Strategy",
                    "Workflow Automation (n8n & JSON Payloads)"
                  ].map((skill, i) => (
                    <div 
                      key={i}
                      className="px-4 py-2 bg-transparent backdrop-blur-md border border-[#2563EB]/20 rounded-md transition-all duration-250 hover:border-[#2563EB] text-[#F3F4F6] text-sm font-medium shadow-[inset_0_0_10px_rgba(37,99,235,0.05)] cursor-default"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </EditorialReveal>

            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          MODULE 4: WORKS MODULE (Interactive Bento Dashboard)
          ------------------------------------------------------------- */}
      <section id="works" className="py-24 px-6 lg:px-16 relative border-t border-[var(--border-vintage)] bg-[#0B0F19]">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-20">
            <span className="font-display text-xs uppercase tracking-[0.2em] text-[#9CA3AF] font-semibold mb-6 block">02. PROVEN RESULTS</span>
            <h3 className="font-display text-4xl lg:text-5xl font-black text-[#F3F4F6] tracking-tight">Architecting Growth Through Code and Campaigns.</h3>
          </div>

          {/* Interactive Tab Switcher */}
          <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-12 border-b border-[var(--border-vintage)]/50 pb-4">
            {[
              { id: "Performance Marketing", label: "Performance Marketing" },
              { id: "Technical SEO", label: "Technical SEO" },
              { id: "Web Development", label: "Web Development" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveWorkTab(tab.id)}
                className={`relative px-2 py-2 font-display text-sm md:text-base uppercase tracking-widest transition-all duration-300 ${
                  activeWorkTab === tab.id
                    ? "text-[#F3F4F6] font-medium"
                    : "text-[#9CA3AF] hover:text-[#F3F4F6]"
                }`}
              >
                {tab.label}
                {activeWorkTab === tab.id && (
                  <motion.div
                    layoutId="worksTabUnderline"
                    className="absolute left-0 bottom-[-17px] w-full h-[2px] bg-[#2563EB]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Dynamic Tab Content */}
          <div className="min-h-[400px]">
            {activeWorkTab === "Performance Marketing" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col gap-8 w-full"
              >
                <EditorialReveal delay={0.1} className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-[35%_65%] gap-6 w-full">
                    {/* Box 1: Headline */}
                    <div className="bg-transparent backdrop-blur-md border border-[#F3F4F6]/5 rounded-xl p-8 flex flex-col justify-between transition-all duration-250 hover:border-[#2563EB]/30 group">
                      <div className="flex items-start">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#9CA3AF] font-bold whitespace-nowrap">
                          [ Performance Marketing ]
                        </span>
                      </div>
                      <div className="my-8">
                        <h4 className="font-display text-2xl font-bold text-[#F3F4F6] leading-snug">
                          Meta &amp; Instagram Ads
                        </h4>
                      </div>
                      <div>
                        <span className="font-display text-3xl font-bold text-[#2563EB] tracking-tight whitespace-nowrap">
                          1,200+ Leads
                        </span>
                      </div>
                    </div>
                    {/* Box 2: Strategy */}
                    <div className="bg-transparent backdrop-blur-md border border-[#F3F4F6]/5 rounded-xl p-8 flex flex-col justify-between transition-all duration-250 hover:border-[#2563EB]/30 group">
                      <div className="flex items-start">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#9CA3AF] font-bold whitespace-nowrap">
                          01 / CORE STRATEGY
                        </span>
                      </div>
                      <div className="my-6">
                        <p className="font-sans text-base text-[#9CA3AF] leading-[1.6] text-left">
                          Structured targeted ad accounts and custom radius audiences to capture verified high-intent users, maximizing lead volume while lowering acquisition costs.
                        </p>
                      </div>
                      <div className="flex flex-row flex-wrap gap-2">
                        {["Meta Ads Manager", "Google Ads", "PMax", "GA4 Data Streams"].map(tag => (
                          <span key={tag} className="font-display text-[10px] uppercase tracking-wider text-[#2563EB] bg-[#2563EB]/5 border border-[#2563EB]/15 px-2 py-1 rounded whitespace-nowrap">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </EditorialReveal>
              </motion.div>
            )}

            {activeWorkTab === "Technical SEO" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col gap-8 w-full"
              >
                <EditorialReveal delay={0.1} className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-[35%_65%] gap-6 w-full">
                    {/* Box 1: Headline */}
                    <div className="bg-transparent backdrop-blur-md border border-[#F3F4F6]/5 rounded-xl p-8 flex flex-col justify-between transition-all duration-250 hover:border-[#2563EB]/30 group">
                      <div className="flex items-start">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#9CA3AF] font-bold whitespace-nowrap">
                          [ Technical SEO & Indexing ]
                        </span>
                      </div>
                      <div className="my-8">
                        <h4 className="font-display text-2xl font-bold text-[#F3F4F6] leading-snug">
                          Search Visibility Framework
                        </h4>
                      </div>
                      <div>
                        <span className="font-display text-3xl font-bold text-[#F3F4F6] tracking-tight whitespace-nowrap">
                          Organic Surge
                        </span>
                      </div>
                    </div>
                    {/* Box 2: Strategy */}
                    <div className="bg-transparent backdrop-blur-md border border-[#F3F4F6]/5 rounded-xl p-8 flex flex-col justify-between transition-all duration-250 hover:border-[#2563EB]/30 group">
                      <div className="flex items-start">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#9CA3AF] font-bold whitespace-nowrap">
                          02 / INDEXING ARCHITECTURE
                        </span>
                      </div>
                      <div className="my-6">
                        <p className="font-sans text-base text-[#9CA3AF] leading-[1.6] text-left">
                          Executed structured site audits, deployed advanced backlink building frameworks, and re-engineered indexing setups to bypass crawling blocks and dominate organic keyword rankings.
                        </p>
                      </div>
                      <div className="flex flex-row flex-wrap gap-2">
                        {["Search Console", "Screaming Frog", "Schema Markup", "Keyword Matrix"].map(tag => (
                          <span key={tag} className="font-display text-[10px] uppercase tracking-wider text-[#F3F4F6] bg-[#F3F4F6]/5 border border-[#F3F4F6]/10 px-2 py-1 rounded whitespace-nowrap">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </EditorialReveal>
              </motion.div>
            )}

            {activeWorkTab === "Web Development" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col gap-8 w-full"
              >
                <EditorialReveal delay={0.1} className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-[35%_65%] gap-6 w-full">
                    {/* Box 1: Headline */}
                    <div className="bg-transparent backdrop-blur-md border border-[#F3F4F6]/5 rounded-xl p-8 flex flex-col justify-between transition-all duration-250 hover:border-[#2563EB]/30 group">
                      <div className="flex items-start">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#9CA3AF] font-bold whitespace-nowrap">
                          [ Next.js Frontend Development ]
                        </span>
                      </div>
                      <div className="my-8">
                        <h4 className="font-display text-2xl font-bold text-[#F3F4F6] leading-snug">
                          High-Performance Applications
                        </h4>
                      </div>
                      <div>
                        <span className="font-display text-3xl font-bold text-[#2563EB] tracking-tight whitespace-nowrap">
                          Sub-1s Load
                        </span>
                      </div>
                    </div>
                    {/* Box 2: Strategy */}
                    <div className="bg-transparent backdrop-blur-md border border-[#F3F4F6]/5 rounded-xl p-8 flex flex-col justify-between transition-all duration-250 hover:border-[#2563EB]/30 group">
                      <div className="flex items-start">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#9CA3AF] font-bold whitespace-nowrap">
                          03 / CODE ENGINEERING
                        </span>
                      </div>
                      <div className="my-6">
                        <p className="font-sans text-base text-[#9CA3AF] leading-[1.6] text-left">
                          Engineered blindingly fast, responsive, single-page marketing applications with clean, production-ready codebases strictly optimized for performance and core web vitals.
                        </p>
                      </div>
                      <div className="flex flex-row flex-wrap gap-2">
                        {["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"].map(tag => (
                          <span key={tag} className="font-display text-[10px] uppercase tracking-wider text-[#2563EB] bg-[#2563EB]/5 border border-[#2563EB]/15 px-2 py-1 rounded whitespace-nowrap">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </EditorialReveal>
              </motion.div>
            )}
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
