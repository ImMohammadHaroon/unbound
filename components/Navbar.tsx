"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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

const JOIN_HREF = "#join-popup";
const SCROLL_OFFSET = 100;

function smoothScrollTo(targetY: number, duration = 1000) {
  const startY = window.scrollY;
  const distance = targetY - startY - SCROLL_OFFSET;
  let startTime: number | null = null;

  const easeInOutQuint = (t: number) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutQuint(progress));
    if (elapsed < duration) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.classList.remove("body-nav-expanded");
  }, []);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
    document.body.classList.add("body-nav-expanded");
  }, []);

  const toggleMenu = useCallback(() => {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [menuOpen, closeMenu, openMenu]);

  useEffect(() => {
    const onScroll = () => {
      setIsFixed(window.scrollY > 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
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
  }, [menuOpen, closeMenu]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#") || href.length <= 1) return;

    e.preventDefault();
    closeMenu();

    if (href === JOIN_HREF) {
      const popup = document.getElementById("join-popup");
      if (popup) {
        popup.classList.add("is-open");
        document.body.classList.add("has-popup-open");
      }
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY;
      smoothScrollTo(top);
    }
  };

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
            aria-controls="JS-primary-nav"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={toggleMenu}
          >
            <span />
          </button>

          <div className={styles.branding}>
            <Link
              href="/"
              className={styles.brandingImage}
              aria-label="UnBound X | AI-Powered Social Investing & Smart Finance App"
              onClick={closeMenu}
            >
              <Image
                src="/brand-logo-new.svg"
                alt="UnBound X | AI-Powered Social Investing & Smart Finance App"
                width={180}
                height={53}
                className={styles.logo}
                priority
              />
            </Link>
            <h1 className={styles.screenReaderText}>
              <Link href="/">
                UnBound X | AI-Powered Social Investing & Smart Finance App
              </Link>
            </h1>
          </div>

          <div
            className={`${styles.navWrapper} ${menuOpen ? styles.navWrapperVisible : ""}`}
          >
            <ul className={styles.navList}>
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href} className={styles.navItem}>
                  <Link
                    href={href}
                    className={styles.navLink}
                    onClick={(e) => handleNavClick(e, href)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className={`${styles.navItem} ${styles.navButtonItem}`}>
                <Link
                  href={JOIN_HREF}
                  className={`${styles.navLink} ${styles.navButton}`}
                  onClick={(e) => handleNavClick(e, JOIN_HREF)}
                >
                  Join Us
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
