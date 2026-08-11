"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import styles from "./StickyHeroSection.module.css";

const HERO_VIDEO = "/hero-video.mp4";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type StickyHeroSectionProps = {
  children?: React.ReactNode;
};

export default function StickyHeroSection({ children }: StickyHeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    setCanPlayVideo(true);
  }, []);

  useEffect(() => {
    const words =
      containerRef.current?.querySelectorAll<HTMLElement>("[data-curtain-word]");
    const timeouts: number[] = [];

    words?.forEach((word, index) => {
      timeouts.push(
        window.setTimeout(() => {
          word.setAttribute("data-animate", "");
        }, 500 + 1000 * index)
      );
    });

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  useEffect(() => {
    if (!canPlayVideo) return;

    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.muted = true;
      video.defaultMuted = true;
      void video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            video.pause();
            return;
          }

          if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            playVideo();
            return;
          }

          video.addEventListener("loadeddata", playVideo, { once: true });
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", playVideo);
    };
  }, [canPlayVideo]);

  useGSAP(
    () => {
      const heroSection = containerRef.current?.querySelector(
        "[data-hero-section]"
      );

      ScrollTrigger.matchMedia({
        "(min-width: 576px)": () => {
          if (heroSection && heroImageRef.current) {
            gsap.to(heroImageRef.current, {
              y: -150,
              scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          }
        },
        "(max-width: 575px)": () => {
          if (heroSection && heroImageRef.current) {
            gsap.to(heroImageRef.current, {
              y: -60,
              scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          }
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div
        ref={stickyRef}
        className={`${styles.sectionSticky} ${styles.sectionStickyFirst} JS-sticky-section`}
      >
        <div ref={curtainRef} className={styles.curtain} aria-hidden="true" />
        <Hero heroImageRef={heroImageRef} />
      </div>

      <div className={styles.sectionAfterSticky}>
        <div
          className={styles.mediaLarge}
          data-sal="slide-up"
          data-sal-duration="1000"
        >
          <div className={styles.mediaLargeVideo}>
            {canPlayVideo ? (
              <video
                ref={videoRef}
                className={styles.mediaLargeVideoElement}
                src={HERO_VIDEO}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="UnBound X community video"
                suppressHydrationWarning
              />
            ) : null}
          </div>

          <div className={styles.mediaLargeText}>
            <p>Connect. Share. Invest.</p>
            <div className={styles.taglineText}>
              <strong>UnBound X is</strong> an educational platform. Brokerage
              services are provided exclusively by MARV Capital Inc., a
              registered broker-dealer. Clearing and custody are provided by
              Alpaca Securities LLC.
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
