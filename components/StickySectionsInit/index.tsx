"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function getPinStart(section: HTMLElement) {
  return section.offsetHeight < window.innerHeight ? "top top" : "bottom bottom";
}

function pinSection(
  section: HTMLElement,
  pinSpacing: boolean,
  end?: ScrollTrigger.Vars["end"],
  scrub: ScrollTrigger.Vars["scrub"] = 1
) {
  return ScrollTrigger.create({
    trigger: section,
    start: () => getPinStart(section),
    end,
    pin: true,
    pinSpacing,
    anticipatePin: 1,
    scrub,
    invalidateOnRefresh: true,
  });
}

export default function StickySectionsInit() {
  useGSAP(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (ScrollTrigger.isTouch) {
      ScrollTrigger.normalizeScroll(true);
    }

    const refresh = () => {
      ScrollTrigger.refresh();
    };

    ScrollTrigger.matchMedia({
      "(min-width: 576px)": () => {
        const sections = gsap.utils.toArray<HTMLElement>(".JS-sticky-section");

        sections.forEach((section, index) => {
          if (index === 0) {
            ScrollTrigger.create({
              trigger: section,
              start: "top top",
              pin: true,
              pinSpacing: false,
              anticipatePin: 1,
              scrub: 1,
            });
            return;
          }

          if (index < sections.length - 1) {
            pinSection(section, false, undefined, 1);
          }
        });
      },
    });

    refresh();
    window.addEventListener("load", refresh, { once: true });

    return () => {
      window.removeEventListener("load", refresh);
      if (ScrollTrigger.isTouch) {
        ScrollTrigger.normalizeScroll(false);
      }
    };
  });

  return null;
}
