import type { Metadata } from "next";
import localFont from "next/font/local";
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
    <html lang="en" className={`${roboto.variable} dark`}>
      {/* --- THIS IS THE FIX --- */}
      {/* Added 'font-sans' to apply your custom Roboto font */}
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}