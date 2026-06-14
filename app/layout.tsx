import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
const roboto = localFont({
  src: [
    {
      path: "./fonts/Roboto-VariableFont_wdth,wght.ttf",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "./fonts/Roboto-Italic-VariableFont_wdth,wght.ttf",
      style: "italic",
      weight: "100 900",
    },
  ],
  display: "swap",
  variable: "--font-roboto",
});

// ─────────────────────────────────────────────
// JSON-LD STRUCTURED DATA
// Tells Google exactly who you are as a real person.
// This is what triggers your name in search results & knowledge panels.
// ─────────────────────────────────────────────
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammed Hasan",
  url: "https://www.muhammedhasan.engineer",
  image: "https://www.muhammedhasan.engineer/me/imagee.jpeg",
  jobTitle: "Mechanical Engineer & AI Researcher",
  description:
    "Mechanical Engineer specializing in thermal management, energy storage, and aerospace structures. Teknofest finalist, TÜBİTAK researcher. Based in Siirt, Turkey.",
  email: "mohammadhasan22003@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Siirt",
    addressCountry: "TR",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Siirt University",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Siirt",
      addressCountry: "TR",
    },
  },
  knowsAbout: [
    "Thermal Management",
    "Energy Storage",
    "Aerospace Engineering",
    "Mechanical Engineering",
    "Artificial Intelligence",
    "Supercapacitors",
    "Battery Cooling Systems",
    "Solar Energy",
    "Nuclear Engineering",
    "Quantum Computing",
    "Robotics",
  ],
  // sameAs tells Google all these accounts = same person
  sameAs: [
    "https://www.linkedin.com/in/muhammedhaan/",
    "https://github.com/muhammedhasann",
    "https://scholar.google.com/citations?user=W8Y2d44AAAAJ&hl=en",
    "https://orcid.org/0009-0007-3563-3851",
    "https://x.com/Muhammed__Hasan",
  ],
};

// ─────────────────────────────────────────────
// METADATA
// Controls your Google search result title, description,
// social media preview cards, and indexing behaviour.
// ─────────────────────────────────────────────
export const metadata: Metadata = {
  // metadataBase is required for absolute Open Graph image URLs
  metadataBase: new URL("https://www.muhammedhasan.engineer"),

  // Title shown in Google search results
  title: {
    default: "Muhammed Hasan | Mechanical Engineer & AI Researcher",
    template: "%s | Muhammed Hasan", // used by any sub-pages
  },

  // The grey text shown under your blue link on Google
  description:
    "Muhammed Hasan — Mechanical Engineer specializing in thermal management, energy storage, and aerospace structures. Teknofest finalist & TÜBİTAK researcher. Based in Siirt, Turkey.",

  // Keywords help Google understand your expertise
  keywords: [
    "Muhammed Hasan",
    "Mechanical Engineer",
    "AI Researcher",
    "Thermal Management",
    "Energy Storage",
    "Aerospace Engineering",
    "Teknofest Finalist",
    "TÜBİTAK Researcher",
    "Siirt University",
    "Turkey Engineer",
    "Supercapacitor Research",
    "Battery Cooling Systems",
    "Solar Energy",
    "Nuclear Engineering",
    "Quantum Computing",
    "Engineering Portfolio",
    "PhD Candidate",
  ],

  authors: [
    { name: "Muhammed Hasan", url: "https://www.muhammedhasan.engineer" },
  ],
  creator: "Muhammed Hasan",
  publisher: "Muhammed Hasan",

  // Tell Google to fully index and follow all links
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph — controls how your link looks when shared on LinkedIn,
  // Facebook, WhatsApp, Discord, etc.
  openGraph: {
    type: "profile",
    firstName: "Muhammed",
    lastName: "Hasan",
    locale: "en_US",
    url: "https://www.muhammedhasan.engineer",
    siteName: "Muhammed Hasan",
    title: "Muhammed Hasan | Mechanical Engineer & AI Researcher",
    description:
      "Mechanical Engineer specializing in thermal management, energy storage, and aerospace. Teknofest finalist & TÜBİTAK researcher. Based in Siirt, Turkey.",
    images: [
      {
        url: "/me/imagee.jpeg",
        width: 1200,
        height: 630,
        alt: "Muhammed Hasan — Mechanical Engineer & AI Researcher",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter / X card — controls your link preview on X (Twitter)
  twitter: {
    card: "summary_large_image",
    title: "Muhammed Hasan | Mechanical Engineer & AI Researcher",
    description:
      "Mechanical Engineer specializing in thermal management, energy storage, and aerospace. Teknofest finalist.",
    creator: "@Muhammed__Hasan",
    images: ["/me/imagee.jpeg"],
  },

  // Canonical URL prevents duplicate content penalty
  alternates: {
    canonical: "https://www.muhammedhasan.engineer",
  },

  // Favicon
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  // ✅ GOOGLE SEARCH CONSOLE VERIFICATION
  // This adds: <meta name="google-site-verification" content="..." />
  // Go back to Google Search Console and click "Verify" after deploying.
  verification: {
    google: "PllJHJ03Ffd8ae4-dqbPLN5hYQOoVEbROsRdOdXG9Bs",
  },
};

// ─────────────────────────────────────────────
// ROOT LAYOUT
// ─────────────────────────────────────────────
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${roboto.variable} dark scroll-smooth`}>
      <head>
        {/* ✅ CLS FIX: Preload critical fonts so they don't cause layout shift */}
        <link
          rel="preload"
          href="/_next/static/media/9c133a109c8ce041-s.p.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/4d16d55d6080ddef-s.p.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />

        {/* ✅ PERFORMANCE: Preconnect to save round-trip time on key domains */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ✅ PERFORMANCE: DNS prefetch for external domains you link to */}
        <link rel="dns-prefetch" href="//www.linkedin.com" />
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//scholar.google.com" />
        <link rel="dns-prefetch" href="//orcid.org" />
        <link rel="dns-prefetch" href="//x.com" />

        {/* ✅ SEO: JSON-LD Person Schema — the most important SEO addition.
            Google reads this to understand who you are and show your
            name, photo, and links in search results. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>

      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}