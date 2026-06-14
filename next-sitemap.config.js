/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // Your domain
  siteUrl: "https://www.muhammedhasan.engineer",

  // Automatically creates public/robots.txt too
  generateRobotsTxt: true,

  // How often Google should re-check your pages
  changefreq: "monthly",

  // Priority tells Google how important each page is (0.0 – 1.0)
  priority: 0.7,

  // Exclude pages you don't want indexed
  exclude: ["/api/*"],

  // robots.txt configuration
  robotsTxtOptions: {
    policies: [
      // Allow all search engines to crawl everything
      { userAgent: "*", allow: "/" },
      // Allow Googlebot specifically
      { userAgent: "Googlebot", allow: "/" },
      // Block API routes from being indexed
      { userAgent: "*", disallow: "/api/" },
    ],
  },
};