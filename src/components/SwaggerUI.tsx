import { useEffect, useRef } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-dist/swagger-ui.css";

interface SwaggerUIProps {
  specUrl?: string;
}

interface SwaggerUIRef {
  specActions: { download: (url: string) => void };
}

export default function SwaggerUIComponent({ specUrl }: SwaggerUIProps) {
  const swaggerRef = useRef<SwaggerUIRef>(null);

  const defaultSpecUrl = process.env.API_BASE_URL
    ? `${process.env.API_BASE_URL}/docs/openapi.json`
    : "/openapi.yaml";

  const finalSpecUrl = specUrl || defaultSpecUrl;

  useEffect(() => {
    if (swaggerRef.current) {
      swaggerRef.current.specActions.download(finalSpecUrl);
    }
  }, [finalSpecUrl]);

  return (
    <div style={{ height: "100vh", minHeight: "600px" }}>
      <SwaggerUI
        ref={swaggerRef}
        spec={finalSpecUrl}
        persistAuthorization={true}
        displayRequestDuration={true}
        filter={true}
        tryItOutEnabled={true}
        deepLinking={true}
        defaultModelsExpandDepth={2}
        defaultModelExpandDepth={2}
        docExpansion="list"
        layout="BaseLayout"
        supportedSubmitMethods={[
          "get",
          "post",
          "put",
          "delete",
          "patch",
          "head",
          "options",
        ]}
        validatorUrl={false}
        showExtensions={true}
        showCommonExtensions={true}
        oauth2RedirectUrl={window.location.origin + "/oauth2-redirect.html"}
        presets={[SwaggerUI.presets.apis]}
        plugins={[SwaggerUI.plugins.DownloadUrl]}
      />
    </div>
  );
}
