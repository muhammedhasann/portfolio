"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";

/* ----------  2.  PROFESSIONAL TITLE ROTATION  ---------- */
const TITLES = [
  "Engineer",
  "Developer",
  "Researcher",
  "Designer",
];

/* ----------  3.  PROFESSIONAL NEON BADGE  ---------- */
const WelcomeBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0, ease: "easeOut" }}
    className="group relative mb-12 inline-flex items-center gap-4 overflow-hidden rounded-full border border-white/20 bg-black/50 px-6 py-3 backdrop-blur-md"
  >
    <div className="absolute inset-0 z-0 -translate-y-[100%] animate-[aurora_6s_infinite] bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0.05)_100%)]" />
    <div className="absolute inset-0 z-10 rounded-full shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]" />
    <div className="relative z-20 flex items-center gap-4">
      <div className="relative h-3 w-3">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/80" />
        <span className="relative block h-3 w-3 rounded-full bg-white" />
      </div>
      <Sparkles className="h-5 w-5 text-white/80 transition-colors group-hover:text-white" />
      <span className="text-sm font-medium uppercase tracking-widest text-white/80 transition-colors group-hover:text-white">
        Welcome to the Portfolio
      </span>
    </div>
  </motion.div>
);

/* ----------  5.  GLASS-NEON CTAs  ---------- */
const CTAs = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }} 
    className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
  >
    <a
      href="#projects"
      className="group relative inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-cyan-500 px-8 font-bold text-black shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105"
    >
      Explore My Work
      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
    </a>
    <a
      href="/Muhammed_Hasan_CV.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 font-medium text-slate-200 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-white"
    >
      <Download className="mr-2 h-5 w-5" />
      Download CV
    </a>
  </motion.div>
);

/* ----------  6.  HERO SECTION  ---------- */
export default function HeroSection() {
  const [index, setIndex] = useState(0);
  
  // This state is crucial to fixing React Error #418 (Hydration Mismatch)
  // We will only render the rotating text *after* the component has "mounted" on the client.
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // When this runs, we are on the client.
    setIsMounted(true); 
    
    const id = setInterval(() => setIndex((i) => (i + 1) % TITLES.length), 3000);
    return () => clearInterval(id);
  }, []); // Empty dependency array is correct

  return (
    <section id="home" className="relative flex min-h-screen w-full overflow-hidden bg-black antialiased items-center justify-center pt-24 pb-20 md:pt-0">
      
      <div className="relative z-30 mx-auto w-full max-w-7xl p-4 md:p-8 text-center">
        <WelcomeBadge />

        {/* This div container prevents layout shift when the title changes */}
        <div className="h-[84px] md:h-[108px] lg:h-[160px]"> 
          {isMounted ? (
            // (Client-Only Render)
            // This code runs *after* hydration, so it's safe to use motion and rotating text.
            <AnimatePresence mode="wait">
              <motion.h1
                key={index} 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6 }}
                className="bg-clip-text text-7xl font-extrabold text-transparent md:text-9xl lg:text-[10rem] leading-none tracking-tighter"
                style={{ backgroundImage: "linear-gradient(to top, #ffffff, #94a3b8)" }}
              >
                {TITLES[index]}
              </motion.h1>
            </AnimatePresence>
          ) : (
            // (Server-Side Render & Initial Client Render)
            // This static H1 matches what the server sends.
            // This prevents the hydration error and fixes CLS.
            <h1
              className="bg-clip-text text-7xl font-extrabold text-transparent md:text-9xl lg:text-[10rem] leading-none tracking-tighter"
              style={{ backgroundImage: "linear-gradient(to top, #ffffff, #94a3b8)" }}
            >
              {TITLES[0]}
            </h1>
          )}
        </div>

        <p
          className="mx-auto mt-8 max-w-4xl text-xl font-light leading-loose text-slate-300 md:text-2xl"
        >
          Engineering realities yet to be observed—where atoms, algorithms and aesthetics converge to power the next century.
        </p>
        
        <CTAs />
      </div>
    </section>
  );
}