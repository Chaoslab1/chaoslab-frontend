import React from "react";
import styles from "./Status.module.css";

const AVAILABLE = [
  "Authentication & onboarding",
  "KYC status display",
  "Home & wallet balance",
  "Deposits & withdrawals with fee estimates",
  "Payments — saved contacts & send",
  "Vaults — create, edit, transfer",
  "Activity — transaction history & detail",
  "Notification preferences",
  "Settings & security — 2FA toggle, backup codes",
];

const IN_DEVELOPMENT = [
  "Native mobile app (the App is a responsive web app today)",
  "Full dispute open/track/resolve UI",
  "A real-time in-app notifications feed",
  "Device & session management",
  "Stellar mainnet settlement (currently testnet)",
];

export default function Status(): React.JSX.Element {
  return (
    <section
      id="status"
      className={styles.section}
      aria-labelledby="status-heading"
    >
      <div className={styles.inner}>
        <h2 id="status-heading" className={styles.heading}>
          Product status
        </h2>
        <p className={styles.intro}>
          Chaoslab is actively being built. Here&apos;s what&apos;s real today
          versus what&apos;s still ahead — deliberately, not as a gap we&apos;re
          hiding.
        </p>
        <div className={styles.columns}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>
              <span className={styles.dotAvailable} aria-hidden="true" />
              Available now
            </h3>
            <ul className={styles.list}>
              {AVAILABLE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>
              <span className={styles.dotProgress} aria-hidden="true" />
              In development / expanding
            </h3>
            <ul className={styles.list}>
              {IN_DEVELOPMENT.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
