// jest.setup.js applies @testing-library/jest-dom's matchers at runtime,
// but that file sits outside tsconfig.json's `include` (root, not src), so
// tsc never picked up its global Jest.Matchers augmentation. Importing it
// here — inside `src` — pulls the ambient types into the compiled graph.
import "@testing-library/jest-dom";
