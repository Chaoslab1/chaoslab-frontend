import { render, screen } from "@testing-library/react";
import Hero from "../Hero";
import Ecosystem from "../Ecosystem";
import Capabilities from "../Capabilities";
import Providers from "../Providers";
import Status from "../Status";

describe("Hero", () => {
  it("renders the value proposition heading", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Bridging mobile money and the Stellar network/i,
      })
    ).toBeInTheDocument();
  });

  it("links the primary CTA to the chaoslab-App repository, not an invented product URL", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", {
      name: /Explore the Chaoslab App/i,
    });
    expect(cta).toHaveAttribute(
      "href",
      "https://github.com/Chaoslab1/chaoslab-App"
    );
  });
});

describe("Ecosystem", () => {
  it("links to all three real repositories", () => {
    render(<Ecosystem />);
    for (const repo of [
      "chaoslab-App",
      "chaoslab-backend",
      "chaoslab-frontend",
    ]) {
      expect(
        screen.getByRole("link", { name: new RegExp(repo) })
      ).toHaveAttribute("href", `https://github.com/Chaoslab1/${repo}`);
    }
  });

  it("exposes the #ecosystem anchor the navbar links to", () => {
    const { container } = render(<Ecosystem />);
    expect(container.querySelector("#ecosystem")).toBeInTheDocument();
  });
});

describe("Capabilities", () => {
  it("labels disputes infrastructure as backend-only, not app-complete", () => {
    render(<Capabilities />);
    const disputesCard = screen
      .getByText(/Disputes infrastructure/i)
      .closest("div");
    expect(disputesCard).toHaveTextContent("Backend API");
  });
});

describe("Providers", () => {
  it("does not claim Stellar mainnet", () => {
    render(<Providers />);
    expect(screen.getByText(/Stellar · Testnet/i)).toBeInTheDocument();
    expect(screen.queryByText(/mainnet is live/i)).not.toBeInTheDocument();
  });
});

describe("Status", () => {
  it("keeps the native mobile app and mainnet settlement out of 'available now'", () => {
    render(<Status />);
    const inDevelopmentHeading = screen.getByText(
      /In development \/ expanding/i
    );
    const inDevelopmentList = inDevelopmentHeading.closest("div");
    expect(inDevelopmentList).toHaveTextContent(/Native mobile app/i);
    expect(inDevelopmentList).toHaveTextContent(/Stellar mainnet settlement/i);
  });

  it("exposes the #status anchor the hero and navbar link to", () => {
    const { container } = render(<Status />);
    expect(container.querySelector("#status")).toBeInTheDocument();
  });
});
