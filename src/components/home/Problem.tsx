import React from "react";
import styles from "./Problem.module.css";

const POINTS = [
  {
    title: "Wallets don't cross borders",
    body: "Mobile money is how people actually pay across much of Africa — but a MoMo wallet in one country typically can't send directly to an Airtel or Orange wallet in another.",
  },
  {
    title: "Every hop adds cost and delay",
    body: "Sending value between countries usually means routing through multiple intermediary banks or remittance operators, each adding its own fee and processing time.",
  },
  {
    title: "Settlement isn't instant",
    body: "Cross-border transfers commonly take days to clear, leaving both senders and recipients waiting without clear visibility into where the money is.",
  },
];

export default function Problem(): React.JSX.Element {
  return (
    <section className={styles.section} aria-labelledby="problem-heading">
      <div className={styles.inner}>
        <h2 id="problem-heading" className={styles.heading}>
          Cross-border payments in Africa are fragmented by design
        </h2>
        <p className={styles.intro}>
          Hundreds of millions of people rely on mobile money day to day, but
          the networks behind it were built for domestic use — not for
          moving value between countries.
        </p>
        <div className={styles.grid}>
          {POINTS.map((point) => (
            <div className={styles.card} key={point.title}>
              <h3 className={styles.cardTitle}>{point.title}</h3>
              <p className={styles.cardBody}>{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
