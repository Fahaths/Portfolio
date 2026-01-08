import React, { useEffect, useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

export default function App() {
  const [selectedCard, setSelectedCard] = useState(null)
  const form = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()

    // 1. EmailJS Configuration
    const SERVICE_ID = 'YOUR_SERVICE_ID'
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

    // 2. Google Sheets Configuration
    const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL'

    // Validate configuration
    if (SERVICE_ID === 'YOUR_SERVICE_ID' && GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL') {
      alert('Please configure EmailJS and/or Google Sheets URL in App.jsx')
      return
    }

    // Prepare data
    const formData = new FormData(form.current)
    const data = Object.fromEntries(formData.entries())

    // A. Send to Google Sheets
    if (GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_SCRIPT_URL') {
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'no-cors' // Important for Google Apps Script
      }).catch(err => console.error('Sheet Error:', err))
    }

    // B. Send via EmailJS (if configured)
    if (SERVICE_ID !== 'YOUR_SERVICE_ID') {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
        .then(
          () => {
            alert('Message Sent Successfully!')
            form.current.reset()
          },
          (error) => {
            alert('Failed to send email: ' + error.text)
          },
        )
    } else {
      // If only using Sheets and valid
      if (GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_SCRIPT_URL') {
        alert('Message Saved to Sheets!')
        form.current.reset()
      }
    }
  }

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
    const selector = '.card, .intro-right, .hero-illustration, .hero-image, .contact-container'
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

        </div>
        <div className="hero-image-container">
          <img
            src="/hero-profile.jpg"
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
                My name is Fahath S. I have been working in SEO and Performance Marketing. I like creating data-driven strategies that actually convert.
              </p>
              <p>
                I specialize in breaking down complex data into actionable insights, improving ranking momentum on Google, and tightening ad performance on Meta. My workflow blends technical SEO precision with creative ad execution.
              </p>
            </div>
            <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
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
          <div className="content-label">Works</div>
          <div className="content-cards" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
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
          </div>
        </section>



        {/* --- Contact Section --- */}
        <section className="content-overview" id="contact">
          <div className="content-label">CONTACT</div>
          <div className="contact-container reveal">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <p>
                Ready to improve your search rankings or scale your ad campaigns? Let's discuss how we can drive real growth for your business.
              </p>
              <div className="contact-item">
                <span className="label">Location</span>
                <span className="value">Chennai, India</span>
              </div>
              <div className="contact-item">
                <span className="label">Email</span>
                <a href="mailto:fahaths.official@gmail.com" className="value">fahaths.official@gmail.com</a>
              </div>
              <div className="contact-item">
                <span className="label">Phone</span>
                <a href="tel:+919840031124" className="value">+91 98400 31124</a>
              </div>
            </div>
            <form className="contact-form" ref={form} onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name="user_name" placeholder="Name" required />
              </div>
              <div className="form-group">
                <input type="email" name="user_email" placeholder="Email" required />
              </div>
              <div className="form-group">
                <input type="text" name="subject" placeholder="Subject" />
              </div>
              <div className="form-group">
                <textarea name="message" rows="5" placeholder="Message" required></textarea>
              </div>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
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
            <a href="https://fahaththewriter.blogspot.com/" target="_blank" rel="noopener noreferrer" aria-label="Blogger">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24" fill="currentColor"><path d="M446.6 222.7c-1.8-8-6.8-15.4-12.5-18.5-1.8-1-13-2.2-25-2.7-20.1-.9-22.3-1.3-28.7-5-10.1-5.9-12.8-12.3-12.9-29.5-.1-33-13.8-63.7-40.9-91.3-19.3-19.7-40.9-33-65.5-40.5-5.9-1.8-19.1-2.4-63.3-2.9-69.4-.8-84.8.6-108.4 10C45.9 59.5 14.7 96.1 3.3 142.9 1.2 151.7.7 165.8.2 246.8c-.6 101.5.1 116.4 6.4 136.5 15.6 49.6 59.9 86.3 104.4 94.3 14.8 2.7 197.3 3.3 216 .8 32.5-4.4 58-17.5 81.9-41.9 17.3-17.7 28.1-36.8 35.2-62.1 4.9-17.6 4.5-142.8 2.5-151.7zm-322.1-63.6c7.8-7.9 10-8.2 58.8-8.2 43.9 0 45.4.1 51.8 3.4 9.3 4.7 13.4 11.3 13.4 21.9 0 9.5-3.8 16.2-12.3 21.6-4.6 2.9-7.3 3.1-50.3 3.3-26.5.2-47.7-.4-50.8-1.2-16.6-4.7-22.8-28.5-10.6-40.8zm191.8 199.8l-14.9 2.4-77.5.9c-68.1.8-87.3-.4-90.9-2-7.1-3.1-13.8-11.7-14.9-19.4-1.1-7.3 2.6-17.3 8.2-22.4 7.1-6.4 10.2-6.6 97.3-6.7 89.6-.1 89.1-.1 97.6 7.8 12.1 11.3 9.5 31.2-4.9 39.4z" /></svg>
            </a>
          </div>
          <p>Built with Fahath S </p>
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
