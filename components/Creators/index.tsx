"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import "./creators.css";

const CREATOR_BOXES = [
  {
    icon: "/creators-01.svg",
    iconHeight: 47,
    title: "Your expertise, amplified",
    text: "Share your insights through videos, threads, and live events in a space where financial knowledge thrives. Stand out as one of the platform's founding voices.",
  },
  {
    icon: "/creators-02.svg",
    iconHeight: 48,
    title: "Unlock new opportunities",
    text: "Discover tools to help you monetize your content, from sharing investment strategies to market analysis and breaking down emerging trends.",
  },
  {
    icon: "/creators-03.svg",
    iconHeight: 47,
    title: "Grow with us",
    text: "As we evolve, your reach will grow as you shape a global audience seeking financial education and fresh perspectives within a creator-driven, community-first ecosystem.",
  },
] as const;

export default function Creators() {
  const swiperRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper | null>(null);
  const stickyInstance = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 575px)");
    const desktopQuery = window.matchMedia("(min-width: 576px)");

    const syncSwiper = () => {
      const container = swiperRef.current;

      if (mobileQuery.matches && container && !swiperInstance.current) {
        swiperInstance.current = new Swiper(container, {
          loop: false,
          centeredSlides: false,
          centerInsufficientSlides: false,
          slidesPerView: 1.25,
          spaceBetween: 20,
        });
        return;
      }

      if (!mobileQuery.matches && swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
        swiperInstance.current = null;

        const wrapper = container?.querySelector<HTMLElement>(".swiper-wrapper");
        if (wrapper) {
          wrapper.style.transform = "";
          wrapper.style.transitionDuration = "";
        }

        container
          ?.querySelectorAll<HTMLElement>(".swiper-slide")
          .forEach((slide) => {
            slide.style.width = "";
            slide.style.marginRight = "";
          });
      }
    };

    const syncSticky = async () => {
      if (desktopQuery.matches && !stickyInstance.current) {
        const HCSticky = (await import("hc-sticky")).default;
        stickyInstance.current = new HCSticky("#JS-creators-sticky", {
          stickTo: "#JS-creators-container",
          innerTop: -40,
        });
        ScrollTrigger.refresh();
        return;
      }

      if (!desktopQuery.matches && stickyInstance.current) {
        stickyInstance.current.destroy();
        stickyInstance.current = null;
        ScrollTrigger.refresh();
      }
    };

    const onResize = () => {
      void syncSticky();
    };

    syncSwiper();
    void syncSticky();

    mobileQuery.addEventListener("change", syncSwiper);
    desktopQuery.addEventListener("change", onResize);
    window.addEventListener("resize", onResize);

    return () => {
      mobileQuery.removeEventListener("change", syncSwiper);
      desktopQuery.removeEventListener("change", onResize);
      window.removeEventListener("resize", onResize);
      swiperInstance.current?.destroy(true, true);
      swiperInstance.current = null;
      stickyInstance.current?.destroy();
      stickyInstance.current = null;
    };
  }, []);

  return (
    <section
      id="creators"
      className="section section--no-margin creators JS-creators-section"
    >
      <div id="JS-creators-container" className="creators__inner">
        <div className="creators__column">
          <div id="JS-creators-sticky">
            <h2
              className="section__title"
              data-sal="slide-up"
              data-sal-duration="1000"
            >
              Creators
            </h2>

            <p
              className="section__heading"
              data-sal="slide-up"
              data-sal-duration="1000"
            >
              Build a knowledge ecosystem, together.
            </p>

            <p
              className="section__description"
              data-sal="slide-up"
              data-sal-duration="1000"
            />

            <div
              className="creators__image"
              data-sal="slide-up"
              data-sal-duration="1000"
              data-sal-once="true"
            >
              <Image
                src="/creators-01.png"
                alt=""
                width={1042}
                height={928}
                sizes="(max-width: 1042px) 100vw, 1042px"
              />
            </div>
          </div>
        </div>

        <div
          className="creators__column creators__column--boxes"
          data-sal="slide-up"
          data-sal-duration="1000"
          data-sal-delay="250"
          data-sal-once="true"
        >
          <div className="creators__boxes-wrapper">
            <div ref={swiperRef} id="JS-creators-boxes" className="swiper">
              <div className="swiper-wrapper creators__boxes">
                {CREATOR_BOXES.map((box) => (
                  <div key={box.title} className="swiper-slide">
                    <div className="creators__box">
                      <div className="creators__box__heading">
                        <div className="creators__box__icon">
                          <Image
                            src={box.icon}
                            alt=""
                            width={47}
                            height={box.iconHeight}
                          />
                        </div>
                        <p className="creators__box__title">{box.title}</p>
                      </div>
                      <p className="creators__box__text">{box.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
