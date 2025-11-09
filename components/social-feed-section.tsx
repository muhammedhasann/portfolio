"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Repeat2, Share, ExternalLink, Rss } from "lucide-react";
import { Button } from "@/components/ui/button";

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FuturisticBadge = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    className="inline-flex items-center justify-center gap-3 mb-8 px-5 py-2.5 bg-black/50 border border-blue-500/30 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"
  >
    <div className="flex items-center gap-3">
      <XLogo className="w-6 h-6 text-white" />
      <div className="w-px h-5 bg-blue-500/50"></div>
      <Rss className="w-6 h-6 text-blue-400" />
    </div>
    <span className="ml-2 text-sm font-medium text-blue-300 tracking-wider uppercase">
      Live Feed
    </span>
  </motion.div>
);

interface XPost {
  id: string;
  text: string;
  author: {
    name: string;
    username: string;
    profile_image_url: string;
    verified: boolean;
  };
  created_at: string;
  public_metrics: {
    retweet_count: number;
    like_count: number;
    reply_count: number;
    quote_count: number;
  };
}

const mockXPost: XPost = {
  id: "1234567890",
  text: `Day 100 of #100DaysOfCode 
finally finished this journey and I'm about to graduate from backend boot camp. I landed an internship and it was an amazing journey. 

Anyway, three days of developing fitness app but the backend needs more work. #tech #programming #backend #webdev`,
  author: {
    name: "Muhammed Hasan",
    username: "Muhammed__Hasan",
    profile_image_url: "/me/image.jpg?height=40&width=40",
    verified: true,
  },
  created_at: "2025-01-22T10:30:00.000Z",
  public_metrics: {
    retweet_count: 24,
    like_count: 156,
    reply_count: 12,
    quote_count: 8,
  },
};

const NeonGradientCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]"></div>
    <div className="relative z-10">{children}</div>
  </div>
);

const Skeleton = () => (
  <div className="relative bg-gradient-to-br from-[#0d0d0f] to-[#19191d] backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
    <div className="p-6">
      <div className="animate-pulse">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-slate-800 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-800 rounded w-32"></div>
            <div className="h-3 bg-slate-800 rounded w-24"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-slate-800 rounded w-full"></div>
          <div className="h-4 bg-slate-800 rounded w-3/4"></div>
          <div className="h-4 bg-slate-800 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  </div>
);

const XCard = () => {
  const [post, setPost] = useState<XPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      setPost(mockXPost);
      setLoading(false);
    };
    fetchPost();
  }, []);

  const formatDate = (s: string) => {
    const d = new Date(s);
    const now = new Date();
    const hrs = Math.floor((now.getTime() - d.getTime()) / 3.6e6);
    if (hrs < 1) return "now";
    if (hrs < 24) return `${hrs}h`;
    if (hrs < 168) return `${Math.floor(hrs / 24)}d`;
    return d.toLocaleDateString();
  };

  const formatNumber = (n: number) =>
    n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(1)}K` : n.toString();

  if (loading) return <Skeleton />;

  if (!post) {
    return (
      <NeonGradientCard className="w-full max-w-2xl mx-auto">
        <div className="p-6 text-center">
          <XLogo className="w-12 h-12 text-white mx-auto mb-4" />
          <p className="text-gray-400">Unable to load latest post</p>
        </div>
      </NeonGradientCard>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full max-w-2xl mx-auto"
    >
      <NeonGradientCard className="overflow-hidden">
        <div className="p-6 bg-black/90 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <motion.img
                whileHover={{ scale: 1.1 }}
                src="/me/image.jpg"
                alt={post.author.name}
                className="w-12 h-12 rounded-full border-2 border-blue-400/50"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-white">{post.author.name}</h3>
                  {post.author.verified && (
                    <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-gray-400 text-sm">@{post.author.username}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <XLogo className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400 text-sm">{formatDate(post.created_at)}</span>
            </div>
          </div>
          <p className="text-white text-lg leading-relaxed whitespace-pre-wrap mb-6">{post.text}</p>
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {[
              { icon: MessageCircle, label: formatNumber(post.public_metrics.reply_count), color: "hover:text-blue-400" },
              { icon: Repeat2, label: formatNumber(post.public_metrics.retweet_count), color: "hover:text-blue-400" },
              { icon: Heart, label: formatNumber(post.public_metrics.like_count), color: "hover:text-blue-400" },
              { icon: Share, label: "", color: "hover:text-blue-400" },
            ].map(({ icon: Icon, label, color }) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 text-gray-400 ${color} transition-colors`}
              >
                <Icon className="w-5 h-5" />
                {label && <span className="text-sm">{label}</span>}
              </motion.button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-blue-400/50 text-blue-300 hover:bg-blue-400/10"
              onClick={() => window.open("https://x.com/Muhammed__Hasan/status/1686083465391771649", "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on X
            </Button>
          </div>
        </div>
      </NeonGradientCard>
    </motion.div>
  );
};

export const SocialFeedSection = () => {
  // State to store particle styles
  const [particles, setParticles] = useState<
    Array<{ top: string; left: string; width: string; height: string }>
  >([]);

  return (
    <section id="social" className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/5 to-black z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[length:20px_20px] z-0" />
      <div className="absolute inset-0 z-0">
        {particles.map((style, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/10"
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-20 relative z-10"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="inline-block"
        >
          <FuturisticBadge />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-br from-white via-neutral-300 to-blue-300 bg-clip-text md:text-6xl"
        >
          Latest Updates
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-400 max-w-3xl mx-auto"
        >
          Stay connected with my latest thoughts on AI, engineering, and clean technology innovations
        </motion.p>
      </motion.div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <XCard />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join the conversation for real-time updates on AI breakthroughs, engineering innovations, and clean tech developments
          </p>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <NeonGradientCard className="w-fit mx-auto">
              <a
                href="https://x.com/Muhammed__Hasan"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="px-8 py-3 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-white">Live Updates</span>
                    </div>
                    <div className="w-px h-5 bg-blue-400/30"></div>
                    <div className="flex items-center gap-2">
                      <XLogo className="w-4 h-4 text-white" />
                      <span className="text-sm font-medium text-white">Follow @Muhammed__Hasan</span>
                    </div>
                  </div>
                </div>
              </a>
            </NeonGradientCard>
          </motion.div>
          <div className="mt-6 flex justify-center gap-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};