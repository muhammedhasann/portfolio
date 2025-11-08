"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  BookOpen,
  MapPin,
  Hash,
  ExternalLink,
  Zap,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const publications = [
  {
    title: "Comparative assessment of photovoltaic cell temperature models in HOMER Pro",
    authors: "FB M. Hasan",
    conference: "7th International Boğaziçi Scientific Research Congress",
    location: "Istanbul, Turkey",
    year: "2025",
    abstract: "A comprehensive comparative analysis of PV cell temperature models in HOMER Pro and their impact on power output performance.",
    keywords: ["PV Systems", "HOMER Pro", "Temp. Modeling", "Solar Energy"],
    url: "https://scholar.google.com/citations?user=W8Y2d44AAAAJ&hl=en",
    status: "Published",
    impact: "Energy Efficiency"
  },
  {
    title: "Impact of different ambient temperatures and discharge rates on the thermal performance",
    authors: "FB M. Hasan",
    conference: "4th Sivas International Conference on Scientific and Innovation Research",
    location: "Sivas, Turkey",
    year: "2025",
    abstract: "Investigation of thermal behaviour of Li-ion battery packs under varying ambient temperatures and discharge rates.",
    keywords: ["Li-ion Batteries", "Thermal Management", "Energy Storage"],
    url: "https://scholar.google.com/citations?user=W8Y2d44AAAAJ&hl=en",
    status: "Published",
    impact: "Battery Innovation"
  },
];

const GoogleScholarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
    <path fill="#34D399" d="M338.7 180.4c-26.5 0-48.4 21.9-48.4 48.4s21.9 48.4 48.4 48.4 48.4-21.9 48.4-48.4-21.9-48.4-48.4-48.4zM512 228.8c0-13.3-1.2-26.5-3.5-39.3-7.1-36.2-28-68.7-58.3-90.2-29.2-20.4-65.2-31.5-103.1-31.5-81.2 0-151.1 56.2-171.1 132.2-2.4 9-4.2 18.3-5.5 27.8h179.8c2.8-19.6 20.4-34.8 41.5-34.8 22.8 0 41.5 18.6 41.5 41.5s-18.6 41.5-41.5 41.5H169.3c-2.4 17.8-3.5 36.2-3.5 55 0 81.2 66.4 147.6 147.6 147.6 46.5 0 87.8-21.9 116.8-56.2 22.8-26.5 37.4-61.1 39.9-99.6 2.4-13.3 3.5-26.5 3.5-39.9z"/>
  </svg>
);

const OrcidIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-6 h-6">
    <path fill="#34D399" d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0z"/>
    <path fill="#FFF" d="M158.8 204.3h-13.4c-4.4 0-8.5-1.2-12.2-3.5l-1.2-0.8c-2.7-1.8-5.5-4-8.2-6.5V102.4h25v90.9c0 3.7 3 6.7 6.7 6.7h3.1V204.3z"/>
    <path fill="#FFF" d="M112.1 69.1h33.8v22.2h-33.8V69.1z"/>
  </svg>
);

const SectionBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-3 mb-8 px-6 py-2.5 bg-black/50 border border-emerald-500/30 rounded-full shadow-[0_0_30px_rgba(45,212,191,0.4)] backdrop-blur-sm"
  >
    <div className="relative flex items-center justify-center">
      <div className="absolute w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
    </div>
    <FileText className="w-5 h-5 text-green-400" />
    <div className="w-px h-5 bg-green-500/40"></div>
    <span className="text-sm font-medium text-green-200 tracking-wider uppercase">
      Research & Publications
    </span>
  </motion.div>
);

const SectionHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-center mb-20"
  >
    <SectionBadge />
    <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-zinc-50 to-zinc-300 bg-clip-text text-transparent leading-tight tracking-tight">
      Scientific Contributions
    </h2>
    <p className="text-lg text-zinc-400 max-w-3xl mx-auto mt-6 leading-relaxed">
      Disseminating research findings in peer-reviewed international conferences and journals.
    </p>
  </motion.div>
);

const PublicationCard = ({ pub, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
    viewport={{ once: true }}
    className="group relative h-full flex flex-col"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-500 blur-md"></div>
    <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:border-emerald-500/30">
      <div className="absolute top-6 right-6 z-20">
        <span className="text-sm font-mono text-green-200 bg-green-900/50 px-3 py-1.5 rounded-full border border-green-500/30 shadow-lg">
          {pub.year}
        </span>
      </div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-2 text-sm font-medium text-emerald-300 bg-emerald-900/30 px-3 py-1 rounded-full">
            <Zap className="w-4 h-4 text-emerald-400"/> {pub.impact}
          </span>
          <div className="h-4 w-px bg-white/10"></div>
          <span className="flex items-center gap-2 text-sm font-medium text-green-300 bg-green-900/30 px-3 py-1 rounded-full">
            <CheckCircle className="w-4 h-4 text-green-400"/> {pub.status}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-zinc-50 leading-snug transition-colors group-hover:text-emerald-300">
          {pub.title}
        </h3>
      </div>
      <div className="flex-grow mb-6">
        <p className="text-zinc-400 leading-relaxed text-[15px] mb-6">{pub.abstract}</p>
        <div className="space-y-3 text-sm text-zinc-300 border-t border-white/10 pt-5">
          <div className="flex items-start gap-3">
            <Users className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <span className="font-medium">{pub.authors}</span>
          </div>
          <div className="flex items-start gap-3">
            <BookOpen className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span>{pub.conference}</span>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span>{pub.location}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {pub.keywords.map((tag) => (
          <div key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full transition-all hover:bg-emerald-900/30 hover:border-emerald-500/30">
            <Hash className="w-3 h-3 text-emerald-400/80" />
            <span className="text-xs text-zinc-300 font-light tracking-wide">{tag}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <button
          onClick={() => window.open(pub.url.trim(), "_blank")}
          className="w-full group/btn relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-semibold text-white transition-all duration-300 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl hover:from-emerald-500 hover:to-green-500"
        >
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></span>
          <span className="relative z-10 flex items-center gap-2">
            View Publication <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </span>
        </button>
      </div>
    </div>
  </motion.div>
);

// ✅ CLEANED: PortfolioAccess & ProfileLinkCard
const ProfileLinkCard = ({ icon, name, description, url }) => (
  <a
    href={url.trim()}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-4 p-6 bg-gray-900/40 border border-gray-800 rounded-xl hover:border-emerald-500/30 transition-colors"
  >
    <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-white text-lg">{name}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
    <div className="ml-auto text-emerald-400">
      <ExternalLink className="w-4 h-4" />
    </div>
  </a>
);

const PortfolioAccess = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    viewport={{ once: true }}
    className="mt-24"
  >
    <div className="text-center mb-12">
      <h3 className="text-2xl font-semibold text-white mb-2">Academic Profiles</h3>
      <p className="text-gray-500 max-w-2xl mx-auto">
        Access my full publication list and citation metrics.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <ProfileLinkCard
        icon={<GoogleScholarIcon />}
        name="Google Scholar"
        description="Publications & Citations"
        url="https://scholar.google.com/citations?user=W8Y2d44AAAAJ&hl=en"
      />
      <ProfileLinkCard
        icon={<OrcidIcon />}
        name="ORCID"
        description="0009-0007-3563-3851"
        url="https://orcid.org/0009-0007-3563-3851"
      />
    </div>
  </motion.div>
);

export  function ResearchSection() {
  return (
    <section id="publications" className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-green-900/10 to-black z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.03)_1px,transparent_1px)] bg-[size:30px_30px] z-0" />
      <div className="absolute inset-0 opacity-20 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10 px-4">
        <SectionHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {publications.map((pub, index) => (
            <PublicationCard key={index} pub={pub} index={index} />
          ))}
        </div>
        <PortfolioAccess />
      </div>
    </section>
  );
}