import type { Metadata } from "next";
import { PageIntro } from "@/components/shared";
export const metadata: Metadata = {
  title: "Privacy & Application Status",
  description:
    "How this VFN website currently handles coaching application information. Application delivery and storage are not enabled.",
};
export default function Privacy() {
  return (
    <main id="main">
      <PageIntro
        label="PRIVACY & APPLICATION STATUS"
        title="Clarity about"
        accent="your information."
        description="The coaching application is currently a preview. It does not send or save your entries."
      />
      <section className="container privacy-copy">
        <h2>The current form</h2>
        <p>
          Field checks run in your browser. No submission endpoint, application
          database, payment system, or analytics service has been integrated
          into this site. Information typed into the preview form is not sent by
          the form or intentionally persisted by this application.
        </p>
        <h2>Before applications open</h2>
        <p>
          VFN must approve a delivery provider, recipient, retention policy, and
          privacy notice before accepting applications. This page will be
          updated to explain that process and provide an appropriate privacy
          contact.
        </p>
        <h2>Information to leave out</h2>
        <p>
          Please do not enter medical records, diagnoses, financial details, or
          other sensitive personal information. A coaching inquiry should focus
          on your training goals and preferences.
        </p>
        <h2>Website hosting</h2>
        <p>
          The service used to access or host a website may process technical
          request information, such as an IP address. Hosting arrangements and
          their applicable privacy terms must be confirmed before public launch.
        </p>
      </section>
    </main>
  );
}
