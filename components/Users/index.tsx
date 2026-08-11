"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import JoinCommunity from "@/components/JoinCommunity";
import "./users.css";

const USER_BOXES = [
  {
    icon: "/users-01.svg",
    title: "Learn from pros",
    text: "Exclusive posts, videos, and live sessions from verified traders-absorb winning habits, skip rookie mistakes.",
  },
  {
    icon: "/users-02.svg",
    title: "Personalized insights",
    text: "Zenith flags trends and content tailored to your watchlist-powered by live market data and social sentiment.",
  },
  {
    icon: "/users-03.svg",
    title: "Mirror top portfolios",
    text: "One-tap allocation updates mirror real trades from high-performers and curated portfolios-grow alongside proven strategies.",
  },
  {
    icon: "/users-04.svg",
    title: "Earn as you explore",
    text: "Points for every post, trade, or referral unlock perks, tiers, and future fee discounts.",
  },
  {
    icon: "/users-05.svg",
    title: "Trade & win",
    text: "Enter live contests with simulated or real trades, climb leaderboards, and cash in prize pools.",
  },
  {
    icon: "/users-06.svg",
    title: "Risk-free practice",
    text: "Test strategies with real-time quotes in simulated trading-zero capital, zero stress.",
  },
  {
    icon: "/users-07.svg",
    title: "All your investments, one platform",
    text: "Stocks, ETFs, options, crypto, private market offerings-track and trade everything without juggling accounts.",
  },
] as const;

export default function Users() {
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
    <>
      <section id="users" className="section section--no-margin users">
      <h2 className="section__title" data-sal="slide-up" data-sal-duration="1000">
        Users
      </h2>

      <p
        className="section__heading"
        data-sal="slide-up"
        data-sal-duration="1000"
      >
        We believe that knowledge empowers investing.
      </p>

      <p
        className="section__description"
        data-sal="slide-up"
        data-sal-duration="1000"
      />

      <div className="users__boxes" data-sal="slide-up" data-sal-duration="1000">
        <div ref={swiperRef} className="swiper">
          <div className="swiper-wrapper">
            {USER_BOXES.map((box) => (
              <div key={box.title} className="swiper-slide">
                <div className="users__box">
                  <div className="users__box__heading">
                    <span className="users__box__icon">
                      <Image src={box.icon} alt="" width={47} height={47} />
                    </span>
                    <p className="users__box__title">{box.title}</p>
                  </div>
                  <p className="users__box__text">{box.text}</p>
                </div>
              </div>
            ))}

            <div className="swiper-slide users__image">
              <Image
                src="/users-image.png"
                alt=""
                width={1800}
                height={522}
                sizes="(max-width: 1800px) 100vw, 1800px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <JoinCommunity />
  </>
  );
}
