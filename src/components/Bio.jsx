"use client";

import { useState, useRef, useEffect } from "react";
import IndexBody from "@/components/IndexBody";

export default function Bio({ pages }) {
  const [tabIndex, setTabIndex] = useState(0);

  const shortBtnRef = useRef();
  const longBtnRef = useRef();

  useEffect(() => {
    if (window.innerWidth >= 800) {
      useLong();
    } else {
      useShort();
    }
  }, []);

  function useLong() {
    // Deactivate short
    shortBtnRef.current.classList.remove("active");
    shortBtnRef.current.classList.add("disabled");

    // Activate long
    longBtnRef.current.classList.add("active");
    longBtnRef.current.classList.remove("disabled");

    setTabIndex(1);
  }

  function useShort() {
    // Activate short
    shortBtnRef.current.classList.add("active");
    shortBtnRef.current.classList.remove("disabled");

    // Deactivate long
    longBtnRef.current.classList.remove("active");
    longBtnRef.current.classList.add("disabled");

    setTabIndex(0);
  }

  return (
    <>
      <div className="about-header">
        <h2>Bio</h2>
        <span className="tab-group">
          <button
            ref={shortBtnRef}
            className="active"
            type="button"
            onClick={useShort}
          >
            <h3>Short</h3>
          </button>
          <button
            ref={longBtnRef}
            className="disabled"
            type="button"
            onClick={useLong}
          >
            <h3>Long</h3>
          </button>
          <div className="after"></div>
        </span>
      </div>
      <IndexBody index={tabIndex} pages={pages} />
    </>
  );
}
