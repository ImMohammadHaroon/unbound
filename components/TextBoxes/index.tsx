"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./TextBoxes.module.css";

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

function BoxCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className={styles.box}>
      <div className={styles.icon}>
        <Image src={icon} alt="" width={47} height={47} />
      </div>
      <p className={styles.title}>{title}</p>
      <p className={styles.text}>{text}</p>
    </div>
  );
}

export default function TextBoxes() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 575px)");
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <section
      className={styles.textBoxes}
      data-sal="slide-up"
      data-sal-duration="1000"
    >
      <div className={styles.swiperContainer}>
        <p className={styles.tagline}>
          For educational purposes only. No investment advice or brokerage
          services are provided by UnBound X.
        </p>

        {isMobile ? (
          <Swiper
            className={styles.swiper}
            slidesPerView={1.25}
            spaceBetween={20}
            loop={false}
            centeredSlides={false}
          >
            {BOXES.map((box) => (
              <SwiperSlide key={box.title} className={styles.slide}>
                <BoxCard {...box} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.swiperWrapper}>
            {BOXES.map((box) => (
              <div key={box.title} className={styles.slide}>
                <BoxCard {...box} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
