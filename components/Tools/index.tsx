"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import "./tools.css";

const TOOL_IMAGES = [
  { src: "/tools-01.png", width: 512, height: 444, type: "media" as const },
  { src: "/tools-02.png", width: 512, height: 444, type: "media" as const },
  { src: "/tools-ico-01.svg", width: 86, height: 98, type: "icon" as const },
  { src: "/tools-ico-02.svg", width: 116, height: 97, type: "icon" as const },
  { src: "/tools-03.png", width: 512, height: 444, type: "media" as const },
] as const;

const TOOL_BOXES = [
  {
    title: "Insights at your fingertips",
    text: "Breaks news and price moves across stocks, crypto, ETFs, and macro events—delivered seconds after they happen.",
  },
  {
    title: "Social signal engine",
    text: "Transforms community conversation into quantified market signals—spot sentiment shifts before they hit the tape.",
  },
  {
    title: "Tailored to you",
    text: "Coming soon: Zenith will learn your portfolio, watchlist, and in-app activity to send insights tuned to your strategy.",
  },
] as const;

function useMobileSwiper(containerRef: React.RefObject<HTMLDivElement | null>) {
  const swiperInstance = useRef<Swiper | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 575px)");

    const syncSwiper = () => {
      const container = containerRef.current;

      if (mediaQuery.matches && container && !swiperInstance.current) {
        swiperInstance.current = new Swiper(container, {
          loop: false,
          centeredSlides: false,
          centerInsufficientSlides: false,
          slidesPerView: 1.25,
          spaceBetween: 20,
        });
        return;
      }

      if (!mediaQuery.matches && swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
        swiperInstance.current = null;
      }
    };

    syncSwiper();
    mediaQuery.addEventListener("change", syncSwiper);

    return () => {
      mediaQuery.removeEventListener("change", syncSwiper);
      swiperInstance.current?.destroy(true, true);
      swiperInstance.current = null;
    };
  }, [containerRef]);
}

export default function Tools() {
  const imagesRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);

  useMobileSwiper(imagesRef);
  useMobileSwiper(boxesRef);

  return (
    <section id="tools" className="section tools">
      <div className="section__inner">
        <h2 className="section__title" data-sal="slide-up" data-sal-duration="1000">
          Tools
        </h2>

        <p
          className="section__heading"
          data-sal="slide-up"
          data-sal-delay="250"
          data-sal-duration="1000"
        >
          Zenith A.I.
        </p>

        <div className="zenith-ai-tagline">
          Zenith A.I. provides general educational information and data
          visualization only. It does not generate investment recommendations,
          price targets, or personalized advice.
        </div>

        <div className="tools__images" data-sal="slide-up" data-sal-duration="1000">
          <div ref={imagesRef} className="swiper">
            <div className="swiper-wrapper">
              {TOOL_IMAGES.map((item) => (
                <div key={item.src} className="swiper-slide">
                  <div
                    className={`tools__images__item ${
                      item.type === "icon"
                        ? "tools__images__item--icon"
                        : "tools__images__item--media"
                    }`}
                  >
                    <Image
                      src={item.src}
                      alt=""
                      width={item.width}
                      height={item.height}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="tools__boxes" data-sal="slide-up" data-sal-duration="1000">
          <div ref={boxesRef} className="swiper">
            <div className="swiper-wrapper">
              {TOOL_BOXES.map((box) => (
                <div key={box.title} className="swiper-slide">
                  <div className="tools__boxes__item">
                    <p className="tools__boxes__title">{box.title}</p>
                    <p className="tools__boxes__text">{box.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
