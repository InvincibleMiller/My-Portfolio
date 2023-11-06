"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function UrlWatch() {
  const path = usePathname();
  const searchParams = useSearchParams();

  const closePanel = () =>
    document.querySelector("#nav-collapse").classList.remove("collapsed");

  useEffect(() => {
    closePanel();
  }, [path, searchParams]);

  return <div style={{ display: "none" }}></div>;
}

export default UrlWatch;
