"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function getSecurityStart(section: HTMLElement) {
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
    start: () => getSecurityStart(section),
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
            const isSecurity = section.classList.contains("section-sticky-security");
            pinSection(section, isSecurity, undefined, 1);
          }
        });
      },
      "(max-width: 575px)": () => {
        const security = document.querySelector<HTMLElement>(
          ".section-sticky-security"
        );
        const gradient = document.querySelector<HTMLElement>(".section-gradient");

        if (!security || !gradient) return;

        ScrollTrigger.create({
          trigger: security,
          start: "top top",
          endTrigger: gradient,
          end: "top top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
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
