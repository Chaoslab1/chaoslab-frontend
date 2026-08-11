import { render, screen } from "@testing-library/react";
import ApiReference from "../ApiReference";

// Mock redoc — it fetches and renders a full spec, which isn't suited to a
// jsdom unit test of the ApiReference wrapper.
jest.mock("redoc", () => ({
  RedocStandalone: function MockRedocStandalone({
    specUrl,
  }: {
    specUrl: string;
  }) {
    return <div data-testid="redoc-mock">{specUrl}</div>;
  },
}));

describe("ApiReference Component", () => {
  it("renders without crashing", () => {
    render(<ApiReference />);
    expect(
      screen.getByText(/Want to try the API interactively\?/i)
    ).toBeInTheDocument();
  });

  it("links to the API sandbox", () => {
    render(<ApiReference />);
    const link = screen.getByRole("link", { name: /Open API Sandbox/i });
    expect(link).toHaveAttribute("href", "/sandbox");
  });

  it("renders Redoc pointed at the openapi spec", () => {
    const { getByTestId } = render(<ApiReference />);
    expect(getByTestId("redoc-mock")).toHaveTextContent("/openapi.yaml");
  });
});
