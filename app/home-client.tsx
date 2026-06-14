"use client";
import React from "react";
import dynamic from "next/dynamic";

// ─────────────────────────────────────────────
// HERO — loads instantly (NOT lazy)
// This is the first thing Google and users see.
// ─────────────────────────────────────────────
import HeroSection from "@/components/hero-section";

// ─────────────────────────────────────────────
// SKELETON LOADER
// Shows a smooth pulsing placeholder while each
// section's JavaScript is loading. Much better
// UX than a blank white flash.
// ─────────────────────────────────────────────
function SectionSkeleton({ height = "h-96" }: { height?: string }) {
  return (
    <div className={`w-full ${height} flex items-center justify-center py-8`}>
      <div className="w-full max-w-6xl mx-auto px-6 space-y-5 animate-pulse">
        {/* Fake section title */}
        <div className="h-7 bg-white/5 rounded-lg w-48" />
        {/* Fake subtitle */}
        <div className="h-4 bg-white/5 rounded w-96 max-w-full" />
        <div className="h-4 bg-white/5 rounded w-72 max-w-full" />
        {/* Fake cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
          <div className="h-44 bg-white/5 rounded-xl" />
          <div className="h-44 bg-white/5 rounded-xl" />
          <div className="h-44 bg-white/5 rounded-xl hidden lg:block" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// LAZY-LOADED SECTIONS
// Each section only downloads its JS when needed.
// The `loading` prop shows the skeleton while it loads.
// ─────────────────────────────────────────────
const AboutMe = dynamic(() => import("@/components/modern-about"), {
  loading: () => <SectionSkeleton height="min-h-screen" />,
});

const ExperienceSection = dynamic(
  () =>
    import("@/components/experience-section").then(
      (mod) => mod.ExperienceSection
    ),
  { loading: () => <SectionSkeleton /> }
);

const ResearchSection = dynamic(
  () =>
    import("@/components/research-section").then((mod) => mod.ResearchSection),
  { loading: () => <SectionSkeleton /> }
);

const MechanicalProjects = dynamic(
  () => import("@/components/mechanical-projects"),
  { loading: () => <SectionSkeleton height="min-h-screen" /> }
);

const CadDesignGallery = dynamic(
  () => import("@/components/CadDesignGallery"),
  { loading: () => <SectionSkeleton /> }
);

const EnhancedProjectsSection = dynamic(
  () =>
    import("@/components/enhanced-projects-section").then(
      (mod) => mod.EnhancedProjectsSection
    ),
  { loading: () => <SectionSkeleton /> }
);

const ModernSkills = dynamic(
  () =>
    import("@/components/modern-skills").then((mod) => mod.ModernSkills),
  { loading: () => <SectionSkeleton /> }
);

const GeminiSection = dynamic(
  () =>
    import("@/components/google-gemini-effect").then(
      (mod) => mod.GeminiSection
    ),
  { loading: () => <SectionSkeleton height="h-64" /> }
);

const YouTubeShowcase = dynamic(
  () =>
    import("@/components/youtube-showcase").then((mod) => mod.YouTubeShowcase),
  { loading: () => <SectionSkeleton height="h-64" /> }
);

const SocialFeedSection = dynamic(
  () =>
    import("@/components/social-feed-section").then(
      (mod) => mod.SocialFeedSection
    ),
  { loading: () => <SectionSkeleton height="h-64" /> }
);

const ContactSection = dynamic(
  () => import("@/components/contact-section"),
  { loading: () => <SectionSkeleton /> }
);

// ─────────────────────────────────────────────
// PAGE
// Order is optimised for PhD applications:
// 1. Who you are (Hero)
// 2. Your story (About)
// 3. Where you've worked (Experience)
// 4. What you've published (Research) ← critical for PhD
// 5. What you've built (Projects)    ← critical for PhD
// 6. What tools you use (Skills)
// 7. Content (YouTube, Social)
// 8. Contact
// ─────────────────────────────────────────────
export default function HomeClient() {
  return (
    <main className="relative">

      {/* ── 1. HERO ─────────────────────────────── */}
      <HeroSection />

      {/* ── 2. ABOUT ────────────────────────────── */}
      <div id="about">
        <AboutMe />
      </div>

      {/* ── 3. EXPERIENCE ───────────────────────── */}
      <div id="experience">
        <ExperienceSection />
      </div>

      {/* ── 4. RESEARCH ─────────────────────────── */}
      <div id="research">
        <ResearchSection />
      </div>

      {/* ── 5. PROJECTS ─────────────────────────── */}
      <div id="projects">
        <MechanicalProjects />
        <CadDesignGallery />
        <EnhancedProjectsSection />
      </div>

      {/* ── 6. SKILLS ───────────────────────────── */}
      <div id="skills">
        <ModernSkills />
      </div>

      {/* ── 7. GEMINI EFFECT (visual) ───────────── */}
      <GeminiSection />

      {/* ── 8. YOUTUBE ──────────────────────────── */}
      <div id="youtube">
        <YouTubeShowcase />
      </div>

      {/* ── 9. SOCIAL FEED ──────────────────────── */}
      <div id="social-feed">
        <SocialFeedSection />
      </div>

      {/* ── 10. CONTACT ─────────────────────────── */}
      <ContactSection />

    </main>
  );
}