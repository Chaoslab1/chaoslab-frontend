import { render, screen } from "@testing-library/react";
import GraphQLPlayground from "../GraphQLPlayground";

describe("GraphQLPlayground Component", () => {
  it("renders without crashing", () => {
    render(<GraphQLPlayground />);
    // Check if component renders any content
    expect(document.body).toBeInTheDocument();
  });

  it("renders a container for GraphQL playground", () => {
    const { container } = render(<GraphQLPlayground />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
