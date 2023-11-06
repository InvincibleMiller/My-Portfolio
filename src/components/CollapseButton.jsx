"use client";

import { BsList, BsXLg } from "react-icons/bs";
import { useEffect, useState } from "react";

function CollapseButton({ target, close }) {
  const [targetElem, setTargetElem] = useState(null);

  const className = "collapsed";

  function onClick() {
    if (targetElem?.classList.contains(className)) {
      targetElem.classList.remove(className);
    } else {
      targetElem.classList.add(className);
    }
  }

  useEffect(() => {
    setTargetElem(document.querySelector(target));
  });

  return (
    <button onClick={onClick} type="button" className="btn btn-burger">
      {(close && <BsXLg />) || <BsList />}
    </button>
  );
}

export default CollapseButton;
