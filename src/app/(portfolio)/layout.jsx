import "./normalize.css";
import "./global.css";

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
    "Full Stack",
    "Back End",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@200;300;400&family=Vollkorn&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
