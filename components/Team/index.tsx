import Image from "next/image";
import "./team.css";

export default function Team() {
  return (
    <section
      className="team section"
      data-sal="slide-up"
      data-sal-duration="1000"
    >
      <div className="team__inner">
        <div className="team__content">
          <h2
            className="section__title"
            data-sal="slide-up"
            data-sal-delay="250"
            data-sal-duration="1000"
          >
            Our team
          </h2>

          <p
            className="section__heading"
            data-sal="slide-up"
            data-sal-delay="250"
            data-sal-duration="1000"
          >
            By Experts. For You.
          </p>

          <div
            className="team__description"
            data-sal="slide-up"
            data-sal-delay="250"
            data-sal-duration="1000"
          >
            <p>
              UnBound X was founded by professionals and visionary builders who
              have experienced the core challenges of retail finance—limited
              access, fragmented education, and a lack of trust. With deep
              expertise in finance and technology, we&apos;re building a platform
              that&apos;s accessible, transparent, and secure. Through strong
              compliance, clear transparency, and advanced infrastructure, we
              provide a trusted space for your financial and creative goals to
              thrive.
            </p>
          </div>
        </div>

        <div className="team__media">
          <Image
            src="/team.png"
            alt=""
            width={2720}
            height={1401}
            sizes="(max-width: 2720px) 100vw, 2720px"
          />
        </div>
      </div>
    </section>
  );
}
