
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

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
                    <img src="/logo-v2.png" alt="Faa" className="logo-img" />
                </div>

                {/* Desktop Links */}
                <div className="nav-links">
                    <a href="#about" onClick={(e) => handleNavigation(e, 'about')}>About</a>
                    <a href="#resume" onClick={(e) => handleNavigation(e, '', '.content-overview:nth-of-type(2)')}>Resume</a>
                    <a href="#works" onClick={(e) => handleNavigation(e, '', '.content-overview:nth-of-type(3)')}>Works</a>
                </div>

                {/* Desktop CTA */}
                <button className="nav-cta desktop-only" onClick={(e) => handleNavigation(e, 'contact')}>
                    Contact Me
                </button>

                {/* Mobile Hamburger */}
                <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-content">
                    <a href="#about" onClick={(e) => handleNavigation(e, 'about')}>About</a>
                    <a href="#resume" onClick={(e) => handleNavigation(e, '', '.content-overview:nth-of-type(2)')}>Resume</a>
                    <a href="#works" onClick={(e) => handleNavigation(e, '', '.content-overview:nth-of-type(3)')}>Works</a>
                    <button className="nav-cta mobile-only" onClick={(e) => handleNavigation(e, 'contact')}>
                        Contact Me
                    </button>
                </div>
            </div>
        </>
    )
}
