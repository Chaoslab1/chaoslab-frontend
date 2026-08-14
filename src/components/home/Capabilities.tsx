import React from "react";
import styles from "./Capabilities.module.css";

type Scope = "In App" | "Backend API";

interface Capability {
  title: string;
  body: string;
  scope: Scope;
}

const CAPABILITIES: Capability[] = [
  {
    title: "Mobile-money connectivity",
    body: "Deposit and withdraw through MTN MoMo, Airtel Money, and Orange Money.",
    scope: "In App",
  },
  {
    title: "Stellar settlement",
    body: "SEP-compliant integration that settles value on the Stellar network.",
    scope: "Backend API",
  },
  {
    title: "Transactions",
    body: "Deposit, withdraw, and a full transaction history with live status.",
    scope: "In App",
  },
  {
    title: "Fees",
    body: "Live fee estimation backed by a configurable fee-strategy engine.",
    scope: "In App",
  },
  {
    title: "Vault infrastructure",
    body: "Savings sub-balances that move funds to and from the main balance.",
    scope: "In App",
  },
  {
    title: "KYC",
    body: "Tiered identity verification, with real-time status shown to the user.",
    scope: "In App",
  },
  {
    title: "AML & sanctions screening",
    body: "Automated screening against sanctions lists as part of transaction processing.",
    scope: "Backend API",
  },
  {
    title: "Travel Rule & SAR",
    body: "FATF Travel Rule data sharing and suspicious-activity-report infrastructure.",
    scope: "Backend API",
  },
  {
    title: "Disputes infrastructure",
    body: "A dispute lifecycle exists on the backend; it isn't exposed in the app's UI yet.",
    scope: "Backend API",
  },
  {
    title: "REST, GraphQL & WebSocket APIs",
    body: "Full programmatic access for partners and developers, documented in this portal.",
    scope: "Backend API",
  },
];

export default function Capabilities(): React.JSX.Element {
  return (
    <section className={styles.section} aria-labelledby="capabilities-heading">
      <div className={styles.inner}>
        <h2 id="capabilities-heading" className={styles.heading}>
          What Chaoslab can do
        </h2>
        <p className={styles.intro}>
          Every capability below is implemented today. The badge shows where you
          can reach it: in the consumer app, or currently only through the
          backend&apos;s APIs.
        </p>
        <div className={styles.grid}>
          {CAPABILITIES.map((capability) => (
            <div className={styles.card} key={capability.title}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{capability.title}</h3>
                <span
                  className={
                    capability.scope === "In App"
                      ? styles.badgeApp
                      : styles.badgeBackend
                  }
                >
                  {capability.scope}
                </span>
              </div>
              <p className={styles.cardBody}>{capability.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
