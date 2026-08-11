"use client";

import Image from "next/image";
import { useJoinNow } from "@/components/JoinNowProvider";
import "./cta.css";

export default function JoinCommunity() {
  const { openJoinModal } = useJoinNow();

  return (
    <section className="cta" data-sal="slide-up" data-sal-duration="1000">
      <div className="cta__inner">
        <div
          className="cta__content"
          data-sal="slide-up"
          data-sal-delay="250"
          data-sal-duration="1000"
        >
          <h2 className="cta__slogan">Join the community</h2>
          <p className="cta__description">Take the first step</p>

          <div className="cta__button-wrapper">
            <button
              type="button"
              className="button button--accent"
              onClick={openJoinModal}
            >
              Sign up now
            </button>
          </div>
        </div>

        <div className="cta__background" aria-hidden="true">
          <Image
            src="/community-01.png"
            alt=""
            width={2720}
            height={1028}
            sizes="(max-width: 2720px) 100vw, 2720px"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
