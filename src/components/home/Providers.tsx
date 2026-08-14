import React from "react";
import styles from "./Providers.module.css";

const PROVIDERS = [
  { name: "MTN MoMo", note: "Deposits, withdrawals, and webhook callbacks" },
  { name: "Airtel Money", note: "Deposits and withdrawals" },
  { name: "Orange Money", note: "Deposits, withdrawals, and callbacks" },
];

export default function Providers(): React.JSX.Element {
  return (
    <section className={styles.section} aria-labelledby="providers-heading">
      <div className={styles.inner}>
        <h2 id="providers-heading" className={styles.heading}>
          Supported providers &amp; network
        </h2>
        <p className={styles.intro}>
          Chaoslab integrates with three mobile money providers today, and
          settles on the Stellar network.
        </p>
        <div className={styles.providerRow}>
          {PROVIDERS.map((provider) => (
            <div className={styles.providerCard} key={provider.name}>
              <h3 className={styles.providerName}>{provider.name}</h3>
              <p className={styles.providerNote}>{provider.note}</p>
            </div>
          ))}
        </div>
        <p className={styles.expandNote}>
          Additional regional providers may be added as the network expands.
        </p>
        <div className={styles.networkCard}>
          <span className={styles.networkBadge}>Stellar · Testnet</span>
          <p className={styles.networkNote}>
            Chaoslab&apos;s Stellar integration currently runs against the
            Stellar test network. Mainnet settlement is on the roadmap and
            isn&apos;t live yet.
          </p>
        </div>
      </div>
    </section>
  );
}
