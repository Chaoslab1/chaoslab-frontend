import React from "react";
import styles from "./OpenSource.module.css";

const REPOS = [
  { name: "chaoslab-App", href: "https://github.com/Chaoslab1/chaoslab-App" },
  {
    name: "chaoslab-backend",
    href: "https://github.com/Chaoslab1/chaoslab-backend",
  },
  {
    name: "chaoslab-frontend",
    href: "https://github.com/Chaoslab1/chaoslab-frontend",
  },
];

export default function OpenSource(): React.JSX.Element {
  return (
    <section className={styles.section} aria-labelledby="open-source-heading">
      <div className={styles.inner}>
        <h2 id="open-source-heading" className={styles.heading}>
          Open source
        </h2>
        <p className={styles.intro}>
          All three repositories are public. Read the code, open an issue, or
          send a pull request.
        </p>
        <ul className={styles.repoList}>
          {REPOS.map((repo) => (
            <li key={repo.name}>
              <a
                className={styles.repoLink}
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
