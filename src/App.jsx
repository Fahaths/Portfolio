import React, { useEffect, useState } from 'react'

export default function App() {
  const [selectedCard, setSelectedCard] = useState(null)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(curr => curr === 'dark' ? 'light' : 'dark')
  }

  const handleCardClick = (title, subtitle, description = null, image = null) => {
    setSelectedCard({ title, subtitle, description, image })
  }

  useEffect(() => {
    const selector = '.card, .intro-right, .hero-illustration, .hero-image'
    const elems = Array.from(document.querySelectorAll(selector))
    elems.forEach(el => el.classList.add('reveal'))

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })

    elems.forEach(el => io.observe(el))

    return () => io.disconnect()
  }, [])

  return (
    <>
      <nav className="navbar">
        <div className="logo">Faa</div>
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <div className="hero-subtitle-top">SEO Analyst and Performance Marketer</div>
          <h1 className="hero-title">
            Fahath S
          </h1>
          <p className="hero-description">
            SEO and performance marketer blending organic optimisation with paid traffic strategy. Strong at breaking
            down data, improving ranking momentum, and tightening ad performance.
          </p>
          <div className="hero-details">
            <div><span>Born in</span>India</div>
            <div><span>Email</span>fahaths.official@gmail.com</div>
          </div>
        </div>
        <div className="hero-image-container">
          <img
            src="https://placehold.co/600x800/25282e/FFF?text=Fahath"
            alt="Fahath S"
            className="hero-image reveal"
          />
        </div>
      </header>

      <main className="container">

        {/* --- About Me Section --- */}
        <section className="content-overview" id="about">
          <div className="content-label">ABOUT</div>
          <div className="about-container reveal">
            <h3 className="section-title">About Me</h3>
            <div className="about-text">
              <p>
                My name is Fahath S. I have been working in SEO and Performance Marketing since 2023. I like creating data-driven strategies that actually convert.
              </p>
              <p>
                I specialize in breaking down complex data into actionable insights, improving ranking momentum on Google, and tightening ad performance on Meta. My workflow blends technical SEO precision with creative ad execution.
              </p>
            </div>
            <button className="btn-primary" onClick={() => window.location.href = 'mailto:fahaths.official@gmail.com'}>
              Contact Me
            </button>
          </div>
        </section>

        {/* --- Resume Section --- */}
        <section className="content-overview">
          <div className="content-label">RESUME</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', marginTop: '60px' }}>

            {/* Education Column */}
            <div className="reveal reveal-delay-1">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>Education</h3>
              <div className="timeline">
                <div className="timeline-item" onClick={() => handleCardClick('MCA', 'Measi Institute of Information Technology • 2023 - 2025', 'First Class with Distinction (Estimated CGPA: 8.4)')}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-date">2023 - 2025</span>
                    <h4 className="timeline-title">Master of Computer Applications</h4>
                    <span className="timeline-subtitle">Measi Institute of Information Technology</span>
                  </div>
                </div>
                <div className="timeline-item" onClick={() => handleCardClick('B.Com (CA)', 'Shanmuga Industries • 2020 - 2023')}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-date">2020 - 2023</span>
                    <h4 className="timeline-title">B.Com (Computer Application)</h4>
                    <span className="timeline-subtitle">Shanmuga Industries Arts & Science College</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Column */}
            <div className="reveal reveal-delay-2">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>Experience</h3>
              <div className="timeline">
                <div className="timeline-item" onClick={() => handleCardClick('SEO Analyst & Performance Marketer', 'Crux Creations • Sep 2025 - Present')}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-date">Sep 2025 - Present</span>
                    <h4 className="timeline-title">SEO Analyst & Performance Marketer</h4>
                    <span className="timeline-subtitle">Crux Creations</span>
                  </div>
                </div>
                <div className="timeline-item" onClick={() => handleCardClick('SEO Analyst Intern', 'Crux Creations • Jun 2025 - Aug 2025', null, '/assets/internship-letter.jpg')}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-date">Jun 2025 - Aug 2025</span>
                    <h4 className="timeline-title">SEO Analyst Intern</h4>
                    <span className="timeline-subtitle">Crux Creations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section >

        <section className="content-overview">
          <div className="content-label">SERVICES</div>
          <div className="content-cards" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <article className="card c1 reveal reveal-delay-1" onClick={() => handleCardClick('SEO Analyst', 'On-Page • Off-Page • Parasite SEO')}>

              <div className="card-thumb">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <div className="card-title">SEO Optimization<br /><small>Ranking & Visibility</small></div>
            </article>
            <article className="card c2 reveal reveal-delay-2" onClick={() => handleCardClick('Ads Performance', 'Meta Ads • Google Ads')}>

              <div className="card-thumb">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
              </div>
              <div className="card-title">Ad Campaigns<br /><small>Meta & Google Ads</small></div>
            </article>
            <article className="card c3 reveal reveal-delay-3" onClick={() => handleCardClick('Data Analytics', 'GA4 • Conversion Tracking')}>

              <div className="card-thumb">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </div>
              <div className="card-title">Analytics<br /><small>Data & Insights</small></div>
            </article>
          </div>
        </section>

        <section className="content-overview">
          <div className="content-label">PORTFOLIO</div>
          <div className="portfolio-grid">
            <div className="portfolio-item reveal reveal-delay-1" onClick={() => handleCardClick('SEO Strategy', 'Organic Growth', 'Detailed SEO strategy breakdown...', 'https://placehold.co/800x600/1e293b/FFF?text=SEO+Project')}>
              <img src="https://placehold.co/600x600/1e293b/FFF?text=SEO" alt="SEO Project" />
              <div className="portfolio-overlay">
                <h4>SEO Strategy</h4>
                <span>Organic Growth</span>
              </div>
            </div>
            <div className="portfolio-item reveal reveal-delay-2" onClick={() => handleCardClick('Ad Campaign', 'Meta Ads', 'Meta Ads campaign results...', 'https://placehold.co/800x600/1e293b/FFF?text=Ad+Campaign')}>
              <img src="https://placehold.co/600x600/1e293b/FFF?text=Ads" alt="Ad Campaign" />
              <div className="portfolio-overlay">
                <h4>Ad Campaign</h4>
                <span>Meta Ads</span>
              </div>
            </div>
            <div className="portfolio-item reveal reveal-delay-3" onClick={() => handleCardClick('Analytics Dashboard', 'GA4 Setup', 'GA4 Setup and tracking...', 'https://placehold.co/800x600/1e293b/FFF?text=Analytics')}>
              <img src="https://placehold.co/600x600/1e293b/FFF?text=Analytics" alt="Analytics" />
              <div className="portfolio-overlay">
                <h4>Analytics</h4>
                <span>GA4 Setup</span>
              </div>
            </div>
            <div className="portfolio-item reveal reveal-delay-4" onClick={() => handleCardClick('Content Marketing', 'Blog Growth', 'Content marketing strategy...', 'https://placehold.co/800x600/1e293b/FFF?text=Content')}>
              <img src="https://placehold.co/600x600/1e293b/FFF?text=Content" alt="Content" />
              <div className="portfolio-overlay">
                <h4>Content Marketing</h4>
                <span>Blog Growth</span>
              </div>
            </div>
          </div>
        </section>

        <section className="content-overview">
          <div className="content-label">TOOLS</div>
          <div className="content-cards">
            {[1, 2, 3, 4, 5].map((n) => {
              const classes = ['c1', 'c2', 'c3', 'c4', 'c5'][n - 1]
              const titles = [
                ['SEO', 'Strategy & Optimization'],
                ['META ADS', 'Campaign Management'],
                ['GOOGLE ADS', 'PPC & Display'],
                ['ANALYTICS', 'GA4 & Tracking'],
                ['DESIGN', 'Canva & Creatives']
              ]
              return (
                <article key={n} className={`card ${classes} reveal reveal-delay-${n}`} onClick={() => handleCardClick(titles[n - 1][0], titles[n - 1][1])}>

                  <div className="card-thumb">
                    <svg viewBox="0 0 100 100"><rect width="100" height="100" fill="transparent" rx="8" /></svg>
                  </div>
                  <div className="card-title">{titles[n - 1][0]}<br /><small>{titles[n - 1][1]}</small></div>
                </article>
              )
            })}
          </div>
        </section>

        <footer className="footer">
          <div className="footer-icons">
            <a href="mailto:fahaths.official@gmail.com" aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </a>
            <a href="https://linkedin.com/in/fahaths" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://github.com/Fahaths" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="tel:9840031124" aria-label="Phone">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </a>
            <a href="https://www.fiverr.com/users/fahath_s/seller_dashboard" target="_blank" rel="noopener noreferrer" aria-label="Fiverr">
              <div className="fiverr-icon"></div>
            </a>
          </div>
          <p>Built with ❤️ Fahath S </p>
        </footer>
        {
          selectedCard && (
            <div className="modal-overlay" onClick={() => setSelectedCard(null)}>
              <div className={`modal-content ${selectedCard.description ? 'modal-wide' : ''}`} onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setSelectedCard(null)}>×</button>
                <h2>{selectedCard.title}</h2>
                <p>{selectedCard.subtitle}</p>
                <div className={`modal-body ${selectedCard.image ? 'has-image' : ''}`}>
                  <div className="modal-text">
                    {selectedCard.description ? (
                      <div style={{ whiteSpace: 'pre-line' }}>{selectedCard.description}</div>
                    ) : (
                      <p>More details about this project or skill would go here. This is a placeholder for the Batman-themed modal content.</p>
                    )}
                  </div>
                  {selectedCard.image && (
                    <div className="modal-image">
                      <img src={selectedCard.image} alt={selectedCard.title} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        }
      </main >
    </>
  )
}
