import type { Metadata } from "next";
import { PageIntro } from "@/components/shared";
export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How VFN coaching applications are submitted and handled.",
};
export default function Privacy() {
  return (
    <main id="main">
      <PageIntro
        label="PRIVACY NOTICE"
        title="Clarity about"
        accent="your information."
        description="Learn how your coaching application information is handled."
      />
      <section className="container privacy-copy">
        <h2>Coaching applications</h2>
        <p>
          When you submit the coaching application, the details you enter are sent
          through Formspree, a third-party form processing service, so VFN can
          review your request and contact you at the email address you provide.
          Formspree processes and may retain submissions according to its own
          policies. Please review <a href="https://formspree.io/legal/privacy-policy/" className="text-link">Formspree’s privacy policy</a>.
        </p>
        <p>
          VFN uses application information to evaluate coaching fit and follow up
          about coaching services. For questions about your application or to
          request deletion, contact <a className="text-link" href="mailto:velasquezfitnesspr@gmail.com">velasquezfitnesspr@gmail.com</a>.
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
