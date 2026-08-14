import React from "react";
import Link from "@docusaurus/Link";
import styles from "./DeveloperResources.module.css";

const RESOURCES = [
  {
    title: "API Reference",
    body: "Browse every REST endpoint, generated from the backend's OpenAPI contract.",
    to: "/api",
    internal: true,
  },
  {
    title: "GraphQL Playground",
    body: "Explore the schema and run live queries against the GraphQL API.",
    to: "/graphql",
    internal: true,
  },
  {
    title: "Guides",
    body: "Architecture, authentication, KYC, vaults, GraphQL, and operational guides.",
    to: "/docs/BRIDGE_DOCUMENTATION_INDEX",
    internal: true,
  },
  {
    title: "GitHub",
    body: "Source for the app, the backend, and this documentation site.",
    to: "https://github.com/Chaoslab1",
    internal: false,
  },
];

export default function DeveloperResources(): React.JSX.Element {
  return (
    <section
      id="developers"
      className={styles.section}
      aria-labelledby="developers-heading"
    >
      <div className={styles.inner}>
        <h2 id="developers-heading" className={styles.heading}>
          Built for developers
        </h2>
        <p className={styles.intro}>
          Everything you need to integrate with Chaoslab, generated from the
          real backend contract rather than hand-written by hand.
        </p>
        <div className={styles.grid}>
          {RESOURCES.map((resource) =>
            resource.internal ? (
              <Link
                key={resource.title}
                className={styles.card}
                to={resource.to}
              >
                <h3 className={styles.cardTitle}>{resource.title}</h3>
                <p className={styles.cardBody}>{resource.body}</p>
              </Link>
            ) : (
              <a
                key={resource.title}
                className={styles.card}
                href={resource.to}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className={styles.cardTitle}>{resource.title}</h3>
                <p className={styles.cardBody}>{resource.body}</p>
              </a>
            )
          )}
        </div>
      </div>
    </section>
  );
}
