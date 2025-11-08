"use client";
import { motion } from "framer-motion";
import { Eye, Calendar, ExternalLink, Youtube, Clock, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import Image from "next/image"; // <--- Correctly imported

// --- Video Interface ---
interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  duration: string;
  views: string;
  likes: string;
  publishedAt: string;
  tags: string[];
  category: string;
  embedUrl: string;
}

// --- Video Data ---
const videos: Video[] = [
  {
    id: "OWRiPQdLbDo",
    title: "Host React Sites Free with GitHub Pages & .tech Domains",
    description: "Complete tutorial on hosting React apps with custom domains. Perfect for students and developers.",
    thumbnail: "https://img.youtube.com/vi/OWRiPQdLbDo/maxresdefault.jpg",
    url: "https://youtu.be/OWRiPQdLbDo",
    duration: "12:45",
    views: "2.1K",
    likes: "89",
    publishedAt: "2024-01-15",
    tags: ["React", "GitHub", "Hosting"],
    category: "Web Development",
    embedUrl: "https://www.youtube.com/embed/OWRiPQdLbDo",
  },
  {
    id: "xnku6mVaPIQ",
    title: "Install MongoDB on Manjaro Linux",
    description: "Step-by-step guide to installing MongoDB with troubleshooting tips.",
    thumbnail: "https://img.youtube.com/vi/xnku6mVaPIQ/maxresdefault.jpg",
    url: "https://youtu.be/xnku6mVaPIQ",
    duration: "8:32",
    views: "1.8K",
    likes: "76",
    publishedAt: "2024-01-10",
    tags: ["MongoDB", "Linux", "Database"],
    category: "DevOps",
    embedUrl: "https://www.youtube.com/embed/xnku6mVaPIQ",
  },
];

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

// Futuristic Badge Component
const FuturisticBadge = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    className="inline-flex items-center justify-center gap-3 mb-8 px-5 py-2.5 bg-black/50 border border-red-500/30 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.5)]"
  >
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
      <Youtube className="w-6 h-6 text-red-400" />
      <div className="w-px h-5 bg-red-500/50"></div>
      <span className="text-sm font-medium text-red-300 tracking-wider uppercase">
        Tech Content
      </span>
    </div>
  </motion.div>
);

// --- VideoCard Component ---
const VideoCard = ({ video, index }: { video: Video; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col h-full bg-gradient-to-b from-[#0f0f0f] to-[#080808] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-red-700/20 hover:-translate-y-1.5 transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video w-full">
        <div className="absolute inset-0 rounded-t-2xl overflow-hidden">
          
          {/* --- THIS IS THE FIX --- */}
          {/* Replaced 'layout="fill"' with just 'fill' */}
          {/* Replaced 'objectFit="cover"' with 'className="object-cover"' */}
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill // Use the fill prop for 'layout="fill"'
            priority={index < 2} // Prioritize the first two images for LCP
            className={`object-cover transition-all duration-500 ${isHovered ? "opacity-0 scale-110" : "opacity-100"}`} // Use className for 'objectFit'
          />
          {/* --- END OF FIX --- */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <iframe
            src={`${video.embedUrl}?autoplay=${isHovered ? 1 : 0}&mute=1&loop=1&controls=0`}
            title={video.title}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 rounded-t-2xl ${isHovered ? "opacity-100" : "opacity-0"}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}>
          <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-900/50">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          </div>
        </div>
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <Badge className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs px-2.5 py-1 font-medium shadow-sm">
            {video.category}
          </Badge>
          <div className="flex items-center gap-1.5 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full border border-neutral-700">
            <Clock className="w-3.5 h-3.5" />
            <span>{video.duration}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-red-300 transition-all">
          {video.title}
        </h3>
        <p className="text-sm text-neutral-400 flex-1 line-clamp-3 mb-4">{video.description}</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-neutral-900/50 p-2 rounded-lg flex flex-col items-center">
            <div className="text-xs text-neutral-400">Views</div>
            <div className="text-sm font-semibold text-white flex items-center">
              <Eye className="w-3.5 h-3.5 mr-1 text-neutral-400" />
              {video.views}
            </div>
          </div>
          <div className="bg-neutral-900/50 p-2 rounded-lg flex flex-col items-center">
            <div className="text-xs text-neutral-400">Likes</div>
            <div className="text-sm font-semibold text-white flex items-center">
              <ThumbsUp className="w-3.5 h-3.5 mr-1 text-neutral-400" />
              {video.likes}
            </div>
          </div>
          <div className="bg-neutral-900/50 p-2 rounded-lg flex flex-col items-center">
            <div className="text-xs text-neutral-400">Date</div>
            <div className="text-sm font-semibold text-white flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-neutral-400" />
              {formatDate(video.publishedAt).split(",")[0]}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {video.tags.map((t: string) => (
            <Badge
              key={t}
              variant="outline"
              className="border-neutral-700 text-neutral-300 text-xs px-2 py-0.5 hover:bg-neutral-800/50"
            >
              {t}
            </Badge>
          ))}
        </div>
        <Button
          size="sm"
          className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-xl font-medium group mt-auto"
          onClick={() => window.open(video.url, "_blank")}
        >
          <Youtube className="w-4 h-4 mr-2" />
          Watch on YouTube
          <ExternalLink className="w-3.5 h-3.5 ml-2 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
};

export const YouTubeShowcase = () => {
  // State to store particle styles
  const [particles, setParticles] = useState<
    Array<{ top: string; left: string; width: string; height: string }>
  >([]);

  // --- Create the particles ---
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
    }));
    setParticles(newParticles);
  }, []);
  // --- END ---

  return (
    <section id="youtube" className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-900/5 to-black z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient_stops))] from-red-900/10 via-transparent to-transparent z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:20px_20px] z-0" />
      <div className="absolute inset-0 z-0">
        {particles.map((style, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-red-500/10"
            style={style}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <FuturisticBadge />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-br from-white via-neutral-300 to-red-300 bg-clip-text md:text-6xl"
          >
            YouTube Channel
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-neutral-400 max-w-3xl mx-auto"
          >
            Practical tutorials and cutting-edge techniques for modern web development
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {videos.map((v, i) => (
            <VideoCard key={v.id} video={v} index={i} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mx-auto max-w-3xl rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.1)_0%,transparent_70%)]"></div>
            <Youtube className="w-12 h-12 text-red-500 mx-auto mb-5 relative z-10" />
            <h3 className="text-2xl font-bold text-white mb-3 relative z-10">Developer Journey</h3>
            <p className="text-neutral-400 mb-6 max-w-2xl mx-auto relative z-10">
              Follow along as I explore web technologies, share coding insights, and build innovative solutions
            </p>
            <Button
              size="lg"
              className="relative z-10 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-red-500/30 transition-all transform hover:-translate-y-0.5"
              onClick={() => window.open("https://www.youtube.com/@muhammedhasan", "_blank")}
            >
              <Youtube className="w-5 h-5 mr-2" />
              Subscribe to Channel
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};