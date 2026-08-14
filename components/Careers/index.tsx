import Image from "next/image";
import "./careers.css";

export default function Careers() {
  return (
    <section
      className="section careers"
      data-sal="slide-up"
      data-sal-duration="1000"
    >
      <div className="careers__inner">
        <div className="section__column">
          <h2 className="section__title section__title--gray">Careers</h2>
          <p className="section__heading">Want to join us?</p>
        </div>

        <div className="section__column">
          <a href="mailto:careers@unboundxinc.com" className="careers__link">
            <Image src="/ico-email.svg" alt="" width={32} height={32} />
            careers@unboundxinc.com
          </a>
        </div>
      </div>
    </section>
  );
}
