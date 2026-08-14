import React from "react";
import Layout from "@theme/Layout";
import Hero from "@site/src/components/home/Hero";
import Problem from "@site/src/components/home/Problem";
import HowItWorks from "@site/src/components/home/HowItWorks";
import Ecosystem from "@site/src/components/home/Ecosystem";
import Capabilities from "@site/src/components/home/Capabilities";
import Providers from "@site/src/components/home/Providers";
import Security from "@site/src/components/home/Security";
import Status from "@site/src/components/home/Status";
import DeveloperResources from "@site/src/components/home/DeveloperResources";
import OpenSource from "@site/src/components/home/OpenSource";

export default function Home(): React.JSX.Element {
  return (
    <Layout
      title="Chaoslab — Mobile Money ↔ Stellar Payments Infrastructure"
      description="Chaoslab bridges MTN MoMo, Airtel Money, and Orange Money with Stellar settlement for African cross-border payments. Explore the app, the API, and the docs."
    >
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Ecosystem />
        <Capabilities />
        <Providers />
        <Security />
        <Status />
        <DeveloperResources />
        <OpenSource />
      </main>
    </Layout>
  );
}
