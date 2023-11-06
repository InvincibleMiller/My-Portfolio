export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio/", "/api/"],
    },
    sitemap: process.env.SITE_URL + "sitemap.xml",
  };
}
