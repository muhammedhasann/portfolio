"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import * as LucideIcons from "lucide-react"; // Import all Lucide icons
import { ReactNode } from "react"; // Explicit import for ReactNode

// --- THEME COLORS ---
// Primary: 'cyan'
// Secondary: 'orange'
// Accent: 'blue'
// New: 'purple' (Introduced for Quantum/Nuclear)

// =================================================================================
// Utility Function for Class Names (FIXED: Now supports string, falsy, and object maps)
// =================================================================================
// Define a type that cn can accept: string, falsy values, or an object map
type ClassValue = string | undefined | null | false | { [key: string]: any };

const cn = (...classes: ClassValue[]): string => {
  const processedClasses: string[] = [];

  for (const item of classes) {
    if (typeof item === 'string') {
      processedClasses.push(item);
    } else if (typeof item === 'object' && item !== null) {
      // Handle object: keys are class names, values are boolean conditions
      for (const key in item) {
        // Only include class if the value is truthy
        if (Object.prototype.hasOwnProperty.call(item, key) && item[key]) {
          processedClasses.push(key);
        }
      }
    }
  }

  return processedClasses.filter(Boolean).join(" ");
};

// =================================================================================
// Improved Badge Component
// =================================================================================
interface BadgeProps {
  className?: string;
  variant?: "default" | "cyan" | "orange" | "blue" | "purple";
  children: ReactNode;
  [key: string]: any;
}

const Badge = ({ className, variant = "default", children, ...props }: BadgeProps) => {
  const variants = {
    default: "bg-gray-800/50 text-gray-300 border-gray-700/30",
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    orange: "bg-orange-500/10 text-orange-300 border-orange-500/30",
    blue: "bg-blue-500/10 text-blue-300 border-blue-500/30",
    purple: "bg-purple-500/10 text-purple-300 border-purple-500/30",
  };
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border px-3 py-1 text-xs font-semibold tracking-wide transition-colors focus:outline-none",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// =================================================================================
// Improved Section Badge (More colorful and dynamic)
// =================================================================================
interface SectionBadgeProps {
  icon: React.ComponentType<any>;
  text: string;
}

const SectionBadge = ({ icon: Icon, text }: SectionBadgeProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.8 }}
    className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 bg-gray-900/60 border border-cyan-400/50 rounded-full shadow-[0_0_20px_rgba(79,171,255,0.2)] backdrop-blur-md hover:shadow-[0_0_35px_rgba(249,115,22,0.3)] transition-all duration-500 cursor-pointer"
  >
    <div className="relative flex items-center justify-center">
      <div className="absolute w-3 h-3 bg-cyan-300 rounded-full animate-pulse-slow"></div>
      <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
    </div>
    <Icon className="w-5 h-5 text-orange-300" />
    <span className="text-sm font-medium uppercase tracking-widest text-white/90">
      {text}
    </span>
  </motion.div>
);

// =================================================================================
// Improved Field Card (Glassmorphism + Glow)
// =================================================================================
interface FieldCardProps {
  children: ReactNode;
  delay?: number;
  fieldColor?: "cyan" | "orange" | "blue" | "purple";
}

const FieldCard = ({ children, delay = 0, fieldColor = "cyan" }: FieldCardProps) => {
  const fieldColors = {
    cyan: "hover:shadow-[0_0_50px_rgba(79,171,255,0.4)] hover:border-cyan-400/70",
    orange: "hover:shadow-[0_0_50px_rgba(249,115,22,0.4)] hover:border-orange-500/70",
    blue: "hover:shadow-[0_0_50px_rgba(59,130,246,0.4)] hover:border-blue-500/70",
    purple: "hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] hover:border-purple-500/70",
  };

  const dotColors = {
    cyan: "bg-[radial-gradient(circle_at_center,rgba(79,171,255,0.05)_1px,transparent_1px)]",
    orange: "bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.05)_1px,transparent_1px)]",
    blue: "bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_1px,transparent_1px)]",
    purple: "bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05)_1px,transparent_1px)]",
  };

  const ringColors = {
    cyan: "#0ea5e9",
    orange: "#f97316", 
    blue: "#3b82f6",
    purple: "#a855f7",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
      className={`group relative h-full bg-black/60 backdrop-blur-lg rounded-3xl p-8 border border-white/20 transition-all duration-700 ${fieldColors[fieldColor]} hover:-translate-y-1 overflow-hidden`}
    >
      {/* Sleeker Dot pattern */}
      <div
        className={`absolute inset-0 ${dotColors[fieldColor]} bg-[size:15px_15px] opacity-10 group-hover:opacity-10 transition-opacity duration-500`}
      />
      {/* Subtle Gradient Ring Glow - Fixed inline style */}
      <div
        className={`absolute inset-0 rounded-3xl ring-2 ring-inset ring-transparent group-hover:ring-current transition-all duration-700`}
        style={{
          // @ts-ignore - Custom CSS property for ring color
          '--tw-ring-color': ringColors[fieldColor],
        } as React.CSSProperties}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

// =================================================================================
// Section Header Component
// =================================================================================
interface SectionHeaderProps {
  badgeIcon: React.ComponentType<any>;
  badgeText: string;
  title: string | ReactNode;
  subtitle?: string | ReactNode;
}

const SectionHeader = ({ badgeIcon, badgeText, title, subtitle }: SectionHeaderProps) => (
  <div className="text-center mb-16">
    <SectionBadge icon={badgeIcon} text={badgeText} />
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-4 text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-orange-300 md:text-6xl"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-xl text-gray-300 max-w-3xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// =================================================================================
// Improved Research Timeline
// =================================================================================
interface ResearchTimelineProps {
  children: ReactNode;
  delay?: number;
  isLast?: boolean;
  icon: React.ComponentType<any>;
}

const ResearchTimeline = ({ children, delay = 0, isLast = false, icon: Icon }: ResearchTimelineProps) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.7, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.1 }}
    className="relative flex items-start gap-6 py-8"
  >
    <div className="flex flex-col items-center min-w-[40px] z-10">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-cyan-500 flex items-center justify-center border-2 border-black shadow-xl shadow-cyan-500/30">
        <Icon className="w-4 h-4 text-black font-extrabold" />
      </div>
      {!isLast && (
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          transition={{ delay: delay + 0.5, duration: 1.5 }}
          viewport={{ once: true }}
          className="w-px bg-gradient-to-b from-cyan-500/70 to-transparent mt-2"
        />
      )}
    </div>
    <div className="flex-1 -mt-1">{children}</div>
  </motion.div>
);

// =================================================================================
// Achievement Card (Glass & Glow)
// =================================================================================
interface AchievementCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  impact: string;
  delay?: number;
  color: "cyan" | "orange" | "blue" | "purple";
}

const AchievementCard = ({ icon: Icon, title, description, impact, delay, color }: AchievementCardProps) => {
  const colors = {
    cyan: { text: "text-cyan-400", border: "border-cyan-400/10", shadow: "hover:shadow-[0_0_30px_rgba(79,171,255,0.3)]" },
    orange: { text: "text-orange-400", border: "border-orange-400/10", shadow: "hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]" },
    blue: { text: "text-blue-400", border: "border-blue-400/10", shadow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]" },
    purple: { text: "text-purple-400", border: "border-purple-400/10", shadow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]" },
  };
  const c = colors[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.5 }}
      className={`group relative h-full overflow-hidden rounded-2xl bg-black/60 backdrop-blur-lg p-8 border ${c.border} transition-all duration-500 hover:scale-[1.02] ${c.shadow}`}
    >
      <div className="flex flex-col items-center text-center h-full">
        <div className="mb-5">
          <Icon className={`h-10 w-10 ${c.text}`} />
        </div>
        <p className={`text-sm font-bold uppercase tracking-widest ${c.text} mb-3`}>{impact}</p>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

// =================================================================================
// Modern Card with Mouse-Following Spotlight (Optimized)
// =================================================================================
interface ModernCardProps {
  children: ReactNode;
  delay?: number;
  color?: "cyan" | "orange" | "blue" | "purple";
  className?: string;
  variant?: string;
}

const ModernCard = ({ children, delay = 0, color = "cyan", className, variant }: ModernCardProps) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const colorStops = {
    cyan: "#0ea5e9",
    orange: "#f97316",
    blue: "#3b82f6", 
    purple: "#a855f7",
  };

  const borderMask = useMotionTemplate`
    radial-gradient(
      150px circle at ${mouseX}px ${mouseY}px,
      white,
      transparent 80%
    )
  `;

  const borderBackground = useMotionTemplate`
    radial-gradient(
      150px circle at ${mouseX}px ${mouseY}px,
      ${colorStops[color]},
      transparent 80%
    )
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
      className={cn(
        `group relative w-full h-full rounded-2xl border border-white/10 bg-black/50 p-8 text-center shadow-xl shadow-black/40 transition-all duration-500 backdrop-blur-md hover:scale-[1.03]`,
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Mouse-following spotlight background */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px at ${mouseX}px ${mouseY}px,
              ${colorStops[color]}25,
              transparent 80%
            )
          `,
        }}
      />

      {/* Dynamic Border Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          maskImage: borderMask,
          WebkitMaskImage: borderMask,
          background: borderBackground,
          boxShadow: `0 0 15px ${colorStops[color]}50`,
        }}
      />

      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          maskImage: borderMask,
          WebkitMaskImage: borderMask,
          background: colorStops[color],
          border: '1px solid transparent',
        }}
      />

      <div className="absolute inset-0 rounded-2xl opacity-[0.03]" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center">
        {children}
      </div>
    </motion.div>
  );
};

// =================================================================================
// Improved Data Panel Item (Modernized values)
// =================================================================================
interface DataPanelItemProps {
  icon: React.ComponentType<any>;
  title: string;
  value: string;
  description: string;
  color?: "cyan" | "orange" | "blue" | "purple";
  delay?: number;
}

const DataPanelItem = ({ icon: Icon, title, value, description, color = "cyan", delay = 0 }: DataPanelItemProps) => {
  const colorClasses = {
    cyan: { bg: "bg-cyan-500/10", border: "hover:border-cyan-400/70", value: "text-cyan-400", icon: "text-cyan-400" },
    orange: { bg: "bg-orange-500/10", border: "hover:border-orange-500/70", value: "text-orange-400", icon: "text-orange-400" },
    blue: { bg: "bg-blue-500/10", border: "hover:border-blue-500/70", value: "text-blue-400", icon: "text-blue-400" },
    purple: { bg: "bg-purple-500/10", border: "hover:border-purple-500/70", value: "text-purple-400", icon: "text-purple-400" },
  };
  const classes = colorClasses[color] || colorClasses.cyan;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
      className={`group relative bg-gradient-to-br from-black/50 to-black/80 rounded-xl p-6 border border-white/20 ${classes.border} transition-all duration-500 backdrop-blur-sm hover:shadow-2xl hover:shadow-black/60`}
    >
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-white text-lg font-semibold group-hover:text-gray-100 transition-colors duration-300">
          {title}
        </h5>
        <div className={`p-2 ${classes.bg} rounded-lg`}>
          <Icon className={`w-5 h-5 ${classes.icon}`} />
        </div>
      </div>
      <motion.h4
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.4 }}
        className={`text-5xl font-bold tracking-tighter ${classes.value} mb-2`}
      >
        {value}
      </motion.h4>
      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
        {description}
      </p>
    </motion.div>
  );
};

// =================================================================================
// Improved Action Button (More dynamic gradient)
// =================================================================================
interface ActionButtonProps {
  children: ReactNode;
  icon?: React.ComponentType<any>;
  variant?: "primary" | "secondary";
  [key: string]: any;
}

const ActionButton = ({ children, icon: Icon, variant = "primary", ...props }: ActionButtonProps) => {
  const baseClasses =
    "group relative inline-flex items-center justify-center gap-2.5 " +
    "overflow-hidden rounded-full h-14 px-8 text-base font-bold " +
    "transition-all duration-300 ease-in-out shadow-lg";
  const variants = {
    primary:
      "bg-gradient-to-r from-orange-500 to-cyan-600 text-black shadow-orange-500/40 hover:shadow-[0_0_25px_rgba(79,171,255,0.5)]",
    secondary:
      "border border-white/30 bg-white/5 text-slate-200 backdrop-blur-sm " +
      "hover:border-orange-400/50 hover:bg-orange-400/10 hover:text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]",
  };
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {Icon && <Icon className="h-5 w-5" />}
        <span>{children}</span>
        {variant === "primary" && (
          <LucideIcons.ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </motion.button>
  );
};

// =================================================================================
// Improved Futuristic Image Card (Removed grid overlay)
// =================================================================================
interface FuturisticImageCardProps {
  src: string;
  alt: string;
}

const FuturisticImageCard = ({ src, alt }: FuturisticImageCardProps) => (
  // ADDED h-full to the outer container to force vertical stretch
  <div className="relative p-1.5 rounded-3xl bg-gradient-to-br from-cyan-500/50 via-orange-500/30 to-transparent backdrop-blur-sm shadow-2xl shadow-black/70 h-full">
    <motion.div
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -inset-1 rounded-[22px] bg-gradient-to-br from-cyan-500/60 to-orange-500/60 blur-xl"
    />
    {/* ADDED h-full to the inner container */}
    <div className="relative rounded-[20px] overflow-hidden bg-black border border-white/10 h-full">
      <img
        src={src}
        alt={alt}
        // REMOVED fixed aspect ratio style to allow image to fill vertical space
        className="object-cover w-full h-full opacity-85 transition-opacity duration-500 group-hover:opacity-100"
        onError={(e) => {
          e.currentTarget.src = "https://placehold.co/600x750/121212/22d3ee?text=Muhammed+Hasan";
        }}
      />
      <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,transparent_50%,rgba(0,0,0,0.9)_100%)]" />
    </div>
  </div>
);

// =================================================================================
// Improved FadeIn
// =================================================================================
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "left";
  className?: string; // ADDED className prop
}

const FadeIn = ({ children, delay = 0, duration = 0.7, direction = "up", className }: FadeInProps) => { // ACCEPTED className
  const variants = {
    up: { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: -15 }, animate: { opacity: 1, x: 0 } },
  };
  return (
    <motion.div
      initial={variants[direction].initial}
      whileInView={variants[direction].animate}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay, duration, ease: "easeInOut" }}
      className={cn(className)} // APPLIED className
    >
      {children}
    </motion.div>
  );
};

// =================================================================================
// Data Arrays (Using LucideIcons for cleaner look)
// =================================================================================
const education = [
  {
    degree: "B.Eng in Mechanical Engineering",
    institution: "Siirt University",
    period: "Sep 2021 – May 2025",
    location: "Siirt, Turkey",
    gpa: "2.94/4.0",
    highlights: ["Thermal-Fluid Sciences", "Robotics & Control Systems", "AI in Engineering", "Renewable Energy Systems"],
  },
  {
    degree: "Clean Tech Entrepreneurship Bootcamp",
    institution: "Faradai",
    period: "Mar 2025 – Jun 2025",
    location: "Remote",
    certification: "Intensive 12-Week Program",
    highlights: ["Sustainable Innovation", "Energy Startups"],
  },
  {
    degree: "Backend Development Bootcamp",
    institution: "Re:Coded",
    period: "Mar 2023 – Sep 2023",
    location: "Remote",
    certification: "Full-Stack Program",
    highlights: ["Backend Architecture", "Databases", "APIs"],
  },
];

const researchAreas = [
  {
    icon: LucideIcons.BatteryCharging,
    title: "Energy Storage",
    description: "Developing novel supercapacitors from food waste, achieving 7.98 F/g.",
    color: "cyan" as const,
  },
  {
    icon: LucideIcons.Bot,
    title: "Robotics & Automation",
    description: "Mentoring 20+ students in applied robotics and control systems at T3 Foundation.",
    color: "orange" as const,
  },
  {
    icon: LucideIcons.BrainCircuit,
    title: "AI & Data Science",
    description: "Building predictive models for energy systems and applying AI to thermal management.",
    color: "blue" as const,
  },
  {
    icon: LucideIcons.Atom,
    title: "Quantum & Nuclear",
    description: "Exploring QNNs for energy solutions and research in next-gen nuclear paradigms.",
    color: "purple" as const,
  },
];

const achievements = [
  {
    icon: LucideIcons.Rocket,
    title: "Teknofest National Finalist (x2)",
    description: "Led teams to national finals for Nuclear Energy Design and EV Battery Thermal Management (Arctic team).",
    impact: "Top Tier Recognition",
    color: "cyan" as const,
  },
  {
    icon: LucideIcons.Award,
    title: "3rd Place Winner, YES Challenge",
    description: "Led the EcoEnergy team to a national 3rd place for a sustainable supercapacitor business model.",
    impact: "National Award",
    color: "orange" as const,
  },
  {
    icon: LucideIcons.BookOpen,
    title: "Published Conference Researcher",
    description: "Authored and presented two papers at international conferences on PV temperature models and Li-ion battery thermal performance.",
    impact: "2x Publications",
    color: "blue" as const,
  },
];

// =================================================================================
// Main Page Component
// =================================================================================
export default function AboutMe() {
  return (
    <section id="about-me" className="relative overflow-hidden bg-black py-20 md:py-32">
      {/* Subtle Tech Grid Overlay (Very Low Opacity) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(79,171,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(79,171,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] z-0 opacity-10" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* ====================================================================== */}
        {/* --- Hero Header --- */}
        {/* ====================================================================== */}
        <SectionHeader
          badgeIcon={LucideIcons.Atom}
          badgeText="Mechanical & AI Engineer"
          title={
            <>
              <span className="text-white">Engineering</span> the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400">
                Next Energy Frontier
              </span>
            </>
          }
          subtitle={
            <>
              Fusing <span className="text-cyan-300 font-semibold">AI</span>,{" "}
              <span className="text-orange-300 font-semibold">Robotics</span>, &{" "}
              <span className="text-purple-300 font-semibold">Quantum Tech</span> for
              a Sustainable Future.
            </>
          }
        />

        {/* ====================================================================== */}
        {/* --- Hero Content & Key Matrix --- */}
        {/* ====================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-28 md:mb-40">
          {/* Main Card */}
          <div className="lg:col-span-7">
            <FieldCard delay={0.1} fieldColor="cyan">
              <div className="mb-6">
                <Badge variant="cyan" className="px-4 py-2">
                  <LucideIcons.Sparkles className="w-4 h-4 mr-2" />
                  Engineer & Innovator
                </Badge>
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                <span className="text-white">ADVANCING</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400">
                  INTELLIGENT ENERGY
                </span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed max-w-2xl">
                I am a <span className="text-cyan-400 font-bold">Mechanical Engineer</span> focused on the next generation of
                energy. My work integrates <span className="text-orange-400 font-bold">AI and robotics</span> with practical
                engineering to develop sustainable solutions in{" "}
                <span className="text-cyan-400 font-bold">energy storage</span> and{" "}
                <span className="text-orange-400 font-bold">renewable systems</span>.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { icon: LucideIcons.Battery, text: "Energy Storage", color: "cyan" as const },
                  { icon: LucideIcons.Bot, text: "Robotics & AI", color: "orange" as const },
                  { icon: LucideIcons.Network, text: "Quantum Tech", color: "purple" as const },
                  { icon: LucideIcons.Leaf, text: "Sustainable Futures", color: "blue" as const },
                ].map((item, index) => (
                  <Badge key={index} variant={item.color}>
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.text}
                  </Badge>
                ))}
              </div>
            </FieldCard>
          </div>

          {/* Key Matrix */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 self-start">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl font-extrabold text-white mb-6 pl-4"
            >
              Key Matrix
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <DataPanelItem
                icon={LucideIcons.Rocket}
                title="Competitions & Projects"
                value="10+"
                description="Led 7 teams in AI, Nuclear, EV, and Energy competitions."
                color="cyan"
                delay={0.3}
              />
              <DataPanelItem
                icon={LucideIcons.FlaskConical}
                title="Core Research"
                value="4+"
                description="TÜBİTAK, Clean Energy Lab, 2x Conference Papers."
                color="orange"
                delay={0.4}
              />
              <DataPanelItem
                icon={LucideIcons.Award}
                title="Awards & Finals"
                value="3+"
                description="2x Teknofest Finalist & 3rd Place, YES Challenge."
                color="cyan"
                delay={0.5}
              />
              <DataPanelItem
                icon={LucideIcons.Users}
                title="Students Mentored"
                value="20+"
                description="In robotics, coding, and design at T3 Foundation."
                color="purple"
                delay={0.6}
              />
            </div>
          </div>
        </div>

        {/* ====================================================================== */}
        {/* --- "ABOUT ME" SECTION --- */}
        {/* ====================================================================== */}
        <div id="about" className="mb-28 md:mb-40">
          <SectionHeader
            badgeIcon={LucideIcons.User}
            badgeText="My Story"
            title="A Personal Introduction"
          />

          {/* Corrected: using items-stretch and h-full on containers for matching height */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch"> 
            
            {/* Image Card (lg:col-span-5) */}
            <div className="lg:col-span-5 h-full"> {/* ADDED h-full to the grid item */}
              <FadeIn delay={0.4} direction="up" className="h-full">
                <FuturisticImageCard
                  src="/b762b4c7-03b7-4d6e-a5b8-2793c381c0b5.jpeg"
                  alt="A portrait of Muhammed Hasan"
                />
              </FadeIn>
            </div>
            
            {/* Text Content (lg:col-span-7) */}
            <div className="lg:col-span-7 h-full"> {/* ADDED h-full to the grid item */}
              <FadeIn delay={0.2} direction="up">
                <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl mb-6">
                  My Journey So Far.
                </h2>
              </FadeIn>
              <FadeIn delay={0.3} direction="up">
                <p className="text-lg leading-relaxed text-neutral-300 mb-8">
                  Hello! I'm a recent{" "}
                  <span className="font-bold text-cyan-400">Mechanical Engineering</span> graduate, complemented by an intensive{" "}
                  <span className="font-bold text-orange-400">Backend Development</span> bootcamp. This dual background provides a unique perspective on
                  fusing physical systems with digital intelligence.
                  <br />
                  Currently, I'm working as an instructor and mentor, and{" "}
                  <span className="font-bold text-orange-400">am actively seeking full-time</span> engineering roles or{" "} <span className="font-bold text-cyan-400">Master & Ph.D. opportunities </span>
                  in my core interests:{" "}
                  <span className="font-bold text-purple-400">
                    AI, quantum computing, robotics, and sustainable energy systems
                  </span>.
                </p>
                <div className="border-t border-white/10 pt-6 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                  <div className="text-gray-300">
                    <LucideIcons.Languages className="mx-auto mb-2 h-7 w-7 text-cyan-400" />
                    <span className="font-semibold">4 Languages</span>
                  </div>
                  <div className="text-gray-300">
                    <LucideIcons.Swords className="mx-auto mb-2 h-7 w-7 text-orange-400" />
                    <span className="font-semibold">Video Games</span>
                  </div>
                  <div className="text-gray-300">
                    <LucideIcons.Footprints className="mx-auto mb-2 h-7 w-7 text-cyan-400" />
                    <span className="font-semibold">Football</span>
                  </div>
                  <div className="text-gray-300">
                    <LucideIcons.Waves className="mx-auto mb-2 h-7 w-7 text-orange-400" />
                    <span className="font-semibold">Swimming</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
        
        {/* ====================================================================== */}
        {/* --- Core Research (Uses ModernCard) --- */}
        {/* ====================================================================== */}        
        <div className="mb-28 md:mb-40">
          <SectionHeader
            badgeIcon={LucideIcons.BrainCircuit}
            badgeText="Core Focus"
            title="My Interdisciplinary Toolkit"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchAreas.map((area, index) => (
              <ModernCard key={index} color={area.color} delay={0.3 + index * 0.1}>
                {/* Icon */}
                <div
                  className={cn(
                    "mb-6 p-4 rounded-xl",
                    {
                      "bg-cyan-500/20": area.color === "cyan",
                      "bg-orange-500/20": area.color === "orange",
                      "bg-blue-500/20": area.color === "blue",
                      "bg-purple-500/20": area.color === "purple",
                    }
                  )}
                >
                  <area.icon className={cn(
                    "w-10 h-10",
                    {
                      "text-cyan-400": area.color === "cyan",
                      "text-orange-400": area.color === "orange",
                      "text-blue-400": area.color === "blue",
                      "text-purple-400": area.color === "purple",
                    }
                  )} />
                </div>
                {/* Text */}
                <h3 className="text-2xl font-bold text-white mb-3">{area.title}</h3>
                <p className="text-gray-300 leading-relaxed">{area.description}</p>
              </ModernCard>
            ))}
          </div>
        </div>

        {/* ====================================================================== */}
        {/* --- Education Section --- */}
        {/* ====================================================================== */}
        <div className="mb-28 md:mb-40 max-w-4xl mx-auto">
          <SectionHeader
            badgeIcon={LucideIcons.GraduationCap}
            badgeText="Education & Training"
            title="Academic & Certification Journey"
          />
          
          <div className="relative before:absolute before:left-[15px] before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-cyan-500/50 before:to-transparent before:z-0 pl-10">
            {education.map((edu, index) => (
              <ResearchTimeline
                key={index}
                delay={0.3 + index * 0.2}
                isLast={index === education.length - 1}
                icon={index === 0 ? LucideIcons.GraduationCap : index === 1 ? LucideIcons.Leaf : LucideIcons.Code}
              >
                <FieldCard
                  delay={0.5 + index * 0.2}  
                  fieldColor={index % 2 === 0 ? "cyan" : "orange"}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-cyan-400 font-semibold">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="text-right mt-3 md:mt-0">
                      <div className="flex items-center justify-end gap-2 text-gray-300 mb-1">
                        <LucideIcons.Calendar className="w-4 h-4" />
                        <span className="text-sm">{edu.period}</span>
                      </div>
                      <div className="flex items-center justify-end gap-2 text-gray-300">
                        <LucideIcons.MapPin className="w-4 h-4" />
                        <span className="text-sm">{edu.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {edu.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant={index % 2 === 0 ? "cyan" : "orange"}>
                        {highlight}
                      </Badge>
                    ))}
                    {edu.gpa && <Badge variant="blue">GPA: {edu.gpa}</Badge>}
                    {edu.certification && (
                      <Badge variant="purple">{edu.certification}</Badge>
                    )}
                  </div>
                </FieldCard>
              </ResearchTimeline>
            ))}
          </div>
        </div>

        {/* ====================================================================== */}
        {/* --- Key Achievements (Uses 3-col layout) --- */}
        {/* ====================================================================== */}
        <div className="mb-28 md:mb-40">
          <SectionHeader
            badgeIcon={LucideIcons.Award}
            badgeText="Key Achievements"
            title="Quantifiable Impact & Recognition"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((ach, index) => (
              <AchievementCard key={index} {...ach} delay={0.3 + index * 0.1} />
            ))}
          </div>
        </div>

        {/* ====================================================================== */}
        {/* --- Research Mission (Footer section) --- */}
        {/* ====================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <FieldCard fieldColor="orange" delay={0.5}>
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center gap-6 mb-8">
                <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl">
                  <LucideIcons.Atom className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="p-4 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-2xl">
                  <LucideIcons.BrainCircuit className="w-8 h-8 text-orange-400" />
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl">
                  <LucideIcons.Bot className="w-8 h-8 text-purple-400" />
                </div>
              </div>

              <h3 className="text-4xl font-extrabold text-white mb-6">
                My Innovation Mandate
              </h3>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                My mission is to apply my skills in mechanical engineering,
                thermal science, and AI to develop **scalable, next-generation
                energy storage and renewable energy technologies** that
                contribute directly to a carbon-neutral future.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group p-5 bg-black/50 rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                >
                  <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg w-fit mx-auto mb-3">
                    <LucideIcons.Battery className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors duration-300">
                    Pioneering Electrochemistry
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Pioneering new materials for supercapacitors and hydrogen
                    systems.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group p-5 bg-black/50 rounded-xl border border-white/10 hover:border-orange-400/50 transition-all duration-300"
                >
                  <div className="p-2.5 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-lg w-fit mx-auto mb-3">
                    <LucideIcons.Bot className="w-6 h-6 text-orange-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-orange-100 transition-colors duration-300">
                    Intelligent Automation
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Using AI for energy forecasting and mentoring in applied
                    robotics.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group p-5 bg-black/50 rounded-xl border border-white/10 hover:border-purple-400/50 transition-all duration-300"
                >
                  <div className="p-2.5 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg w-fit mx-auto mb-3">
                    <LucideIcons.Thermometer className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-100 transition-colors duration-300">
                    Next-Gen Thermal Design
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Optimizing thermal management for batteries and renewable
                    hardware.
                  </p>
                </motion.div>
              </div>
            </div>
            
            <div className="mt-10">
              <ActionButton variant="primary" icon={LucideIcons.Cpu}>
                Connect for Collaboration
              </ActionButton>
            </div>
          </FieldCard>
        </motion.div>
      </div>
    </section>
  );
}