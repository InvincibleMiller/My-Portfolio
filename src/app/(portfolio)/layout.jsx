import "./globals.css";
import LenisRoot from "@/components/lenis";

import Header from "@/components/Header";

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL),
  title: {
    default: "Isaac Miller",
    template: "%s | Isaac Miller",
  },
  creator: "Isaac Miller",
  publisher: "Isaac Miller",
  applicationName: "Isaac Miller's Portfolio",
  description:
    "Front-End Web Portfolio by Isaac Miller. JavaScript/React, Next.js, Sanity CMS. 2 years of professional experience.",
  keywords: [
    "Isaac Miller",
    "Software Engineer",
    "Front End",
    "Portfolio",
    "Web Developer",
    "Web Development",
    "Next.js",
    "React",
    "JavaScript",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="content-overlay"></div>
        <Header />
        {children}
        {/* <LenisRoot /> */}
      </body>
    </html>
  );
}
