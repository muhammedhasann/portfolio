"use client"
import { motion } from "framer-motion"
import { ExternalLink, Calendar, Zap, Brain, Leaf, Github, Layers3 } from "lucide-react"
import { useState, useEffect } from "react"

// --- DATA (Unchanged) ---
const projects = [
  {
    title: "EcoRay.ai: Quantum-Enhanced Power Prediction",
    description: "Engineered a hybrid Quantum Neural Network (QNN) for superior power output forecasting, benchmarking against classical models to validate quantum advantage.",
    period: "Apr 2024 – Oct 2024",
    technologies: ["Python", "Pennylane", "TensorFlow", "Scikit-learn", "Quantum Computing"],
    icon: Brain,
    color: "text-orange-400",
    category: "AI & Quantum Computing",
    status: "Completed",
    impact: "High Impact",
    url: "https://github.com/muhammedhasann/EcoRay",
    repo: "https://github.com/muhammedhasann/EcoRay",
  },
  {
    title: "CognitionX: Advanced NLP Engine",
    description: "Built a high-precision Sentiment Analysis and Entity Recognition system using BERT, optimizing transformer models for state-of-the-art performance.",
    period: "May 2024 – June 2024",
    technologies: ["Python", "PyTorch", "SpaCy", "BERT", "NLP"],
    icon: Zap,
    color: "text-amber-400",
    category: "Natural Language Processing",
    status: "Completed",
    impact: "Published",
    url: "https://github.com/muhammedhasann/Cognition-X",
    repo: "https://github.com/muhammedhasann/Cognition-X ",
  },{
  title: "Volunteer App",
  description: "Collaborated with two developers to create a platform that connects volunteers with social causes. Implemented authentication middleware with Passport.js (local, OAuth, JWT), designed scalable backend architecture, and managed database schemas using Mongoose. Led the team through two sprints with daily stand-ups, ensuring successful delivery.",
  period: "Jun 2023 – Aug 2023",
  technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "Swagger", "Passport.js"],
  icon: Zap, // you can change this if you want, e.g., Layers3 or Users icon
  color: "text-green-400",
  category: "Full-Stack Development",
  status: "Completed",
  impact: "Team Project",

      url: "https://github.com/omikay/rcdd-capstone-impakt",
    repo: "https://github.com/omikay/rcdd-capstone-impakt",
},

]

// --- Helper functions for badge styling (Unchanged) ---
const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-500/10 text-green-400 border-green-500/20"
    case "In Progress":
      return "bg-sky-500/10 text-sky-400 border-sky-500/20"
    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/20"
  }
}

const getImpactColor = (impact) => {
  switch (impact) {
    case "High Impact":
      return "bg-orange-500/10 text-orange-400 border-orange-500/20"
    case "Published":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20"
    case "Research":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/20"
  }
}

// --- NEW FUTURISTIC BADGE COMPONENT ---
const FuturisticBadge = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    viewport={{ once: true }}
    className="mb-8 inline-flex items-center justify-center gap-3 rounded-full border border-orange-500/30 bg-black/50 px-5 py-2.5 shadow-[0_0_20px_rgba(249,115,22,0.5)]"
  >
    <div className="flex items-center gap-3">
      <div className="h-2 w-2 animate-pulse rounded-full bg-orange-500"></div>
      <Layers3 className="h-6 w-6 text-orange-400" />
      <div className="h-5 w-px bg-orange-500/50"></div>
      <span className="text-sm font-medium uppercase tracking-wider text-orange-300">
        Innovations & Research
      </span>
    </div>
  </motion.div>
);

// --- Main Portfolio Section Component ---
export const  EnhancedProjectsSection
= () => {

  return (
    <section id="innovations" className="relative overflow-hidden bg-black py-24 md:py-32">
      {/* --- NEW DYNAMIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-orange-900/10 to-black" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_1px,_transparent_1px)] [background-size:20px_20px]" />
      

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header with New Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <FuturisticBadge />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-br from-white via-neutral-300 to-orange-300 bg-clip-text md:text-6xl"
          >
            My Latest Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto max-w-3xl text-lg text-neutral-400"
          >
            A showcase of my work in AI, quantum computing, and sustainable energy.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-full"
            >
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-2xl hover:shadow-orange-500/10">
                <div className="flex-grow">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl border border-white/10 bg-neutral-800/60 p-3">
                        <project.icon className={`h-6 w-6 ${project.color}`} />
                      </div>
                      <span className={`rounded-md border px-2.5 py-1 text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <span className={`rounded-md border px-2.5 py-1 text-xs font-medium ${getImpactColor(project.impact)}`}>
                      {project.impact}
                    </span>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-neutral-100 transition-colors duration-300 group-hover:text-orange-400">
                    {project.title}
                  </h3>
                  <div className="mb-4 flex items-center gap-2 text-sm text-neutral-500">
                    <Calendar className="h-4 w-4" />
                    <span>{project.period}</span>
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-neutral-400">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="rounded-md bg-neutral-800/80 px-2.5 py-1 text-xs font-medium text-neutral-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    {/* --- ACCESSIBILITY FIX: Added sr-only span --- */}
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex h-10 flex-grow items-center justify-center rounded-md border border-orange-500/50 bg-orange-500/10 text-sm font-medium text-orange-300 transition-all duration-300 hover:bg-orange-500/20"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Project
                      {/* This is hidden visually but read by screen readers */}
                      <span className="sr-only"> for {project.title}</span>
                    </a>
                    <a 
                      href={project.repo} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex h-10 items-center justify-center rounded-md border border-neutral-700 bg-transparent px-4 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-600 hover:bg-neutral-800/80 hover:text-white"
                      aria-label={`View code for ${project.title}`} // More descriptive aria-label
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}