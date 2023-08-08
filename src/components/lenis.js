"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

export default function LenisRoot({}) {
  useEffect(() => {
    const lenis = new Lenis({
      // wrapper: document.querySelector("html"),
      lerp: 0.2,
      duration: 1.4,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return <></>;
}
