"use client";
import { useEffect, useRef, useState } from "react";

// Returns `true` when the header should be hidden (scrolling down past the
// threshold) and `false` when it should be shown (scrolling up / near top).
export default function useHideOnScroll(threshold = 80) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      // Ignore tiny scroll jitter.
      if (Math.abs(delta) < 6) return;

      if (delta > 0 && y > threshold) {
        setHidden(true); // scrolling down
      } else {
        setHidden(false); // scrolling up
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return hidden;
}
