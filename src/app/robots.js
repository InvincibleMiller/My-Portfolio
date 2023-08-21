export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/studio/"],
    },
    sitemap: process.env.SITE_URL + "sitemap.xml",
  };
}
