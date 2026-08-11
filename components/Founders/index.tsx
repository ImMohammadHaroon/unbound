"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import UBverseCta from "@/components/UBverse/UBverseCta";
import "@/components/JoinCommunity/cta.css";
import "./founders.css";

const FOUNDER_BOXES = [
  {
    icon: "/issuers-01.svg",
    iconHeight: 48,
    title: "Expand your investor base",
    text: "Reach a global pool of everyday and accredited backers—all inside a single, compliant platform.",
  },
  {
    icon: "/issuers-02.svg",
    iconHeight: 48,
    title: "Secure & compliant fundraising",
    text: "End-to-end KYC/AML and smart contracts keep you—and your investors—fully protected.",
  },
  {
    icon: "/issuers-03.svg",
    iconHeight: 47,
    title: "Tokenize your assets",
    text: "From real estate to private equity, leverage blockchain technology to fractionalize and democratize ownership (coming soon).",
  },
] as const;

export default function Founders() {
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

    syncSwiper();
    mediaQuery.addEventListener("change", syncSwiper);

    return () => {
      mediaQuery.removeEventListener("change", syncSwiper);
      swiperInstance.current?.destroy(true, true);
      swiperInstance.current = null;
    };
  }, []);

  return (
    <>
      <section className="section founders issuers">
        <h2
          className="section__title"
          data-sal="slide-up"
          data-sal-duration="1000"
        >
          Founders
        </h2>
        <p
          className="section__heading"
          data-sal="slide-up"
          data-sal-duration="1000"
        >
          Your Portal to Securing Funding for Your Startup
        </p>
        <p
          className="section__description"
          data-sal="slide-up"
          data-sal-duration="1000"
        >
          Powering issuers with capital, compliance, and security.
        </p>

        <div
          className="founders__boxes users__boxes"
          data-sal="slide-up"
          data-sal-duration="1000"
        >
          <div
            ref={swiperRef}
            id="JS-issuers-boxes"
            className="swiper"
          >
            <div className="swiper-wrapper">
              {FOUNDER_BOXES.map((box) => (
                <div key={box.title} className="swiper-slide">
                  <div className="founders__box users__box">
                    <div className="founders__box__heading users__box__heading">
                      <span className="founders__box__icon users__box__icon">
                        <Image
                          src={box.icon}
                          alt=""
                          width={47}
                          height={box.iconHeight}
                        />
                      </span>
                      <p className="founders__box__title users__box__title">
                        {box.title}
                      </p>
                    </div>
                    <p className="founders__box__text users__box__text">
                      {box.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <UBverseCta
        slogan="Launch. Fund. Scale."
        href="https://ubverse.unboundx.co/for-founders"
        buttonText="Startups: Join the Network Early"
        imageSrc="/issuers-cta.png"
      />
    </>
  );
}
