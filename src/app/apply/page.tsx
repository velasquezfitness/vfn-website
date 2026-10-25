import type { Metadata } from "next";
import { PageIntro } from "@/components/shared";
import { ApplicationForm } from "@/components/application-form";
export const metadata: Metadata = {
  title: "Apply for Coaching",
  description:
    "Start with your goals. Apply for individualized coaching with Velasquez Fitness & Nutrition.",
};
export default function Apply() {
  return (
    <main id="main">
      <PageIntro
        label="A CONVERSATION ABOUT WHAT COMES NEXT"
        title="Your goals."
        accent="Your starting point."
        description="Tell us where you are, what you’re working toward, and what you’d value in a coach."
      />
      <section className="container application-layout">
        <aside>
          <p className="eyebrow">PERSONAL FROM THE START</p>
          <h2>
            Let’s understand
            <br />
            <em>the individual.</em>
          </h2>
          <p>
            For VFN Coaching or VFN Performance, this is a starting point for a
            coaching conversation, not a commitment to a package or a payment.
          </p>
          <p>
            After you apply, the next step is to discuss your goals,
            coaching fit, support expectations, and availability.
          </p>
          <p className="small">
            Please share only what’s relevant to your training. Medical records
            and sensitive health information aren’t needed here.
          </p>
        </aside>
        <ApplicationForm />
      </section>
    </main>
  );
}
