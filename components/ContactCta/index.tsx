"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useJoinNow } from "@/components/JoinNowProvider";
import "./contact-cta.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ContactCta() {
  const { openJoinModal } = useJoinNow();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const image = imageRef.current;
      if (!section || !image) return;

      gsap.set(image, { xPercent: -50 });
      gsap.to(image, {
        y: -250,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="contact-cta"
      data-sal="slide-up"
      data-sal-duration="1000"
    >
      <div className="contact-cta__inner">
        <div
          className="contact-cta__content"
          data-sal="slide-up"
          data-sal-delay="250"
          data-sal-duration="1000"
        >
          <h2 className="contact-cta__slogan">
            Ready to take the <br />
            first step?
          </h2>

          <p className="contact-cta__description">
            Take the first step. Sign up and join the
            <br />
            <b>UnBound X community.</b>
          </p>

          <div className="contact-cta__tagline">
            You will be redirected to MARV Capital Inc.&apos;s regulated
            brokerage platform to open an account and trade.
          </div>

          <div className="contact-cta__button">
            <button
              type="button"
              className="button"
              onClick={openJoinModal}
            >
              Sign up now
            </button>
          </div>
        </div>

        <div
          ref={imageRef}
          className="contact-cta__image js-contact-image"
          aria-hidden="true"
        >
          <Image
            src="/contact.png"
            alt=""
            width={1132}
            height={896}
            sizes="(max-width: 1132px) 100vw, 1132px"
          />
        </div>
      </div>
    </section>
  );
}
