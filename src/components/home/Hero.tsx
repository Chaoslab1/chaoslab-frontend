import React from "react";
import Link from "@docusaurus/Link";
import styles from "./Hero.module.css";

export default function Hero(): React.JSX.Element {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          Cross-border payments infrastructure for Africa
        </p>
        <h1 id="hero-heading" className={styles.heading}>
          Bridging mobile money and the Stellar network
        </h1>
        <p className={styles.subhead}>
          Chaoslab connects MTN MoMo, Airtel Money, and Orange Money wallets
          to Stellar settlement, so a payment started on one mobile money
          network can reach a recipient on another — across borders — through
          a single API-driven engine.
        </p>
        <div className={styles.ctaRow}>
          <a
            className={styles.primaryCta}
            href="https://github.com/Chaoslab1/chaoslab-App"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore the Chaoslab App
          </a>
          <Link className={styles.secondaryCta} to="/api">
            Read the API Docs
          </Link>
        </div>
        <p className={styles.status}>
          Chaoslab is in active development on the Stellar test network. See{" "}
          <Link to="/#status">product status</Link> for what&apos;s live
          today.
        </p>
      </div>
    </section>
  );
}
