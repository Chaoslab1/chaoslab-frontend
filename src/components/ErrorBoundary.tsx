import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs errors, and displays a fallback UI.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by boundary:", error);
      console.error("Error info:", errorInfo);
    }

    // Update state with error details
    this.setState({
      error,
      errorInfo,
    });

    // Log to error tracking service (Sentry, LogRocket, etc.)
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService(error: Error, errorInfo: ErrorInfo): void {
    // TODO: Integrate with error tracking service
    // Example: Sentry.captureException(error, { extra: errorInfo });

    // For now, we'll just log to console in production
    if (process.env.NODE_ENV === "production") {
      console.error("Production error:", {
        error: error.toString(),
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
      });
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div
          style={{
            padding: "2rem",
            maxWidth: "600px",
            margin: "4rem auto",
            textAlign: "center",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <h1 style={{ color: "#e53e3e", marginBottom: "1rem" }}>
            ⚠️ Something went wrong
          </h1>
          <p style={{ color: "#4a5568", marginBottom: "2rem" }}>
            We're sorry for the inconvenience. An error occurred while rendering
            this page.
          </p>

          {process.env.NODE_ENV === "development" && this.state.error && (
            <details
              style={{
                textAlign: "left",
                padding: "1rem",
                background: "#f7fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "0.5rem",
                marginBottom: "1rem",
                fontSize: "0.875rem",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                Error Details
              </summary>
              <pre
                style={{
                  overflow: "auto",
                  fontSize: "0.75rem",
                  color: "#e53e3e",
                }}
              >
                {this.state.error.toString()}
              </pre>
              {this.state.errorInfo && (
                <pre
                  style={{
                    overflow: "auto",
                    fontSize: "0.75rem",
                    color: "#4a5568",
                  }}
                >
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </details>
          )}

          <div>
            <button
              onClick={this.handleReset}
              style={{
                padding: "0.75rem 1.5rem",
                marginRight: "1rem",
                background: "#3182ce",
                color: "white",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Try Again
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#e2e8f0",
                color: "#2d3748",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Go Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
