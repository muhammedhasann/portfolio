"use client"; // <-- THIS IS THE CRITICAL FIX

import React from 'react';
import dynamic from 'next/dynamic';

// --- THESE COMPONENTS LOAD INSTANTLY ---
import HeroSection from "@/components/hero-section";
import AboutMe from "@/components/modern-about";
import { ModernSkills } from "@/components/modern-skills";

// --- LAZY LOAD ALL HEAVY SECTIONS ---

const GeminiSection = dynamic(() => import('@/components/google-gemini-effect').then(mod => mod.GeminiSection));

// Lazy load your project/image galleries
const ResearchSection = dynamic(() => import('@/components/research-section').then(mod => mod.ResearchSection));
const ExperienceSection = dynamic(() => import('@/components/experience-section').then(mod => mod.ExperienceSection));
const MechanicalProjects = dynamic(() => import('@/components/mechanical-projects'));
const CadDesignGallery = dynamic(() => import('@/components/CadDesignGallery'));
const EnhancedProjectsSection = dynamic(() => import('@/components/enhanced-projects-section').then(mod => mod.EnhancedProjectsSection));
const YouTubeShowcase = dynamic(() => import('@/components/youtube-showcase').then(mod => mod.YouTubeShowcase));
const SocialFeedSection = dynamic(() => import('@/components/social-feed-section').then(mod => mod.SocialFeedSection));
const ContactSection = dynamic(() => import('@/components/contact-section'));

// We rename the function to avoid conflicts
export default function HomeClient() {
  return (
    // --- THIS IS THE FIX ---
    // Added className="relative" to fix the Framer Motion warning
    <main className="relative">
      <div>
        {/* --- THESE LOAD FIRST AND FAST --- */}
        <HeroSection />
        <GeminiSection /> 
        <AboutMe />
        <ModernSkills />

        {/* --- THESE WILL NOW ONLY LOAD AS YOU SCROLL DOWN --- */}
        <ResearchSection />
        <ExperienceSection />
        <MechanicalProjects />
        <CadDesignGallery />
        <EnhancedProjectsSection />
        <YouTubeShowcase />
        <SocialFeedSection />
        <ContactSection />
      </div>
    </main>
  );
}