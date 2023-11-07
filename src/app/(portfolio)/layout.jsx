import "./normalize.css";
import "./global.css";

import { client as sanityClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import Link from "next/link";
import CollapseButton from "@/src/components/CollapseButton";

import { urlForImage } from "@/sanity/lib/image";

import UrlWatch from "@/src/components/Effects/UrlWatch";
import StickifyNav from "@/src/components/Effects/StickifyNav";

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL),
  title: {
    default: "Isaac Miller",
    template: "%s | Isaac Miller",
  },
  creator: "Isaac Miller",
  publisher: "Isaac Miller",
  applicationName: "Isaac Miller's Portfolio",
  description: "Developer portfolio & Blog by Isaac Miller.",
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

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function layout({ children }) {
  const params = {};
  const newestHomePage = await sanityClient.fetch(
    groq`*[_type == "homePage"] | order(_createAt desc) [0]`,
    params
  );

  const { title: pageTitle, hook: pageHook, socials } = newestHomePage;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={+true}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@200;300;400&family=Vollkorn&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <UrlWatch />
        <StickifyNav />
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
                  <li>
                    <Link href={"/blog/"}>Blog</Link>
                  </li>
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
