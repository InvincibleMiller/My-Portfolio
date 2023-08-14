"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";

function Header() {
  const ref = useRef();
  const firstTop = useRef(null);

  function handleStickyStyle() {
    if (firstTop.current == null) {
      const main = document.querySelector("main");
      const firstChild = main.firstChild;

      firstTop.current = firstChild.offsetTop + firstChild.offsetHeight;

      console.log(firstTop.current);
    }
    // console.log(ref.current.offsetTop);

    if (ref.current.offsetTop + ref.current.offsetHeight >= firstTop.current) {
      ref.current.classList.add("sticky");
    } else {
      ref.current.classList.remove("sticky");
    }
  }

  useEffect(() => {
    (async () => {
      handleStickyStyle();

      window.addEventListener("scroll", () => {
        handleStickyStyle();
      });
    })();
  }, []);

  return (
    <header ref={ref}>
      <div className="header-wrapper">
        <div className="header-logo">
          <Link href={"/#top"} scroll>
            @ Isaac
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/#about-section" scroll>
                About
              </Link>
            </li>
            <li>
              <Link href="/#work-section">Work</Link>
            </li>
            <li>
              <Link href="/#contact-section">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
