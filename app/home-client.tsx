"use client"; // <-- This is correct

import React from 'react';
import dynamic from 'next/dynamic';

// --- THESE COMPONENTS LOAD INSTANTLY ---
import HeroSection from "@/components/hero-section"; 

// --- LAZY LOAD ALL HEAVY SECTIONS ---
// We can preload the AboutMe section as it's next.
const AboutMe = dynamic(() => import('@/components/modern-about'));
const ModernSkills = dynamic(() => import('@/components/modern-skills').then(mod => mod.ModernSkills));
const GeminiSection = dynamic(() => import('@/components/google-gemini-effect').then(mod => mod.GeminiSection));
const ResearchSection = dynamic(() => import('@/components/research-section').then(mod => mod.ResearchSection));
const ExperienceSection = dynamic(() => import('@/components/experience-section').then(mod => mod.ExperienceSection));
const MechanicalProjects = dynamic(() => import('@/components/mechanical-projects'));
const CadDesignGallery = dynamic(() => import('@/components/CadDesignGallery'));
const EnhancedProjectsSection = dynamic(() => import('@/components/enhanced-projects-section').then(mod => mod.EnhancedProjectsSection));
const YouTubeShowcase = dynamic(() => import('@/components/youtube-showcase').then(mod => mod.YouTubeShowcase));
const SocialFeedSection = dynamic(() => import('@/components/social-feed-section').then(mod => mod.SocialFeedSection));
const ContactSection = dynamic(() => import('@/components/contact-section'));


export default function HomeClient() {
  return (
    <main className="relative">
      {/* --- PHD APPLICATION RE-ORDER ---
        This layout is now optimized to show what's most important
        to an academic admissions committee:
        1. Hero (Who you are)
        2. About (Education, Achievements, Story)
        3. Research (Your formal publications)
        4. Projects (Your applied research skills)
        5. Skills (Your technical toolkit)
        6. Experience (Your lab/work history)
        7. Other (YouTube, Social)
      */}
      
      {/* 1. HERO */}
      {/* HeroSection component now has id="home" inside it */}
      <HeroSection />

      {/* 2. ABOUT, EDUCATION, KEY ACHIEVEMENTS */}
      <div id="about">
        <AboutMe />
      </div>
        <GeminiSection /> 
      <div id="experience">
        <ExperienceSection />
      </div>
      {/* 3. RESEARCH (Publications) - CRITICAL FOR PHD */}
      <div id="research">
        <ResearchSection />
      </div>
      
      {/* 4. PROJECTS (Applied Research) - CRITICAL FOR PHD */}
      {/* We group all project-related sections under a single 'projects' id */}
      <div id="projects">
        <EnhancedProjectsSection />
        <MechanicalProjects />
        <CadDesignGallery />
      </div>

      {/* 5. SKILLS (Technical Toolkit) */}
      <div id="skills">
        <ModernSkills />
      </div>

      {/* 6. EXPERIENCE (Lab/Work History) */}

      
      {/* 7. OTHER SECTIONS (Less relevant for PhD) */}
      <div id="youtube">
        <YouTubeShowcase />
      </div>

      <div id="social-feed">
        <SocialFeedSection />
      </div>

      {/* 8. CONTACT */}
      {/* ContactSection component should have id="contact" inside it */}
      <ContactSection />
    </main>
  );
}