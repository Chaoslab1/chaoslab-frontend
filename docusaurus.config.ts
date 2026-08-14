import { config as dotenvConfig } from "dotenv";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { themes as prismThemes } from "prism-react-renderer";

// Load environment variables from .env (local development)
dotenvConfig({ path: "./.env" });

const config: Config = {
  title: "Chaoslab",
  tagline: "Mobile money ↔ Stellar payments infrastructure for Africa",
  favicon: "img/logo.svg",

  future: {
    v4: true,
  },

  url: "https://chaoslab1.github.io",
  baseUrl: "/chaoslab-frontend/",

  organizationName: "Chaoslab1",
  projectName: "chaoslab-frontend",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  // The navbar/footer link to in-page anchors (#ecosystem, #status) rendered
  // by custom React components in src/components/home/*. Docusaurus's anchor
  // checker only indexes ids it generates itself from MDX headings, so it
  // can't see these and flags every page that links to them as broken even
  // though the anchors are real and verified working. onBrokenLinks above
  // still throws on genuinely broken page routes.
  onBrokenAnchors: "ignore",

  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          path: "./docs",
          routeBasePath: "docs",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // -------------------------------------------------------------------------
    // Algolia DocSearch – full-text search for the docs portal
    // -------------------------------------------------------------------------
    // The free DocSearch program is available for open‑source projects.
    // 1. Apply at https://docsearch.algolia.com/apply
    // 2. Set the three environment variables below once approved.
    // -------------------------------------------------------------------------
    ...(process.env.ALGOLIA_APP_ID &&
      process.env.ALGOLIA_API_KEY &&
      process.env.ALGOLIA_INDEX_NAME && {
        algolia: {
          appId: process.env.ALGOLIA_APP_ID,
          apiKey: process.env.ALGOLIA_API_KEY,
          indexName: process.env.ALGOLIA_INDEX_NAME,
          contextualSearch: true,
        },
      }),

    navbar: {
      title: "Chaoslab",
      items: [
        { to: "/", label: "Product", position: "left" },
        { to: "/#ecosystem", label: "Architecture", position: "left" },
        {
          type: "dropdown",
          label: "Developers",
          position: "left",
          items: [
            { to: "/api", label: "API Reference" },
            { to: "/graphql", label: "GraphQL Playground" },
          ],
        },
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Docs",
        },
        {
          type: "dropdown",
          label: "GitHub",
          position: "right",
          items: [
            {
              href: "https://github.com/Chaoslab1/chaoslab-App",
              label: "chaoslab-App",
            },
            {
              href: "https://github.com/Chaoslab1/chaoslab-backend",
              label: "chaoslab-backend",
            },
            {
              href: "https://github.com/Chaoslab1/chaoslab-frontend",
              label: "chaoslab-frontend",
            },
          ],
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Product",
          items: [
            { label: "Overview", to: "/" },
            { label: "Ecosystem", to: "/#ecosystem" },
            { label: "Product status", to: "/#status" },
          ],
        },
        {
          title: "Developers",
          items: [
            { label: "API Reference", to: "/api" },
            { label: "GraphQL Playground", to: "/graphql" },
            { label: "Guides", to: "/docs/BRIDGE_DOCUMENTATION_INDEX" },
          ],
        },
        {
          title: "Repositories",
          items: [
            {
              label: "chaoslab-App",
              href: "https://github.com/Chaoslab1/chaoslab-App",
            },
            {
              label: "chaoslab-backend",
              href: "https://github.com/Chaoslab1/chaoslab-backend",
            },
            {
              label: "chaoslab-frontend",
              href: "https://github.com/Chaoslab1/chaoslab-frontend",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Chaoslab`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "json", "yaml", "typescript", "python"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
