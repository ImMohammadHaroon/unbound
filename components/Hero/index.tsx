"use client";

import Image from "next/image";
import styles from "./Hero.module.css";

const ROTATING_WORDS = ["learn", "invest", "together."] as const;

const APP_STORE_URL =
  "https://apps.apple.com/us/app/unbound-x/id6745837250";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.unboundx";

type HeroProps = {
  heroImageRef?: React.RefObject<HTMLDivElement | null>;
};

export default function Hero({ heroImageRef }: HeroProps) {
  return (
    <section className={styles.homeHero} data-hero-section>
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>
          Shaping the future
          <br />
          of finance,{" "}
          <span className={styles.curtainWords}>
            {ROTATING_WORDS.map((word) => (
              <span key={word} className={styles.curtainWord} data-curtain-word>
                {word}
              </span>
            ))}
          </span>
        </h2>

        <div className={styles.inner}>
          <div className={styles.sectionCenter}>
            <p className={styles.description}>
              Join a vibrant community where AI-powered insights, social
              portfolios, and a full spectrum of investment opportunities
              meet—all in one seamless experience.
            </p>

            <div className={styles.downloadButtons}>
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                <Image
                  src="/app-store.svg"
                  alt="Download on the App Store"
                  width={162}
                  height={48}
                />
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/play-store.svg"
                  alt="Get it on Google Play"
                  width={162}
                  height={48}
                />
              </a>
            </div>

            <div className={styles.heroImage} ref={heroImageRef}>
              <Image
                src="/intro-image-1.webp"
                alt=""
                width={506}
                height={312}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
