"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import "./contact-us.css";

const FIND_US_OPTIONS = [
  "How did you find us?",
  "Search engine",
  "Social media",
  "Referral",
  "Another website",
  "Ad",
  "Other",
] as const;

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/profile.php?id=61579660851897",
    src: "/svg/facebook.svg",
    alt: "Facebook",
  },
  {
    href: "https://x.com/UnBoundXapp",
    src: "/svg/twitter.svg",
    alt: "X",
  },
  {
    href: "https://www.linkedin.com/company/unboundx/",
    src: "/svg/linkedin.svg",
    alt: "LinkedIn",
  },
] as const;

type FormState = {
  name: string;
  email: string;
  phone: string;
  findUs: string;
  message: string;
  acceptance: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  findUs: FIND_US_OPTIONS[0],
  message: "",
  acceptance: false,
};

export default function ContactUs() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};

    if (!form.name.trim()) {
      next.name = "Please fill out this field.";
    }

    if (!form.email.trim()) {
      next.email = "Please fill out this field.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Please enter a valid email address.";
    }

    if (!form.acceptance) {
      next.acceptance = "Please accept the Terms and Conditions.";
    }

    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    setSubmitting(true);
    setForm(INITIAL_FORM);
    setStatus("sent");
    setSubmitting(false);
  };

  return (
    <section id="contact" className="contact-us section">
      <div
        className="contact-us__info"
        data-sal="slide-up"
        data-sal-duration="1000"
      >
        <h2 className="section__heading">Contact us</h2>

        <a
          href="tel:+16464505955"
          className="contact-us__item contact-us__item--phone"
        >
          <Image
            src="/svg/ico-phone.svg"
            alt="Phone"
            width={64}
            height={65}
          />
          +1 (646) 450-5955
        </a>

        <a
          href="mailto:info@unboundxinc.com"
          className="contact-us__item contact-us__item--email"
        >
          <Image
            src="/svg/ico-email.svg"
            alt="Email"
            width={64}
            height={65}
          />
          info@unboundxinc.com
        </a>

        <div className="contact-us__address">
          <span className="contact-us__address-icon">
            <Image
              src="/svg/location-icon.svg"
              width={24}
              height={24}
              alt="Address"
            />
          </span>
          <span className="contact-us__address-text">
            1178 Broadway, New York, NY 10001
          </span>
        </div>

        <div className="contact-us__social">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.alt}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={link.src} alt={link.alt} width={46} height={46} />
            </a>
          ))}
        </div>
      </div>

      <div
        className="contact-us__form"
        data-sal="slide-up"
        data-sal-delay="250"
        data-sal-duration="1000"
      >
        <form
          className="contact-form form"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Contact form"
        >
          <div className="form__row">
            <input
              type="text"
              name="your-name"
              placeholder="Name*"
              maxLength={400}
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name ? (
              <span className="contact-form__error">{errors.name}</span>
            ) : null}
          </div>

          <div className="form__row">
            <input
              type="email"
              name="your-email"
              placeholder="E-mail*"
              maxLength={400}
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? (
              <span className="contact-form__error">{errors.email}</span>
            ) : null}
          </div>

          <div className="form__row">
            <input
              type="tel"
              name="your-phone"
              placeholder="Phone number"
              maxLength={400}
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>

          <div className="form__row">
            <select
              name="form-select"
              value={form.findUs}
              onChange={(e) => updateField("findUs", e.target.value)}
              aria-label="How did you find us?"
            >
              {FIND_US_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="form__row">
            <textarea
              name="your-message"
              placeholder="Your message"
              rows={3}
              maxLength={2000}
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
            />
          </div>

          <div className="form__row form__row--acceptance">
            <label>
              <input
                type="checkbox"
                name="acceptance"
                checked={form.acceptance}
                onChange={(e) => updateField("acceptance", e.target.checked)}
                aria-invalid={Boolean(errors.acceptance)}
              />
              <span>
                I agree with the Terms and Conditions and Privacy Policy
              </span>
            </label>
            {errors.acceptance ? (
              <span className="contact-form__error">{errors.acceptance}</span>
            ) : null}
          </div>

          <div className="form__row form__row--submit">
            <button type="submit" className="button" disabled={submitting}>
              Send
            </button>
          </div>

          {status === "sent" ? (
            <div className="contact-form__response" role="status">
              Thank you for your message. It has been sent.
            </div>
          ) : null}

          {status === "error" && Object.keys(errors).length > 0 ? (
            <div
              className="contact-form__response contact-form__response--error"
              role="alert"
            >
              One or more fields have an error. Please check and try again.
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
}
