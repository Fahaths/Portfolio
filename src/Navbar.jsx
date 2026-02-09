
import React, { useState, useEffect } from 'react'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const isHome = true

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavigation = (e, sectionId, selector) => {
        e.preventDefault()

        if (isHome) {
            scrollToSection(sectionId, selector)
        }
    }

    const scrollToSection = (sectionId, selector) => {
        const element = document.getElementById(sectionId) || (selector ? document.querySelector(selector) : null)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            {/* Actually, for Details page, we probably want the background to be visible always or same behavior. 
           Let's keep same behavior but maybe default to 'scrolled' style (background visible) if not on home hero?
           The user's theme is yellow/white. 'scrolled' adds blur and background.
           Let's stick to scroll behavior but maybe force it if strictly needed. 
           For now standard scroll behavior. */}
            <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
                <img src="/logo-v2.png" alt="Faa" className="logo-img" />
            </div>
            <div className="nav-links">
                <a href="#about" onClick={(e) => handleNavigation(e, 'about')}>About</a>
                <a href="#resume" onClick={(e) => handleNavigation(e, '', '.content-overview:nth-of-type(2)')}>Resume</a>
                <a href="#works" onClick={(e) => handleNavigation(e, '', '.content-overview:nth-of-type(3)')}>Works</a>
            </div>
            <button className="nav-cta" onClick={(e) => handleNavigation(e, 'contact')}>
                Contact Me
            </button>


        </nav>
    )
}
