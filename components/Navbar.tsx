"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { useJoinNow } from "./JoinNowProvider";

const NAV_LINKS = [
  { label: "Zenith A.I.", href: "#zenith" },
  { label: "Users", href: "#users" },
  { label: "Creators", href: "#creators" },
  { label: "UBverse", href: "#ubverse" },
  { label: "Investors", href: "#investors" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

const joinButtonClass =
  "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-[50px] border-2 border-navy bg-navy px-8 pb-[13px] pt-4 font-[inherit] text-[15px] font-semibold uppercase tracking-[0.02em] text-white transition-all duration-150 ease-linear hover:border-[#056bf0] hover:bg-blue focus-visible:border-[#056bf0] focus-visible:bg-blue";

export default function Navbar() {
  const { openJoinModal } = useJoinNow();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((open) => !open);

  const handleJoinClick = () => {
    closeMenu();
    openJoinModal();
  };

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
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-[100] bg-white">
      <div className="mx-auto w-full max-w-[1440px] p-5 max-[1100px]:p-5 min-[481px]:max-[1100px]:px-8 min-[481px]:max-[1100px]:py-7 min-[1101px]:p-10">
        <nav
          className="flex min-h-[67px] items-center gap-0 rounded-[50px] bg-nav-bg py-0 pl-[14px] pr-[7px] max-[1100px]:min-h-[62px] max-[1100px]:w-full max-[1100px]:justify-between max-[1100px]:py-[5px] max-[1100px]:pl-3 max-[1100px]:pr-[5px] min-[481px]:max-[1100px]:min-h-[67px] min-[481px]:max-[1100px]:py-[7px] min-[481px]:max-[1100px]:pl-4 min-[481px]:max-[1100px]:pr-[7px] max-[480px]:min-h-[62px] max-[480px]:pl-2.5"
          id="primary-nav"
          aria-label="Primary navigation"
        >
          <div className="flex shrink-0 items-center max-[1100px]:pl-1">
            <Link
              href="/"
              className="flex items-center no-underline"
              aria-label="UnBound X home"
              onClick={closeMenu}
            >
              <Logo />
            </Link>
          </div>

          <div className="min-w-0 flex-1 max-[1100px]:hidden">
            <ul className="m-0 flex list-none items-center justify-end p-0">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href} className="shrink-0">
                  <Link
                    href={href}
                    className="block whitespace-nowrap px-[clamp(0.5rem,-0.8012rem+3.6145vw,1.85rem)] pb-3.5 pt-[18px] text-[15px] font-semibold uppercase tracking-[0.02em] text-navy no-underline transition-colors duration-150 ease-linear hover:text-blue focus-visible:text-blue"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="ml-[clamp(0.25rem,-0.4rem+1.5vw,0.75rem)] shrink-0">
                <button
                  type="button"
                  className={joinButtonClass}
                  onClick={openJoinModal}
                >
                  Join Us
                </button>
              </li>
            </ul>
          </div>

          <button
            type="button"
            className="hidden size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-white p-0 text-navy max-[1100px]:flex max-[480px]:size-[46px]"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={toggleMenu}
          >
            <span className="relative flex h-3.5 w-[18px] flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-current transition-all duration-150 ease-linear ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-full bg-current transition-all duration-150 ease-linear ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-full bg-current transition-all duration-150 ease-linear ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </nav>
      </div>

      <div
        id="mobile-nav-menu"
        className={`fixed inset-0 top-[82px] z-[99] overflow-y-auto bg-white min-[1101px]:hidden ${menuOpen ? "flex flex-col" : "hidden"}`}
        aria-hidden={!menuOpen}
      >
        <nav
          className="flex flex-1 flex-col items-center justify-center px-5 pb-12 pt-6"
          aria-label="Mobile navigation"
        >
          <ul className="m-0 flex w-full list-none flex-col items-center p-0">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href} className="w-full text-center">
                <Link
                  href={href}
                  className="block px-4 py-3 text-[15px] font-semibold uppercase tracking-[0.02em] text-navy no-underline transition-colors duration-150 ease-linear hover:text-blue focus-visible:text-blue min-[481px]:max-[1100px]:px-5 min-[481px]:max-[1100px]:py-3.5 min-[481px]:max-[1100px]:text-lg max-[480px]:px-4 max-[480px]:py-[11px]"
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={`${joinButtonClass} mt-6 min-[481px]:max-[1100px]:mt-8 min-[481px]:max-[1100px]:px-12 min-[481px]:max-[1100px]:pb-[15px] min-[481px]:max-[1100px]:pt-[18px]`}
            onClick={handleJoinClick}
            tabIndex={menuOpen ? 0 : -1}
          >
            Join Us
          </button>
        </nav>
      </div>
    </header>
  );
}
