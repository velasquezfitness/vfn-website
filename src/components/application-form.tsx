"use client";
import { getTranslator, localizedPath, type Locale } from "@/i18n/locale";
import { useRef, useState } from "react";
import { Arrow } from "@/components/brand";

export function ApplicationForm({ locale = "en" }: { locale?: Locale }) {
  const t = getTranslator(locale);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const notice = useRef<HTMLDivElement>(null);
  return (
    <form
      className="application-form"
      onInput={(event) => {
        (event.target as HTMLInputElement).setCustomValidity?.("");
      }}
      onInvalid={(event) => {
        const input = event.target as HTMLInputElement;
        input.setCustomValidity("");
        if (locale !== "es") return;
        if (input.validity.valueMissing)
          input.setCustomValidity(
            t(
              input.type === "checkbox"
                ? "Please confirm your consent."
                : input.tagName === "SELECT"
                  ? "Please select an option."
                  : "Please complete this field.",
            ),
          );
        else if (input.validity.typeMismatch)
          input.setCustomValidity(t("Please enter a valid email address."));
        else if (input.validity.tooShort)
          input.setCustomValidity(
            t(
              input.minLength === 20
                ? "Please enter at least 20 characters."
                : "Please enter at least 2 characters.",
            ),
          );
      }}
      onSubmit={async (e) => {
        e.preventDefault();
        if (status === "sending") return;
        const formElement = e.currentTarget;
        setStatus("sending");
        try {
          const response = await fetch("https://formspree.io/f/mdeeeown", {
            method: "POST",
            body: new FormData(formElement),
            headers: { Accept: "application/json" },
          });
          if (!response.ok) throw new Error("Submission failed");
          formElement.reset();
          setStatus("success");
        } catch {
          setStatus("error");
        }
        requestAnimationFrame(() => notice.current?.focus());
      }}
      onChange={() => {
        if (status !== "sending") setStatus("idle");
      }}
    >
      <input type="hidden" name="language" value={locale} />
      <div className="form-notice" id="availability">
        <strong>{t("Apply for VFN coaching.")}</strong>
        <p>
          {t(
            "Complete the form below. We’ll review your application and follow up by email.",
          )}
        </p>
        {locale === "es" && (
          <>
            <p>
              {t(
                "Once I receive your information, I will email you to discuss the next steps.",
              )}
            </p>
            <p>
              {t(
                "Completing this form does not commit you to hiring any service.",
              )}
            </p>
          </>
        )}
      </div>
      <p className="small muted">
        {t(
          "All fields are required unless marked optional. Please do not include medical records or sensitive health information.",
        )}{" "}
      </p>
      <fieldset>
        <legend>
          <span>01 /</span>
          {t("Your details")}{" "}
        </legend>
        <div className="field-grid">
          <label>
            {t("Full name")}{" "}
            <input
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
            />
          </label>
          <label>
            {t("Email address")}{" "}
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </label>
        </div>
        <label>
          {t("Where are you based?")}{" "}
          <input
            name="location"
            autoComplete="address-level2"
            placeholder={t("City / time zone")}
            required
            maxLength={120}
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>
          <span>02 /</span>
          {t("Your starting point")}{" "}
        </legend>
        <label>
          {t("Primary fitness goal")}{" "}
          <select name="primaryGoal" required defaultValue="">
            <option value="" disabled>
              {t("Select your main focus")}{" "}
            </option>
            <option value={"Build strength"}>{t("Build strength")}</option>
            <option value={"Improve athletic performance"}>
              {t("Improve athletic performance")}
            </option>
            <option value={"Develop training consistency"}>
              {t("Develop training consistency")}
            </option>
            <option value={"General fitness"}>{t("General fitness")}</option>
            <option value={"Other / to discuss"}>
              {t("Other / to discuss")}
            </option>
          </select>
        </label>
        <label>
          {t("Preferred coaching format")}{" "}
          <select name="format" required defaultValue="">
            <option value="" disabled>
              {t("Select a preference")}{" "}
            </option>
            <option value={"Online coaching"}>{t("Online coaching")}</option>
            <option value={"In person, if available"}>
              {t("In person, if available")}
            </option>
            <option value={"Open to discussing options"}>
              {t("Open to discussing options")}
            </option>
          </select>
          <span className="field-hint">
            {t("A preference is not confirmation of availability.")}{" "}
          </span>
        </label>
        <label>
          {t("Training experience")}{" "}
          <select name="experience" required defaultValue="">
            <option value="" disabled>
              {t("Select your experience")}{" "}
            </option>
            <option value={"New to structured training"}>
              {t("New to structured training")}
            </option>
            <option value={"Some experience, building consistency"}>
              {t("Some experience, building consistency")}
            </option>
            <option value={"Experienced, ready for a new direction"}>
              {t("Experienced, ready for a new direction")}
            </option>
            <option value={"Returning after time away"}>
              {t("Returning after time away")}
            </option>
          </select>
        </label>
        <label>
          {t("What do you want to work toward?")}{" "}
          <textarea
            name="goals"
            required
            minLength={20}
            maxLength={2000}
            rows={4}
            placeholder={t(
              "Tell us about your goals and why they matter to you.",
            )}
            aria-describedby="goals-help"
          />
          <span id="goals-help" className="field-hint">
            {t("20–2,000 characters. Focus on your training goals.")}{" "}
          </span>
        </label>
        <div className="field-grid">
          <label>
            {t("Current training frequency")}{" "}
            <select name="days" required defaultValue="">
              <option value="" disabled>
                {t("Select current frequency")}{" "}
              </option>
              <option value={"Not currently training"}>
                {t("Not currently training")}
              </option>
              <option value={"1–2 days"}>{t("1–2 days")}</option>
              <option value={"3–4 days"}>{t("3–4 days")}</option>
              <option value={"5+ days"}>{t("5+ days")}</option>
              <option value={"Not sure yet"}>{t("Not sure yet")}</option>
            </select>
          </label>
          <label>
            {t("Equipment access")}{" "}
            <select name="equipment" required defaultValue="">
              <option value="" disabled>
                {t("Select equipment")}{" "}
              </option>
              <option value={"Full gym"}>{t("Full gym")}</option>
              <option value={"Home equipment"}>{t("Home equipment")}</option>
              <option value={"Bodyweight only"}>{t("Bodyweight only")}</option>
              <option value={"Other / to discuss"}>
                {t("Other / to discuss")}
              </option>
            </select>
          </label>
        </div>
        <label>
          {t("Anything else?")} <span className="muted">{t("(optional)")}</span>
          <textarea
            name="notes"
            maxLength={1000}
            rows={3}
            placeholder={t(
              "Schedule, preferences, or questions about coaching.",
            )}
          />
        </label>
      </fieldset>
      <label className="checkbox-label">
        <input type="checkbox" required name="adult" />
        <span>
          {t(
            "I confirm I am 18 or older and agree to submit my application for VFN to review. See the privacy notice below.",
          )}{" "}
        </span>
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="button"
        aria-describedby="availability"
      >
        {status === "sending"
          ? t("Sending application…")
          : t("Submit application")}{" "}
        <Arrow />
      </button>
      <div
        ref={notice}
        tabIndex={-1}
        role="status"
        className={
          status === "success" || status === "error" ? "form-result" : "sr-only"
        }
      >
        {status === "success" && (
          <>
            <strong>{t("Application sent.")}</strong>
            <p>
              {t(
                "Thank you for applying. VFN will review your details and contact you by email.",
              )}
            </p>
          </>
        )}
        {status === "error" && (
          <>
            <strong>{t("We couldn’t send your application.")}</strong>
            <p>
              {t(
                "Please try again in a moment. Your application has not been confirmed.",
              )}
            </p>
          </>
        )}
      </div>
      <p className="small muted">
        <a className="text-link" href={localizedPath(locale, "/privacy")}>
          {t("Privacy notice")}{" "}
        </a>
      </p>
      <noscript>
        <p className="form-notice">
          {t("JavaScript is required to submit this application.")}
        </p>
      </noscript>
    </form>
  );
}
