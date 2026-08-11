import { render, screen, fireEvent } from "@testing-library/react";
import GraphQLPlayground from "../GraphQLPlayground";

describe("GraphQLPlayground Component", () => {
  afterEach(() => {
    // The component appends a CDN <script> to document.body on mount;
    // clean it up so it doesn't leak between tests.
    document.querySelectorAll("script").forEach((el) => el.remove());
  });

  it("renders without crashing", () => {
    render(<GraphQLPlayground />);
    expect(document.body).toBeInTheDocument();
  });

  it("renders a container for GraphQL playground", () => {
    const { container } = render(<GraphQLPlayground />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("shows a loading indicator until the sandbox embed loads", () => {
    render(<GraphQLPlayground />);
    expect(screen.getByText(/Loading Apollo Sandbox/i)).toBeInTheDocument();
  });

  it("collapses and expands the settings bar", () => {
    render(<GraphQLPlayground />);
    const toggle = screen.getByRole("button", { name: /Collapse settings/i });

    fireEvent.click(toggle);
    expect(
      screen.getByRole("button", { name: /Expand settings/i })
    ).toBeInTheDocument();
    expect(screen.queryByLabelText(/Endpoint URL/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Expand settings/i }));
    expect(screen.getByLabelText(/Endpoint URL/i)).toBeInTheDocument();
  });

  it("disables Connect until the endpoint input changes", () => {
    render(<GraphQLPlayground />);
    const input = screen.getByLabelText(/Endpoint URL/i);
    const connect = screen.getByRole("button", { name: /Connect/i });
    expect(connect).toBeDisabled();

    fireEvent.change(input, {
      target: { value: "http://localhost:5000/graphql" },
    });
    expect(connect).toBeEnabled();

    fireEvent.click(connect);
    expect(connect).toBeDisabled();
  });

  it("applies a new endpoint on Enter", () => {
    render(<GraphQLPlayground />);
    const input = screen.getByLabelText(/Endpoint URL/i);
    const connect = screen.getByRole("button", { name: /Connect/i });

    fireEvent.change(input, {
      target: { value: "http://localhost:5000/graphql" },
    });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(connect).toBeDisabled();
  });

  it("ignores a blank endpoint on Connect", () => {
    render(<GraphQLPlayground />);
    const input = screen.getByLabelText(/Endpoint URL/i);
    const connect = screen.getByRole("button", { name: /Connect/i });

    fireEvent.change(input, { target: { value: "   " } });
    expect(connect).toBeEnabled();
    fireEvent.click(connect);
    // A blank endpoint isn't applied, so the loading state (still tied to
    // the original default endpoint) stays put rather than re-triggering.
    expect(screen.getByText(/Loading Apollo Sandbox/i)).toBeInTheDocument();
  });
});
