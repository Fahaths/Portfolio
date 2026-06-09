"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const clusters = {
  seo: {
    parent: { name: "SEO Analyst", color: "#81B29A" },
    children: [
      { name: "SEO", x: 0, y: -190 },
      { name: "Analytics", x: 181, y: -59 },
      { name: "GTM", x: 112, y: 154 },
      { name: "GSC", x: -112, y: 154 },
      { name: "Technical SEO", x: -181, y: -59 }
    ]
  },
  pm: {
    parent: { name: "Performance Marketing", color: "#E07A5F" },
    children: [
      { name: "Meta Ads", x: 0, y: -190 },
      { name: "Google Ads", x: 181, y: -59 },
      { name: "LinkedIn Ads", x: 112, y: 154 },
      { name: "JioHotstar Ads", x: -112, y: 154 },
      { name: "Conversion Tracking", x: -181, y: -59 }
    ]
  },
  ai: {
    parent: { name: "AI Native Developer", color: "#818CF8" },
    children: [
      { name: "Web Development", x: 0, y: -190 },
      { name: "React", x: 165, y: -95 },
      { name: "Next.js", x: 165, y: 95 },
      { name: "AI Native Development", x: 0, y: 190 },
      { name: "AI Workflows", x: -165, y: 95 },
      { name: "Automations", x: -165, y: -95 }
    ]
  }
};

const getCurvePath = (x1, y1, x2, y2, curveOffset = 35) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);

  if (len === 0) return `M ${x1} ${y1} L ${x2} ${y2}`;

  const nx = -dy / len;
  const ny = dx / len;

  const cx = midX + nx * curveOffset;
  const cy = midY + ny * curveOffset;

  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
};

export default function SkillsUniverse() {
  const wrapperRef = useRef(null);
  const activeClusterRef = useRef(null);
  const timeoutsRef = useRef({});
  const animationsRef = useRef({});

  useEffect(() => {
    // Infinite continuous floating effect for ALL bubbles (applied to the inner content)
    const floaters = gsap.utils.toArray(".bubble-inner-float");
    floaters.forEach(el => {
      gsap.to(el, {
        y: `+=${Math.random() * 20 - 10}`,
        x: `+=${Math.random() * 10 - 5}`,
        duration: 4 + Math.random() * 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
    });

    // Pulse sequence management functions
    const startClusterPulses = (clusterKey) => {
      stopClusterPulses(clusterKey);
      activeClusterRef.current = clusterKey;

      const sequence = {
        seo: [0, 1, 2, 3, 4],
        pm: [0, 1, 2, 3, 4],
        ai: [1, 2, 0, 4, 5, 3] // React -> Next.js -> Web Development -> AI Workflows -> Automations -> AI Native Development
      }[clusterKey];

      let step = 0;

      const nextPulse = () => {
        if (activeClusterRef.current !== clusterKey) return;

        const childIndex = sequence[step % sequence.length];
        step++;

        triggerPulse(clusterKey, childIndex, () => {
          const delay = 1000 + Math.random() * 1500; // 1s to 2.5s randomized delay between pulses
          timeoutsRef.current[clusterKey] = setTimeout(nextPulse, delay);
        });
      };

      // Start first pulse shortly after reveal
      timeoutsRef.current[clusterKey] = setTimeout(nextPulse, 500);
    };

    const stopClusterPulses = (clusterKey) => {
      // Clear Timeout
      if (timeoutsRef.current[clusterKey]) {
        clearTimeout(timeoutsRef.current[clusterKey]);
        delete timeoutsRef.current[clusterKey];
      }

      // Kill GSAP animations
      if (animationsRef.current[clusterKey]) {
        animationsRef.current[clusterKey].forEach(anim => {
          if (anim) anim.kill();
        });
        delete animationsRef.current[clusterKey];
      }

      // Hide all pulse circles
      const cluster = clusters[clusterKey];
      if (cluster) {
        cluster.children.forEach((_, i) => {
          const pulseCircle = document.getElementById(`pulse-${clusterKey}-${i}`);
          if (pulseCircle) {
            gsap.set(pulseCircle, { opacity: 0 });
          }
        });
      }
    };

    const triggerPulse = (clusterKey, childIndex, onCompleteCallback) => {
      const cluster = clusters[clusterKey];
      const child = cluster.children[childIndex];

      const x1 = 300, y1 = 300;
      const x2 = 300 + child.x;
      const y2 = 300 + child.y;

      // Bezier curve calculations
      const curveOffset = 35;
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.sqrt(dx * dx + dy * dy);

      let cx = midX;
      let cy = midY;
      if (len > 0) {
        const nx = -dy / len;
        const ny = dx / len;
        cx = midX + nx * curveOffset;
        cy = midY + ny * curveOffset;
      }

      // DOM elements references
      const pulseCircle = document.getElementById(`pulse-${clusterKey}-${childIndex}`);
      const childBubble = document.getElementById(`bubble-inner-${clusterKey}-${childIndex}`);
      const parentBubble = document.getElementById(`parent-inner-${clusterKey}`);

      if (!pulseCircle) {
        onCompleteCallback();
        return;
      }

      const glowColors = {
        seo: "#A3E635", // Green Glow
        pm: "#FF7043",  // Orange Glow
        ai: "#6366F1"   // Indigo Glow
      };
      const glowColor = glowColors[clusterKey];

      // Travel duration: 1.5s - 2.5s
      const duration = 1.5 + Math.random() * 1.0;

      // Parent emit reaction
      if (parentBubble) {
        gsap.timeline()
          .to(parentBubble, {
            scale: 1.02,
            boxShadow: `0 0 30px ${glowColor}`,
            borderColor: glowColor,
            duration: 0.3
          })
          .to(parentBubble, {
            scale: 1,
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            borderColor: cluster.parent.color,
            duration: 0.5
          });
      }

      // Pulse traveling animation
      const pulseObj = { t: 0 };
      gsap.set(pulseCircle, { opacity: 1, cx: x1, cy: y1 });

      const anim = gsap.to(pulseObj, {
        t: 1,
        duration: duration,
        ease: "power1.inOut",
        onUpdate: () => {
          const t = pulseObj.t;
          const px = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2;
          const py = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;
          pulseCircle.setAttribute("cx", px);
          pulseCircle.setAttribute("cy", py);
        },
        onComplete: () => {
          gsap.set(pulseCircle, { opacity: 0 });

          // Child node react upon arrival
          if (childBubble) {
            gsap.timeline()
              .to(childBubble, {
                scale: 1.03,
                boxShadow: `0 0 25px ${glowColor}`,
                borderColor: glowColor,
                duration: 0.3
              })
              .to(childBubble, {
                scale: 1,
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                borderColor: cluster.parent.color,
                duration: 0.3
              });
          }

          onCompleteCallback();
        }
      });

      if (!animationsRef.current[clusterKey]) {
        animationsRef.current[clusterKey] = [];
      }
      animationsRef.current[clusterKey].push(anim);
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=12000", // Extremely long scroll depth for the sequence
        pin: true,
        scrub: 1,
      }
    });

    // Initial States
    gsap.set(".cluster-seo", { x: "-100vw", rotation: 0 });
    gsap.set(".cluster-pm", { x: "100vw", rotation: 0 });
    gsap.set(".cluster-ai", { x: "-100vw", rotation: 0 });
    gsap.set(".child-bubble", { scale: 0 });
    gsap.set(".connection-line", { strokeDashoffset: 1000 });
    gsap.set(".parent-bubble", { scale: 1 });
    gsap.set(".bg-grid", { opacity: 0 });

    // 0. Enter Pinned Section
    tl.to(".bg-grid", { opacity: 1, duration: 1 });

    // ==========================================
    // CHAPTER 1: SEO ANALYST (Enters Left)
    // ==========================================
    tl.to(".cluster-seo", { x: "0vw", duration: 3, ease: "power3.out" })
      .to(".parent-seo", { scale: 1.15, duration: 0.5 })
      .to(".parent-seo", { scale: 1, duration: 0.5, ease: "bounce.out" })
      .to(".line-seo", { strokeDashoffset: 0, duration: 2, stagger: 0.3 }, "+=0.5")
      .to(".child-seo", { scale: 1, duration: 1.5, stagger: 0.3, ease: "back.out(1.7)" }, "<0.5")
      .call(() => startClusterPulses("seo"))
      // Rotate the cluster wheel
      .to(".cluster-seo", { rotation: 10, duration: 8, ease: "none" }, "-=4")
      // Transition SEO OUT
      .call(() => stopClusterPulses("seo"))
      .to(".line-seo", { strokeDashoffset: 1000, duration: 1.5 }, "+=2")
      .to(".child-seo", { scale: 0, duration: 1.5, ease: "power2.in" }, "<")
      .to(".parent-seo", { scale: 0.8, duration: 1 }, "<")
      .to(".cluster-seo", { x: "-100vw", duration: 3, ease: "power3.in" }, "+=0.5");

    // ==========================================
    // CHAPTER 2: PERFORMANCE MARKETING (Enters Right)
    // ==========================================
    tl.to(".cluster-pm", { x: "0vw", duration: 3, ease: "power3.out" })
      .to(".parent-pm", { scale: 1.15, duration: 0.5 })
      .to(".parent-pm", { scale: 1, duration: 0.5, ease: "bounce.out" })
      .to(".line-pm", { strokeDashoffset: 0, duration: 2, stagger: 0.3 }, "+=0.5")
      .to(".child-pm", { scale: 1, duration: 1.5, stagger: 0.3, ease: "back.out(1.7)" }, "<0.5")
      .call(() => startClusterPulses("pm"))
      // Rotate the cluster wheel
      .to(".cluster-pm", { rotation: -10, duration: 8, ease: "none" }, "-=4")
      // Transition PM OUT
      .call(() => stopClusterPulses("pm"))
      .to(".line-pm", { strokeDashoffset: 1000, duration: 1.5 }, "+=2")
      .to(".child-pm", { scale: 0, duration: 1.5, ease: "power2.in" }, "<")
      .to(".parent-pm", { scale: 0.8, duration: 1 }, "<")
      .to(".cluster-pm", { x: "100vw", duration: 3, ease: "power3.in" }, "+=0.5");

    // ==========================================
    // CHAPTER 3: AI NATIVE DEVELOPER (Enters Left)
    // ==========================================
    tl.to(".cluster-ai", { x: "0vw", duration: 3, ease: "power3.out" })
      .to(".parent-ai", { scale: 1.15, duration: 0.5 })
      .to(".parent-ai", { scale: 1, duration: 0.5, ease: "bounce.out" })
      .to(".line-ai", { strokeDashoffset: 0, duration: 2, stagger: 0.3 }, "+=0.5")
      .to(".child-ai", { scale: 1, duration: 1.5, stagger: 0.3, ease: "back.out(1.7)" }, "<0.5")
      .call(() => startClusterPulses("ai"))
      // Rotate the cluster wheel
      .to(".cluster-ai", { rotation: 10, duration: 8, ease: "none" }, "-=4");

    // ==========================================
    // THE GRAND EXIT (Merging)
    // ==========================================
    // AI children retract into AI parent
    tl.call(() => stopClusterPulses("ai"))
      .to(".line-ai", { strokeDashoffset: 1000, duration: 1.5 }, "+=2")
      .to(".child-ai", { scale: 0, duration: 1.5, ease: "power2.in" }, "<");

    // Reset rotations of previous clusters secretly off-screen so they fly in straight
    tl.set(".cluster-seo", { rotation: 0 }, "<");
    tl.set(".cluster-pm", { rotation: 0 }, "<");

    // Bring SEO and PM parents back into the center (to overlap with AI parent)
    // AI is currently at x:0vw. SEO comes from -100vw to 0. PM comes from 100vw to 0.
    tl.to([".cluster-seo", ".cluster-pm"], { x: "0vw", duration: 3, ease: "power3.inOut" })
      .to([".parent-seo", ".parent-pm", ".parent-ai"], { scale: 1, duration: 1 }, "<");

    // The 3 parents merge into one final pulse
    tl.to([".parent-seo", ".parent-pm", ".parent-ai"], { scale: 1.5, duration: 1, ease: "power2.out" })
      .to([".parent-seo", ".parent-pm", ".parent-ai"], { scale: 0, opacity: 0, duration: 1, ease: "power2.in" })
      .to(".bg-grid", { opacity: 0, duration: 1 }, "<");

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      Object.keys(clusters).forEach(key => stopClusterPulses(key));
    };
  }, []);

  return (
    <section ref={wrapperRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center">
      
      {/* Background Grid */}
      <div className="bg-grid absolute inset-0 opacity-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 2px, transparent 2px)', backgroundSize: '100px 100px' }} />

      <div className="absolute top-10 left-10 z-50 pointer-events-none opacity-20">
        <h2 className="font-display text-5xl font-black text-white">Knowledge Map</h2>
      </div>

      {/* Render the Clusters exactly centered */}
      {Object.entries(clusters).map(([key, cluster]) => (
        <div key={key} className={`cluster-${key} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]`}>
          
          {/* Connection Lines Container */}
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-visible">
            <defs>
              <filter id={`glow-seo`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id={`glow-pm`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id={`glow-ai`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection curved lines */}
            {cluster.children.map((child, i) => (
              <path
                key={`line-${i}`}
                className={`connection-line line-${key}`}
                d={getCurvePath(300, 300, 300 + child.x, 300 + child.y, 35)}
                stroke={cluster.parent.color}
                strokeWidth="1.5"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                strokeLinecap="round"
                fill="none"
                opacity="0.3"
              />
            ))}

            {/* Pulse traveling dots */}
            {cluster.children.map((_, i) => (
              <circle
                key={`pulse-dot-${i}`}
                id={`pulse-${key}-${i}`}
                r="4.5"
                fill={key === "seo" ? "#A3E635" : key === "pm" ? "#FF7043" : "#6366F1"}
                filter={`url(#glow-${key})`}
                opacity="0"
                pointerEvents="none"
              />
            ))}
          </svg>

          {/* Child Nodes */}
          {cluster.children.map((child, i) => (
            <div 
              key={`child-${i}`} 
              className={`child-bubble child-${key} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
              style={{ transform: `translate(${child.x}px, ${child.y}px)` }}
            >
              <div className="bubble-inner-float relative group cursor-pointer" data-cursor="VIEW">
                <div 
                  className="absolute inset-0 rounded-full border opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  style={{ borderColor: cluster.parent.color }}
                />
                <div 
                  id={`bubble-inner-${key}-${i}`}
                  className="flex items-center justify-center rounded-full bg-[#111] shadow-2xl transition-all duration-500 group-hover:scale-105"
                  style={{ width: "100px", height: "100px", border: `2px solid ${cluster.parent.color}` }}
                >
                  <span className="text-white font-sans font-bold text-center px-2 text-[0.7rem] leading-tight">
                    {child.name}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Parent Node (Centered) */}
          <div className={`parent-bubble parent-${key} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
            <div className="bubble-inner-float relative group cursor-pointer" data-cursor="VIEW">
              <div 
                className="absolute inset-0 rounded-full border opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                style={{ borderColor: cluster.parent.color }}
              />
              <div 
                id={`parent-inner-${key}`}
                className="flex items-center justify-center rounded-full bg-[#111] shadow-2xl transition-all duration-500 group-hover:scale-105"
                style={{ width: "200px", height: "200px", border: `2px solid ${cluster.parent.color}` }}
              >
                <span className="text-white font-sans font-bold text-center px-6 text-xl">
                  {cluster.parent.name}
                </span>
              </div>
            </div>
          </div>

        </div>
      ))}
    </section>
  );
}
