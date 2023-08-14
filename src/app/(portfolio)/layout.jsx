import "./globals.css";
import LenisRoot from "@/components/lenis";

import Header from "@/components/Header";

export const metadata = {
  title: "Isaac Miller | Front End Web Developer | Invincible Miller",
  description:
    "Front-End Web Portfolio by Isaac Miller. JavaScript/React, Next.js, Sanity CMS. 2 years of professional experience.",
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
