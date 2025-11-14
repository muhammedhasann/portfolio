// app/components/ui/navbar.tsx

"use client";

import React,
{
  useState,
  useEffect,
  useRef
} from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Home,
  User,
  Lightbulb,
  Bot,
  Microscope,
  Briefcase,
  Mail,
  Youtube,
  Rss,
  Command, // Using the Command icon you liked
  Search // Keeping the visual search bar
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- 1. NAVIGATION LINKS ---
const navLinks = [
  { id: "home", name: "Home", href: "#home", icon: Home },
  { id: "about", name: "About", href: "#about", icon: User },
  { id: "skills", name: "Skills", href: "#skills", icon: Lightbulb },
  { id: "projects", name: "Projects", href: "#projects", icon: Bot },
  { id: "experience", name: "Experience", href: "#experience", icon: Briefcase },
  { id: "research", name: "Research", href: "#research", icon: Microscope },
  { id: "youtube", name: "Showcase", href: "#youtube", icon: Youtube },
  { id: "social-feed", name: "Feed", href: "#social-feed", icon: Rss },
  { id: "contact", name: "Contact", href: "#contact", icon: Mail },
];

// --- 2. SOCIAL MEDIA LINKS ---
const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/muhammedhasann",
    icon: Github,
    ariaLabel: "Visit GitHub profile",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.in/in/muhammedhaan/",
    icon: Linkedin,
    ariaLabel: "Visit LinkedIn profile",
  },
  {
    name: "X",
    href: "https://x.com/Muhammed__Hasan",
    icon: X,
    ariaLabel: "Visit X (Twitter) profile",
  },
];

// --- 3. MAIN NAVBAR COMPONENT ---
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(navLinks[0].id);
  const { scrollY } = useScroll();
  const sectionRefs = useRef < Record < string, HTMLElement >> ({});

  // --- Scroll Progress Bar ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // --- 4. SCROLL-SPY LOGIC ---
  useEffect(() => {
    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) {
        sectionRefs.current[link.id] = el;
      }
    });

    const handleScroll = () => {
      const currentScrollY = scrollY.get();
      let currentActive = navLinks[0].id;
      for (const link of navLinks) {
        const el = sectionRefs.current[link.id];
        if (el && el.offsetTop <= currentScrollY + 150) {
          currentActive = link.id;
        }
      }
      setActiveLink(currentActive);
    };

    handleScroll();
    const unsubscribeScroll = scrollY.onChange(handleScroll);
    return () => unsubscribeScroll();
  }, [scrollY]);
  
  // --- Close palette on ESC key ---
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // --- 5. JSX (Dark/Cyan Theme) ---
  return (
    <>
      {/* ======================================= */}
      {/* === 5.1 SCROLL PROGRESS BAR         === */}
      {/* ======================================= */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-400 origin-left z-[60]" // UPDATED: Orange color
        style={{ scaleX }}
      />
      
      {/* ======================================= */}
      {/* === 5.2 FLOATING "COMMAND" BUTTON   === */}
      {/* ======================================= */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        // UPDATED: Applied your gradient CTA styles
        className="fixed top-6 right-6 md:top-8 md:right-8 z-50
                   flex h-14 w-14 items-center justify-center
                   rounded-full bg-gradient-to-r from-orange-400 to-cyan-500
                   text-black
                   shadow-lg shadow-orange-500/30"
        aria-label="Open navigation menu"
      >
        <Command className="h-6 w-6" /> {/* Icon color will be inherited (text-black) */}
      </motion.button>
      
      {/* =============================================== */}
      {/* === 5.3 FULLSCREEN "COMMAND PALETTE" MENU   === */}
      {/* =============================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="command-palette-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] h-screen w-full bg-black/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            {/* --- Menu Content --- */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-8 left-1/2 -translate-x-1/2
                         w-full max-w-xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col w-full bg-neutral-900/80 backdrop-blur-xl rounded-xl border border-neutral-700/80 shadow-2xl">
                
                {/* --- Visual Search Bar --- */}
                <div className="flex items-center gap-3 p-4 border-b border-neutral-700/80">
                  <Search className="h-5 w-5 text-neutral-500" />
                  <span className="text-neutral-500 text-lg">Navigate to...</span>
                </div>
                
                {/* --- Main Links --- */}
                <nav className="flex flex-col space-y-1 p-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.id}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-4 px-4 py-3 text-lg font-medium rounded-lg transition-colors",
                        activeLink === link.id
                          ? "bg-neutral-800 text-white" 
                          : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                      )}
                    >
                      <link.icon className={cn(
                        "h-5 w-5",
                        // UPDATED: Active icon color to match gradient
                        activeLink === link.id ? "text-cyan-400" : "text-neutral-500" 
                      )} />
                      {link.name}
                    </Link>
                  ))}
                </nav>

                {/* --- Divider --- */}
                <div className="h-px bg-neutral-700/80 my-2" />

                {/* --- Socials --- */}
                <div className="flex justify-center space-x-4 p-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="p-2 text-neutral-400 hover:text-white transition-colors"
                    >
                      <social.icon className="h-6 w-6" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}