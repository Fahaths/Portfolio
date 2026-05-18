import React, { useState, useEffect } from 'react';

const images = [
  'https://source.unsplash.com/1600x900/?bag',
  'https://source.unsplash.com/1600x900/?shoes',
  'https://source.unsplash.com/1600x900/?fashion'
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${images[current]})` }}
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-established">Established 2026</p>
        <h1 className="hero-title">Al Fahath Bags and Footwear</h1>
        <p className="hero-tagline">Carry without limits.</p>
        <div className="hero-buttons">
          <a href="#" className="btn-primary hero-btn">Explore Bags</a>
          <a href="#" className="btn-secondary hero-btn">Shop Footwear</a>
        </div>
      </div>
    </section>
  );
}
