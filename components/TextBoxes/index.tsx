"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import "./text-boxes.css";

const BOXES = [
  {
    icon: "/svg-01.svg",
    title: "Community-powered learning",
    text: "Share threads, videos, and spaces to crowd-source ideas and refine strategies alongside investors, creators, and experts.",
  },
  {
    icon: "/svg-02.svg",
    title: "Trading Meets Social Connectivity",
    text: "Track live prices, place orders, and see your network's insights beyond the chart—analysis, conversation, and execution live on a single screen.",
  },
  {
    icon: "/svg-03.svg",
    title: "Unmatched A.I. driven insights",
    text: "Zenith A.I. and collaborative tools transform raw data and sentiment into clear signals, empowering you to trade with conviction.",
  },
] as const;

export default function TextBoxes() {
  const swiperRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 575px)");

    const syncSwiper = () => {
      const container = swiperRef.current;

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
  }, []);

  return (
    <section
      className="text-boxes"
      data-sal="slide-up"
      data-sal-duration="1000"
    >
      <div ref={swiperRef} className="swiper">
        <p className="textboxes-tagline">
          For educational purposes only. No investment advice or brokerage
          services are provided by UnBound X.
        </p>

        <div className="swiper-wrapper">
          {BOXES.map((box) => (
            <div key={box.title} className="swiper-slide">
              <div className="text-boxes__box">
                <div className="text-boxes__box__icon">
                  <Image src={box.icon} alt="" width={47} height={47} />
                </div>
                <p className="text-boxes__box__title">{box.title}</p>
                <p className="text-boxes__box__text">{box.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
