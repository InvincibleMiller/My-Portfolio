export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/studio/", "/api/"],
    },
    sitemap: process.env.SITE_URL + "sitemap.xml",
  };
}
