import React from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";

export default function SandboxPage(): React.JSX.Element {
  return (
    <Layout
      title="API Sandbox"
      description="Interactive API sandbox for testing Chaoslab Bridge endpoints"
    >
      <BrowserOnly
        fallback={
          <div style={{ padding: "2rem", textAlign: "center" }}>
            Loading API sandbox...
          </div>
        }
      >
        {() => {
          // eslint-disable-next-line @typescript-eslint/no-require-imports -- BrowserOnly requires a synchronous require() to defer this client-only module past SSR.
          const SwaggerUIComponent = require("../components/SwaggerUI").default;
          return <SwaggerUIComponent />;
        }}
      </BrowserOnly>
    </Layout>
  );
}
