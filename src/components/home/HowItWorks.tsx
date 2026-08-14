import React from "react";
import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    label: "Mobile Money",
    body: "The sender deposits from MTN MoMo, Airtel Money, or Orange Money.",
  },
  {
    label: "Chaoslab App",
    body: "The user-facing app collects the request and tracks its status.",
  },
  {
    label: "Chaoslab Backend",
    body: "The API engine validates the request, applies fees and KYC checks, and orchestrates settlement.",
  },
  {
    label: "Stellar Settlement",
    body: "Funds move on the Stellar network through the backend's SEP-compliant integrations.",
  },
  {
    label: "Mobile Money / Recipient",
    body: "The recipient's funds land back in their local mobile money wallet.",
  },
];

export default function HowItWorks(): React.JSX.Element {
  return (
    <section
      className={styles.section}
      aria-labelledby="how-it-works-heading"
    >
      <div className={styles.inner}>
        <h2 id="how-it-works-heading" className={styles.heading}>
          How Chaoslab works
        </h2>
        <p className={styles.intro}>
          One request flows through four systems on its way from sender to
          recipient.
        </p>
        <ol className={styles.flow}>
          {STEPS.map((step, index) => (
            <li className={styles.step} key={step.label}>
              <div className={styles.stepCard}>
                <span className={styles.stepIndex} aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className={styles.stepLabel}>{step.label}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
              {index < STEPS.length - 1 && (
                <span className={styles.connector} aria-hidden="true">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
