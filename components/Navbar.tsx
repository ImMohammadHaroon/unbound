"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";

gsap.registerPlugin(useGSAP);

const NAV_LINKS = [
  { label: "Zenith A.I.", href: "#zenith" },
  { label: "Users", href: "#users" },
  { label: "Creators", href: "#creators" },
  { label: "UBverse", href: "#ubverse" },
  { label: "Investors", href: "#investors" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

const MOBILE_BREAKPOINT = "(max-width: 1100px)";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const mobileButtonRef = useRef<HTMLAnchorElement>(null);
  const hasAnimatedRef = useRef(false);

  const openMenu = () => {
    setMenuMounted(true);
    setMenuOpen(true);
  };

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  useEffect(() => {
    document.body.style.overflow = menuMounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuMounted]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    if (menuOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const mobileNav = mobileNavRef.current;
      const mobileButton = mobileButtonRef.current;

      if (!overlay || !mobileNav) return;

      const links = gsap.utils.toArray<HTMLElement>(
        mobileNav.querySelectorAll(`.${styles.mobileNavLink}`)
      );

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: MOBILE_BREAKPOINT,
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isMobile, reduceMotion } = context.conditions as {
            isMobile: boolean;
            reduceMotion: boolean;
          };

          if (!isMobile) return;

          gsap.killTweensOf([overlay, links, mobileButton]);

          if (menuOpen) {
            hasAnimatedRef.current = true;

            if (reduceMotion) {
              gsap.set(overlay, {
                clipPath: "inset(0% 0% 0% 0%)",
                visibility: "visible",
                pointerEvents: "auto",
              });
              gsap.set([links, mobileButton], { y: 0, opacity: 1 });
              return;
            }

            gsap.set(overlay, {
              visibility: "visible",
              pointerEvents: "auto",
            });
            gsap.set([links, mobileButton], { y: -28, opacity: 0 });

            const tl = gsap.timeline();
            tl.fromTo(
              overlay,
              { clipPath: "inset(0% 0% 100% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.5,
                ease: "power3.out",
              }
            );
            tl.to(
              links,
              {
                y: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.05,
                ease: "power2.out",
              },
              "-=0.28"
            );
            tl.to(
              mobileButton,
              {
                y: 0,
                opacity: 1,
                duration: 0.35,
                ease: "power2.out",
              },
              "-=0.22"
            );
          } else if (hasAnimatedRef.current) {
            if (reduceMotion) {
              gsap.set(overlay, {
                clipPath: "inset(0% 0% 100% 0%)",
                visibility: "hidden",
                pointerEvents: "none",
              });
              gsap.set([links, mobileButton], { y: -28, opacity: 0 });
              setMenuMounted(false);
              return;
            }

            const tl = gsap.timeline({
              onComplete: () => {
                gsap.set(overlay, {
                  visibility: "hidden",
                  pointerEvents: "none",
                });
                setMenuMounted(false);
              },
            });

            tl.to(links, {
              y: -20,
              opacity: 0,
              duration: 0.22,
              stagger: 0.03,
              ease: "power2.in",
            });
            tl.to(
              mobileButton,
              {
                y: -16,
                opacity: 0,
                duration: 0.2,
                ease: "power2.in",
              },
              "-=0.12"
            );
            tl.to(
              overlay,
              {
                clipPath: "inset(0% 0% 100% 0%)",
                duration: 0.4,
                ease: "power3.in",
              },
              "-=0.08"
            );
          }
        }
      );

      return () => mm.revert();
    },
    { dependencies: [menuOpen], scope: headerRef, revertOnUpdate: true }
  );

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${menuMounted ? styles.headerOpen : ""}`}
    >
      <div className={styles.headerInner}>
        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          id="primary-nav"
          aria-label="Primary navigation"
        >
          <div className={styles.branding}>
            <Link
              href="/"
              className={styles.brandingLink}
              aria-label="UnBound X | AI-Powered Social Investing & Smart Finance App"
              onClick={closeMenu}
            >
              <Image
                src="/brand-logo-new.svg"
                alt="UnBound X"
                width={160}
                height={41}
                className={styles.logo}
                priority
              />
            </Link>
          </div>

          <div className={styles.navWrapper}>
            <ul className={styles.navList}>
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href} className={styles.navItem}>
                  <Link href={href} className={styles.navLink}>
                    {label}
                  </Link>
                </li>
              ))}
              <li className={`${styles.navItem} ${styles.navButtonItem}`}>
                <Link href="#join" className={styles.navButton}>
                  Join Us
                </Link>
              </li>
            </ul>
          </div>

          <button
            type="button"
            className={`${styles.navToggle} ${menuOpen ? styles.navToggleOpen : ""}`}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={toggleMenu}
          >
            <span className={styles.navToggleIcon} />
          </button>
        </nav>
      </div>

      <div
        ref={overlayRef}
        id="mobile-nav-menu"
        className={`${styles.mobileOverlay} ${menuMounted ? styles.mobileOverlayVisible : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav
          ref={mobileNavRef}
          className={styles.mobileNav}
          aria-label="Mobile navigation"
        >
          <ul className={styles.mobileNavList}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href} className={styles.mobileNavItem}>
                <Link
                  href={href}
                  className={styles.mobileNavLink}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            ref={mobileButtonRef}
            href="#join"
            className={styles.mobileNavButton}
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            Join Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
