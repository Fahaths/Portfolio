"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-10% 0px -10% 0px" });

  const [step, setStep] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!isInView) {
      setStep(0);
      setDisplayText("");
      setCharIndex(0);
      setIsFadingOut(false);
      return;
    }

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
  }, [charIndex, isFadingOut, step, roles, isInView]);

  return (
    <div ref={ref} className="inline-flex min-h-[32px] items-center">
      {step >= roles.length ? (
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
      ) : (
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
      )}
    </div>
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
      viewport={{ once: false, margin: "-80px" }}
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
  const isInView = useInView(ref, { margin: "-10% 0px -10% 0px" });
  
  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    let startTimestamp: number | null = null;
    let frameId: number;

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

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [endValue, duration, isInView]);

  return <span ref={ref} className={className}>{count}{suffix}</span>;
}

function DynamicCounter({ value, suffix = "", prefix = "", duration = 500, className = "" }: { value: number, suffix?: string, prefix?: string, duration?: number, className?: string }) {
  const [count, setCount] = useState(0);
  const prevValueRef = useRef(0);

  useEffect(() => {
    const startValue = prevValueRef.current;
    const endValue = value;
    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(startValue + (endValue - startValue) * easeProgress);
      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      } else {
        setCount(endValue);
        prevValueRef.current = endValue;
      }
    };
    frameId = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(frameId);
  }, [value, duration]);

  const displayCount = Number.isInteger(value) ? Math.floor(count) : count.toFixed(1);
  return <span className={className}>{prefix}{displayCount}{suffix}</span>;
}

function ScrambleText({ text, duration = 300, className = "" }: { text: string, duration?: number, className?: string }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let step = 0;
    const maxSteps = 3;
    const chars = "!<>-_\\/[]{}—=+*^?#_";
    const intervalTime = duration / maxSteps;
    
    setDisplayText(text.split('').map(c => c === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]).join(''));
    
    const interval = setInterval(() => {
      if (step >= maxSteps - 1) {
        clearInterval(interval);
        setDisplayText(text);
        return;
      }
      const scrambled = text.split('').map(char => {
        if (char === ' ') return ' ';
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      setDisplayText(scrambled);
      step++;
    }, intervalTime);

    return () => clearInterval(interval);
  }, [text, duration]);

  return <span className={className}>{displayText}</span>;
}

const BloggerInsightsStream = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blogger");
        const data = await res.json();
        const rawPosts = data.feed.entry || [];
        
        const formattedPosts = rawPosts.slice(0, 3).map((entry: any) => {
          const title = entry.title.$t;
          const publishedDate = new Date(entry.published.$t);
          const date = publishedDate.toLocaleDateString("en-US", { month: "short", year: "numeric" }).toUpperCase();
          
          let contentSnippet = entry.content ? entry.content.$t : (entry.summary ? entry.summary.$t : "");
          // Strip HTML cleanly
          const tmp = document.createElement("DIV");
          tmp.innerHTML = contentSnippet;
          contentSnippet = tmp.textContent || tmp.innerText || "";
          
          let link = "https://marketingonmyway.blogspot.com/";
          const alternateLink = entry.link?.find((l: any) => l.rel === "alternate");
          if (alternateLink) link = alternateLink.href;

          const tags = entry.category 
            ? entry.category.map((c: any) => c.term).slice(0, 3) 
            : ["SEO", "Marketing", "Tech Stacks"];

          return {
            title,
            date,
            summary: contentSnippet,
            link,
            tags
          };
        });

        setPosts(formattedPosts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Blogger feed:", err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section id="blogger" className="py-24 px-6 lg:px-16 relative bg-[#0B0F19] border-t border-[rgba(243,244,246,0.05)]">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <span className="font-display text-xs uppercase tracking-[0.2em] text-[#9CA3AF] font-semibold mb-6 block">04. INSIGHTS STREAM</span>
          <h3 className="font-display text-4xl lg:text-5xl font-black text-[#F3F4F6] tracking-tight block mb-2">Blogger Insights.</h3>
          <span className="font-sans text-lg text-[#9CA3AF] leading-relaxed block max-w-2xl">Real-time updates on search architecture, marketing frameworks, and AI content optimization streaming directly from marketingonmyway.blogspot.com.</span>
        </div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="w-full grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {[0, 1, 2].map((idx) => (
                  <div key={idx} className="p-8 border border-[rgba(243,244,246,0.05)] bg-[rgba(243,244,246,0.01)] backdrop-blur-md rounded-2xl flex flex-col justify-between min-h-[350px]">
                    <div className="space-y-4">
                      <div className="h-3 w-20 bg-[rgba(243,244,246,0.05)] rounded animate-pulse"></div>
                      <div className="h-8 w-full bg-[rgba(243,244,246,0.05)] rounded animate-pulse"></div>
                      <div className="h-4 w-full bg-[rgba(243,244,246,0.02)] rounded animate-pulse mt-4"></div>
                      <div className="h-4 w-4/5 bg-[rgba(243,244,246,0.02)] rounded animate-pulse"></div>
                    </div>
                    <div className="mt-8 flex gap-2">
                      <div className="h-6 w-16 bg-[rgba(243,244,246,0.05)] rounded-full animate-pulse"></div>
                      <div className="h-6 w-16 bg-[rgba(243,244,246,0.05)] rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="posts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="w-full grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {posts.map((post, idx) => (
                  <motion.a
                    key={idx}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative bg-[rgba(243,244,246,0.01)] backdrop-blur-md border border-[rgba(243,244,246,0.08)] rounded-2xl hover:border-[#2563EB]/40 p-8 transition-all duration-500 flex flex-col justify-between cursor-pointer transform-gpu will-change-transform overflow-hidden min-h-[350px] hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.15)]"
                  >
                    {/* Hover Background Tint Animation */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#2563EB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    
                    <div className="z-10 relative">
                      <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#2563EB] mb-4">
                        {post.date}
                      </div>
                      <h4 className="text-2xl font-bold text-[#F3F4F6] group-hover:text-[#2563EB] transition-colors duration-300 mb-4 font-display leading-tight">
                        {post.title}
                      </h4>
                      <p className="text-sm text-[#9CA3AF] leading-relaxed line-clamp-3">
                        {post.summary}
                      </p>
                    </div>
                    
                    <div className="mt-8 flex flex-wrap gap-2 z-10 relative">
                      {post.tags.map((tag: string, i: number) => (
                        <span key={i} className="text-[10px] px-3 py-1.5 bg-[rgba(37,99,235,0.05)] text-[#2563EB] rounded-full border border-[rgba(37,99,235,0.15)] whitespace-nowrap">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Arrow Icon top right on hover */}
                    <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transform -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-[#2563EB]">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default function EyeComfortVintagePortfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [activeWorkTab, setActiveWorkTab] = useState("Performance Marketing");
  const [activeSector, setActiveSector] = useState<"seo" | "paid_ads" | "development">("seo");
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
              With <span className="text-[#2563EB] font-bold">15+</span> SEO projects, <span className="text-[#2563EB] font-bold">67%</span> organic traffic growth, <span className="text-[#2563EB] font-bold">50+</span> keyword rankings, and <span className="text-[#2563EB] font-bold">₹1L+</span> monthly ad spend managed across Meta &amp; Google Ads, I blend SEO, Performance Marketing, and Web Development to create digital experiences that drive measurable business results.
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
              01. MY STORY
            </span>
            <h3 className="font-display text-4xl lg:text-5xl font-black text-[#F3F4F6] tracking-tight leading-[1.15]">
              From Curiosity to Career.
            </h3>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            
            {/* Left Column (The Impact Statement & Metrics Matrix) - 40% */}
            <div className="w-full lg:w-[40%] flex flex-col">
              <EditorialReveal delay={0.1}>
                <p className="font-display text-2xl lg:text-3xl font-bold text-[#F3F4F6] leading-tight">
                  Where Passion Met Performance.
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
              
              {/* Story Block */}
              <EditorialReveal delay={0.2} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline gap-x-4 mb-2">
                  <h4 className="font-display text-xl font-bold text-[#F3F4F6]">The Beginning & Evolution:</h4>
                </div>
                <p className="font-sans text-[#9CA3AF] leading-relaxed">
                  My journey in digital marketing began at Crux Creations as an intern, where I transformed my basic understanding of marketing into practical expertise. Through hands-on experience, I learned the fundamentals of SEO, content optimization, search intent, website performance, and digital growth strategies. As my skills and confidence grew, I transitioned into a full-time role, expanding my focus beyond SEO into performance marketing. Today, as an SEO Analyst and Performance Marketer, I combine organic search, paid advertising, analytics, and web optimization to help businesses increase visibility, drive qualified leads, and achieve measurable growth.
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
          MODULE 4: WORKS MODULE (Interactive Graph Dashboard)
          ------------------------------------------------------------- */}
      <section id="works" className="py-24 px-6 lg:px-16 relative border-t border-[var(--border-vintage)] bg-[#0B0F19]">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-20">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#9CA3AF] font-semibold mb-6 block">Showcase</span>
            <h3 className="font-display text-4xl lg:text-5xl font-black text-[#F3F4F6] tracking-tight block mb-2">The Work Behind the Numbers</h3>
            <span className="font-sans text-lg text-[#9CA3AF]">The areas where I spend most of my time building, optimizing, and improving.</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Interactive Selector */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {[
                {
                  id: "seo",
                  project_name: "Search Engine Optimization",
                  category: "SEO Growth",
                  summary: "Building strong technical foundations that help websites rank better, grow visibility, and attract qualified traffic.",
                  tech_tags: ["Search Console", "GA4", "Semrush"]
                },
                {
                  id: "paid_ads",
                  project_name: "Performance Ad Systems",
                  category: "Meta & Google Ads",
                  summary: "High-ROI direct response campaigns utilizing Smart Bidding protocols and scale mechanics.",
                  tech_tags: ["Meta Manager", "PMax", "Smart Bidding"]
                },
                {
                  id: "development",
                  project_name: "Engineered Web Platforms",
                  category: "Next.js / Frontend",
                  summary: "Blindingly fast single-page apps optimized for absolute pixel-perfection and high conversion hooks.",
                  tech_tags: ["Next.js", "TypeScript", "Tailwind CSS"]
                }
              ].map((card) => {
                const isActive = activeSector === card.id;
                return (
                  <div
                    key={card.id}
                    onClick={() => setActiveSector(card.id as any)}
                    className="relative p-6 rounded-xl cursor-pointer will-change-transform will-change-opacity overflow-hidden"
                    style={{
                      transition: "opacity 0.25s ease, border-color 0.25s ease, background-color 0.25s ease",
                      opacity: isActive ? 1 : 0.4,
                      backgroundColor: isActive ? "rgba(55, 138, 221, 0.1)" : "transparent",
                      borderColor: isActive ? "rgba(55, 138, 221, 0.3)" : "transparent",
                      borderWidth: 1,
                      borderStyle: "solid"
                    }}
                  >
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#378ADD] shadow-[0_0_8px_#378ADD] origin-top"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          exit={{ scaleY: 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        />
                      )}
                    </AnimatePresence>
                    <div className="flex flex-col gap-2 relative z-10 pl-2">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#378ADD] font-bold">
                        {card.category}
                      </span>
                      <h4 
                        className="font-display text-xl font-bold"
                        style={{
                          transition: "color 0.25s ease",
                          color: isActive ? "#F3F4F6" : "#9CA3AF"
                        }}
                      >
                        {card.project_name}
                      </h4>
                      <p className="font-sans text-sm text-[#9CA3AF] leading-relaxed mt-1">
                        {card.summary}
                      </p>
                      <div className="flex flex-row flex-wrap gap-2 mt-3">
                        {card.tech_tags.map((tag) => (
                          <span key={tag} className="font-mono text-[10px] uppercase tracking-wider text-[#9CA3AF] bg-[rgba(243,244,246,0.05)] px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Data Visualization */}
            <div className="lg:col-span-7 lg:sticky lg:top-32">
              <div className="bg-transparent border border-[rgba(243,244,246,0.05)] backdrop-blur-md rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between will-change-transform transform-gpu shadow-2xl min-h-[600px]">
                
                {/* Mode Switcher logic */}
                <AnimatePresence>
                  {activeSector !== "development" ? (
                      <motion.div 
                        key="mode-a"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1, transition: { delay: 0.18, duration: 0.22, ease: [0.4, 0, 0.2, 1] } }}
                        exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] } }}
                        className="flex flex-col h-full w-full absolute inset-0 p-8 pb-[130px]"
                      >
                      {/* Header MODE A */}
                      <div className="flex justify-between items-center mb-6 relative z-10">
                        <AnimatePresence mode="wait">
                          <motion.h5 
                            key={activeSector}
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.02, duration: 0.2, ease: "easeOut" } }}
                            exit={{ opacity: 0, y: -6, transition: { duration: 0.2, ease: "easeIn" } }}
                            className="font-display text-[#F3F4F6] text-sm font-medium tracking-wider uppercase"
                          >
                            {activeSector === "seo" ? "Growth Timeline" : "Active impact stream"}
                          </motion.h5>
                        </AnimatePresence>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-[#10B981]">LIVE</span>
                          <motion.div 
                            className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]"
                            animate={{ opacity: [1, 0.3, 1], scale: [1, 0.85, 1] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                          ></motion.div>
                        </div>
                      </div>

                      {/* Line Chart & Visualization */}
                      <div className="relative w-full flex-1 mt-2 mb-12 min-h-[220px] flex">
                        {/* Y-axis Labels for SEO */}
                        {activeSector === "seo" && (
                          <div className="w-10 flex-shrink-0 flex flex-col justify-between py-4 text-[10px] text-[rgba(156,163,175,0.6)] font-mono text-right pr-3 pointer-events-none relative z-10">
                            <span className="leading-none translate-y-[2px]">8k</span>
                            <span className="leading-none translate-y-[1px]">6k</span>
                            <span className="leading-none">4k</span>
                            <span className="leading-none -translate-y-[1px]">2k</span>
                            <span className="leading-none -translate-y-[2px]">0</span>
                          </div>
                        )}
                        
                        <div className="flex-1 relative">
                          <div className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none z-0">
                            {[1, 2, 3, 4, 5].map((line) => (
                              <div key={line} className="w-full h-[1px] border-b border-dashed border-[rgba(243,244,246,0.05)]"></div>
                            ))}
                          </div>
                          {activeSector === "seo" ? (
                            <div className="absolute inset-0 z-10">
                              <div className="absolute inset-0 py-4 flex items-end px-3" style={{ justifyContent: 'space-between' }}>
                                {[0, 1, 2, 3, 4, 5].map((i) => {
                                  const cy = [85, 70, 55, 35, 15, 5][i];
                                  const heightPct = 100 - cy;
                                  return (
                                    <motion.div
                                      key={`bar-${i}`}
                                      className="w-[8%] max-w-[40px] bg-gradient-to-t from-transparent to-[rgba(55,138,221,0.2)] border border-[#378ADD] border-b-0 rounded-t-md shadow-[0_-5px_15px_rgba(55,138,221,0.1)] relative"
                                      style={{ transformOrigin: 'bottom' }}
                                      initial={{ height: "0%" }}
                                      animate={{ height: `${heightPct}%` }}
                                      transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                                    >
                                      <div className="absolute top-0 left-0 right-0 h-1 bg-[#378ADD]/30 rounded-t-md"></div>
                                    </motion.div>
                                  );
                                })}
                              </div>
                              {/* X-axis removed as requested */}
                            </div>
                          ) : (
                            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full relative z-10 overflow-visible mt-4">
                              <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#378ADD" stopOpacity="0.2" />
                                  <stop offset="100%" stopColor="#378ADD" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                              <g>
                                <motion.path
                                  key={`fill-${activeSector}`}
                                  d="M0 100 L0 90 L20 85 L40 50 L60 55 L80 20 L100 -5 L100 100 Z"
                                  fill="url(#chartGradient)"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
                                />
                                <motion.path
                                  key={`stroke-${activeSector}`}
                                  d="M0 90 L20 85 L40 50 L60 55 L80 20 L100 -5"
                                  fill="none"
                                  stroke="#378ADD"
                                  strokeWidth="2"
                                  vectorEffect="non-scaling-stroke"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
                                />
                                {[0, 20, 40, 60, 80, 100].map((cx, i) => {
                                  const cyValues = [90, 85, 50, 55, 20, -5];
                                  return (
                                    <motion.circle
                                      key={`circle-${i}`}
                                      cx={cx}
                                      cy={cyValues[i]}
                                      r="1.5"
                                      fill="#0B0F19"
                                      stroke="#378ADD"
                                      strokeWidth="2"
                                      vectorEffect="non-scaling-stroke"
                                      initial={{ scale: 0, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                                    />
                                  );
                                })}
                              </g>
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Metrics Row A */}
                      <div className="grid grid-cols-3 gap-4 mt-auto relative z-20">
                        <div className="text-center">
                          <span className="text-[10px] uppercase tracking-widest text-[#9CA3AF] block mb-1">{activeSector === "seo" ? "SEO Projects" : "Perf Score"}</span>
                          <span className="text-2xl font-bold text-[#F3F4F6] font-display">
                            {activeSector === "seo" 
                              ? <DynamicCounter value={15} suffix="+" />
                              : <DynamicCounter value={94} suffix="/100" />}
                          </span>
                        </div>
                        <div className="text-center">
                          <span className="text-[10px] uppercase tracking-widest text-[#9CA3AF] block mb-1">{activeSector === "seo" ? "Keywords Ranked" : "FCP Time"}</span>
                          <span className="text-2xl font-bold text-[#F3F4F6] font-display">
                            {activeSector === "seo"
                              ? <DynamicCounter value={50} suffix="+" />
                              : <ScrambleText text="0.8s" />}
                          </span>
                        </div>
                        <div className="text-center">
                          <span className="text-[10px] uppercase tracking-widest text-[#9CA3AF] block mb-1">{activeSector === "seo" ? "Organic Growth" : "TTI Improvement"}</span>
                          <span className="text-2xl font-bold text-[#10B981] font-display flex items-center justify-center gap-1">
                            {activeSector === "seo"
                              ? <DynamicCounter value={67} prefix="↑ " suffix="%" />
                              : <DynamicCounter value={38} prefix="↑ " suffix="%" />}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="mode-b"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1, transition: { delay: 0.18, duration: 0.22, ease: [0.4, 0, 0.2, 1] } }}
                      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] } }}
                      className="flex flex-col h-full w-full absolute inset-0 p-8 pb-[130px]"
                    >
                      {/* Header MODE B */}
                      <div className="flex justify-between items-center mb-6 relative z-10">
                        <h5 className="font-display text-[#F3F4F6] text-sm font-medium tracking-wider uppercase">Shipped platforms</h5>
                      </div>

                      {/* Single Featured Project Card */}
                      <motion.div 
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18, duration: 0.35, ease: "easeOut" }}
                        className="bg-[#0d0d0d] border border-[rgba(243,244,246,0.1)] rounded-lg flex flex-col overflow-hidden w-full h-[300px] mt-2 mb-8 relative group hover:border-[rgba(243,244,246,0.2)] transition-colors duration-[180ms]"
                      >
                        {/* macOS Header & URL Bar */}
                        <div className="h-8 bg-[#1F2937] flex items-center px-3 gap-3 border-b border-[rgba(243,244,246,0.05)] relative z-20">
                          <div className="flex items-center gap-1.5 shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></div>
                          </div>
                          <div className="bg-[#111827] rounded text-[10px] text-[#9CA3AF] font-mono px-3 py-1 flex-1 text-center truncate shadow-inner">
                            al-fahath-bags-and-footwear-sooty.vercel.app
                          </div>
                          <div className="w-12 shrink-0"></div>
                        </div>

                        {/* Browser Body (Iframe) */}
                        <div className="flex-1 relative overflow-hidden bg-[#0a0a0a]">
                          {activeSector === "development" && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.38, duration: 0.5 }}
                              className="w-full h-full"
                            >
                              <iframe 
                                src="https://al-fahath-bags-and-footwear-sooty.vercel.app/" 
                                style={{ 
                                  width: "133%", 
                                  height: "300px", 
                                  border: "none", 
                                  pointerEvents: "none", 
                                  transform: "scale(0.75)", 
                                  transformOrigin: "top left" 
                                }} 
                                title="Al Fahath Bags & Footwears Preview"
                              />
                            </motion.div>
                          )}
                        </div>

                        {/* Bottom Info Bar */}
                        <div className="h-12 bg-[#111827] border-t border-[rgba(243,244,246,0.05)] flex items-center justify-between px-4 relative z-20">
                          <div className="flex items-center gap-3">
                            <span className="font-sans text-[14px] font-medium text-[#F3F4F6]">
                              Al Fahath Bags & Footwears
                            </span>
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#9CA3AF] bg-[rgba(243,244,246,0.05)] px-2 py-0.5 rounded hidden sm:inline-block">
                              E-commerce
                            </span>
                            <div className="gap-1.5 ml-2 hidden md:flex">
                              <span className="font-mono text-[8px] uppercase tracking-widest text-[#F3F4F6] border border-[rgba(243,244,246,0.1)] px-1.5 py-0.5 rounded">Next.js</span>
                              <span className="font-mono text-[8px] uppercase tracking-widest text-[#F3F4F6] border border-[rgba(243,244,246,0.1)] px-1.5 py-0.5 rounded">Vercel</span>
                            </div>
                          </div>
                          <a href="https://al-fahath-bags-and-footwear-sooty.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#378ADD] hover:text-[#5fa2e6] transition-colors text-xs font-mono group/link cursor-pointer pointer-events-auto">
                            VIEW LIVE
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                          </a>
                        </div>
                      </motion.div>

                      {/* Metrics Row B */}
                      <div className="grid grid-cols-3 gap-4 mt-auto relative z-20">
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.3 }} className="text-center">
                          <span className="text-[10px] uppercase tracking-widest text-[#9CA3AF] block mb-1">Lighthouse</span>
                          <span className="text-2xl font-bold text-[#10B981] font-display flex items-center justify-center gap-1">
                            ↑ <DynamicCounter value={97} />/100
                          </span>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26, duration: 0.3 }} className="text-center">
                          <span className="text-[10px] uppercase tracking-widest text-[#9CA3AF] block mb-1">Avg LCP</span>
                          <span className="text-2xl font-bold text-[#10B981] font-display flex items-center justify-center gap-1">
                            ↓ <ScrambleText text="0.6s" />
                          </span>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34, duration: 0.3 }} className="text-center">
                          <span className="text-[10px] uppercase tracking-widest text-[#9CA3AF] block mb-1">TTI Gain</span>
                          <span className="text-2xl font-bold text-[#10B981] font-display flex items-center justify-center gap-1">
                            ↑ <DynamicCounter value={42} suffix="%" />
                          </span>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Spacer to push footer down since modes are absolute positioned */}
                <div className="flex-1 opacity-0 pointer-events-none"></div>

                {/* Panel Footer (Both Modes) */}
                <div className="mt-8 pt-4 border-t border-[rgba(243,244,246,0.1)] flex items-start gap-3 relative z-20">
                  <div className="mt-0.5 text-[#9CA3AF]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={activeSector}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.02, duration: 0.2, ease: "easeOut" } }}
                      exit={{ opacity: 0, y: -6, transition: { duration: 0.2, ease: "easeIn" } }}
                      className="text-sm text-[#9CA3AF] leading-snug w-full"
                    >
                      <strong className="text-[#F3F4F6] font-medium">
                        {activeSector === "seo" 
                          ? "Organic Growth Engine" 
                          : activeSector === "paid_ads" 
                          ? "Performance Ad Systems" 
                          : "Al Fahath Bags & Footwears"}
                      </strong> 
                      {" — "}
                      {activeSector === "seo"
                        ? "Increased organic traffic by 67% through technical SEO optimization, indexing improvements, and strategic keyword expansion across multiple projects."
                        : activeSector === "paid_ads"
                        ? "Deployed high-density signal tracking arrays to train Smart Bidding models, slashing CPA while scaling conversion volume."
                        : "built a full e-commerce storefront with Next.js, optimised for 97/100 Lighthouse score and deployed on Vercel's edge network for sub-second load times."}
                    </motion.p>
                  </AnimatePresence>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>



      {/* -------------------------------------------------------------
          MODULE 4: ROADMAP INDEX (Zigzag Pipeline)
          ------------------------------------------------------------- */}
      <section id="education" className="py-24 px-6 lg:px-16 relative bg-[#0B0F19] overflow-hidden">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-24">
            <span className="font-display text-xs uppercase tracking-[0.2em] text-[#9CA3AF] font-semibold mb-6 block">04. ROADMAP INDEX</span>
            <h3 className="font-display text-4xl lg:text-5xl font-black text-[#F3F4F6] tracking-tight block mb-2">Educational Roadmap.</h3>
            <span className="font-sans text-lg text-[#9CA3AF] leading-relaxed block max-w-2xl">Milestones of my structural academic foundation.</span>
          </div>

          <div className="relative max-w-4xl mx-auto py-12">
            {/* SVG Serpentine Spline Pipeline */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-24 -translate-x-1/2 overflow-visible pointer-events-none z-0 hidden lg:block">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                <motion.path 
                  d="M50 0 C 120 20, 120 30, 50 50 C -20 70, -20 80, 50 100"
                  fill="none"
                  stroke="rgba(243, 244, 246, 0.03)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <motion.path 
                  d="M50 0 C 120 20, 120 30, 50 50 C -20 70, -20 80, 50 100"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  className="drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ ease: "easeInOut", stiffness: 80, damping: 15, duration: 1.5 }}
                />
              </svg>
            </div>

            {/* Mobile straight line fallback */}
            <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-[rgba(243,244,246,0.03)] -translate-x-1/2 lg:hidden"></div>
            <motion.div 
              className="absolute left-8 top-0 w-[2px] bg-[#2563EB] -translate-x-1/2 origin-top lg:hidden"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            ></motion.div>

            <div className="flex flex-col gap-12 relative z-10">
              
              {/* Step 1 */}
              <div className="relative flex flex-col lg:flex-row items-start lg:items-center w-full group">
                <div className="hidden lg:block lg:w-1/2 pr-12 text-right">
                  <motion.div
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.4 }}
                    className="inline-block p-6 rounded-xl bg-transparent border border-[rgba(243,244,246,0.05)] backdrop-blur-md text-left w-full max-w-md ml-auto"
                  >
                    <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase mb-2 block">12th Standard</span>
                    <h5 className="font-display text-lg font-bold text-[#F3F4F6]">Higher Secondary Schooling</h5>
                    <p className="font-sans text-sm text-[#9CA3AF] mt-2">Core Academic Foundations</p>
                  </motion.div>
                </div>
                <div className="absolute left-8 lg:left-1/2 w-4 h-4 rounded-full bg-[#0B0F19] border-2 border-[rgba(243,244,246,0.2)] transform-gpu transition-all duration-300 hover:scale-125 hover:bg-[#2563EB] hover:border-4 hover:border-[#0B0F19] hover:shadow-[0_0_20px_#2563EB] hover:ring-4 hover:ring-[rgba(37,99,235,0.15)] cursor-pointer -translate-x-1/2 mt-6 lg:mt-0 z-20"></div>
                <div className="pl-16 lg:hidden w-full">
                  <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.4 }}
                    className="p-6 rounded-xl bg-transparent border border-[rgba(243,244,246,0.05)] backdrop-blur-md w-full"
                  >
                    <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase mb-2 block">12th Standard</span>
                    <h5 className="font-display text-lg font-bold text-[#F3F4F6]">Higher Secondary Schooling</h5>
                    <p className="font-sans text-sm text-[#9CA3AF] mt-2">Core Academic Foundations</p>
                  </motion.div>
                </div>
                <div className="hidden lg:block lg:w-1/2 pl-12"></div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col lg:flex-row items-start lg:items-center w-full group">
                <div className="hidden lg:block lg:w-1/2 pr-12"></div>
                <div className="absolute left-8 lg:left-1/2 w-4 h-4 rounded-full bg-[#0B0F19] border-2 border-[rgba(243,244,246,0.2)] transform-gpu transition-all duration-300 hover:scale-125 hover:bg-[#2563EB] hover:border-4 hover:border-[#0B0F19] hover:shadow-[0_0_20px_#2563EB] hover:ring-4 hover:ring-[rgba(37,99,235,0.15)] cursor-pointer -translate-x-1/2 mt-6 lg:mt-0 z-20"></div>
                <div className="pl-16 lg:pl-12 w-full lg:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.4 }}
                    className="p-6 rounded-xl bg-transparent border border-[rgba(243,244,246,0.05)] backdrop-blur-md w-full max-w-md"
                  >
                    <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase mb-2 block">Undergraduate (UG)</span>
                    <h5 className="font-display text-lg font-bold text-[#F3F4F6]">University Degree Foundation</h5>
                    <p className="font-sans text-sm text-[#9CA3AF] mt-2">Computer Applications & Core Computing Principles</p>
                  </motion.div>
                </div>
              </div>

              {/* Step 3 (Active) */}
              <div className="relative flex flex-col lg:flex-row items-start lg:items-center w-full group">
                <div className="hidden lg:block lg:w-1/2 pr-12 text-right">
                  <motion.div
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.4 }}
                    className="inline-block p-6 rounded-xl bg-transparent border border-[rgba(37,99,235,0.2)] backdrop-blur-md text-left w-full max-w-md ml-auto relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[#2563EB] opacity-[0.03]"></div>
                    <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase mb-2 block">Postgraduate (PG) - Current Active</span>
                    <h5 className="font-display text-lg font-bold text-[#F3F4F6] mb-1">Master of Computer Applications (MCA)</h5>
                    <span className="font-sans text-sm text-[#F3F4F6] block mb-2">MEASI Institute of Information Technology</span>
                    <p className="font-sans text-sm text-[#9CA3AF]">Advanced Software Systems Architecture & Placement Network Track</p>
                  </motion.div>
                </div>
                <motion.div 
                  className="absolute left-8 lg:left-1/2 w-5 h-5 rounded-full bg-[#2563EB] border-4 border-[#0B0F19] shadow-[0_0_15px_#2563EB] transform-gpu transition-all duration-300 hover:scale-125 hover:ring-4 hover:ring-[rgba(37,99,235,0.15)] cursor-pointer -translate-x-1/2 mt-6 lg:mt-0 z-20"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
                <div className="pl-16 lg:hidden w-full">
                  <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.4 }}
                    className="p-6 rounded-xl bg-transparent border border-[rgba(37,99,235,0.2)] backdrop-blur-md w-full relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[#2563EB] opacity-[0.03]"></div>
                    <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase mb-2 block">Postgraduate (PG) - Current Active</span>
                    <h5 className="font-display text-lg font-bold text-[#F3F4F6] mb-1">Master of Computer Applications (MCA)</h5>
                    <span className="font-sans text-sm text-[#F3F4F6] block mb-2">MEASI Institute of Information Technology</span>
                    <p className="font-sans text-sm text-[#9CA3AF]">Advanced Software Systems Architecture & Placement Network Track</p>
                  </motion.div>
                </div>
                <div className="hidden lg:block lg:w-1/2 pl-12"></div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          MODULE 5: BLOGGER INSIGHTS (Magazine Editorial Layout)
          ------------------------------------------------------------- */}
      {/* -------------------------------------------------------------
          MODULE 5: BLOGGER INSIGHTS (Magazine Editorial Layout - Dynamic)
          ------------------------------------------------------------- */}
      <BloggerInsightsStream />

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
              Fahath S. &copy; 2026
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
