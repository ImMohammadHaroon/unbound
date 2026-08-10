"use client";

import { useEffect, useRef } from "react";
import "@/styles/join-popup.css";

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
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("has-popup-open", "appmodel-popup");
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("has-popup-open", "appmodel-popup");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="join-popup"
      className="app-popup-main is-open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-modal-heading"
    >
      <span
        className="app-m-overlay appmodel-close"
        onClick={onClose}
        role="presentation"
      />
      <div className="app-popup-inner">
        <button
          ref={closeBtnRef}
          type="button"
          className="m-close-btn appmodel-close"
          id="closePopup"
          onClick={onClose}
          aria-label="Close"
        >
          Close
          <CloseIcon />
        </button>
        <div className="app-popup">
          <div className="appmodel-top">
            <a
              href="https://unboundxinc.com"
              className="model-logo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/brand-logo-new.svg"
                className="desktop-view"
                width={270}
                height={67}
                alt="Unboundxinc"
              />
              <img
                src="/brand-logo-new.svg"
                className="mobile-view"
                width={146}
                height={36}
                alt="Unboundxinc"
              />
            </a>
          </div>
          <div className="app-middle">
            <div className="app-screens">
              <img
                src="/AppDevices.png"
                className="desktop-view"
                width={300}
                height={200}
                alt="Unboundxinc"
              />
              <img
                src="/app-small-devices.png"
                className="mobile-view"
                width={430}
                height={260}
                alt="Unboundxinc"
              />
            </div>
            <div className="app-content">
              <h2 id="join-modal-heading">Open Beta is Here!</h2>
              <p>
                Download now on iOS or Android &amp; start exploring UnBound X.
              </p>
              <a href="#" target="_blank" className="refer-friend-link" rel="noopener noreferrer">
                Refer friends and get up to $200.
              </a>
            </div>
          </div>
          <div className="download-app">
            <div className="d-app-title">
              Download <span className="hide-small">the Application</span> Now!
            </div>
            <div className="download-app-s-g-pay">
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                <img
                  src="/app-store.svg"
                  width={162}
                  height={48}
                  alt="App Store"
                />
              </a>
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                <img
                  src="/play-store.svg"
                  width={162}
                  height={48}
                  alt="Google Play"
                />
              </a>
            </div>
            <div className="text-policy-info">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
