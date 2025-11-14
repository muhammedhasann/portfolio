import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/ui/navbar"; // Correct import path
import "./globals.css";

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
  variable: "--font-roboto", // This creates the CSS variable
});

export const metadata: Metadata = {
  title: "Muhammed Hasan - Portfolio",
  description:
    "Mechanical Engineer & AI Researcher - Bridging Engineering Excellence with AI Innovation",
  icons: {
    icon: "/favicon.png", // Points to public/favicon.png
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // --- FIX: Added scroll-smooth ---
    <html lang="en" className={`${roboto.variable} dark scroll-smooth`}>
      {/* --- FIX FOR CLS (LAYOUT SHIFT) ---
        The report said your H1 (Engineer) was shifting because the font
        "...media/9c133a109c8ce041-s.p.ttf" was loading late.
        
        This <link> tells the browser to load that font file *immediately*,
        preventing the layout shift.
      */}
      <head>
        <link
          rel="preload"
          href="/_next/static/media/9c133a109c8ce041-s.p.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        {/* This second preload is for the *other* big font file 
          from your "Enormous network payloads" report.
        */}
        <link
          rel="preload"
          href="/_next/static/media/4d16d55d6080ddef-s.p.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>

      {/* --- FIX: Navbar must be INSIDE the <body> --- */}
      <body className="font-sans antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}