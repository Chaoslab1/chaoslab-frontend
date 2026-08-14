import React from "react";
import styles from "./Ecosystem.module.css";

const REPOS = [
  {
    name: "chaoslab-App",
    role: "User-facing application",
    body: "The React + TypeScript app end users open — authentication, wallet, payments, vaults, and activity. It talks to the backend over HTTP and WebSocket and never becomes authoritative for financial state.",
    href: "https://github.com/Chaoslab1/chaoslab-App",
  },
  {
    name: "chaoslab-backend",
    role: "Financial / API engine",
    body: "The source of truth. Owns transactions, fees, KYC/AML, vaults, and the Stellar integration, and exposes it all through REST, GraphQL, and WebSocket.",
    href: "https://github.com/Chaoslab1/chaoslab-backend",
  },
  {
    name: "chaoslab-frontend",
    role: "Developer docs & public site",
    body: "This site. Publishes the API reference, GraphQL playground, and guides, and introduces the ecosystem to partners and developers. No financial logic lives here.",
    href: "https://github.com/Chaoslab1/chaoslab-frontend",
  },
];

export default function Ecosystem(): React.JSX.Element {
  return (
    <section
      id="ecosystem"
      className={styles.section}
      aria-labelledby="ecosystem-heading"
    >
      <div className={styles.inner}>
        <h2 id="ecosystem-heading" className={styles.heading}>
          Three repositories, one system
        </h2>
        <p className={styles.intro}>
          Chaoslab is split into a product, an engine, and a public face —
          each with a single job and a clear boundary.
        </p>
        <div className={styles.grid}>
          {REPOS.map((repo) => (
            <a
              key={repo.name}
              className={styles.card}
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.role}>{repo.role}</span>
              <h3 className={styles.name}>{repo.name}</h3>
              <p className={styles.body}>{repo.body}</p>
              <span className={styles.link} aria-hidden="true">
                View on GitHub →
              </span>
            </a>
          ))}
        </div>
        <p className={styles.caption}>
          The App and the Backend exchange live traffic. The Frontend
          publishes documentation about both but isn&apos;t part of the
          runtime request path.
        </p>
      </div>
    </section>
  );
}
