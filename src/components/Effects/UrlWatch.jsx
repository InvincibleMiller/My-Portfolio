"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// Auto closes the Panel on Mobile when a link is clicked
// changes the color of the nav items
function UrlWatch() {
  const path = usePathname();
  const searchParams = useSearchParams();

  const closePanel = () =>
    document.querySelector("#nav-collapse").classList.remove("collapsed");

  const colorNavLinks = () => {
    const navLinks = document.querySelectorAll(".navbar-link");

    // remove color by default
    navLinks.forEach((link) => {
      link.classList.remove("active");
      console.log(link.href);
    });

    let pathName = path.replace("/", "");

    // add color is the path is correct
    navLinks.forEach((link) => {
      const href = link.href
        .replace(/^.+?[^\/:](?=[?\/]|$)/, "")
        .replace("/", "");
      if (href === pathName) {
        link.classList.add("active");
      }
    });
  };

  useEffect(() => {
    closePanel();
    colorNavLinks();
  }, [path, searchParams]);

  return <div style={{ display: "none" }}></div>;
}

export default UrlWatch;
