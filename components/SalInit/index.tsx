"use client";

import { useEffect } from "react";

const SAL_THRESHOLD = 0.5;
const SAL_ROOT_MARGIN = "0% 50%";
const SAL_DISABLE_QUERY = "(max-width: 960px)";

function observeSalElements(observer: IntersectionObserver) {
  document.querySelectorAll<HTMLElement>("[data-sal]").forEach((element) => {
    if (!element.classList.contains("sal-animate")) {
      observer.observe(element);
    }
  });
}

export default function SalInit() {
  useEffect(() => {
    const mediaQuery = window.matchMedia(SAL_DISABLE_QUERY);
    let observer: IntersectionObserver | null = null;

    const enable = () => {
      document.body.classList.remove("sal-disabled");

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio < SAL_THRESHOLD) return;

            entry.target.classList.add("sal-animate");
            observer?.unobserve(entry.target);
          });
        },
        {
          root: null,
          rootMargin: SAL_ROOT_MARGIN,
          threshold: SAL_THRESHOLD,
        }
      );

      observeSalElements(observer);
    };

    const disable = () => {
      observer?.disconnect();
      observer = null;
      document.body.classList.add("sal-disabled");
    };

    const sync = () => {
      if (mediaQuery.matches) {
        disable();
        return;
      }

      enable();
    };

    sync();
    mediaQuery.addEventListener("change", sync);

    return () => {
      mediaQuery.removeEventListener("change", sync);
      observer?.disconnect();
      document.body.classList.remove("sal-disabled");
    };
  }, []);

  return null;
}
