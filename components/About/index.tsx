import Image from "next/image";
import "./about.css";

const IMAGE_BASE = "https://www.unboundxinc.com/wp-content/uploads/2026/06";

const FOUNDERS = [
  {
    name: "Maneesh Awasthi",
    position: "Co-Founder & CEO",
    image: `${IMAGE_BASE}/maneesh-img.png`,
    bio: (
      <>
        With over 27 years of experience across institutional finance, structured
        credit products, and regulatory compliance, I have seen firsthand how
        trust is built—and broken—in financial markets. As the CEO and
        Co-Founder of MARV Capital, an SEC and FINRA-regulated broker-dealer, I
        have led structuring, sales and trading, advisory for hedge funds,
        real-money accounts, and growth-stage companies through high-stakes,
        regulated environments.
        <br />
        <br />
        At UnBound X, I am applying that experience to a new challenge:
        bringing institutional-grade execution and trust to the retail investor
        world. From regulatory rigor to private-market innovation, I am
        committed to building a platform where transparency, compliance, and
        user empowerment are not features—they are fundamentals.
        <br />
        <br />
        Driven by a vision to redefine the future of finance, I lead a
        passionate team dedicated to empowering individuals with the tools,
        knowledge, and community support they need to confidently navigate the
        ever-evolving financial landscape. Together, we aim to provide investors
        with the resources to take control of their financial futures.
      </>
    ),
  },
  {
    name: "Arnav Awasthi",
    position: "Co-Founder, COO, & Head of Product",
    image: `${IMAGE_BASE}/arnav-img.png`,
    bio: (
      <>
        As a builder with roots in aerospace engineering and a mind shaped by
        computer science and economics, I&apos;ve always gravitated toward complex
        challenges. But it wasn&apos;t until I lost 85% of my portfolio during
        the GameStop saga that I saw the real complexity: the retail investor
        experience itself—isolated, unsupported, and full of noise.
        <br />
        <br />
        I pivoted my academic and professional life to address that knowledge
        gap. From autonomous rockets to decentralized finance, I&apos;ve
        explored systems that require both precision and intuition. That spirit
        now drives UnBound X—a platform built not just to make investing easier,
        but to make it meaningful. We&apos;re crafting a new kind of investing
        experience—one that&apos;s intuitive, social, AI-powered, and above all,
        empowering.
      </>
    ),
  },
] as const;

export default function About() {
  return (
    <section id="about" className="about section">
      <h2
        className="section__title section__title--gray"
        data-sal="slide-up"
        data-sal-duration="1000"
      >
        About
      </h2>
      <p
        className="section__heading"
        data-sal="slide-up"
        data-sal-duration="1000"
      >
        Built for a New Generation of Investors
      </p>
      <p
        className="section__description"
        data-sal="slide-up"
        data-sal-duration="1000"
      >
        At UnBound X, we bring together deep institutional experience and
        next-gen innovation to reshape the future of investing. What began as two
        different perspectives on the same problem—lack of trust, access, and
        education in retail finance—has evolved into a unified vision: a
        social-trading platform where users of all backgrounds can connect,
        share, and invest with clarity and confidence.
      </p>

      <div className="about__people">
        {FOUNDERS.map((founder) => (
          <div
            key={founder.name}
            className="about__person"
            data-sal="slide-up"
            data-sal-duration="1000"
          >
            <div className="about__person__image">
              <Image
                src={founder.image}
                alt=""
                width={650}
                height={920}
                sizes="(max-width: 650px) 100vw, 650px"
              />
            </div>

            <div className="about__person__info">
              <h3 className="about__person__name">{founder.name}</h3>
              <p className="about__person__position">{founder.position}</p>
              <p className="about__person__text">{founder.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
