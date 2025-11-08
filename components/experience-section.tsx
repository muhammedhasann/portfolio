"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Zap, FlaskConical, Atom } from "lucide-react"; // Added new icons for CV

// =================================================================================
// 1. UPDATED DATA: Accurate experiences from your CV
// All placeholder/fake content has been removed.
// =================================================================================
const experiences = [
  {
    id: 1,
    role: "Instructor Mentor",
    company: "T3 Vakfı – Deneyap Workshops",
    period: "Mar 2024 – Present",
    location: "Siirt, Turkey",
    description:
      "Mentored 20+ students in applied robotics, providing direct technical guidance and troubleshooting for Arduino, Fusion 360, and coding challenges.",
    // Added a 'tech' field to match your CV
    tech: "Robotics & Prototyping", 
  },
  {
    id: 2,
    role: "Undergraduate Researcher",
    company: "TÜBİTAK 2209A Research Program",
    period: "Mar 2024 – Mar 2025",
    location: "Siirt University",
    description:
      "Developed novel supercapacitor electrodes from food-waste carbon, achieving 7.98 F/g capacitance. Conducted 27 electrochemical tests (CV, GCD, EIS) and analyzed data in OriginPro.",
    tech: "Energy Storage & Materials",
  },
  {
    id: 3,
    role: "Research Intern",
    company: "Clean Energy Lab",
    period: "Jun 2024 – Aug 2024",
    location: "Siirt University",
    description:
      "Increased PV efficiency by 30.7% and power by 26% by optimizing 6-nozzle spray configurations. Successfully decreased surface temperatures by 47% on 80W PV systems.",
    tech: "Solar & Thermal Management",
  },
];

// =================================================================================
// 2. UNCHANGED COMPONENTS (Style preserved as requested)
// =================================================================================

// --- COMPONENT: Futuristic Badge ---
const ExperienceBadge = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 bg-black/50 border border-orange-500/30 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.5)]"
  >
      <div className="relative flex items-center justify-center">
          <div className="absolute w-3 h-3 bg-orange-400 rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
        </div>
    {/* Using Briefcase instead of Zap for "Experience" */}
    <Briefcase className="w-5 h-5 text-orange-400" />
    <span className="text-sm font-medium text-orange-300 tracking-widest uppercase">
      Experience & Research
    </span>
  </motion.div>
);

// --- COMPONENT: Ultimate Futuristic Timeline Card ---
const TimelineCard = ({ exp, index }) => {
  const isEven = index % 2 === 0;

  // Function to get the right icon for the 'tech' field
  const getTechIcon = (tech) => {
    if (tech.includes("Energy Storage")) return <FlaskConical className="w-4 h-4 text-orange-500/80" />;
    if (tech.includes("Solar & Thermal")) return <Zap className="w-4 h-4 text-orange-500/80" />;
    if (tech.includes("Robotics")) return <Atom className="w-4 h-4 text-orange-500/80" />;
    return <Zap className="w-4 h-4 text-orange-500/80" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative flex items-start gap-6 md:gap-8 mb-12 last:mb-0 ${
        isEven ? "md:flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Creative Timeline Node */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-10 h-10 flex items-center justify-center">
        <div className="absolute w-full h-full bg-orange-500/30 rounded-full animate-pulse" />
        <div className="w-4 h-4 bg-orange-500 border-2 border-neutral-900 rounded-full" />
      </div>

      {/* Modern Card Design (Unchanged) */}
      <div className="w-full md:w-[calc(50%-3rem)] group relative mt-12 rounded-xl border border-neutral-800 bg-neutral-950/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-orange-600/60 hover:bg-neutral-900/60">
        {/* Glowing border effect */}
        <div className="absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
             style={{
               background: 'radial-gradient(circle at center, rgba(249, 115, 22, 0.2), transparent 80%)',
               border: '1px solid rgba(249, 115, 22, 0.5)'
             }} />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-neutral-50">{exp.role}</h3>
            <span className="text-xs text-orange-300 bg-orange-900/50 border border-orange-800/50 px-3 py-1 rounded-full whitespace-nowrap">
              {exp.period}
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-semibold text-orange-400">{exp.company}</p>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>{exp.location}</span>
            </div>
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed mb-5">{exp.description}</p>

          {/* === MODIFICATION HERE === */}
          {/* Futuristic Tech Indicator (Updated with dot animation) */}
          <div className="flex items-center gap-3 border-t border-neutral-800 pt-4">
            {/* Pulsing dot animation */}
            <div className="flex space-x-1.5">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-2 h-2 rounded-full bg-orange-500/50 animate-pulse" 
                  style={{ animationDelay: `${i * 0.15}s` }} 
                />
              ))}
            </div>
            {/* Dynamic tech label from CV */}
            <span className="text-xs font-medium tracking-wider text-orange-500/80 uppercase">
              {exp.tech}
            </span>
          </div>
          {/* === END MODIFICATION === */}

        </div>
      </div>
    </motion.div>
  );
};

// =================================================================================
// 3. MAIN SECTION COMPONENT (Updated Header Text)
// =================================================================================
export const ExperienceSection = () => {
  return (
    <section id="experience" className="relative overflow-hidden bg-black py-24 md:py-32">
     {/* Background Effects (Unchanged) */}
     <div className="absolute inset-0 bg-gradient-to-b from-black via-orange-900/10 to-black z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.03)_1px,transparent_1px)] bg-[size:30px_30px] z-0" />
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>


      {/* Main Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <ExperienceBadge />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-4xl font-bold tracking-tighter text-transparent bg-gradient-to-br from-white via-slate-300 to-orange-300 bg-clip-text md:text-6xl"
          >
            Where I’ve Worked
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-400"
          >
             A timeline of my practical, hands-on contributions to engineering, and research.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Thicker Vertical Timeline Line (Unchanged) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-5 bottom-0 w-0.5 bg-gradient-to-b from-orange-500/40 via-orange-500/10 to-transparent" />

          {/* Map over the NEW, accurate experiences array */}
          {experiences.map((exp, idx) => (
            <TimelineCard key={exp.id} exp={exp} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};