
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const location = useLocation()
    const isHome = location.pathname === '/'

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavigation = (e, sectionId, selector) => {
        e.preventDefault()
        setIsMobileMenuOpen(false) // Close menu on click

        if (isHome) {
            scrollToSection(sectionId, selector)
        } else {
            // If not on home, verify if we need to navigate to home first or handle differently
            // For now, assuming single page scroll behavior mainly on home
            window.location.href = `/${sectionId ? '#' + sectionId : ''}`
        }
    }

    const scrollToSection = (sectionId, selector) => {
        const element = document.getElementById(sectionId) || (selector ? document.querySelector(selector) : null)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
                    <img src="/logo-v2.webp" alt="Faa" className="logo-img" />
                </div>

                {/* Desktop Links */}
                <div className="nav-links">
                    <a href="#about" onClick={(e) => handleNavigation(e, 'about')}>About</a>
                    <a href="#resume" onClick={(e) => handleNavigation(e, '', '.content-overview:nth-of-type(2)')}>Resume</a>
                    <a href="#works" onClick={(e) => handleNavigation(e, '', '.content-overview:nth-of-type(3)')}>Works</a>
                </div>

                {/* Desktop CTA */}
                <button className="nav-cta desktop-only" onClick={(e) => handleNavigation(e, 'contact')}>
                    Let's Connect
                </button>

                {/* Mobile Hamburger */}
                <label className="hamburger">
                    <input type="checkbox" checked={isMobileMenuOpen} onChange={toggleMobileMenu} />
                    <svg viewBox="0 0 32 32">
                        <path
                            className="line line-top-bottom"
                            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                        ></path>
                        <path className="line" d="M7 16 27 16"></path>
                    </svg>
                </label>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
                <div className={`mobile-menu-popup ${isMobileMenuOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>

                    <a href="#about" onClick={(e) => handleNavigation(e, 'about')} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        About
                    </a>
                    <a href="#resume" onClick={(e) => handleNavigation(e, '', '.content-overview:nth-of-type(2)')} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        Resume
                    </a>
                    <a href="#works" onClick={(e) => handleNavigation(e, '', '.content-overview:nth-of-type(3)')} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                        Works
                    </a>
                    <button className="nav-cta mobile-only" onClick={(e) => handleNavigation(e, 'contact')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        Contact Me
                    </button>
                </div>
            </div>
        </>
    )
}
