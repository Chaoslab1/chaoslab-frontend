import { useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

/**
 * Analytics Component
 * 
 * Tracks page views and performance metrics.
 * Configure analytics providers in docusaurus.config.ts
 */
export function Analytics(): null {
  const location = useLocation();

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }

    // Track page views
    trackPageView(location.pathname + location.search);

    // Track Web Vitals
    if ("PerformanceObserver" in window) {
      trackWebVitals();
    }
  }, [location]);

  return null;
}

/**
 * Track page view
 */
function trackPageView(url: string): void {
  // Google Analytics (if configured)
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", (window as any).GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }

  // Custom analytics endpoint (if configured)
  if (process.env.ANALYTICS_ENDPOINT) {
    fetch(process.env.ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "pageview",
        url,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {
      // Silently fail - don't break the app for analytics
    });
  }
}

/**
 * Track Web Vitals (Core Web Vitals)
 */
function trackWebVitals(): void {
  // Largest Contentful Paint (LCP)
  observeMetric("largest-contentful-paint", (entry) => {
    sendMetric("LCP", entry.renderTime || entry.loadTime);
  });

  // First Input Delay (FID)
  observeMetric("first-input", (entry) => {
    sendMetric("FID", entry.processingStart - entry.startTime);
  });

  // Cumulative Layout Shift (CLS)
  observeMetric("layout-shift", (entry) => {
    if (!(entry as any).hadRecentInput) {
      sendMetric("CLS", (entry as any).value);
    }
  });
}

/**
 * Observe performance metrics
 */
function observeMetric(
  type: string,
  callback: (entry: PerformanceEntry) => void
): void {
  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(callback);
    });

    observer.observe({ type, buffered: true });
  } catch (e) {
    // Browser doesn't support this metric
  }
}

/**
 * Send metric to analytics
 */
function sendMetric(name: string, value: number): void {
  // Google Analytics (if configured)
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name, {
      value: Math.round(value),
      metric_id: name,
      metric_value: value,
      metric_delta: value,
    });
  }

  // Custom analytics endpoint (if configured)
  if (process.env.ANALYTICS_ENDPOINT) {
    fetch(process.env.ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "metric",
        name,
        value,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {
      // Silently fail
    });
  }
}

export default Analytics;
