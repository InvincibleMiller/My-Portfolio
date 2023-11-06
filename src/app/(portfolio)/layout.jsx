import "./normalize.css";
import "./global.css";

import { client as sanityClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import Link from "next/link";
import CollapseButton from "@/src/components/CollapseButton";

import { urlForImage } from "@/sanity/lib/image";

import UrlWatch from "@/src/components/UrlWatch";

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

export default async function layout({ children }) {
  const params = {
    next: {
      revalidate: 30, // look for updates to revalidate cache every 30s
    },
  };
  const newestHomePage = await sanityClient.fetch(
    groq`*[_type == "homePage"] | order(_createAt desc) [0]`,
    params
  );

  const { title: pageTitle, hook: pageHook, socials } = newestHomePage;

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
      <body>
        <UrlWatch />
        <header>
          <div className="header-title">
            <div className="container-center">
              <h3 className="display-sub">{pageHook}</h3>
              <h1 className="display-title">{pageTitle}</h1>
            </div>
          </div>
          <div className="navbar-container">
            <div className="nav-collapse container-center">
              <CollapseButton target={"#nav-collapse"} />
            </div>
            <div
              id="nav-collapse"
              className="container-center collapse-content"
            >
              <div className="position-absolute top right">
                <CollapseButton close target={"#nav-collapse"} />
              </div>
              <nav className="navbar">
                <ul>
                  <li>
                    <Link scroll href="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link scroll href={"/#projects"}>
                      Projects
                    </Link>
                  </li>
                  <li>Blog</li>
                  <li>Contact</li>
                  <li className="socials">
                    {socials?.map(({ name, url, icon }) => {
                      return (
                        <a
                          className="social"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={url}
                        >
                          <div
                            className="social-icon"
                            style={{
                              backgroundImage: `url("${urlForImage(icon)
                                .width(16)
                                .url()}")`,
                            }}
                            alt={name}
                          ></div>
                          <span style={{ display: "none" }}>{name}</span>
                        </a>
                      );
                    })}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
