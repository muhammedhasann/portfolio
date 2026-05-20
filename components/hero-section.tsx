
import React, { useState, useEffect } from 'react';
import { ArrowRight, Download } from 'lucide-react';

export default function HeroSection() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },

  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      {}
      <style>{`
        @keyframes shine {
          to { background-position: 200% center; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
.bg-grid {
  background-color: #000000;
  background-image: 
    linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
  background-size: 40px 40px;
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
        }
      `}</style>

      <div className="bg-grid"></div>

      {}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] border border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl px-6 py-3 flex items-center shadow-2xl ${isScrolled ? 'w-[400px] rounded-full' : 'w-[95%] max-w-6xl rounded-2xl'}`}>
        <div className={`flex items-center gap-3 pl-2 transition-all duration-700 ${isScrolled ? 'flex-0' : 'flex-1'}`}>
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7">
            <path d="M4 16 L10 10 L10 26 L4 32 Z" fill="white"/>
            <path d="M13 14 L19 8 L19 22 L13 28 Z" fill="white"/>
            <path d="M22 10 L28 4 L28 20 L22 26 Z" fill="white"/>
          </svg>
          <span className={`text-white font-semibold text-base tracking-tight transition-opacity duration-300 ${isScrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}></span>
        </div>

        <div className={`flex items-center gap-1 ${isScrolled ? 'w-full justify-center' : 'absolute left-1/2 -translate-x-1/2 hidden md:flex'} p-1.5 rounded-full border border-white/10 bg-[#121212]`}>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="px-4 py-1.5 rounded-full text-zinc-400 hover:text-white text-sm font-medium transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <div className={`flex justify-end pr-1 transition-opacity duration-300 ${isScrolled ? 'opacity-0 w-0 overflow-hidden' : 'flex-1 opacity-100'}`}>
          <a href="#contact" className="px-6 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors">Contact</a>
        </div>
      </nav>
      {}


      <main className="relative z-10 flex min-h-screen flex-col justify-center items-center w-full px-6 pt-24">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none z-0" />
          
          <section className="flex flex-col items-center text-center w-full relative z-10">
              <h1 className="text-4xl md:text-7xl leading-[1.02] font-semibold tracking-tighter mb-10 animate-fade-in-up">
                  <span className="text-white">I design systems that</span><br />
                  <span className="text-[#888888]">handle heat, manage power, and fly.</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-zinc-400 font-light max-w-4xl mx-auto mb-14 leading-relaxed animate-fade-in-up delay-100">
                   <span className="text-white font-medium">Mechanical engineer</span>  with hands-on experience in <span className="text-zinc-200 font-normal">thermal management</span>,
                   <span className="text-zinc-200 font-normal"> energy storage</span>, and 
                   <span className="text-zinc-200 font-normal"> aerospace structures</span>. I use 
                   <span className="text-white font-medium"> computation and AI</span> to go further — not to replace the physical work.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-5 animate-fade-in-up delay-200">
                  <a href="#projects" className="group flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors w-full sm:w-auto text-base">
                      Explore Work <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a href="/Muhammed_Hasan_CV.pdf" className="group flex items-center justify-center gap-2 h-14 px-8 rounded-full border border-white/10 bg-transparent text-white font-medium hover:bg-white/5 transition-colors w-full sm:w-auto text-base">
                      <Download className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                      Download CV
                  </a>
              </div>
          </section>
      </main>
    </div>
  );
}