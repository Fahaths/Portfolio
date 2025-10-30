import React, { useEffect } from 'react'

export default function App(){
  useEffect(()=>{
    const selector = '.card, .intro-right, .hero-illustration'
    const elems = Array.from(document.querySelectorAll(selector))
    elems.forEach(el=> el.classList.add('reveal'))

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('visible')
        }
      })
    },{threshold:0.1})

    elems.forEach(el=> io.observe(el))

    return ()=> io.disconnect()
  },[])

  return (
    <main className="container">
      <header className="hero">
        <h1 className="hero-title">PORTFOLIO <span className="year">'25</span></h1>
        <div className="hero-illustration">
          <img 
            src="/assets/images/Art%201.webp" 
            alt="Professional portrait in black suit and red shirt" 
            className="hero-image"
            onError={(e) => {
              console.error('Image failed to load:', e.target.src);
              e.target.style.display = 'none';
            }}
          />
        </div>
      </header>

      <section className="intro">
        <div className="intro-left">
          <div className="id-badge">
            <img src="/assets/photo-placeholder.svg" alt="Your photo" />
          </div>
        </div>

        <div className="intro-right">
          <h2>Hi, I'm <span className="accent">Shourya</span></h2>
          <p className="lead">I am an UX/UI Designer and I design because I love solving problems, questioning 'why', and making things feel right. I focus on people, habits, and tiny details that make a product worth using.</p>

          <div className="three-cols">
            <div className="col">
              <h3>Experience</h3>
              <ul>
                <li><strong>Interaction Design Intern</strong><br/>Sonae Wers • Aug 2024 - Dec 2025</li>
                <li><strong>Graphic & Social</strong><br/>We The Change • Jun 2023 - Aug 2023</li>
              </ul>
            </div>

            <div className="col">
              <h3>Experience</h3>
              <ul>
                <li><strong>Student Ambassador</strong><br/>UPES • 2023</li>
                <li><strong>Event Head</strong><br/>Kokularture • 2022</li>
              </ul>
            </div>

            <div className="col contact">
              <h3>Contact</h3>
              <ul>
                <li>behance.net/shourya</li>
                <li>linkedin.com/in/shourya</li>
                <li>shourya.email@example.com</li>
              </ul>
              <h4>Softwares</h4>
              <div className="soft-icons">PS • XD • AI • ID</div>
            </div>
          </div>
        </div>
      </section>

      <section className="seo-showcase">
        <h2 className="section-title">SEO & Digital Marketing Impact</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value">+145%</div>
            <div className="metric-label">Organic Traffic Growth</div>
            <div className="metric-period">Year-over-Year</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">Top 3</div>
            <div className="metric-label">SERP Rankings</div>
            <div className="metric-period">For 50+ Keywords</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">+85%</div>
            <div className="metric-label">Conversion Rate</div>
            <div className="metric-period">From Organic Search</div>
          </div>
        </div>
        
        <div className="case-studies">
          <article className="case-study">
            <h3>E-commerce SEO Optimization</h3>
            <div className="tags">
              <span>Technical SEO</span>
              <span>Content Strategy</span>
              <span>Link Building</span>
            </div>
            <p>Implemented comprehensive SEO strategy for an e-commerce platform, focusing on site architecture, content optimization, and backlink profile enhancement.</p>
            <ul className="achievements">
              <li>Improved page load speed by 60%</li>
              <li>Increased organic traffic by 145%</li>
              <li>Enhanced mobile experience score to 95/100</li>
            </ul>
          </article>

          <article className="case-study">
            <h3>Local Business SEO Campaign</h3>
            <div className="tags">
              <span>Local SEO</span>
              <span>GMB Optimization</span>
              <span>Citation Building</span>
            </div>
            <p>Developed and executed local SEO strategy for a chain of retail stores, focusing on location-based optimization and local citation building.</p>
            <ul className="achievements">
              <li>Ranked in top 3 for 50+ local keywords</li>
              <li>Increased local pack visibility by 200%</li>
              <li>Generated 300+ verified Google reviews</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="content-overview">
        <div className="content-label">CONTENT</div>
        <div className="content-cards">
          {[1,2,3,4,5].map((n)=>{
            const classes = ['c1','c2','c3','c4','c5'][n-1]
            const titles = [
              ['TRAVLO','Accessible Travel'],
              ['SANORA','Website Design'],
              ['FACTORY FLOW','Management System'],
              ['AGODA','Website Redesign'],
              ['BALANCIFY','Work-life Balance App']
            ]
            return (
              <article key={n} className={`card ${classes}`}>
                <div className="card-number">{n}</div>
                <div className="card-thumb">
                  <svg viewBox="0 0 100 100"><rect width="100" height="100" fill="transparent" rx="8"/></svg>
                </div>
                <div className="card-title">{titles[n-1][0]}<br/><small>{titles[n-1][1]}</small></div>
              </article>
            )
          })}
        </div>
      </section>

      <footer className="footer">
        <p>Built with ❤️ — Customize: replace text and assets in the <code>public/assets/</code> folder.</p>
      </footer>
    </main>
  )
}
