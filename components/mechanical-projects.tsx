"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  FileText,
  FlaskConical,
  Rocket,
  Layers3,
  BrainCircuit,
  Award,
  // --- ICONS ADDED FROM YOUR CV/PROJECTS ---
  Radiation,
  CircuitBoard,
  Leaf,
  Atom,
  TrendingUp,
  Microscope,
  Lightbulb,
} from "lucide-react";
import React, { useState, memo, useCallback } from "react";
import { JSX } from "react/jsx-runtime";

// Utility for conditional class names
// --- FIX: Added types for 'classes' ---
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// =================================================================================
// --- 1. DEFINING TYPESCRIPT INTERFACES ---
// =================================================================================

// --- FIX: Defined a type for a single project ---
interface Project {
  title: string;
  description: string;
  images: string[];
  status: string;
  category: string;
  tags: string[];
  url: string;
  icon: JSX.Element;
  awardText?: string; // Optional property
  competition?: string; // Optional property
}

// --- FIX: Defined props for ImageCarousel ---
interface ImageCarouselProps {
  images: string[];
  title: string;
}

// --- FIX: Defined props for StatusBadge ---
interface StatusBadgeProps {
  status: string;
}

// --- FIX: Defined props for AwardBadge ---
interface AwardBadgeProps {
  text: string;
  competition: string;
}

// --- FIX: Defined props for ProjectCard ---
interface ProjectCardProps {
  project: Project;
  index: number;
}

// =================================================================================
// --- 2. YOUR PROJECT DATA (NOW TYPED) ---
// =================================================================================

// --- FIX: Applied the Project[] type to your array ---
const futuristicProjects: Project[] = [
  {
    title: "135 MWe Thorium Molten Salt Reactor (TMSR)",
    description:
      "Advanced to Teknofest national finals. This project involved modeling a 135 MWe TMSR coupled to a supercritical CO₂ Brayton cycle, successfully attaining a 45% net thermal efficiency.",
    images: [
      "/project_images/supercritical (31).png", // <-- New
      "/project_images/supercritical (32).png", // <-- New
      "/project_images/supercritical (33).png", // <-- New
      "/project_images/supercritical (34).png", // <-- New
    ],
    status: "Competition",
    category: "Nuclear Engineering",
    tags: ["Teknofest", "TMSR", "Nuclear Fusion", "ANSYS", "45% Efficiency"],
    url: "#",
    icon: <Radiation className="w-5 h-5" />,
    awardText: "Competition Finalist",
    competition: "Teknofest 2024",
  },
  {
    title: "Hybrid EV Battery Thermal Management",
    description:
      "Reached Teknofest finals by designing a hybrid cooling system for EV batteries. Integrated nanofluids, PCM, and microchannels to decrease surface temperatures by 31% and mitigate thermal runaway.",
    images: [
      "/project_images/battt.jpeg", // <-- New
      "/project_images/battttt.jpeg",
    ],
    status: "Competition",
    category: "Thermal & Fluid Systems",
    tags: ["Teknofest", "EV Battery", "Thermal Management", "31% Reduction"],
    url: "#",
    icon: <CircuitBoard className="w-5 h-5" />,
    awardText: "Competition Finalist",
    competition: "Teknofest 2024",
  },
  {
    title: "Waste-to-Energy Supercapacitors",
    description:
      "Won 3rd place in the YES Challenge. Led the EcoEnergy team in developing a complete business and technical model for creating sustainable supercapacitor solutions from food waste.",
    images: [
      "/project_images/yes.jpeg",
      "/project_images/yess.jpeg",
    ],
    status: "Award Winner",
    category: "Sustainable Materials",
    tags: ["YES Challenge", "Supercapacitor", "Food Waste", "Sustainability"],
    url: "#",
    icon: <Leaf className="w-5 h-5" />,
    awardText: "3rd Place Winner",
    competition: "YES Challenge 2023",
  },

  {
    title: "AI for Oncology Biomarker Analysis",
    description:
      "Led a 5-member team to the semifinals of the 3T in Oncology Competition. Developed an AI MVP to analyze lung cancer biomarkers from medical data.",
    images: [
      "/project_images/supercritical (38).png", // <-- New
      "/project_images/supercritical (39).png", // <-- New
    ],
    status: "Competition",
    category: "AI / HealthTech",
    tags: ["AI", "HealthTech", "Biomarkers", "Semifinalist"],
    url: "#",
    icon: <Microscope className="w-5 h-5" />,
    awardText: "Competition Semifinalist",
    competition: "3T in Oncology 2025",
  },
  {
    title: "AI-Driven Vertical Farming System",
    description:
      "Led team to the Eksim Pulse Ideathon finals. Developed a concept for an AI-driven vertical farming system focused on resource optimization and sustainability.",
    images: [
      "/project_images/Screenshot_8-11-2025_233637_www.canva.com.jpeg",
    ],
    status: "Competition",
    category: "AI / AgriTech",
    tags: ["AI", "Vertical Farming", "Ideathon", "Sustainability"],
    url: "#",
    icon: <Lightbulb className="w-5 h-5" />,
    awardText: "Ideathon Finalist",
    competition: "Eksim Pulse Ideathon 2025",
  },
  {
    title: "MoodSense: AI Psychology App",
    description:
      "Led a 10-member team to the semifinals of the 'Technological Applications in Psychology Competition'. Developed an AI-powered MVP to analyze psychophysiological data.",
    images: [
      "/project_images/Screenshot_8-11-2025_233547_www.canva.com.jpeg",
    ],
    status: "Competition",
    category: "AI / HealthTech",
    tags: ["AI", "HealthTech", "Psychology", "MVP", "Semifinalist"],
    url: "#",
    icon: <BrainCircuit className="w-5 h-5" />,
    awardText: "Competition Semifinalist",
    competition: "Technological Applications in Psychology",
  },
  {
    title: "TÜBİTAK 2209A: Supercapacitor Research",
    description:
      "As a TÜBİTAK Undergraduate Researcher, developed novel supercapacitor electrodes from food-waste carbon, achieving 7.98 F/g capacitance. Conducted 27+ CV, GCD, and EIS tests.",
    images: [
      "/project_images/supercritical (36).png", // <-- New
      "/project_images/supercritical (37).png", // <-- New
    ],
    status: "Research Complete",
    category: "Materials Science",
    tags: ["TÜBİTAK", "Supercapacitor", "7.98 F/g", "EIS", "OriginPro"],
    url: "#", // Can link to a paper or presentation
    icon: <FlaskConical className="w-5 h-5" />,
  },
  {
    title: "Clean Energy Lab: PV Spray-Cooling",
    description:
      "Internship project. Designed and optimized a 6-nozzle spray-cooling system for 80W PV panels, increasing efficiency by 30.7% and decreasing surface temperatures by 47%.",
    images: [
      "/project_images/supercritical (35).png", // <-- New
    ],
    status: "Published Research",
    category: "Renewable Energy",
    tags: ["PV Cooling", "30.7% Efficiency", "Thermal Management", "Internship"],
    url: "#", // Can link to the conference paper
    icon: <TrendingUp className="w-5 h-5" />,
  },
];
// =================================================================================

// --- COMPONENT: Image Carousel (Theme-Swapped) ---
// --- FIX: Applied the ImageCarouselProps type ---
const ImageCarousel = memo(({ images, title }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = useCallback(
    () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)),
    [images.length]
  );
  const goToNext = useCallback(
    () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)),
    [images.length]
  );

  return (
    <div className="relative h-full w-full overflow-hidden group/carousel">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="relative h-full w-full flex-shrink-0">
            <img
              src={src}
              alt={`${title} - view ${index + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            {/* This gradient is now part of the carousel itself */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-700/50 bg-black/60 p-2 text-white opacity-0 backdrop-blur-md transition-all hover:scale-110 hover:border-purple-400/80 hover:bg-purple-500/80 group-hover/carousel:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-700/50 bg-black/60 p-2 text-white opacity-0 backdrop-blur-md transition-all hover:scale-110 hover:border-purple-400/80 hover:bg-purple-500/80 group-hover/carousel:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-6 bg-purple-400"
                    : "w-3 bg-slate-600/70 hover:bg-slate-500"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
});
ImageCarousel.displayName = "ImageCarousel";

// --- COMPONENT: StatusBadge (Updated with CV data) ---
// --- FIX: Applied the StatusBadgeProps type ---
const StatusBadge = memo(({ status }: StatusBadgeProps) => {
  const statusConfig = {
    Competition: {
      icon: <Rocket size={14} />,
      bg: "bg-gradient-to-br from-indigo-600/30 to-blue-600/30",
      border: "border-blue-500/40",
      text: "text-blue-300",
      pulse: "bg-blue-400",
    },
    "Award Winner": {
      icon: <Award size={14} />,
      bg: "bg-gradient-to-br from-amber-600/30 to-orange-600/30",
      border: "border-amber-500/40",
      text: "text-amber-300",
      pulse: "bg-amber-400",
    },
    Published: {
      icon: <FileText size={14} />,
      bg: "bg-gradient-to-br from-purple-600/30 to-fuchsia-600/30",
      border: "border-purple-500/40",
      text: "text-purple-300",
      pulse: "bg-purple-400",
    },
    "Research Complete": {
      icon: <FlaskConical size={14} />,
      bg: "bg-gradient-to-br from-cyan-600/30 to-teal-600/30",
      border: "border-cyan-500/40",
      text: "text-cyan-300",
      pulse: "bg-cyan-400",
    },
    "Published Research": {
      icon: <TrendingUp size={14} />,
      bg: "bg-gradient-to-br from-emerald-600/30 to-green-600/30",
      border: "border-emerald-500/40",
      text: "text-emerald-300",
      pulse: "bg-emerald-400",
    },
  };
  const config = statusConfig[status] || {
    icon: null,
    bg: "bg-slate-800/50",
    border: "border-slate-700",
    text: "text-slate-300",
    pulse: "bg-slate-500",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md",
        config.bg,
        config.border,
        config.text
      )}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span
          className={cn(
            "absolute inline-flex h-full w-full rounded-full animate-ping opacity-75",
            config.pulse
          )}
        ></span>
        <span
          className={cn(
            "relative inline-flex h-2.5 w-2.5 rounded-full",
            config.pulse
          )}
        ></span>
      </span>
      {config.icon}
      <span>{status}</span>
    </div>
  );
});
StatusBadge.displayName = "StatusBadge";

// --- NEW COMPONENT: AwardBadge (Replaces FinalistBadge) ---
// --- FIX: Applied the AwardBadgeProps type ---
const AwardBadge = ({ text, competition }: AwardBadgeProps) => (
  <div className="mt-4 flex items-center gap-3 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-2 text-sm">
    <div className="relative">
      <Award className="h-6 w-6 text-purple-300" />
      <div className="absolute -inset-1.5 animate-pulse rounded-full bg-purple-400/30 blur-sm" />
    </div>
    <div className="flex flex-col">
      <span className="font-semibold text-purple-200">{text}</span>
      <span className="text-xs text-purple-300/80">{competition}</span>
    </div>
  </div>
);

// --- COMPONENT: ProjectCard (Theme-Swapped & Logic Updated) ---
// --- FIX: Applied the ProjectCardProps type ---
const ProjectCard = memo(({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 font-sans shadow-2xl shadow-black/40 backdrop-blur-xl"
    >
      <div
        className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at center, rgba(168, 85, 247, 0.15), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 z-0 rounded-2xl border border-transparent transition-colors duration-500 group-hover:border-purple-400/50" />

      <div className="relative h-[60%] w-full overflow-hidden">
        <ImageCarousel images={project.images} title={project.title} />
      </div>

      <div className="flex flex-grow flex-col p-6">
        <h3 className="text-lg font-bold tracking-tight text-slate-100">
          {project.title}
        </h3>
        <div className="mt-2 flex items-center gap-3">
          <StatusBadge status={project.status} />
          <span className="text-slate-500">|</span>
          <p className="text-sm text-slate-400">{project.category}</p>
        </div>

        <p className="mt-4 flex-grow text-sm text-slate-400 line-clamp-2">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-purple-300 ring-1 ring-inset ring-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* --- UPDATED: Uses new AwardBadge component --- */}
        {project.awardText && project.competition && (
          <AwardBadge
            text={project.awardText}
            competition={project.competition}
          />
        )}

        {/* --- "VIEW DETAILS" BUTTON SECTION REMOVED AS REQUESTED --- */}
        
      </div>
    </motion.div>
  );
});
ProjectCard.displayName = "ProjectCard";

// --- COMPONENT: FuturisticBadge (Header) ---
const FuturisticBadge = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    viewport={{ once: true }}
    className="mb-8 inline-flex items-center justify-center gap-3 rounded-full border border-purple-500/30 bg-black/50 px-5 py-2.5 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
  >
    <div className="flex items-center gap-3">
      <div className="relative flex h-3 w-3">
        <div className="absolute h-full w-full animate-ping rounded-full bg-purple-400"></div>
        <div className="h-3 w-3 rounded-full bg-purple-500"></div>
      </div>
      <Layers3 className="h-6 w-6 text-purple-400" />
      <div className="h-5 w-px bg-purple-500/50"></div>
      <span className="text-sm font-medium uppercase tracking-wider text-purple-300">
        Engineering Portfolio
      </span>
    </div>
  </motion.div>
);

// --- MAIN SECTION COMPONENT (Theme-Swapped) ---
export default function MechanicalProjects() {
  return (
    <>
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) rotate(15deg);
          }
          100% {
            transform: translateX(100%) rotate(1NORMALdeg);
          }
        }
        .futuristic-button .shimmer {
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .futuristic-button:hover .shimmer {
          opacity: 1;
        }
      `}</style>
      <section
        id="projects"
        className="relative overflow-hidden bg-black py-24 md:py-32"
      >
        {/* --- Backgrounds (Theme-Swapped) --- */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-purple-900/5 to-black" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient_stops))] from-purple-900/10 via-transparent to-transparent" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.03)_1px,_transparent_1px)] [background-size:20px_20px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <FuturisticBadge />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 text-4xl font-bold tracking-tight text-transparent bg-gradient-to-br from-white via-neutral-300 to-purple-300 bg-clip-text md:text-6xl"
            >
              Projects & Research
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mx-auto max-w-3xl text-lg text-neutral-400"
            >
              A showcase of my hands-on experience in research, competition,
              and development.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {futuristicProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}