"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import Founders from "@/components/Founders";
import "../JoinCommunity/cta.css";
import "../Users/users.css";
import UBverseCta from "./UBverseCta";
import "./ubverse.css";

const ASSET_BASE = "https://www.unboundxinc.com/wp-content/uploads/2025/03";

const INVESTORS_BOXES = [
  {
    icon: `${ASSET_BASE}/investors-01.svg`,
    iconHeight: 48,
    title: "Access game-changing deals",
    text: "Get into vetted startups, real estate, and specialty funds before they appear on public exchanges.",
  },
  {
    icon: `${ASSET_BASE}/investors-02.svg`,
    iconHeight: 48,
    title: "Fractional & Liquid",
    text: "Blockchain tokens let you buy small pieces and trade when you're ready—no decade-long lockups (coming soon).",
  },
  {
    icon: `${ASSET_BASE}/investors-03.svg`,
    iconHeight: 48,
    title: "Direct to Founders",
    text: "Join AMAs, ask questions, and track progress in real time—build conviction, not FOMO.",
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

type FeatureBoxesProps = {
  boxes: readonly {
    icon: string;
    iconHeight: number;
    title: string;
    text: string;
  }[];
  swiperRef: React.RefObject<HTMLDivElement | null>;
  swiperId?: string;
};

function FeatureBoxes({ boxes, swiperRef, swiperId }: FeatureBoxesProps) {
  useMobileSwiper(swiperRef);

  return (
    <div className="users__boxes" data-sal="slide-up" data-sal-duration="1000">
      <div ref={swiperRef} id={swiperId} className="swiper">
        <div className="swiper-wrapper">
          {boxes.map((box) => (
            <div key={box.title} className="swiper-slide">
              <div className="users__box">
                <div className="users__box__heading">
                  <span className="users__box__icon">
                    <Image
                      src={box.icon}
                      alt=""
                      width={47}
                      height={box.iconHeight}
                      unoptimized
                    />
                  </span>
                  <p className="users__box__title">{box.title}</p>
                </div>
                <p className="users__box__text">{box.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function UBverse() {
  const investorsSwiperRef = useRef<HTMLDivElement>(null);

  return (
    <div className="section-gradient section-gradient--secondary">
      <div id="ubverse" className="ubverse">
        <div className="ubverse__header">
          <h2 className="ubverse__title">
            <span>UBverse</span>
            <br />
            by UnBound X
          </h2>
          <p className="ubverse__description">
            Invest in tomorrow&apos;s companies before Wall Street can.
          </p>
          <div className="ubverse-text-tagline">
            UnBound X does not offer or sell securities. Any securities-related
            activity occurs solely through registered broker-dealers or other
            regulated intermediaries, as applicable.
          </div>
        </div>

        <Founders />

        <section id="investors" className="section investors">
          <h2
            className="section__title"
            data-sal="slide-up"
            data-sal-duration="1000"
          >
            Investors
          </h2>
          <p
            className="section__heading"
            data-sal="slide-up"
            data-sal-duration="1000"
          >
            Your Bridge to Early-Stage Opportunity
          </p>
          <p
            className="section__description"
            data-sal="slide-up"
            data-sal-duration="1000"
          >
            Own a slice of high-growth startups and real-world assets
          </p>

          <FeatureBoxes
            boxes={INVESTORS_BOXES}
            swiperRef={investorsSwiperRef}
            swiperId="JS-investors-boxes"
          />
        </section>

        <UBverseCta
          slogan="Access. Connect. Grow."
          href="https://ubverse.unboundx.co"
          buttonText="Join the Waitlist for Our Investors Network!"
          imageSrc={`${ASSET_BASE}/investors-cta.png`}
        />
      </div>
    </div>
  );
}
