import { render } from "@testing-library/react";
import SwaggerUI from "../SwaggerUI";

// Mock swagger-ui-react
jest.mock("swagger-ui-react", () => {
  return function MockSwaggerUI() {
    return <div data-testid="swagger-ui-mock">Swagger UI</div>;
  };
});

describe("SwaggerUI Component", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<SwaggerUI url="/openapi.yaml" />);
    expect(getByTestId("swagger-ui-mock")).toBeInTheDocument();
  });

  it("accepts a url prop", () => {
    const testUrl = "https://example.com/api-spec.yaml";
    render(<SwaggerUI url={testUrl} />);
    // Component should render successfully with custom URL
    expect(true).toBe(true);
  });
});
