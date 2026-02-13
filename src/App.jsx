
import React, { useEffect, useState, useRef } from 'react'
import Navbar from './Navbar'
import emailjs from '@emailjs/browser'

const detailsData = {
  'measi': {
    title: 'Master of Computer Applications',
    subtitle: 'Measi Institute of Information Technology',
    link: 'https://measiit.edu.in',
    date: '2023 - 2025',
    description: `
      Completed Master of Computer Applications with First Class Distinction.
      Focused on software development, data structures, and web technologies.
      Gained practical experience through various academic projects.
    `
  },
  'shanmuga': {
    title: 'B.Com (Computer Application)',
    subtitle: 'Shanmuga Industries Arts & Science College',
    link: 'http://www.shanmugacollege.edu.in',
    date: '2020 - 2023',
    description: `
      Completed Bachelor of Commerce in Computer Applications.
      Built a strong foundation in business management and computer applications.
    `
  },
  'crux-marketer': {
    title: 'SEO Analyst & Performance Marketer',
    subtitle: 'Crux Creations',
    link: 'https://cruxcreations.com',
    date: 'Sep 2025 - Present',
    description: `
      Leading SEO strategies and performance marketing campaigns.
      Optimizing website visibility and improved search engine rankings.
      Managing ad campaigns on Meta and Google Ads to drive conversions.
    `
  },
  'crux-intern': {
    title: 'SEO Analyst Intern',
    subtitle: 'Crux Creations',
    link: 'https://cruxcreations.com',
    date: 'Jun 2025 - Aug 2025',
    description: `
      Assisted in on-page and off-page SEO activities.
      Conducted keyword research and competitor analysis.
      Learned the fundamentals of performance marketing.
    `
  }
}

export default function App() {
  const [selectedCard, setSelectedCard] = useState(null)
  const [visited, setVisited] = useState(false) // Restore if needed, or just selectedCard
  const form = useRef()

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

  const handleSubmit = (e) => {
    e.preventDefault()

    // EmailJS Configuration
    const SERVICE_ID = 'service_yyrvdgc'
    const TEMPLATE_ID = 'template_48iy5z5'
    const PUBLIC_KEY = 'XSvrzesvssLKA5CWJ'

    // Validate configuration
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      alert('Please configure EmailJS credentials in App.jsx')
      return
    }

    // Send via EmailJS
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
  }

  const handleCardClick = (title, subtitle, description = null, image = null, link = null) => {
    setSelectedCard({ title, subtitle, description, image, link })
  }

  return (
    <>
      <Navbar />

      <header className="hero">
        <div className="hero-frame-wrapper">
          <div className="hero-backdrop"></div>
          <div className="hero-frame-border">
            <img
              src="/hero-profile-v3.png"
              alt="Fahath S"
              className="hero-image reveal"
              style={{ display: 'block' }}
            />
          </div>
        </div>
        <div className="hero-content">
          <h1 className="hero-main-title">
            Performance Marketer
          </h1>
          <h1 className="hero-subtitle-role">
            & SEO
          </h1>
          <div className="hero-divider"></div>
          <div className="hero-signature">Fahath S</div>
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
            <a href="/assets/Resume.pdf" download className="btn-filled" style={{ marginLeft: '1rem' }}>
              Download CV
            </a>
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
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-date">2023 - 2025</span>
                    <h4 className="timeline-title">Master of Computer Applications</h4>
                    <span className="timeline-subtitle">Measi Institute of Information Technology</span>
                    <p className="timeline-description">{detailsData.measi.description}</p>
                    <a href={detailsData.measi.link} target="_blank" rel="noopener noreferrer" className="timeline-link">Visit Website</a>
                  </div>
                </div>
                <div className="timeline-item" onClick={() => handleCardClick(detailsData.shanmuga.title, detailsData.shanmuga.subtitle, detailsData.shanmuga.description, null, detailsData.shanmuga.link)}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-date">2020 - 2023</span>
                    <h4 className="timeline-title">B.Com (Computer Application)</h4>
                    <span className="timeline-subtitle">Shanmuga Industries Arts & Science College</span>
                    <p className="timeline-description">{detailsData.shanmuga.description}</p>
                    <a href={detailsData.shanmuga.link} target="_blank" rel="noopener noreferrer" className="timeline-link">Visit Website</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Column */}
            <div className="reveal reveal-delay-2">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>Experience</h3>
              <div className="timeline">
                <div className="timeline-item" onClick={() => handleCardClick(detailsData['crux-marketer'].title, detailsData['crux-marketer'].subtitle, detailsData['crux-marketer'].description, null, detailsData['crux-marketer'].link)}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-date">Sep 2025 - Present</span>
                    <h4 className="timeline-title">SEO Analyst & Performance Marketer</h4>
                    <span className="timeline-subtitle">Crux Creations</span>
                    <p className="timeline-description">{detailsData['crux-marketer'].description}</p>
                    <a href={detailsData['crux-marketer'].link} target="_blank" rel="noopener noreferrer" className="timeline-link">Visit Website</a>
                  </div>
                </div>
                <div className="timeline-item" onClick={() => handleCardClick(detailsData['crux-intern'].title, detailsData['crux-intern'].subtitle, detailsData['crux-intern'].description, null, detailsData['crux-intern'].link)}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-date">Jun 2025 - Aug 2025</span>
                    <h4 className="timeline-title">SEO Analyst Intern</h4>
                    <span className="timeline-subtitle">Crux Creations</span>
                    <p className="timeline-description">{detailsData['crux-intern'].description}</p>
                    <a href={detailsData['crux-intern'].link} target="_blank" rel="noopener noreferrer" className="timeline-link">Visit Website</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section >

        <section className="content-overview">
          <div className="content-label">WORKS</div>
          <div className="content-cards">
            <article className="card c1 reveal reveal-delay-1">
              <div className="card-thumb">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <div className="card-title">SEO Optimization<br /><small>On-Page • Off-Page • Parasite SEO</small></div>
            </article>
            <article className="card c2 reveal reveal-delay-2">
              <div className="card-thumb">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
              </div>
              <div className="card-title">Ad Campaigns<br /><small>Meta Ads • Google Ads</small></div>
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

                    {selectedCard.link && (
                      <div style={{ marginTop: '20px' }}>
                        <a href={selectedCard.link} target="_blank" rel="noopener noreferrer" className="btn-filled">
                          Visit Official Website
                        </a>
                      </div>
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

      <footer className="footer">
        <div className="footer-icons">
          <a href="mailto:fahaths.official@gmail.com"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></a>
          <a href="https://www.linkedin.com/in/fahath-s-641214219/" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          <a href="https://github.com/Fahaths" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
          <a href="tel:+919840031124"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></a>
          <a href="https://www.fiverr.com/fahath_s?up_rollout=true" target="_blank" rel="noopener noreferrer"><span style={{ fontWeight: 'bold', fontSize: '18px' }}>fi</span></a>
          <a href="https://fahath-s.blogspot.com/" target="_blank" rel="noopener noreferrer"><span style={{ fontWeight: 'bold', fontSize: '22px', display: 'flex', alignItems: 'center' }}><img src="https://simpleicons.org/icons/blogger.svg" alt="Blogger" width="18" height="18" /></span></a>
        </div>
        <p>Fahath-s-dev</p>
      </footer>

    </>
  )
}
