import { render, screen } from "@testing-library/react";
import ApiReference from "../ApiReference";

describe("ApiReference Component", () => {
  it("renders without crashing", () => {
    render(<ApiReference />);
    expect(screen.getByText(/API Reference/i)).toBeInTheDocument();
  });

  it("contains the swagger UI container", () => {
    const { container } = render(<ApiReference />);
    expect(container.querySelector("#swagger-ui")).toBeInTheDocument();
  });
});
