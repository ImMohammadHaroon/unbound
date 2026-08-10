"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useJoinNow } from "@/components/JoinNowProvider";
import Logo from "@/components/Logo";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Zenith A.I.", href: "#tools" },
  { label: "Users", href: "#users" },
  { label: "Creators", href: "#creators" },
  { label: "UBverse", href: "#ubverse" },
  { label: "Investors", href: "#investors" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  const { openJoinModal } = useJoinNow();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const closeMenu = () => setMenuOpen(false);

  const toggleMenu = () => setMenuOpen((open) => !open);

  const handleJoinClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    closeMenu();
    openJoinModal();
  };

  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#") || href.length <= 1) return;

    e.preventDefault();
    closeMenu();

    const target = document.querySelector(href);
    if (!target) return;

    const top =
      target.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    document.body.classList.toggle("nav-expanded", menuOpen);
    return () => {
      document.body.classList.remove("nav-expanded");
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    if (menuOpen) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setIsFixed(window.scrollY > 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      id="JS-site-header"
      className={`${styles.header} ${isFixed ? styles.headerFixed : ""}`}
    >
      <div className={styles.headerInner}>
        <nav
          id="JS-primary-nav"
          className={`${styles.nav} ${menuOpen ? styles.navVisible : ""}`}
          aria-label="Primary navigation"
        >
          <button
            type="button"
            className={`${styles.navToggle} ${menuOpen ? styles.navToggleExpanded : ""}`}
            aria-expanded={menuOpen}
            aria-controls="JS-primary-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={toggleMenu}
          >
            <span />
          </button>

          <div className={styles.branding}>
            <Link
              href="/"
              className={styles.brandingImage}
              aria-label="UnBound X home"
              onClick={closeMenu}
            >
              <Logo className={styles.logo} />
            </Link>
            <h1 className={styles.screenReaderText}>
              <Link href="/">
                UnBound X | AI-Powered Social Investing &amp; Smart Finance App
              </Link>
            </h1>
          </div>

          <div
            className={`${styles.navWrapper} ${menuOpen ? styles.navWrapperVisible : ""}`}
          >
            <ul className={styles.navList}>
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href} className={styles.navItem}>
                  <a
                    href={href}
                    className={styles.navLink}
                    onClick={(e) => handleNavLinkClick(e, href)}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className={`${styles.navItem} ${styles.navButtonItem}`}>
                <a
                  href="#join-popup"
                  className={`${styles.navLink} ${styles.navButton}`}
                  onClick={handleJoinClick}
                >
                  Join Us
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
