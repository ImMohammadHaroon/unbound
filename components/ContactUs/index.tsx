"use client";

import Image from "next/image";
import { useRef, useState, type FormEvent } from "react";
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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE_PATTERN = /^\+?[\d\s().-]{7,20}$/;

const MIN_NAME_LENGTH = 2;
const MIN_MESSAGE_LENGTH = 10;

/** Field name attributes, used to focus the first invalid field on submit. */
const FIELD_NAMES: Record<keyof FormState, string> = {
  name: "your-name",
  email: "your-email",
  phone: "your-phone",
  findUs: "form-select",
  message: "your-message",
  acceptance: "acceptance",
};

/** Top-to-bottom order, so error reporting follows the visual layout. */
const VALIDATED_FIELDS = [
  "name",
  "email",
  "phone",
  "message",
  "acceptance",
] as const satisfies readonly (keyof FormState)[];

const validateField = (key: keyof FormState, form: FormState): string | undefined => {
  switch (key) {
    case "name": {
      const name = form.name.trim();
      if (!name) return "Please fill out this field.";
      if (name.length < MIN_NAME_LENGTH) {
        return `Please enter at least ${MIN_NAME_LENGTH} characters.`;
      }
      return undefined;
    }
    case "email": {
      const email = form.email.trim();
      if (!email) return "Please fill out this field.";
      if (!EMAIL_PATTERN.test(email)) return "Please enter a valid email address.";
      return undefined;
    }
    case "phone": {
      const phone = form.phone.trim();
      if (!phone) return undefined;
      if (!PHONE_PATTERN.test(phone)) return "Please enter a valid phone number.";
      return undefined;
    }
    case "message": {
      const message = form.message.trim();
      if (!message) return "Please fill out this field.";
      if (message.length < MIN_MESSAGE_LENGTH) {
        return `Please enter at least ${MIN_MESSAGE_LENGTH} characters.`;
      }
      return undefined;
    }
    case "acceptance":
      return form.acceptance ? undefined : "Please accept the Terms and Conditions.";
    default:
      return undefined;
  }
};

export default function ContactUs() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const setFieldError = (key: keyof FormState, message: string | undefined) => {
    setErrors((prev) => {
      if (prev[key] === message) return prev;
      const next = { ...prev };
      if (message) next[key] = message;
      else delete next[key];
      return next;
    });
  };

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    const nextForm = { ...form, [key]: value };
    setForm(nextForm);

    if (status === "sent") setStatus("idle");

    // Only re-check fields already showing an error, so typing clears it as
    // soon as the value becomes valid without nagging untouched fields.
    if (errors[key]) {
      setFieldError(key, validateField(key, nextForm));
    }
  };

  const handleBlur = (key: keyof FormState) => {
    setFieldError(key, validateField(key, form));
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};

    for (const key of VALIDATED_FIELDS) {
      const message = validateField(key, form);
      if (message) next[key] = message;
    }

    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");

    const nextErrors = validate();
    setErrors(nextErrors);

    const firstInvalid = VALIDATED_FIELDS.find((key) => nextErrors[key]);
    if (firstInvalid) {
      setStatus("error");
      const field = formRef.current?.elements.namedItem(FIELD_NAMES[firstInvalid]);
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    setSubmitting(true);
    setForm(INITIAL_FORM);
    setErrors({});
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
          ref={formRef}
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
              onBlur={() => handleBlur("name")}
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-error-name" : undefined}
            />
            {errors.name ? (
              <span id="contact-error-name" className="contact-form__error">
                {errors.name}
              </span>
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
              onBlur={() => handleBlur("email")}
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-error-email" : undefined}
            />
            {errors.email ? (
              <span id="contact-error-email" className="contact-form__error">
                {errors.email}
              </span>
            ) : null}
          </div>

          <div className="form__row">
            <input
              type="tel"
              name="your-phone"
              placeholder="Phone number"
              maxLength={20}
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "contact-error-phone" : undefined}
            />
            {errors.phone ? (
              <span id="contact-error-phone" className="contact-form__error">
                {errors.phone}
              </span>
            ) : null}
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
              placeholder="Your message*"
              rows={3}
              maxLength={2000}
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              onBlur={() => handleBlur("message")}
              aria-required="true"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-error-message" : undefined}
            />
            {errors.message ? (
              <span id="contact-error-message" className="contact-form__error">
                {errors.message}
              </span>
            ) : null}
          </div>

          <div className="form__row form__row--acceptance">
            <label>
              <input
                type="checkbox"
                name="acceptance"
                checked={form.acceptance}
                onChange={(e) => updateField("acceptance", e.target.checked)}
                aria-required="true"
                aria-invalid={Boolean(errors.acceptance)}
                aria-describedby={
                  errors.acceptance ? "contact-error-acceptance" : undefined
                }
              />
              <span>
                I agree with the Terms and Conditions and Privacy Policy
              </span>
            </label>
            {errors.acceptance ? (
              <span id="contact-error-acceptance" className="contact-form__error">
                {errors.acceptance}
              </span>
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
