"use client";

import Image from "next/image";
import styles from "./TextBlocks.module.css";

const BLOCKS = [
  {
    heading: "Fusing Finance with Social Connectivity",
    text: "Help us build a vibrant ecosystem where ideas spark financial innovation, connecting investors and leaders to shape a smarter, more connected future.",
    image: "/img-01.png",
    width: 890,
    height: 848,
  },
  {
    heading: (
      <>
        Beyond Investing:
        <br />
        Shaping Tomorrow
      </>
    ),
    text: "The industry is flooded with lookalike platforms — UnBound X is a leap forward, combining investing with real-time market insights, social learning, and advanced A.I.",
    image: "/img-02.png",
    width: 700,
    height: 656,
  },
  {
    heading: "Empowering Investors: Your Voice, Our Future",
    text: "Every member is essential to our evolution. Your insights and feedback fuel our collective growth, ensuring that together, we innovate and adapt continuously.",
    image: "/img-03.png",
    width: 700,
    height: 610,
  },
] as const;

export default function TextBlocks() {
  return (
    <section className={styles.textBlocks}>
      {BLOCKS.map((block) => (
        <div
          key={block.image}
          className={styles.section}
          data-sal="slide-up"
          data-sal-delay="200"
          data-sal-duration="1000"
        >
          <div className={styles.inner}>
            <h3 className={styles.heading}>{block.heading}</h3>
            <p className={styles.text}>{block.text}</p>
          </div>

          <div className={styles.image}>
            <Image
              src={block.image}
              alt=""
              width={block.width}
              height={block.height}
              sizes="(max-width: 639px) 100vw, 500px"
              className={styles.imageElement}
              style={
                {
                  "--block-aspect": block.width / block.height,
                } as React.CSSProperties
              }
            />
          </div>
        </div>
      ))}
    </section>
  );
}