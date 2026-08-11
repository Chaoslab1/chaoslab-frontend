// Fetches the live OpenAPI spec from chaoslab-backend and writes it to
// static/openapi.yaml, which ApiReference.tsx (Redoc) and SwaggerUI.tsx
// both read from at /openapi.yaml. chaoslab-backend's own docs-portal can
// copy the file locally (same repo checkout); this one can't, so it fetches
// over HTTP from OPENAPI_SOURCE_URL's /docs/openapi.json instead.
//
// Non-fatal by design: if no backend is reachable (e.g. a contributor
// running `npm start` with no local API, or CI without a deployed
// staging backend configured), this logs a warning and leaves any
// previously-synced static/openapi.yaml in place rather than failing the
// whole build.
import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEST = `${__dirname}/../static/openapi.yaml`;
const sourceBaseUrl =
  process.env.OPENAPI_SOURCE_URL ||
  process.env.API_BASE_URL ||
  "http://localhost:3000";
const sourceUrl = `${sourceBaseUrl.replace(/\/$/, "")}/docs/openapi.json`;

try {
  const res = await fetch(sourceUrl);
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  const spec = await res.text();
  await mkdir(dirname(DEST), { recursive: true });
  await writeFile(DEST, spec);
  console.log(`Synced OpenAPI spec from ${sourceUrl} to ${DEST}`);
} catch (err) {
  console.warn(
    `Warning: could not sync OpenAPI spec from ${sourceUrl} (${err.message}). ` +
      "The API Reference and Sandbox pages will 404 until this succeeds. " +
      "Set OPENAPI_SOURCE_URL to a reachable chaoslab-backend deployment and re-run."
  );
}
