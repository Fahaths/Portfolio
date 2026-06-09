"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsMenuOpen(false); // Auto-close dropdown when scrolled back to top
      }
    };
    
    // Check initial scroll state
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Career", href: "#career" },
    { name: "Knowledge", href: "#skills" },
    { name: "Results", href: "#results" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 pointer-events-none flex justify-end transition-all duration-400 ease-in-out ${
        isScrolled ? "p-4 md:p-6" : "p-0"
      }`}
    >
      <nav
        className={`pointer-events-auto flex items-center justify-between transition-all duration-400 ease-in-out border text-[var(--color-text)] ${
          isScrolled
            ? "w-[150px] h-14 px-4 bg-[var(--color-bg)] border-[var(--color-text)]/10 rounded-xl shadow-[0_4px_20px_rgba(61,64,91,0.05)]"
            : "w-full h-20 px-6 md:px-16 bg-transparent border-transparent rounded-none"
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          className="font-display font-black text-2xl uppercase tracking-tighter hover:text-[var(--color-accent)] transition-colors duration-300"
        >
          FAA
        </a>

        {/* Right Side Container */}
        <div className="relative flex items-center h-8">
          {/* Full Navigation Links (visible when not scrolled) */}
          <div
            className={`flex items-center gap-3 sm:gap-6 md:gap-8 transition-all duration-300 ${
              isScrolled
                ? "opacity-0 pointer-events-none translate-x-4 absolute right-0"
                : "opacity-70 hover:opacity-100 pointer-events-auto"
            }`}
          >
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="font-sans font-semibold text-[10px] sm:text-xs md:text-sm tracking-wide hover:text-[var(--color-accent)] transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Dropdown Toggle Button (visible when scrolled) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            className={`flex items-center justify-center cursor-pointer w-8 h-8 rounded-full border border-[var(--color-text)]/15 bg-[var(--color-bg)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] hover:scale-105 active:scale-95 transition-all duration-300 ${
              isScrolled
                ? "opacity-100 pointer-events-auto scale-100"
                : "opacity-0 pointer-events-none scale-90 absolute right-0"
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-300 ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {/* Dropdown Menu Card */}
          <div
            className={`absolute right-0 top-12 bg-[var(--color-bg)] border border-[var(--color-text)]/10 rounded-xl shadow-[0_10px_30px_rgba(61,64,91,0.08)] p-4 w-44 transition-all duration-300 origin-top-right ${
              isScrolled && isMenuOpen
                ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
                : "opacity-0 scale-95 pointer-events-none -translate-y-2"
            }`}
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-sans font-bold text-xs sm:text-sm opacity-70 hover:opacity-100 hover:text-[var(--color-accent)] transition-all duration-200 py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
