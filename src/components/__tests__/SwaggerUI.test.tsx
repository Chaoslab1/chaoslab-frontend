import React from "react";
import { render } from "@testing-library/react";
import SwaggerUI from "../SwaggerUI";

const downloadSpy = jest.fn();

// Mock swagger-ui-react, including the static presets/plugins the real
// component reads off the default export (SwaggerUI.presets.apis, etc.),
// and forward the ref so we can assert the specActions.download call the
// real component makes in its effect.
jest.mock("swagger-ui-react", () => {
  const MockSwaggerUI = Object.assign(
    React.forwardRef(function MockSwaggerUI(
      _props: unknown,
      ref: React.Ref<unknown>
    ) {
      React.useImperativeHandle(ref, () => ({
        specActions: { download: downloadSpy },
      }));
      return <div data-testid="swagger-ui-mock">Swagger UI</div>;
    }),
    { presets: { apis: {} }, plugins: { DownloadUrl: {} } }
  );
  return MockSwaggerUI;
});

describe("SwaggerUI Component", () => {
  beforeEach(() => {
    downloadSpy.mockClear();
  });

  it("renders without crashing", () => {
    const { getByTestId } = render(<SwaggerUI specUrl="/openapi.yaml" />);
    expect(getByTestId("swagger-ui-mock")).toBeInTheDocument();
  });

  it("downloads the given specUrl once mounted", () => {
    render(<SwaggerUI specUrl="/openapi.yaml" />);
    expect(downloadSpy).toHaveBeenCalledWith("/openapi.yaml");
  });

  it("accepts a specUrl prop", () => {
    const testUrl = "https://example.com/api-spec.yaml";
    render(<SwaggerUI specUrl={testUrl} />);
    expect(downloadSpy).toHaveBeenCalledWith(testUrl);
  });

  it("falls back to /openapi.yaml when no specUrl or API_BASE_URL is set", () => {
    render(<SwaggerUI />);
    expect(downloadSpy).toHaveBeenCalledWith("/openapi.yaml");
  });
});
