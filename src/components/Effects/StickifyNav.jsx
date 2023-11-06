"use client";

import { useEffect } from "react";

// This configuration assumes that the navbar is always
// the last child component in the <header/>
function StickifyNav() {
  useEffect(() => {
    const navbarContainer = document.querySelector(".navbar-container");
    const header = document.querySelector("header");

    window.addEventListener("scroll", (e) => {
      // check if the navbar is already sticky
      const stickyAlready = navbarContainer.classList.contains("sticky");

      // the "scroll offset" of the navbar container
      let scrollDiff = window.scrollY - navbarContainer.offsetTop;
      if (stickyAlready) {
        scrollDiff = window.scrollY - header.offsetTop - header.offsetHeight;
      }

      // apply or remove .sticky class
      if (scrollDiff >= 0) {
        if (!stickyAlready) {
          navbarContainer.classList.add("sticky");
          header.style.marginBottom = `${navbarContainer.clientHeight}px`;
        }
      } else if (stickyAlready) {
        // clear sticky by default
        navbarContainer.classList.remove("sticky");
        header.style.marginBottom = "0px";
      }
    });
  }, [0]);
  return <div style={{ display: "none" }}></div>;
}

export default StickifyNav;
