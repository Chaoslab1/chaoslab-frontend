import React from "react";
import styles from "./Security.module.css";

const CONTROLS = [
  {
    title: "KYC",
    body: "Tiered identity verification gates account and transaction limits.",
  },
  {
    title: "AML & sanctions screening",
    body: "Transactions are checked against sanctions and watch lists as part of processing.",
  },
  {
    title: "FATF Travel Rule",
    body: "Originator/beneficiary information is shared between counterparties as required.",
  },
  {
    title: "SAR & compliance reporting",
    body: "Suspicious-activity reporting and compliance reporting infrastructure for operators.",
  },
];

export default function Security(): React.JSX.Element {
  return (
    <section className={styles.section} aria-labelledby="security-heading">
      <div className={styles.inner}>
        <h2 id="security-heading" className={styles.heading}>
          Security &amp; compliance
        </h2>
        <p className={styles.intro}>
          Regulated money movement needs compliance built in, not bolted on.
          These controls are implemented in the backend today.
        </p>
        <div className={styles.grid}>
          {CONTROLS.map((control) => (
            <div className={styles.card} key={control.title}>
              <h3 className={styles.cardTitle}>{control.title}</h3>
              <p className={styles.cardBody}>{control.body}</p>
            </div>
          ))}
        </div>
        <p className={styles.disclaimer}>
          These are engineering capabilities, not regulatory certifications.
          Chaoslab has not undergone a third-party compliance or security audit.
        </p>
      </div>
    </section>
  );
}
