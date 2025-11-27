import React, { useEffect } from 'react'

export default function App() {
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
        <section className="intro">


          <div className="intro-right">



            <div className="three-cols">
              <div className="col">
                <h3>Experience</h3>
                <ul>
                  <li><strong>SEO Analyst & Performance Marketer</strong><br />Crux Creations • Sep 2025 - Present</li>
                  <li><strong>SEO Analyst Intern</strong><br />Crux Creations • Jun 2025 - Aug 2025</li>
                </ul>
              </div>

              <div className="col">
                <h3>Education</h3>
                <ul>
                  <li><strong>MCA</strong><br />Measi Institute • 2023 - 2025</li>
                  <li><strong>B.Com (Computer App)</strong><br />Shanmuga Industries • 2020 - 2023</li>
                </ul>
              </div>

              <div className="col contact">
                <h3>Contact</h3>
                <ul>
                  <li>fahaths.official@gmail.com</li>
                  <li>linkedin.com/in/fahaths</li>
                  <li>github.com/Fahaths</li>
                  <li>9840031124</li>
                </ul>
                <h4>Tools</h4>
                <div className="soft-icons">Semrush • Ahrefs • GA4 • Canva</div>
              </div>
            </div>
          </div>
        </section>

        <section className="seo-showcase">
          <h2 className="section-title">Skills & Expertise</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-value">SEO</div>
              <div className="metric-label">Analyst</div>
              <div className="metric-period">On-Page • Off-Page • Parasite SEO</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">Ads</div>
              <div className="metric-label">Performance</div>
              <div className="metric-period">Meta Ads • Google Ads</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">Data</div>
              <div className="metric-label">Analytics</div>
              <div className="metric-period">GA4 • Conversion Tracking</div>
            </div>
          </div>

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
          <div className="content-label">FOCUS</div>
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
                <article key={n} className={`card ${classes}`}>
                  <div className="card-number">{n}</div>
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
          <p>Built with ❤️ Fahath S </p>
        </footer>
      </main>
    </>
  )
}
