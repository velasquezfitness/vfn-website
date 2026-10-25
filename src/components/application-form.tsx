"use client";
import { useRef, useState } from "react";
import { Arrow } from "@/components/brand";

export function ApplicationForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const notice = useRef<HTMLDivElement>(null);
  return (
    <form
      className="application-form"
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
      onChange={() => { if (status !== "sending") setStatus("idle"); }}
    >
      <div className="form-notice" id="availability">
        <strong>Apply for VFN coaching.</strong>
        <p>Complete the form below. We’ll review your application and follow up by email.</p>
      </div>
      <p className="small muted">
        All fields are required unless marked optional. Please do not include
        medical records or sensitive health information.
      </p>
      <fieldset>
        <legend>
          <span>01 /</span> Your details
        </legend>
        <div className="field-grid">
          <label>
            Full name
            <input
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
            />
          </label>
          <label>
            Email address
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
          Where are you based?
          <input
            name="location"
            autoComplete="address-level2"
            placeholder="City / time zone"
            required
            maxLength={120}
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>
          <span>02 /</span> Your starting point
        </legend>
        <label>
          Primary fitness goal
          <select name="primaryGoal" required defaultValue="">
            <option value="" disabled>
              Select your main focus
            </option>
            <option>Build strength</option>
            <option>Improve athletic performance</option>
            <option>Develop training consistency</option>
            <option>General fitness</option>
            <option>Other / to discuss</option>
          </select>
        </label>
        <label>
          Preferred coaching format
          <select name="format" required defaultValue="">
            <option value="" disabled>
              Select a preference
            </option>
            <option>Online coaching</option>
            <option>In person, if available</option>
            <option>Open to discussing options</option>
          </select>
          <span className="field-hint">
            A preference is not confirmation of availability.
          </span>
        </label>
        <label>
          Training experience
          <select name="experience" required defaultValue="">
            <option value="" disabled>
              Select your experience
            </option>
            <option>New to structured training</option>
            <option>Some experience, building consistency</option>
            <option>Experienced, ready for a new direction</option>
            <option>Returning after time away</option>
          </select>
        </label>
        <label>
          What do you want to work toward?
          <textarea
            name="goals"
            required
            minLength={20}
            maxLength={2000}
            rows={4}
            placeholder="Tell us about your goals and why they matter to you."
            aria-describedby="goals-help"
          />
          <span id="goals-help" className="field-hint">
            20–2,000 characters. Focus on your training goals.
          </span>
        </label>
        <div className="field-grid">
          <label>
            Current training frequency
            <select name="days" required defaultValue="">
              <option value="" disabled>
                Select current frequency
              </option>
              <option>Not currently training</option>
              <option>1–2 days</option>
              <option>3–4 days</option>
              <option>5+ days</option>
              <option>Not sure yet</option>
            </select>
          </label>
          <label>
            Equipment access
            <select name="equipment" required defaultValue="">
              <option value="" disabled>
                Select equipment
              </option>
              <option>Full gym</option>
              <option>Home equipment</option>
              <option>Bodyweight only</option>
              <option>Other / to discuss</option>
            </select>
          </label>
        </div>
        <label>
          Anything else? <span className="muted">(optional)</span>
          <textarea
            name="notes"
            maxLength={1000}
            rows={3}
            placeholder="Schedule, preferences, or questions about coaching."
          />
        </label>
      </fieldset>
      <label className="checkbox-label">
        <input type="checkbox" required name="adult" />
        <span>
          I confirm I am 18 or older and understand this preview does not send
          an application. See the privacy and application status below.
        </span>
      </label>
      <button type="submit" disabled={status === "sending"} className="button" aria-describedby="availability">
        {status === "sending" ? "Sending application…" : "Submit application"} <Arrow />
      </button>
      <div
        ref={notice}
        tabIndex={-1}
        role="status"
        className={status === "success" || status === "error" ? "form-result" : "sr-only"}
      >
        {status === "success" && <><strong>Application sent.</strong><p>Thank you for applying. VFN will review your details and contact you by email.</p></>}
        {status === "error" && <><strong>We couldn’t send your application.</strong><p>Please try again in a moment. Your application has not been confirmed.</p></>}
      </div>
      <p className="small muted">
        <a className="text-link" href="/privacy">
          Privacy notice
        </a>
      </p>
      <noscript><p className="form-notice">JavaScript is required to submit this application.</p></noscript>
    </form>
  );
}
