"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "./quotes.css";

const QUOTES = [
  {
    text: "One of the best apps I've ever used - super easy and useful!",
    author: "- Mark Williams",
  },
] as const;

const BACKGROUND_OFFSETS = [100, 300];

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Quotes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRefs = useRef<HTMLDivElement[]>([]);
  const swiperRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper | null>(null);

  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    const container = swiperRef.current;
    if (!container) return;

    swiperInstance.current = new Swiper(container, {
      modules: [EffectFade],
      effect: "fade",
      loop: false,
      autoplay: false,
      centeredSlides: false,
      centerInsufficientSlides: false,
      slidesPerView: 1,
      spaceBetween: 0,
      allowTouchMove: false,
    });
    setSwiperReady(true);

    return () => {
      swiperInstance.current?.destroy(true, true);
      swiperInstance.current = null;
      setSwiperReady(false);
    };
  }, []);

  useGSAP(
    () => {
      const container = containerRef.current;
      const securitySection = document.querySelector(".section-sticky-security");
      const swiper = swiperInstance.current;

      if (!container || !securitySection || !swiper || !swiperReady) return;

      const slideHeight =
        swiper.slides.length === 1
          ? container.offsetHeight * 0.95
          : swiper.slides.length === 2
            ? container.offsetHeight * 0.45
            : container.offsetHeight * 0.25;

      ScrollTrigger.create({
        trigger: container,
        start: "top top+=50%",
        endTrigger: securitySection,
        end: "top top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const direction = self.direction;

          backgroundRefs.current.forEach((background, index) => {
            const offset = BACKGROUND_OFFSETS[index] ?? 200;
            const nextPosition = Math.max(
              0,
              offset - (2 * progress * offset) / (index + 1)
            );

            gsap.to(background, {
              backgroundPositionY: `${nextPosition}px`,
              ease: "none",
              overwrite: true,
            });
          });

          const scrollOffset = progress * container.offsetHeight;
          const targetIndex = Math.floor(scrollOffset / slideHeight);

          if (
            direction === 1 &&
            targetIndex > swiper.activeIndex &&
            !swiper.isEnd
          ) {
            swiper.slideNext();
          } else if (
            direction === -1 &&
            targetIndex < swiper.activeIndex &&
            !swiper.isBeginning
          ) {
            swiper.slidePrev();
          }
        },
      });
    },
    { scope: containerRef, dependencies: [swiperReady] }
  );

  return (
    <div id="JS-quotes-container" ref={containerRef} className="quotes">
      <div
        ref={(element) => {
          if (element) backgroundRefs.current[0] = element;
        }}
        className="quotes__background JS-quotes-background"
        style={{ backgroundImage: "url('/quotes-bg-1.png')" }}
        aria-hidden="true"
      />
      <div
        ref={(element) => {
          if (element) backgroundRefs.current[1] = element;
        }}
        className="quotes__background JS-quotes-background"
        style={{ backgroundImage: "url('/quotes-bg-2.png')" }}
        aria-hidden="true"
      />

      <div className="quotes__items-wrapper">
        <div className="quotes__items">
          <div ref={swiperRef} className="swiper swiper-fade">
            <div className="swiper-wrapper">
              {QUOTES.map((quote) => (
                <div key={quote.author} className="swiper-slide">
                  <div className="quotes__item">
                    <p className="quotes__item__text">{quote.text}</p>
                    <p className="quotes__item__author">{quote.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
