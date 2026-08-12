import Link from "next/link";
import "./footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <p>
          All rights reserved. UnBound X{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.{" "}
        </p>
        <p>
          Copyright © <span className="footer-span">{year}</span> by{" "}
          <Link href="/">UnBound X</Link>
        </p>
      </footer>

      <div className="ftr-tagline">
        UnBound X is not a broker-dealer or investment adviser. Brokerage
        services are provided by MARV Capital Inc.; clearing and custody by
        Alpaca Securities LLC.
      </div>
    </>
  );
}
