"use client";

import { useEffect, useRef } from "react";
import "./security.css";

const SECURITY_VIDEO =
  "https://www.unboundxinc.com/wp-content/uploads/2025/03/4052869-uhd_3840_2160_25fps.mp4";

export default function Security() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <div className="section-sticky section-sticky-security section-sticky-12 JS-sticky-section">
      <section className="security" data-sal="slide-up" data-sal-duration="1000">
        <div className="security__inner">
          <div className="security__column security__column--left">
            <div className="security__background">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                loop
                muted
                preload="auto"
                poster="/committed-to-compliance.jpg"
                aria-hidden="true"
                suppressHydrationWarning
              >
                <source src={SECURITY_VIDEO} type="video/mp4" />
              </video>
            </div>

            <div className="security__content">
              <p className="security__title">Committed to compliance</p>
              <p className="security__text">
                User safety and innovation go hand in hand. With our &lsquo;Do It
                Right&rsquo; philosophy, we prioritize compliance to protect
                users while driving groundbreaking progress.
              </p>
            </div>
          </div>

          <div className="security__column security__column--right">
            <div className="security__item">
              <p className="security__title">Beyond Security</p>
              <p className="security__text">
                Through transparency and trust, we safeguard your investments
                and content, empowering your financial and creative pursuits
                with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
