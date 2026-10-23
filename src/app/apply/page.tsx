import type { Metadata } from "next";
import { PageIntro } from "@/components/shared";
import { ApplicationForm } from "@/components/application-form";
export const metadata: Metadata = {
  title: "Apply for Coaching",
  description:
    "Explore the VFN coaching application and share your training goals when applications open. Secure submission is not yet enabled.",
};
export default function Apply() {
  return (
    <main id="main">
      <PageIntro
        label="YOUR NEXT CHAPTER"
        title="It starts"
        accent="with intention."
        description="A better direction begins with understanding where you are. Tell your story, define your goals, and take the first step toward purposeful training."
      />
      <section className="container application-layout">
        <aside>
          <p className="eyebrow">THE STARTING POINT</p>
          <h2>
            Bring your{" "}
            <br />
            ambition.
          </h2>
          <p className="muted">
            A clear picture of your goals helps shape a useful coaching
            conversation.
          </p>
          <ol className="application-steps">
            <li>Share your starting point.</li>
            <li>Talk through the approach.</li>
            <li>Decide on the right fit.</li>
          </ol>
          <p className="small muted">
            No payment is collected here. Coaching availability and any fees
            must be confirmed before you commit.
          </p>
        </aside>
        <ApplicationForm />
      </section>
    </main>
  );
}
