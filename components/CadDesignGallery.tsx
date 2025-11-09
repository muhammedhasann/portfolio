"use client";

import {
  motion,
  AnimatePresence,
  useSpring,
  SpringOptions,
} from "framer-motion";
import React, {
  useState,
  memo,
  useCallback,
  useEffect,
  useRef,
  createRef,
} from "react";
import {
  Wrench,
  Rocket,
  Award,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  X,
  Users,
  FlaskConical,
  Icon,
} from "lucide-react";
import { JSX } from "react/jsx-runtime";

/* ---------------------------------- */
/* 1. TYPESCRIPT INTERFACES           */
/* ---------------------------------- */

interface ColorScheme {
  base: string;
  icon: JSX.Element;
  bg: string;
  border: string;
  text: string;
  glow: string;
}

interface Design {
  id: number;
  title: string;
  images: string[];
  status: string;
  awardText?: string;
  competition?: string;
}

// Component Prop Interfaces
interface StatusBadgeProps {
  status: string;
}

interface AwardBadgeProps {
  text: string;
  competition: string;
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

interface CadCardProps {
  design: Design;
  index: number;
  onImageClick: (
    design: Design,
    index: number,
    ref: React.RefObject<HTMLDivElement | null>
  ) => void;
}

interface ImageLightboxProps {
  modalState: {
    design: Design;
    initialIndex: number;
  };
  onClose: () => void;
}

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  "aria-label": string;
  strength?: number; // How "sticky" the button is
}

/* ---------------------------------- */
/* 2. CENTRALIZED CONSTANTS           */
/* ---------------------------------- */

const colorSchemes: Record<string, ColorScheme> = {
  Competition: {
    base: "blue",
    icon: <Rocket size={12} />,
    bg: "bg-blue-900/40",
    border: "border-blue-500/80",
    text: "text-blue-300",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.5)]",
  },
  "Published Research": {
    base: "teal",
    icon: <TrendingUp size={12} />,
    bg: "bg-teal-900/40",
    border: "border-teal-500/80",
    text: "text-teal-300",
    glow: "shadow-[0_0_30px_rgba(20,184,166,0.5)]",
  },
  "Personal Project": {
    base: "cyan",
    icon: <Users size={12} />,
    bg: "bg-cyan-900/40",
    border: "border-cyan-500/80",
    text: "text-cyan-300",
    glow: "shadow-[0_0_30px_rgba(6,182,212,0.5)]",
  },
  Conceptual: {
    base: "slate",
    icon: <FlaskConical size={12} />,
    bg: "bg-slate-800/40",
    border: "border-slate-500/80",
    text: "text-slate-300",
    glow: "shadow-[0_0_30px_rgba(100,116,139,0.5)]",
  },
};
const cadDesigns: Design[] = [
  // UPDATED: Added your red engine hoist image

  {
    id: 6,
    title: "90-Degree Flanged Pipe Elbow",
    images: [
      "/cad_designs/Screen Shot 2025-06-18 at 16.27.59.png",
    ],
    status: "Personal Project",
  },
  // UNCHANGED: From last time
  {
    id: 10,
    title: "Pencil Sharpener Cutter Gear",
    images: [
      "/cad_designs/Screen Shot 2025-06-18 at 16.28.19.png",
    ],
    status: "Personal Project",
  },
  {
    id: 1,
    title: "Engine Hoist Assembly",
    images: [
      "/cad_designs/Screen Shot 2025-06-18 at 16.13.40.png",
    ],
    status: "Personal Project",
  },
  // UNCHANGED: From last time
  {
    id: 2,
    title: "Mechanical Gearbox Assembly",
    images: [
      "/cad_designs/Screen Shot 2025-06-18 at 16.14.33.png",
      "/cad_designs/Screen Shot 2025-06-18 at 16.14.43.png",
    ],
    status: "Personal Project",
  },
  // UNCHANGED: From last time


{
    id: 14,
    title: "Jet Engine Combustion Chamber",
    images: [
      "/cad_designs/Screen Shot 2025-04-14 at 15.58.09.png",
      "/cad_designs/Screen Shot 2025-06-18 at 16.33.19.png",
      "/cad_designs/Screen Shot 2025-04-14 at 15.58.32.png",
      "/cad_designs/Screen Shot 2025-04-14 at 15.57.39.png",
      "/cad_designs/Screen Shot 2025-04-14 at 15.56.59.png",
      "/cad_designs/Screen Shot 2025-04-14 at 15.55.35.png",
      "/cad_designs/Screen Shot 2025-04-14 at 15.56.09.png",
      "/cad_designs/Screen Shot 2025-04-14 at 15.55.20.png",
      "/cad_designs/Screen Shot 2025-04-14 at 15.54.53.png",
      "/cad_designs/Screen Shot 2025-04-14 at 15.55.04.png",
    ],
    status: "Competition",
    awardText: "Team Lead",
    competition: "Jet Motor Design Competition",
  },
    {
    id: 3,
    title: "EV Battery Pack Cooling System",
    images: [
      "/cad_designs/Screen Shot 2025-06-18 at 16.17.26.png",
      "/cad_designs/Screen Shot 2025-06-18 at 16.18.00.png",
      "/cad_designs/Screen Shot 2025-06-18 at 16.18.08.png",
    ],
    status: "Competition",
    awardText: "Competition Finalist",
    competition: "Teknofest 2024",
  },
  // UNCHANGED: From last time
  {
    id: 4,
    title: "Electric Kettle with Infuser",
    images: [
      "/cad_designs/Screen Shot 2025-06-18 at 16.31.44.png",
      "/cad_designs/Screen Shot 2025-06-18 at 16.31.52.png",
    ],
    status: "Personal Project",
  },

  {
    id: 8,
    title: "135 MWe Thorium Molten Salt Reactor",
    images: [
      "/cad_designs/supercritical (33).png", // <-- Your new 3D diagram
      "/cad_designs/supercritical (34).png", // <-- Your new 2D diagram
    ],
    status: "Competition",
    awardText: "Competition Finalist",
    competition: "Teknofest 2024",
  },
  // UNCHANGED: From last time
  {
    id: 5,
    title: "Retro Samsung Mobile Phone",
    images: [
      "/cad_designs/Screen Shot 2025-06-18 at 16.27.36.png",
    ],
    status: "Personal Project",
  },
  // UNCHANGED: From last time
  // UNCHANGED: From last time (Teknofest)

  // UPDATED: Replaced placeholders with your Molten Salt Reactor diagrams
  // UPDATED: Replaced placeholders with your PV Panel test rig images
  {
    id: 9,
    title: "PV Panel Spray-Cooling System",
    images: [
      "/cad_designs/supercritical (35).png", // <-- Your new labeled overview
      "/cad_designs/Screen Shot 2025-06-18 at 16.25.42.png", // <-- New angle 1
      "/cad_designs/Screen Shot 2025-06-18 at 16.25.50.png", // <-- New angle 2
      "/cad_designs/Screen Shot 2025-06-18 at 16.27.01.png", // <-- Solar simulator
    ],
    status: "Published Research",
  },
  // --- NEW PROJECTS ---
  {
    id: 11,
    title: "Custom Compact Bicycle",
    images: [
      "/cad_designs/Screen Shot 2025-06-18 at 16.30.48.png",
    ],
    status: "Personal Project",
  },
  {
    id: 12,
    title: "Monocular / Telescope",
    images: [
      "/cad_designs/Screen Shot 2025-06-18 at 16.31.12.png",
    ],
    status: "Personal Project",
  },
  {
    id: 13,
    title: "Magnetic Coil Test Rig",
    images: [
      "/cad_designs/Screen Shot 2025-06-18 at 16.13.40.png",
    ],
    status: "Conceptual", // 'Conceptual' fits well here
  },
];
const allCategories = ["All", ...new Set(cadDesigns.map((d) => d.status))];
const springConfig: SpringOptions = { stiffness: 150, damping: 20, mass: 1 };

/* ---------------------------------- */
/* 3. HELPER UTILITIES                */
/* ---------------------------------- */

const cn = (...classes: (string | boolean | undefined)[]): string =>
  classes.filter(Boolean).join(" ");

// 1.3 KB inlined noise SVG
const noise = `data:image/svg+xml;base64,${btoa(
  `<svg viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity=".04"/></svg>`
)}`;

/* ---------------------------------- */
/* 4. REUSABLE COMPONENTS             */
/* ---------------------------------- */

/* ---------- header badge ---------- */
const CadGalleryBadge: React.FC = memo(() => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.8 }}
    className="mb-8 inline-flex items-center justify-center gap-3 rounded-full border border-cyan-500/60 bg-black/50 px-5 py-2.5 shadow-[0_0_30px_rgba(6,182,212,0.4)] backdrop-blur-lg"
  >
    <div className="relative flex h-3 w-3 items-center justify-center">
      <div className="absolute h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></div>
      <div className="relative h-2 w-2 rounded-full bg-cyan-300"></div>
    </div>
    <Wrench className="h-5 w-5 text-cyan-300" />
    <span className="text-sm font-medium uppercase tracking-widest text-white/90">
      CAD Design Gallery
    </span>
  </motion.div>
));
CadGalleryBadge.displayName = "CadGalleryBadge";

/* ---------- status badge ---------- */
const StatusBadge: React.FC<StatusBadgeProps> = memo(({ status }) => {
  const config = colorSchemes[status] || colorSchemes["Personal Project"];
  return (
    <div
      className={cn(
        "flex flex-shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium backdrop-blur-md",
        config.bg,
        config.border,
        config.text
      )}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
            `bg-${config.base}-400`
          )}
        ></span>
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            `bg-${config.base}-400`
          )}
        ></span>
      </span>
      {config.icon}
      <span>{status}</span>
    </div>
  );
});
StatusBadge.displayName = "StatusBadge";

/* ---------- award badge ---------- */
const AwardBadge: React.FC<AwardBadgeProps> = memo(
  ({ text, competition }) => (
    <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-900/50 px-3 py-1.5 text-sm backdrop-blur-md shadow-lg">
      <div className="relative">
        <Award className="h-5 w-5 text-amber-300" />
        <div className="absolute -inset-1 animate-pulse rounded-full bg-amber-400/30 blur-sm" />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-xs font-semibold text-amber-200">{text}</span>
        <span className="text-[10px] text-amber-300/80">{competition}</span>
      </div>
    </div>
  )
);
AwardBadge.displayName = "AwardBadge";

/* ---------- optimised image ---------- */
const OptimizedImage: React.FC<OptimizedImageProps> = memo(
  ({ src, alt, priority = false }) => {
    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const target = e.target as HTMLImageElement;
      target.src = `https://placehold.co/800x600/020617/334155?text=Image+Not+Found`;
      target.onerror = null;
    };
    return (
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain"
        loading={priority ? "eager" : "lazy"}
        onError={handleError}
      />
    );
  }
);
OptimizedImage.displayName = "OptimizedImage";

/* ---------- skeleton loader card ---------- */
const CardSkeleton: React.FC = memo(() => (
  <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[.04] backdrop-blur-xl shadow-[inset_0_0_24px_rgba(255,255,255,.04),0_8px_32px_rgba(0,0,0,.4)]">
    <div className="relative h-[70%] w-full animate-pulse bg-white/5 p-6">
      <div className="h-full w-full rounded-lg bg-white/10"></div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-[30%] p-5 pt-3 border-t border-white/10 flex flex-col justify-between">
      <div className="flex items-center justify-between gap-4">
        <div className="h-6 w-3/5 animate-pulse rounded-md bg-white/10"></div>
        <div className="h-6 w-1/4 animate-pulse rounded-full bg-white/10"></div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="h-1 w-full animate-pulse rounded-full bg-white/20"></div>
        <div className="h-1 w-full animate-pulse rounded-full bg-white/20"></div>
        <div className="h-1 w-full animate-pulse rounded-full bg-white/20"></div>
      </div>
    </div>
  </div>
));
CardSkeleton.displayName = "CardSkeleton";

/* ---------- magnetic button ---------- */
const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  onClick,
  "aria-label": ariaLabel,
  strength = 30,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  
  // --- FIX START ---
  // We need two separate springs, one for x and one for y.
  // The useSpring hook takes a number as its initial value, not an object.
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  // const pos = useSpring({ x: 0, y: 0 }, springConfig); // <-- This was the line with the error
  // --- FIX END ---

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();

    // --- FIX START ---
    // Calculate mouse position relative to the button center
    const mouseX = clientX - (left + width / 2);
    const mouseY = clientY - (top + height / 2);
    
    // Set the x and y springs individually
    x.set(mouseX * (strength / 100));
    y.set(mouseY * (strength / 100));
    // pos.set({ x: x * (strength / 100), y: y * (strength / 100) }); // <-- This was the old line
    // --- FIX END ---
  };

  const onMouseLeave = () => {
    // --- FIX START ---
    // Reset both x and y springs to 0
    x.set(0);
    y.set(0);
    // pos.set({ x: 0, y: 0 }); // <-- This was the old line
    // --- FIX END ---
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      // --- FIX START ---
      // Apply the x and y springs directly to the style
      style={{ x, y }}
      // style={{ x: pos.x, y: pos.y }} // <-- This was the old line
      // --- FIX END ---
      transition={springConfig}
    >
      {children}
    </motion.button>
  );
};

/* ---------- glass card ---------- */
const CadCard: React.FC<CadCardProps> = memo(
  ({ design, index, onImageClick }) => {
    const [activeImage, setActiveImage] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);
    const config = colorSchemes[design.status] || colorSchemes["Personal Project"];

    const prev = (e: React.MouseEvent) => {
      e.stopPropagation();
      setActiveImage((p) => (p === 0 ? design.images.length - 1 : p - 1));
    };
    const next = (e: React.MouseEvent) => {
      e.stopPropagation();
      setActiveImage((p) => (p === design.images.length - 1 ? 0 : p + 1));
    };

    // Preload images on hover
    const handleMouseEnter = () => {
      for (const img of design.images) {
        new Image().src = img;
      }
    };

    return (
      <motion.div
        ref={cardRef}
        layout
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="group relative"
        onMouseEnter={handleMouseEnter}
      >
        <div
          onClick={() => onImageClick(design, activeImage, cardRef)}
          className="relative h-[400px] w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[.04] backdrop-blur-xl shadow-[inset_0_0_24px_rgba(255,255,255,.04),0_8px_32px_rgba(0,0,0,.4)] transition-colors duration-300 hover:border-white/20"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              onImageClick(design, activeImage, cardRef);
          }}
        >
          <div
            className="absolute inset-0 opacity-60"
            style={{ backgroundImage: `url(${noise})` }}
          />

          {/* image area */}
          <div className="relative h-[70%] w-full">
            {design.awardText && design.competition && (
              <div className="absolute right-3 top-3 z-20">
                <AwardBadge
                  text={design.awardText}
                  competition={design.competition}
                />
              </div>
            )}
            {design.images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label={`Previous Image for ${design.title}`}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 p-1.5 text-white opacity-0 transition group-hover:opacity-100"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  aria-label={`Next Image for ${design.title}`}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 p-1.5 text-white opacity-0 transition group-hover:opacity-100"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 p-6"
              >
                <OptimizedImage
                  src={design.images[activeImage]}
                  alt={design.title}
                  priority={index < 3}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* info bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[30%] p-5 pt-3 border-t border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-4">
              <h3 className="truncate text-lg font-bold text-white transition group-hover:text-white/90">
                {design.title}
              </h3>
              <StatusBadge status={design.status} />
            </div>
            <div className="flex items-center justify-center gap-2">
              {design.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage(i);
                  }}
                  aria-label={`Go to image ${i + 1} for ${design.title}`}
                  className="h-1 w-full rounded-full bg-white/20"
                >
                  {activeImage === i && (
                    <motion.div
                      layoutId={`dot-${design.id}`}
                      className={`h-full rounded-full bg-${config.base}-400`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);
CadCard.displayName = "CadCard";

/* ---------- lightbox ---------- */
const ImageLightbox: React.FC<ImageLightboxProps> = memo(
  ({ modalState, onClose }) => {
    const { design, initialIndex } = modalState;
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // Ensure state is correct when modal opens
    useEffect(() => {
      setCurrentIndex(initialIndex);
    }, [initialIndex]);

    // Focus the close button on mount
    useEffect(() => {
      closeButtonRef.current?.focus();
    }, []);

    const prev = useCallback(
      (e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
        e.stopPropagation();
        setCurrentIndex((p) =>
          p === 0 ? design.images.length - 1 : p - 1
        );
      },
      [design.images.length]
    );

    const next = useCallback(
      (e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
        e.stopPropagation();
        setCurrentIndex((p) =>
          p === design.images.length - 1 ? 0 : p + 1
        );
      },
      [design.images.length]
    );

    // Keyboard navigation
    useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") next(e);
        if (e.key === "ArrowLeft") prev(e);
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [prev, next, onClose]);

    const buttonClasses =
      "absolute top-1/2 -translate-y-1/2 z-50 rounded-full border border-white/20 bg-black/50 p-3 text-white hover:bg-cyan-500/50 transition";
    const closeButtonClasses =
      "absolute right-8 top-8 z-[51] rounded-full border border-white/20 bg-black/50 p-3 text-white hover:bg-cyan-500/50 transition";

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <MagneticButton
          className={closeButtonClasses}
          onClick={onClose}
          aria-label={`Close ${design.title} Image Gallery`}
          strength={40}
        >
          <X size={28} />
          <span ref={closeButtonRef} tabIndex={-1} />
        </MagneticButton>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative h-[90vh] w-[90vw] lg:h-[85vh] lg:w-[85vw] max-w-7xl max-h-5xl"
          onClick={(e) => e.stopPropagation()}
        >
          {design.images.length > 1 && (
            <>
              <MagneticButton
                className={cn(buttonClasses, "-left-16")}
                onClick={prev}
                aria-label={`Previous Image for ${design.title}`}
              >
                <ChevronLeft size={32} />
              </MagneticButton>
              <MagneticButton
                className={cn(buttonClasses, "-right-16")}
                onClick={next}
                aria-label={`Next Image for ${design.title}`}
              >
                <ChevronRight size={32} />
              </MagneticButton>
            </>
          )}
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <OptimizedImage
                  src={design.images[currentIndex]}
                  alt={design.title}
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-12 rounded-t-lg border border-b-0 border-white/20 bg-black/70 px-6 py-3 text-center backdrop-blur-sm"
          >
            <p className="font-bold text-lg text-white">{design.title}</p>
            <p className="text-sm text-neutral-300">
              Image {currentIndex + 1} of {design.images.length}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
);
ImageLightbox.displayName = "ImageLightbox";

/* ---------------------------------- */
/* 5. MAIN SECTION COMPONENT          */
/* ---------------------------------- */

export default function CadDesignGallery(): JSX.Element {
  const [modalState, setModalState] = useState<{
    design: Design;
    initialIndex: number;
  } | null>(null);
  const [triggerRef, setTriggerRef] =
    useState<React.RefObject<HTMLDivElement | null> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  // Simulated data fetching
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); // 1.5s load
    return () => clearTimeout(timer);
  }, []);

  const open = useCallback(
    (
      design: Design,
      idx: number,
      ref: React.RefObject<HTMLDivElement | null>
    ) => {
      setModalState({ design, initialIndex: idx });
      setTriggerRef(ref);
    },
    []
  );

  const close = useCallback(() => {
    setModalState(null);
    triggerRef?.current?.focus(); // Return focus to the card
  }, [triggerRef]);

  const filteredDesigns =
    activeCategory === "All"
      ? cadDesigns
      : cadDesigns.filter((d) => d.status === activeCategory);

  return (
    <section
      id="cad-designs"
      className="relative overflow-hidden bg-black py-24 md:py-32"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-neutral-950/20 to-black" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient_stops))] from-cyan-950/10 via-transparent to-transparent" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(160,160,160,0.02)_1px,_transparent_1px)] [background-size:20px_20px]" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <CadGalleryBadge />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 text-4xl font-extrabold tracking-tight text-transparent bg-gradient-to-br from-white via-cyan-300 to-teal-300 bg-clip-text md:text-6xl"
          >
            CAD & Engineering Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto max-w-3xl text-xl text-neutral-300"
          >
            A visual showcase of my design, simulation, and competition projects
            in 3D.
          </motion.p>
        </motion.div>

        {/* Category Filter Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-16 flex flex-wrap items-center justify-center gap-4"
        >
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full border px-6 py-2.5 text-sm font-medium transition-all duration-300 backdrop-blur-sm",
                activeCategory === category
                  ? "border-cyan-400 bg-cyan-900/40 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  : "border-white/20 bg-black/30 text-neutral-300 hover:bg-white/10 hover:text-white"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {isLoading
              ? // Show Skeletons
                Array.from({ length: 3 }).map((_, i) => (
                  <CardSkeleton key={`skel-${i}`} />
                ))
              : // Show Filtered Designs
                filteredDesigns.map((d, i) => (
                  <CadCard
                    key={d.id}
                    design={d}
                    index={i}
                    onImageClick={open}
                  />
                ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {modalState && (
          <ImageLightbox modalState={modalState} onClose={close} />
        )}
      </AnimatePresence>
    </section>
  );
}