"use client";
import { useRef, useState, useSyncExternalStore } from "react";
import { Arrow } from "@/components/brand";
const subscribe = () => () => {};
export function ApplicationForm() {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [checked, setChecked] = useState(false);
  const notice = useRef<HTMLDivElement>(null);
  return (
    <form
      className="application-form"
      onSubmit={(e) => {
        e.preventDefault();
        setChecked(true);
        requestAnimationFrame(() => notice.current?.focus());
      }}
      onChange={() => setChecked(false)}
    >
      <div className="form-notice" id="availability">
        <strong>Applications are not open yet.</strong>
        <p>
          You can explore and check this form, but nothing will be sent or
          saved. Submission will be enabled once VFN confirms a secure delivery
          destination.
        </p>
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
      <button
        type="submit"
        disabled={!hydrated}
        className="button"
        aria-describedby="availability"
      >
        Check application <Arrow />
      </button>
      <button type="button" className="button submit-disabled" disabled>
        Submit application — unavailable
      </button>
      <div
        ref={notice}
        tabIndex={-1}
        role="status"
        className={checked ? "form-result" : "sr-only"}
      >
        {checked && (
          <>
            <strong>Your form passes the field checks.</strong>
            <p>
              This is not a submitted application. Nothing has been sent or
              saved. VFN must enable secure delivery before applications can be
              accepted.
            </p>
          </>
        )}
      </div>
      <p className="small muted">
        <a className="text-link" href="/privacy">
          Privacy &amp; application status
        </a>
      </p>
      <noscript>
        <p className="form-notice">
          Form checking requires JavaScript. Submission is unavailable; no
          application will be sent.
        </p>
      </noscript>
    </form>
  );
}
