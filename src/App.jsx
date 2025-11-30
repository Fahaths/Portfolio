import React, { useEffect, useState } from 'react'

export default function App() {
  const [selectedCard, setSelectedCard] = useState(null)

  const handleCardClick = (title, subtitle, image = null) => {
    setSelectedCard({ title, subtitle, image })
  }

  useEffect(() => {
    const selector = '.card, .intro-right, .hero-illustration'
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
      <header className="hero">
        <h1 className="hero-title">
          Hi, I'm Fahath
        </h1>
        <p className="hero-subtitle">
          SEO Analyst & Performance Marketer
        </p>
        <p className="lead">
          SEO and performance marketer blending organic optimisation with paid traffic strategy. Strong at breaking
          down data, improving ranking momentum, and tightening ad performance. Solid mix of technical SEO,
          analytics, and creative execution wrapped in a clean, results-first workflow.
        </p>
      </header>

      <main className="container">
        <section className="content-overview">
          <div className="content-label">STUDY</div>
          <div className="content-cards" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <article className="card c3" onClick={() => handleCardClick('MCA', 'Measi Institute of Information Technology • 2023 - 2025')}>

              <div className="card-thumb">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
              </div>
              <div className="card-title">MCA<br /><small>Measi Institute of Information Technology • 2023 - 2025</small></div>
            </article>
            <article className="card c4" onClick={() => handleCardClick('B.Com (Computer Application)', 'Shanmuga Industries • 2020 - 2023')}>

              <div className="card-thumb">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              </div>
              <div className="card-title">B.Com (Computer Application)<br /><small>Shanmuga Industries Arts & Science College • 2020 - 2023</small></div>
            </article>
          </div>
        </section>

        <section className="content-overview">
          <div className="content-label">WORK</div>
          <div className="content-cards" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <article className="card c1" onClick={() => handleCardClick('SEO Analyst & Performance Marketer', 'Crux Creations • Sep 2025 - Present')}>

              <div className="card-thumb">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              </div>
              <div className="card-title">SEO Analyst & Performance Marketer<br /><small>Crux Creations • Sep 2025 - Present</small></div>
            </article>
            <article className="card c2" onClick={() => handleCardClick('SEO Analyst Intern', 'Crux Creations • Jun 2025 - Aug 2025', '/assets/internship-letter.jpg')}>

              <div className="card-thumb">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <div className="card-title">SEO Analyst Intern<br /><small>Crux Creations • Jun 2025 - Aug 2025</small></div>
            </article>
          </div>
        </section>

        <section className="content-overview">
          <div className="content-label">SKILLS</div>
          <div className="content-cards" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <article className="card c1" onClick={() => handleCardClick('SEO Analyst', 'On-Page • Off-Page • Parasite SEO')}>

              <div className="card-thumb">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <div className="card-title">SEO Analyst<br /><small>On-Page • Off-Page • Parasite SEO</small></div>
            </article>
            <article className="card c2" onClick={() => handleCardClick('Ads Performance', 'Meta Ads • Google Ads')}>

              <div className="card-thumb">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
              </div>
              <div className="card-title">Ads Performance<br /><small>Meta Ads • Google Ads</small></div>
            </article>
            <article className="card c3" onClick={() => handleCardClick('Data Analytics', 'GA4 • Conversion Tracking')}>

              <div className="card-thumb">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </div>
              <div className="card-title">Data Analytics<br /><small>GA4 • Conversion Tracking</small></div>
            </article>
          </div>
        </section>

        <section className="seo-showcase" style={{ paddingTop: '0' }}>
          <div className="case-studies">
            <article className="case-study">
              <h3>SEO & Performance Strategy</h3>
              <div className="tags">
                <span>Technical SEO</span>
                <span>Link Building</span>
                <span>Ad Optimization</span>
              </div>
              <p>Led full SEO execution including on-page optimization and off-page link building. Managed Meta and Google Ads with structured campaigns, refined targeting, and budget allocation.</p>
              <ul className="achievements">
                <li>Boosted keyword visibility and organic stability</li>
                <li>Strengthened ad efficiency using data-driven targeting</li>
                <li>Built landing pages and ad creatives using Canva</li>
              </ul>
            </article>

            <article className="case-study">
              <h3>Tools & Technologies</h3>
              <div className="tags">
                <span>Semrush</span>
                <span>Ahrefs</span>
                <span>Google Search Console</span>
              </div>
              <p>Proficient in a wide range of digital marketing and analytics tools to drive performance and measure success.</p>
              <ul className="achievements">
                <li><strong>SEO:</strong> Semrush, Ahrefs, Ubersuggest, Keyword Planner</li>
                <li><strong>Ads:</strong> Meta Ads Manager, Google Adsense</li>
                <li><strong>Design:</strong> Canva, Graphic Design</li>
              </ul>
            </article>
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
                <article key={n} className={`card ${classes}`} onClick={() => handleCardClick(titles[n - 1][0], titles[n - 1][1])}>

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
        {selectedCard && (
          <div className="modal-overlay" onClick={() => setSelectedCard(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedCard(null)}>×</button>
              <h2>{selectedCard.title}</h2>
              <p>{selectedCard.subtitle}</p>
              <div className={`modal-body ${selectedCard.image ? 'has-image' : ''}`}>
                <div className="modal-text">
                  <p>More details about this project or skill would go here. This is a placeholder for the Batman-themed modal content.</p>
                </div>
                {selectedCard.image && (
                  <div className="modal-image">
                    <img src={selectedCard.image} alt={selectedCard.title} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main >
    </>
  )
}
