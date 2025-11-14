/** @type {import('next').NextConfig} */

// --- CSP (Content Security Policy) Configuration ---
// This is a strict policy. 'self' means only load resources from your own domain.
// We make exceptions for fonts ('data:') and images from specific sources.
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: img.youtube.com images.unsplash.com placehold.co;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim(); // Minify the policy string

const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },

  // --- THIS IS THE FIX ---
  // We add the 'async headers()' function to implement security headers
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'Strict-Transport-Security',
            // Enforces HTTPS for 2 years, including subdomains, and allows preloading
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            // Prevents clickjacking
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            // Prevents MIME-sniffing
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            // Isolates your site
            value: 'same-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;