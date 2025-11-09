/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better error detection in development
  reactStrictMode: true,

  // Optimize images with additional formats and quality settings
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Removed 'as const'
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https', // Removed 'as const'
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Added this from your other components
      },
    ],
    // 'quality' and 'formats' are not valid top-level keys here.
    // 'quality' is a prop on the <Image /> component.
  },

  // The 'async headers()' function has been REMOVED.
  // This fixes the 'unsafe-inline' security warning.
  // Vercel will now provide its own default, secure headers.

  // 'experimental: { appDir: true }' and 'swcMinify: true'
  // are removed because they are default in Next.js 15.
};

module.exports = nextConfig;