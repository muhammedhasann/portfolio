"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHexagon } from "react-icons/fi";
import {
  FaPython,
  FaNodeJs,
  FaGitAlt,
  FaDatabase, // For SQL
  FaReact,
  FaDocker,
  FaAws,
  FaFigma,
} from "react-icons/fa";
import {
  SiPytorch,
  SiAnsys,
  SiAutodesk, // Fusion 360
  SiAutocad,
  SiDassaultsystemes, // SolidWorks, CATIA
  SiSiemens, // Added Siemens NX
  SiLabview, // Added LabVIEW
  SiTensorflow, // Added TensorFlow
  SiKeras,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiOpencv,
  SiJupyter,
  SiTypescript,
  SiMongodb,
  SiDjango,
  SiGnubash,
} from "react-icons/si";
import { Code, Atom, Microscope, FileText } from 'lucide-react'; // Lucide icons for new tools/categories

// =================================================================================
// 1. FINAL SKILL DATA (MERGED LIST)
// * This list combines the specific research tools (Pennylane, OriginPro) with 
//   the extensive development and CAE tools you requested.
// =================================================================================
const skills = [
  // --- CORE MECHANICAL & SIMULATION ---
  { name: "ANSYS", label: "Simulation", Icon: SiAnsys, iconColor: "#FFB71B", color: "from-amber-500 to-yellow-400" },
  { name: "Fusion 360", label: "CAD/CAM", Icon: SiAutodesk, iconColor: "#0696D7", color: "from-sky-500 to-blue-600" },
  { name: "SolidWorks", label: "CAD/CAE", Icon: SiDassaultsystemes, iconColor: "#DA291C", color: "from-rose-500 to-red-600" },
  { name: "AutoCAD", label: "CAD/Design", Icon: SiAutocad, iconColor: "#EB2027", color: "from-red-600 to-orange-500" },

  // --- COMPUTATIONAL & QUANTUM ---
  { name: "Python", label: "AI & Computational", Icon: FaPython, iconColor: "#FFD43B", color: "from-blue-500 to-yellow-400" },
  { name: "PyTorch", label: "Deep Learning", Icon: SiPytorch, iconColor: "#EE4C2C", color: "from-orange-600 to-red-500" },
  { name: "Pennylane", label: "Quantum Framework", Icon: Atom, iconColor: "#61DAFB", color: "from-indigo-600 to-purple-600" }, 
  { name: "Cirq", label: "Quantum Framework", Icon: Atom, iconColor: "#FFFFFF", color: "from-gray-700 to-gray-900" }, 
  { name: "TensorFlow", label: "AI & Data Science", Icon: SiTensorflow, iconColor: "#FF6F00", color: "from-orange-400 to-amber-400" }, 
  { name: "Keras", label: "AI & Data Science", Icon: SiKeras, iconColor: "#D00000", color: "from-red-700 to-rose-500" }, 
  { name: "Scikit-learn", label: "AI & Data Science", Icon: SiScikitlearn, iconColor: "#F7931E", color: "from-sky-400 to-orange-400" }, 
  { name: "NumPy", label: "AI & Data Science", Icon: SiNumpy, iconColor: "#4D77CF", color: "from-blue-500 to-indigo-400" }, 
  { name: "Pandas", label: "AI & Data Science", Icon: SiPandas, iconColor: "#130754", color: "from-indigo-600 to-slate-400" }, 
  { name: "Jupyter", label: "AI & Data Science", Icon: SiJupyter, iconColor: "#F37626", color: "from-orange-500 to-amber-400" }, 

  // --- DATA, ANALYSIS & PROFESSIONAL ---
  { name: "OriginPro", label: "Research Analysis", Icon: Microscope, iconColor: "#4D77CF", color: "from-indigo-500 to-purple-600" }, 
  { name: "MS Office / Excel", label: "Data Management", Icon: FileText, iconColor: "#217346", color: "from-green-500 to-lime-400" }, 
  { name: "SQL", label: "Database Management", Icon: FaDatabase, iconColor: "#00758F", color: "from-cyan-700 to-blue-700" }, 
  
  // --- DEVELOPMENT & DEVOPS ---
  { name: "JavaScript", label: "Web Development", Icon: Code, iconColor: "#F7DF1E", color: "from-yellow-400 to-amber-400" },
  { name: "Node.js (Backend)", label: "System Architecture", Icon: FaNodeJs, iconColor: "#339933", color: "from-green-500 to-lime-400" },
  { name: "React", label: "Web & DevOps", Icon: FaReact, iconColor: "#61DAFB", color: "from-cyan-400 to-teal-400" }, 
  { name: "TypeScript", label: "Web & DevOps", Icon: SiTypescript, iconColor: "#3178C6", color: "from-blue-700 to-cyan-500" }, 
  { name: "MongoDB", label: "Web & DevOps", Icon: SiMongodb, iconColor: "#47A248", color: "from-lime-500 to-green-400" }, 
  { name: "Docker", label: "Web & DevOps", Icon: FaDocker, iconColor: "#2496ED", color: "from-sky-500 to-indigo-500" }, 
  { name: "Git / GitHub", label: "Version Control", Icon: FaGitAlt, iconColor: "#F05032", color: "from-orange-500 to-rose-500" }, 
  { name: "Figma", label: "Design Tools", Icon: FaFigma, iconColor: "#F24E1E", color: "from-fuchsia-500 to-purple-600" }, 
];


// =================================================================================
// 2. REUSABLE COMPONENTS (Style Preserved, Filter Logic Removed)
// =================================================================================

const SectionBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true, amount: 0.5 }}
    className="inline-flex items-center gap-3 mb-8 px-6 py-2.5 bg-black/50 border border-cyan-500/40 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.4)] backdrop-blur-sm"
  >
    <div className="relative flex items-center justify-center">
      <div className="absolute w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
      <div className="w-2 h-2 bg-cyan-400 rounded-full" />
    </div>
    <FiHexagon className="w-5 h-5 text-cyan-400" />
    <div className="w-px h-5 bg-cyan-500/40" />
    <span className="text-sm font-medium text-cyan-200 tracking-wider uppercase">
      Technical Expertise Matrix
    </span>
  </motion.div>
);

const SkillCard = ({ skill }: { skill: any }) => {
  const { Icon, iconColor, name, label, color } = skill;
  // Fallback for Lucide icons (Atom, Code, etc.) which don't take inline color attribute directly
  const style = Icon === Atom || Icon === Code || Icon === Microscope || Icon === FileText ? { color: iconColor } : { color: iconColor };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group"
    >
      <div
        className={`relative bg-gradient-to-r ${color} p-[1.5px] rounded-xl hover:shadow-lg transition-all duration-300 backdrop-blur-lg`}
      >
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-[10px] p-4 h-full flex items-center gap-4 border border-white/10 hover:border-cyan-400/30 transition-colors">
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-3xl">
            <Icon style={style} />
          </div>
          <div className="text-left">
            <h3 className="text-white font-semibold text-base">{name}</h3>
            {/* Using 'label' instead of 'category' */}
            <p className="text-gray-400 text-xs">{label}</p> 
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ModernSkills = () => {
  // No activeCategory state needed since filtering is removed

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-black py-24 md:py-32"
    >
      {/* Enhanced background effects (Style Preserved) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-900/10 to-black z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0, 208, 255, 0.03)_1px,transparent_1px)] bg-[size:30px_30px] z-0 opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <SectionBadge />

        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            // Updated text for professional focus
            className="mb-4 text-5xl font-bold tracking-tighter text-transparent bg-gradient-to-br from-white via-slate-300 to-cyan-300 bg-clip-text md:text-7xl"
          >
          System Tools & Computational Toolkit
          </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          // Updated descriptive text
          className="text-neutral-400 mb-12 max-w-3xl mx-auto text-lg"
        >
        </motion.p>
        
        {/* --- CATEGORY FILTER AREA REMOVED AS REQUESTED --- */}


        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
        >
          <AnimatePresence>
            {/* Directly map over the unified skills array */}
            {skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};