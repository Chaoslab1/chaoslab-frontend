import React from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";

export default function GraphQLPage(): React.JSX.Element {
  return (
    <Layout
      title="GraphQL Playground"
      description="Interactive GraphQL Playground to explore and test the Chaoslab GraphQL API schema"
    >
      <BrowserOnly
        fallback={
          <p style={{ padding: "2rem" }}>Loading GraphQL Playground...</p>
        }
      >
        {() => {
          const GraphQLPlayground =
            // eslint-disable-next-line @typescript-eslint/no-require-imports -- BrowserOnly requires a synchronous require() to defer this client-only module past SSR.
            require("../components/GraphQLPlayground").default;
          return <GraphQLPlayground />;
        }}
      </BrowserOnly>
    </Layout>
  );
}
