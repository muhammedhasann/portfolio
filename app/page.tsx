// This is a Server Component (no "use client").
// Server Components are best for SEO — Next.js sends fully-rendered
// HTML to Google and to the user's browser instantly.
import HomeClient from "./home-client";

export default function Home() {
  return <HomeClient />;
}