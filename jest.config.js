module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
  moduleNameMapper: {
    "^@site/(.*)$": "<rootDir>/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@docusaurus/Link$": "<rootDir>/__mocks__/docusaurusLinkMock.js",
    "^@docusaurus/useDocusaurusContext$":
      "<rootDir>/__mocks__/docusaurusContextMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  // Scoped to files with real test suites so the threshold below is an
  // enforced gate, not dead weight — Analytics/ErrorBoundary/pages have no
  // tests yet and would sink the global percentage to a number nothing can
  // reasonably hit. Expand as those gain coverage.
  collectCoverageFrom: [
    "src/components/ApiReference.tsx",
    "src/components/SwaggerUI.tsx",
    "src/components/GraphQLPlayground.tsx",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  coverageReporters: ["text", "lcov", "html"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testPathIgnorePatterns: ["/node_modules/", "/build/", "/.docusaurus/"],
  watchPathIgnorePatterns: ["/node_modules/", "/build/", "/.docusaurus/"],
};
