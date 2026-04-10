
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

const StylizedInput = ({ label, name, type = 'text', required = false, icon, isTextArea = false }) => {
  const InputComponent = isTextArea ? 'textarea' : 'input';
  return (
    <div className={`[--clr:#1f1f1f] dark:[--clr:#999999] relative flex flex-row ${isTextArea ? 'items-start' : 'items-center'} w-full mt-8`}>
      <InputComponent
        name={name}
        required={required}
        placeholder=" "
        id={name}
        type={type}
        className={`peer text-black dark:text-white pl-10 ${isTextArea ? 'pt-2 h-[120px]' : 'h-[40px]'} min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full text-inherit block text-left border border-solid bg-white dark:bg-zinc-800 rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-[#F5C000] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F5C0002e]`}
      />
      <label
        className={`cursor-text text-[--clr] inline-block z-0 text-sm mb-px font-normal text-start select-none absolute duration-300 transform origin-[0] translate-x-[40px] ${isTextArea ? 'top-[10px]' : ''} peer-focus-visible:text-[#F5C000] peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-32px] peer-[:not(:placeholder-shown)]:translate-y-[-32px]`}
        htmlFor={name}
      >
        {label}
      </label>
      <span
        className={`pointer-events-none absolute z-[1] left-0 ${isTextArea ? 'top-0' : 'top-0 bottom-0'} flex items-center justify-center size-[40px] text-[--clr] peer-focus-visible:hidden peer-[:not(:placeholder-shown)]:hidden`}
      >
        {icon}
      </span>
      {required && (
        <div
          className={`group w-[40px] ${isTextArea ? 'h-[40px]' : ''} absolute ${isTextArea ? 'top-0' : 'top-0 bottom-0'} right-0 flex items-center justify-center text-[--clr] peer-focus-visible:text-[#F5C000] z-20`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1rem"
            height="1rem"
            strokeLinejoin="round"
            strokeLinecap="round"
            viewBox="0 0 24 24"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
            <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
            <path d="M12 8v4"></path>
            <path d="M12 16h.01"></path>
          </svg>
          <span
            className="text-sm absolute cursor-default select-none rounded-[4px] px-1.5 opacity-0 right-0 z-50 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-[calc(100%+8px)] bg-zinc-800 text-white"
          >
            Required!
          </span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [visited, setVisited] = useState(false) // Restore if needed, or just selectedCard
  const [isDownloading, setIsDownloading] = useState(false)
  const [isBlasting, setIsBlasting] = useState(false)
  const [isTamed, setIsTamed] = useState(false)
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

  const checkFormValidity = () => {
    if (form.current) {
      const { from_name, reply_to, message } = form.current;
      const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const ready = from_name.value.trim().length > 0 &&
        isValidEmail(reply_to.value.trim()) &&
        message.value.trim().length > 0;
      setIsTamed(ready);
    }
  };



  return (
    <>
      <Navbar />

      <header className="hero">
        <div className="hero-frame-wrapper">
          <div className="hero-backdrop"></div>
          <div className="hero-frame-border">
            <img
              src="/hero-profile-v3.webp"
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

          <div className="edu-exp-section reveal">
            <h3 className="section-title">Resume</h3>
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

          <div className="works-section reveal">
            <h3 className="section-title">Works</h3>
            <div className="works-inner">
              <div className="works-header">
                <span className="works-count">/ 04 PROJECTS</span>
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

              </div>

              <div className="work-item">
                <span className="work-num">02</span>
                <div className="work-body">
                  <p className="work-name">Performance Marketing</p>
                  <p className="work-desc">Data-driven campaigns built to generate leads, conversions, and measurable growth — not just impressions.</p>
                  <span className="tag">Meta Ads</span> <br /><br />
                  <div className="work-item">
                    <span className="work-num"></span>
                    <div className="work-body">
                      <p className="work-name">Healthcare Performance Marketing</p>
                      <p className="work-desc">High-intent patient acquisition campaigns tailored for hospitals and clinics.</p>
                      <div className="work-tags">
                        <span className="tag">Hospital Launch & Hiring Campaigns</span>
                        <span className="tag">Specialty Lead Generation (Ortho, Urology, Women’s Health)</span>
                        <span className="tag">Awareness to Conversion Funnels (Women’s Day, Free Consultation)</span>
                        <span className="tag">Master Health Checkup Package Promotions</span>
                        <span className="tag">Condition-Based Campaigns (Bells Palsy, Hydration, etc.)</span>
                      </div>
                    </div>
                  </div>
                  <div className="work-item">
                    <span className="work-num"></span>
                    <div className="work-body">
                      <p className="work-name">Workshop & Training Lead Generation</p>
                      <p className="work-desc">Structured funnels designed to fill workshops and maximize registrations.</p>
                      <div className="work-tags">
                        <span className="tag">PWP Trichy & Healthcare Workshop Campaigns</span>
                        <span className="tag">HealthTeach Program Promotions</span>
                      </div>
                    </div>
                  </div>
                  <div className="work-item">
                    <span className="work-num"></span>
                    <div className="work-body">
                      <p className="work-name">Creative-Led Performance Ads</p>
                      <p className="work-desc">Conversion-focused creatives that actually drive results.</p>
                      <div className="work-tags">
                        <span className="tag">Video Marketing</span>
                        <span className="tag">Poster Markeing</span>
                      </div>
                    </div>
                  </div>
                  <div className="work-item">
                    <span className="work-num"></span>
                    <div className="work-body">
                      <p className="work-name">Office Space Campaigns</p>
                      <p className="work-desc">Hyperlocal targeting to generate qualified walk-ins and inquiries.</p>
                      <div className="work-tags">
                        <span className="tag">Offisbay (Mount Road & Perungudi) Lead Campaigns</span>
                        <span className="tag">TheLaunchpod Promotions</span>
                      </div>
                    </div>
                  </div>
                  <div className="work-item">
                    <span className="work-num"></span>
                    <div className="work-body">
                      <p className="work-name">Course & Program Marketing</p>
                      <p className="work-desc">Optimized campaigns to drive enrollments and reduce CPL.</p>
                      <div className="work-tags">
                        <span className="tag">Cosmetic & Medifical Course Promotions</span>
                      </div>
                    </div>
                  </div>
                  <div className="work-item">
                    <span className="work-num"></span>
                    <div className="work-body">
                      <p className="work-name">Event Performance Campaigns</p>
                      <p className="work-desc">End-to-end promotion focused on registrations and attendance.</p>
                      <div className="work-tags">
                        <span className="tag">Franchise Events</span>
                        <span className="tag">UG TRB Campaigns</span>
                        <span className="tag">Startup to Scaleup Events</span>
                      </div>
                    </div>
                  </div>
                  <div className="work-item">
                    <span className="work-num"></span>
                    <div className="work-body">
                      <p className="work-name">Content-Driven Performance Support</p>
                      <p className="work-desc">Because ads don’t convert without strong content.</p>
                      <div className="work-tags">
                        <span className="tag">Instagram Photography & Reel Shoots</span>
                        <span className="tag">Personal Branding Campaigns</span>
                        <span className="tag">Studio-Based Content Production</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>




            </div>
          </div>
        </section>



        {/* --- Contact Section --- */}
        <section className="content-overview" id="contact">

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
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              onInput={checkFormValidity}
              ref={form}
              style={{ position: 'relative' }}
            >
              <StylizedInput
                label="Name"
                name="from_name"
                required={true}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                }
              />
              <StylizedInput
                label="Email"
                name="reply_to"
                type="email"
                required={true}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                }
              />
              <StylizedInput
                label="Subject"
                name="subject"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                }
              />
              <div className="form-group">
                <input type="hidden" name="to_name" value="Fahath" />
              </div>
              <StylizedInput
                label="Message"
                name="message"
                required={true}
                isTextArea={true}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                }
              />

              <div className="form-submit" style={{ marginTop: '30px', textAlign: 'center' }}>
                <button
                  type="submit"
                  className={`btn-filled boom-btn ${isBlasting ? "blasting" : ""} ${isTamed ? "ready" : ""}`}
                >
                  {isBlasting ? "Booming..." : "BOOM IT!"}
                </button>
              </div>
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
