import Image from "next/image";

type UBverseCtaProps = {
  slogan: string;
  href: string;
  buttonText: string;
  imageSrc: string;
  imageWidth?: number;
  imageHeight?: number;
};

export default function UBverseCta({
  slogan,
  href,
  buttonText,
  imageSrc,
  imageWidth = 2720,
  imageHeight = 1030,
}: UBverseCtaProps) {
  return (
    <section className="cta" data-sal="slide-up" data-sal-duration="1000">
      <div className="cta__inner">
        <div
          className="cta__content"
          data-sal="slide-up"
          data-sal-delay="250"
          data-sal-duration="1000"
        >
          <h2 className="cta__slogan">{slogan}</h2>
          <p className="cta__description" />
          <div className="cta__button-wrapper">
            <a
              href={href}
              className="button button--accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              {buttonText}
            </a>
          </div>
        </div>

        <div className="cta__background" aria-hidden="true">
          <Image
            src={imageSrc}
            alt=""
            width={imageWidth}
            height={imageHeight}
            sizes="(max-width: 2720px) 100vw, 2720px"
          />
        </div>
      </div>
    </section>
  );
}
