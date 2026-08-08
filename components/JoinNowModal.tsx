"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Logo from "./Logo";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/unbound-x/id6745837250";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.unboundx";
const TERMS_URL = "https://www.unboundxinc.com/terms-condition/";
const PRIVACY_URL = "https://www.unboundxinc.com/privacy-policy/";
const LEGAL_URL = "https://www.unboundxinc.com/legal/";

type JoinNowModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function JoinNowModal({ isOpen, onClose }: JoinNowModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="animate-fade-in motion-reduce:animate-none fixed inset-0 z-[1000] flex items-center justify-center bg-overlay p-5"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="animate-slide-up motion-reduce:animate-none relative max-h-[calc(100vh-40px)] w-full max-w-[744px] overflow-y-auto rounded-[32px] bg-white p-5 shadow-[0_20px_60px_rgba(38,48,64,0.2)] max-[700px]:rounded-3xl max-[700px]:px-5 max-[700px]:py-7 sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-modal-heading"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto max-w-[680px]">
          <div className="mb-8 flex items-center justify-between max-[700px]:mb-6">
            <Logo />
            <button
              ref={closeBtnRef}
              type="button"
              id="closePopup"
              className="inline-flex cursor-pointer items-center gap-1.5 border-none bg-transparent px-[5px] py-[3px] font-[inherit] text-[13px] font-medium leading-none text-navy transition-colors duration-150 ease-linear hover:text-blue focus-visible:text-blue"
              onClick={onClose}
              aria-label="Close"
            >
              Close
              <span className="text-base font-normal leading-none" aria-hidden="true">
                ×
              </span>
            </button>
          </div>

          <div className="app-middle grid w-full grid-cols-1 items-center gap-5 pb-4 min-[701px]:grid-cols-[336px_minmax(0,1fr)] min-[701px]:gap-6">
            <div className="overflow-hidden rounded-2xl leading-none">
              <Image
                src="/AppDevices.png"
                alt="UnBound X app on iPhone devices"
                width={620}
                height={399}
                className="block h-auto w-full"
                priority
              />
            </div>

            <div className="flex min-w-0 flex-col justify-center max-[700px]:items-center max-[700px]:text-center">
              <h2
                id="join-modal-heading"
                className="m-0 text-[28px] font-bold leading-[1.3] text-navy min-[701px]:whitespace-nowrap min-[701px]:text-[34px]"
              >
                Open Beta is Here!
              </h2>
              <p className="mt-2 max-w-[270px] text-base leading-[1.3] text-subtext min-[701px]:text-lg max-[700px]:max-w-none">
                Download now on iOS or Android &amp; start exploring UnBound X.
              </p>
              <a
                href={LEGAL_URL}
                className="mt-2 text-base leading-[1.3] text-blue no-underline transition-opacity duration-150 ease-linear hover:underline focus-visible:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Refer friends and get up to $200.
              </a>
            </div>
          </div>

          <div className="mx-auto mt-4 max-w-[536px] text-center max-[700px]:mt-5">
            <p className="mb-4 text-lg leading-[1.3] text-navy">
              Download the Application Now!
            </p>

            <div className="mb-4 flex items-center justify-center gap-4 max-[700px]:flex-col max-[700px]:gap-3">
              <a
                href={APP_STORE_URL}
                className="inline-flex shrink-0 leading-none transition-opacity duration-150 ease-linear hover:opacity-[0.85] focus-visible:opacity-[0.85]"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
              >
                <Image
                  src="/app-store.svg"
                  alt="Download on the App Store"
                  width={162}
                  height={49}
                  className="h-[49px] w-[162px] object-contain"
                />
              </a>
              <a
                href={PLAY_STORE_URL}
                className="inline-flex shrink-0 leading-none transition-opacity duration-150 ease-linear hover:opacity-[0.85] focus-visible:opacity-[0.85]"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
              >
                <Image
                  src="/play-store.svg"
                  alt="Get it on Google Play"
                  width={162}
                  height={49}
                  className="h-[49px] w-[162px] object-contain"
                />
              </a>
            </div>

            <p className="m-0 text-base leading-[1.3] text-policy [&_a]:text-blue [&_a]:no-underline [&_a]:hover:underline [&_a]:focus-visible:underline">
              Rewards subject to eligibility and verification; see{" "}
              <a href={TERMS_URL} target="_blank" rel="noopener noreferrer">
                Terms of Use
              </a>
              ,{" "}
              <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
              , and{" "}
              <a href={LEGAL_URL} target="_blank" rel="noopener noreferrer">
                Legal Center
              </a>
              . Apple &amp; Google are not sponsors of this promotion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
