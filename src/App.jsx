
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
  const [visited, setVisited] = useState(false) // Restore if needed, or just selectedCard
  const [isDownloading, setIsDownloading] = useState(false)
  const [isBlasting, setIsBlasting] = useState(false)
  const [btnPosition, setBtnPosition] = useState({ x: 0, y: 0 })
  const form = useRef()

  const handleDownload = () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 1000);
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

    setIsBlasting(true)

    // Wait for the blast animation to execute
    setTimeout(() => {
      // Send via EmailJS
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
        .then(
          () => {
            alert('Message Sent Successfully!')
            form.current.reset()
            setIsBlasting(false)
          },
          (error) => {
            alert('Failed to send email: ' + error.text)
            setIsBlasting(false)
          },
        )
    }, 600)
  }

  const handleButtonClick = () => {
    if (form.current && !form.current.checkValidity()) {
      // Move randomly if invalid
      const x = Math.random() * 200 - 100; // -100px to 100px
      const y = Math.random() * 100 - 50;  // -50px to 50px
      setBtnPosition({ x, y });
    } else {
      // Reset position
      setBtnPosition({ x: 0, y: 0 });
    }
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
          <h2 className="hero-subtitle-role">
            & SEO
          </h2>
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
            <a
              href="/assets/Resume.pdf"
              download
              className={`btn-filled ${isDownloading ? 'downloading' : ''}`}
              onClick={handleDownload}
            >
              {isDownloading ? "Downloading..." : "Get Portfolio"}
            </a>
          </div>
        </section>

        {/* --- Resume Section --- */}
        <section className="content-overview">
          <div className="content-label">RESUME</div>
          <div className="edu-exp-section reveal">
            <div className="edu-exp-cols">
              {/* Education Column */}
              <div>
                <div className="col-head">
                  <span className="col-title">Education</span>
                  <span className="col-index">/ 01</span>
                </div>
                <div className="entry">
                  <div className="entry-year">2023<br />2025</div>
                  <div>
                    <p className="entry-title">{detailsData.measi.title}</p>
                    <p className="entry-place">{detailsData.measi.subtitle}</p>
                    <div className="entry-points">
                      <span className="entry-point">Completed MCA with First Class Distinction.</span>
                      <span className="entry-point">Focused on software development, data structures, and web technologies.</span>
                      <span className="entry-point">Gained practical experience through various academic projects.</span>
                    </div>
                    <a href={detailsData.measi.link} target="_blank" rel="noopener noreferrer" className="entry-link">Visit Website</a>
                  </div>
                </div>
                <div className="entry">
                  <div className="entry-year">2020<br />2023</div>
                  <div>
                    <p className="entry-title">{detailsData.shanmuga.title}</p>
                    <p className="entry-place">{detailsData.shanmuga.subtitle}</p>
                    <div className="entry-points">
                      <span className="entry-point">Completed Bachelor of Commerce in Computer Applications.</span>
                      <span className="entry-point">Built a strong foundation in business management and computer applications.</span>
                    </div>
                    <a href={detailsData.shanmuga.link} target="_blank" rel="noopener noreferrer" className="entry-link">Visit Website</a>
                  </div>
                </div>
              </div>

              {/* Experience Column */}
              <div>
                <div className="col-head">
                  <span className="col-title">Experience</span>
                  <span className="col-index">/ 02</span>
                </div>
                <div className="entry">
                  <div className="entry-year">Sep 2025<br />Present</div>
                  <div>
                    <p className="entry-title">{detailsData['crux-marketer'].title}</p>
                    <p className="entry-place">{detailsData['crux-marketer'].subtitle}</p>
                    <div className="entry-points">
                      <span className="entry-point">Leading SEO strategies and performance marketing campaigns.</span>
                      <span className="entry-point">Optimizing website visibility and improved search engine rankings.</span>
                      <span className="entry-point">Managing ad campaigns on Meta and Google Ads to drive conversions.</span>
                    </div>
                    <a href={detailsData['crux-marketer'].link} target="_blank" rel="noopener noreferrer" className="entry-link">Visit Website</a>
                  </div>
                </div>
                <div className="entry">
                  <div className="entry-year">Jun 2025<br />Aug 2025</div>
                  <div>
                    <p className="entry-title">{detailsData['crux-intern'].title}</p>
                    <p className="entry-place">{detailsData['crux-intern'].subtitle}</p>
                    <div className="entry-points">
                      <span className="entry-point">Assisted in on-page and off-page SEO activities.</span>
                      <span className="entry-point">Conducted keyword research and competitor analysis.</span>
                      <span className="entry-point">Learned the fundamentals of performance marketing.</span>
                    </div>
                    <a href={detailsData['crux-intern'].link} target="_blank" rel="noopener noreferrer" className="entry-link">Visit Website</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section >

        {/* --- Works Section --- */}
        <section className="content-overview" id="works">
          <div className="content-label">WORKS</div>
          <div className="works-section reveal">
            <div className="works-inner">
              <div className="works-header">
                <span className="works-title">Works</span>
                <span className="works-count">/ 03 PROJECTS</span>
              </div>

              <div className="work-item">
                <span className="work-num">01</span>
                <div className="work-body">
                  <p className="work-name">SEO Optimization</p>
                  <p className="work-desc">End-to-end SEO strategy covering on-page structure, off-page authority building, and parasite SEO techniques to drive organic visibility.</p>
                  <div className="work-tags">
                    <span className="tag">On-Page</span>
                    <span className="tag">Off-Page</span>
                    <span className="tag">Technical SEO</span>
                  </div>
                </div>
                <span className="work-arrow">↗</span>
              </div>

              <div className="work-item">
                <span className="work-num">02</span>
                <div className="work-body">
                  <p className="work-name">Ad Campaigns</p>
                  <p className="work-desc">Performance marketing campaigns across Meta and Google Ads — from audience targeting and creative strategy to budget optimisation and ROAS tracking.</p>
                  <div className="work-tags">
                    <span className="tag">Meta Ads</span>
                    <span className="tag">Google Ads</span>
                    <span className="tag">Lead Gen</span>
                    <span className="tag">ROAS</span>
                  </div>
                </div>
                <span className="work-arrow">↗</span>
              </div>

              <div className="work-item">
                <span className="work-num">03</span>
                <div className="work-body">
                  <p className="work-name">Healthcare Event Marketing</p>
                  <p className="work-desc">Full digital promotion for Pivot with Purpose™ — LinkedIn content, Instagram creatives, and paid amplification for a Chennai healthcare summit.</p>
                  <div className="work-tags">
                    <span className="tag">LinkedIn</span>
                    <span className="tag">Instagram</span>
                    <span className="tag">Event Marketing</span>
                  </div>
                </div>
                <span className="work-arrow">↗</span>
              </div>

              <div className="work-item">
                <span className="work-num">04</span>
                <div className="work-body">
                  <p className="work-name">YouTube Lead Campaigns</p>
                  <p className="work-desc">YouTube lead form ad strategy for a hospital client in Chennai — MCC account setup, conversion tracking, and a 30-day optimisation framework.</p>
                  <div className="work-tags">
                    <span className="tag">YouTube Ads</span>
                    <span className="tag">Google MCC</span>
                    <span className="tag">Healthcare</span>
                    <span className="tag">Conversion Tracking</span>
                  </div>
                </div>
                <span className="work-arrow">↗</span>
              </div>

            </div>
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
                <input type="text" name="from_name" placeholder="Name" required />
              </div>
              <div className="form-group">
                <input type="email" name="reply_to" placeholder="Email" required />
              </div>
              <div className="form-group">
                <input type="text" name="subject" placeholder="Subject" />
              </div>
              <div className="form-group">
                <textarea name="message" rows="5" placeholder="Message" required></textarea>
              </div>
              <button
                type="submit"
                className={`btn-filled boom-btn ${isBlasting ? "blasting" : ""}`}
                style={{
                  transform: `translate(${btnPosition.x}px, ${btnPosition.y}px)`,
                  transition: 'transform 0.2s ease-in-out'
                }}
                onClick={handleButtonClick}
              >
                {isBlasting ? "Booming..." : "Boom it!"}
              </button>
            </form>
          </div>
        </section>


      </main >

      <footer className="footer">
        <div className="footer-icons">
          <a href="https://www.linkedin.com/in/fahath-s-641214219/" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          <a href="https://github.com/Fahaths" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
          <a href="https://fahath-s.blogspot.com/" target="_blank" rel="noopener noreferrer"><span style={{ fontWeight: 'bold', fontSize: '22px', display: 'flex', alignItems: 'center' }}><img src="https://simpleicons.org/icons/blogger.svg" alt="Blogger" width="18" height="18" /></span></a>
        </div>
        <p style={{ fontWeight: 300, fontSize: '0.8rem', marginTop: '1.5rem', color: '#666', letterSpacing: '0.3px' }}>
          Powered By and &copy; Copyright - 2026 Fahath S, Digital marketer, All rights reserved.
        </p>
      </footer>

    </>
  )
}
