"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";

/* ----------  1.  INLINE SPARKLES SVG  ---------- */
// (Sparkles component would be here if not imported from lucide)


/* ----------  2.  PROFESSIONAL TITLE ROTATION  ---------- */
const TITLES = ["Mechanical Engineer", "AI & Quantum", "Energy R&D", "Product Innovator", "CAD Designer"];

/* ----------  3.  PROFESSIONAL NEON BADGE WITH POWERFUL SHADOW  ---------- */
const WelcomeBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
    className="group relative mb-12 inline-flex items-center gap-4 overflow-hidden rounded-full border border-white/20 bg-black/50 px-6 py-3 shadow-[0_0_50px_10px_rgba(255,255,255,0.15)] backdrop-blur-md"
  >
    {/* 1. Subtle Aurora Background Sheen */}
    <div className="absolute inset-0 z-0 -translate-y-[100%] animate-[aurora_6s_infinite] bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0.05)_100%)]" />
    
    {/* 2. Inner Shadow for Depth */}
    <div className="absolute inset-0 z-10 rounded-full shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]" />

    {/* Content (sits on top of the effects) */}
    <div className="relative z-20 flex items-center gap-4">
      {/* Refined Dot */}
      <div className="relative h-3 w-3">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/80" />
        <span className="relative block h-3 w-3 rounded-full bg-white" />
      </div>
      
      {/* Icon with subtle hover effect */}
      <Sparkles className="h-5 w-5 text-white/80 transition-colors group-hover:text-white" />
      
      {/* Text with subtle hover effect */}
      <span className="text-sm font-medium uppercase tracking-widest text-white/80 transition-colors group-hover:text-white">
        Welcome to the Portfolio
      </span>
    </div>
  </motion.div>
);

// **Reminder**: Make sure this animation is in your `tailwind.config.js` file.
/*
  // tailwind.config.js
  theme: {
    extend: {
      animation: {
        aurora: 'aurora 6s linear infinite',
      },
      keyframes: {
        aurora: {
          '0%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
    },
  },
*/


/* ----------  4.  WORD-BY-WORD TYPE WRITER  ---------- */
const TypeWriter = ({ text }: { text: string }) => {
  const words = text.split(" ");
  const [index, setIndex] = useState(0);
  useEffect (() => {
    if (index >= words.length) return;
    const t = setTimeout(() => setIndex((i) => i + 1), 140);
    return () => clearTimeout(t);
  }, [index, words]); // Simplified dependency array
  return (
    <p className="mx-auto mt-8 max-w-4xl text-xl font-light leading-loose text-slate-300 md:text-2xl">
      {words.slice(0, index).join(" ")}
      <span className="ml-2 inline-block h-5 w-1 animate-pulse bg-slate-300" />
    </p>
  );
};

/* ----------  5.  GLASS-NEON CTAs  ---------- */
const CTAs = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 3.2 }} // after TypeWriter
    className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
  >
    {/* Primary */}
    <a
      href="#projects"
      className="group relative inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-cyan-500 px-8 font-bold text-black shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105"
    >
      Explore My Work
      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
    </a>

    {/* Secondary */}
    <a
      href="/Muhammed_Hasan (1).pdf"
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
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % TITLES.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full overflow-hidden bg-black antialiased items-center justify-center pt-24 pb-20 md:pt-0">
      
      {/* Background Layers (NEW) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,black_100%)]" />
      
      {/* central glow (Unchanged) */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 3, delay: 0.5 }}
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-cyan-500/10 rounded-full blur-[100px] z-[2]"
      />

      {/* Content (Unchanged) */}
      <div className="relative z-30 mx-auto w-full max-w-7xl p-4 md:p-8 text-center">
        <WelcomeBadge />

        {/* rotating title */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
            className="bg-clip-text text-7xl font-extrabold text-transparent md:text-9xl lg:text-[10rem] leading-none tracking-tighter uppercase"
            style={{ backgroundImage: "linear-gradient(to top, #ffffff, #94a3b8)" }}
          >
            {TITLES[index]}
          </motion.h1>
        </AnimatePresence>

        <TypeWriter text="Engineering realities yet to be observed—where atoms, algorithms and aesthetics converge to power the next century." />

        <CTAs />
      </div>
    </section>
  );
}