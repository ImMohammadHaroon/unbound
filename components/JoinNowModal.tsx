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

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14.0277 14.1667L5.69434 5.83337M14.0277 5.83337L5.69434 14.1667"
        stroke="#263040"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
      className="animate-fade-in motion-reduce:animate-none fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-5 max-[500px]:p-4"
      onClick={onClose}
      role="presentation"
    >
      <div className="app-popup-inner relative mx-auto w-full max-w-[744px] max-[500px]:max-w-[270px]">
        <button
          ref={closeBtnRef}
          type="button"
          id="closePopup"
          className="m-close-btn appmodel-close absolute right-[15px] top-5 z-[10000] inline-flex min-h-6 min-w-[60px] cursor-pointer items-center justify-center gap-[3px] rounded-lg border-none bg-white px-[5px] py-[3px] text-[13px] font-semibold leading-normal tracking-normal text-navy"
          onClick={onClose}
          aria-label="Close"
        >
          Close
          <CloseIcon />
        </button>

        <div
          ref={modalRef}
          className="app-popup animate-slide-up motion-reduce:animate-none relative mx-auto max-h-[calc(100vh-40px)] w-full overflow-y-auto rounded-[32px] bg-white px-8 py-[23px] min-[992px]:min-h-[460px] min-[501px]:max-[991px]:max-w-[510px] min-[501px]:max-[991px]:px-10 min-[501px]:max-[991px]:py-10 max-[500px]:max-w-[275px] max-[500px]:rounded-2xl max-[500px]:px-5 max-[500px]:py-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="join-modal-heading"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="appmodel-top mb-8 min-[501px]:max-[991px]:pb-[5px] max-[500px]:mb-[15px]">
            <Logo
              className="h-auto w-full min-[992px]:max-w-[162px] min-[501px]:max-[991px]:max-w-[268px] max-[500px]:max-w-[145px]"
            />
          </div>

          <div className="app-middle flex w-full flex-wrap items-center justify-between border-b border-[#F6F6F6] pb-4 min-[992px]:border-b min-[992px]:pb-4 min-[501px]:max-[991px]:border-b-0 min-[501px]:max-[991px]:pb-0">
            <div className="app-screens w-full shrink-0 min-[992px]:w-[45.6%]">
              <Image
                src="/AppDevices.png"
                alt="UnBound X app on iPhone devices"
                width={620}
                height={399}
                className="desktop-view hidden h-auto w-full min-[992px]:block"
                priority
              />
              <Image
                src="/AppDevices.png"
                alt="UnBound X app on iPhone devices"
                width={430}
                height={260}
                className="mobile-view block h-auto w-full min-[992px]:hidden"
                priority
              />
            </div>

            <div className="app-content w-full shrink-0 text-center min-[992px]:w-1/2 min-[501px]:max-[991px]:mt-11 max-[500px]:mt-6">
              <h2
                id="join-modal-heading"
                className="m-0 font-bold tracking-normal text-navy min-[501px]:text-[34px] max-[500px]:text-2xl"
              >
                Open Beta is Here!
              </h2>
              <p className="mx-auto text-subtext min-[501px]:my-2 min-[501px]:max-w-[270px] min-[501px]:text-lg max-[500px]:my-1 max-[500px]:max-w-[205px] max-[500px]:text-sm">
                Download now on iOS or Android &amp; start exploring UnBound X.
              </p>
              <a
                href={LEGAL_URL}
                className="refer-friend-link inline-block text-[#007AFF] no-underline transition-all duration-500 ease-linear hover:underline focus-visible:underline min-[992px]:mt-2 min-[992px]:text-lg min-[501px]:max-[991px]:mt-[30px] min-[501px]:max-[991px]:text-lg max-[500px]:mt-[15px] max-[500px]:text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Refer friends and get up to $200.
              </a>
            </div>
          </div>

          <div className="download-app mx-auto flex w-full flex-wrap justify-center text-center min-[992px]:mt-4 min-[992px]:max-w-[536px] min-[501px]:max-[991px]:mt-4 max-[500px]:mt-2.5">
            <div className="d-app-title w-full text-center font-semibold leading-[1.3] text-navy min-[501px]:text-[18px] max-[500px]:text-sm">
              Download{" "}
              <span className="hide-small max-[991px]:hidden">the Application</span>{" "}
              Now!
            </div>

            <div className="download-app-s-g-pay flex flex-wrap justify-center min-[501px]:my-4 min-[501px]:gap-[18px] max-[500px]:my-2 max-[500px]:gap-2.5">
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
                  height={48}
                  className="h-auto object-contain min-[501px]:w-[162px] max-[500px]:w-[89px]"
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
                  height={48}
                  className="h-auto object-contain min-[501px]:w-[162px] max-[500px]:w-[89px]"
                />
              </a>
            </div>

            <p className="text-policy-info mx-auto m-0 leading-[1.3] min-[992px]:text-base min-[501px]:max-[991px]:max-w-[360px] min-[501px]:max-[991px]:text-sm max-[500px]:max-w-[226px] max-[500px]:text-[10px] [&_a]:text-blue [&_a]:no-underline [&_a]:hover:underline [&_a]:focus-visible:underline">
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
