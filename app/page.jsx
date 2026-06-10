"use client";

import React, { useState } from "react";
import Preloader from "../components/Preloader";
import Navbar from "../components/Navbar";
import HeroKinetic from "../components/HeroKinetic";
import IdentityReveal from "../components/IdentityReveal";
import SkillsUniverse from "../components/SkillsUniverse";
import WhatsAppContact from "../components/WhatsAppContact";
import Footer from "../components/Footer";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-accent)] selection:text-white overflow-hidden">
      <Preloader onComplete={() => setIsLoading(false)} />
      <Navbar />



      <div id="home">
        <HeroKinetic />
      </div>

      <div id="identity">
        <IdentityReveal />
      </div>



      <div id="skills">
        <SkillsUniverse />
      </div>

      <div id="contact">
        <WhatsAppContact />
      </div>

      <Footer />

    </main>
  );
}
