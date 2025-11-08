/** @type {import('next').NextConfig} */
const nextConfig = {
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { 
            key: 'Content-Security-Policy',
            // --- THIS IS THE FIX ---
            // Added 'https://img.youtube.com' and 'https://www.youtube.com' to allow images and embeds
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://img.youtube.com; frame-src 'self' https://www.youtube.com;" 
          },
        ],
      },
    ];
  },
  
  images: {
    // This part is correct and tells Next.js to optimize these domains
    remotePatterns: [
      {
        protocol: 'https' as const, // Added 'as const' for stricter TypeScript
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https' as const,
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;