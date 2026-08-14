import React from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";

export default function ApiPage(): React.JSX.Element {
  return (
    <Layout title="API Reference" description="Chaoslab REST API reference">
      <BrowserOnly
        fallback={<p style={{ padding: "2rem" }}>Loading API reference...</p>}
      >
        {() => {
          // eslint-disable-next-line @typescript-eslint/no-require-imports -- BrowserOnly requires a synchronous require() to defer this client-only module past SSR.
          const ApiReference = require("../components/ApiReference").default;
          return <ApiReference />;
        }}
      </BrowserOnly>
    </Layout>
  );
}
