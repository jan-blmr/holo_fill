module.exports = {
  moduleNameMapper: {
    "^three/examples/jsm/(.*)$": "<rootDir>/src/__mocks__/three.ts",
    "^three$": "<rootDir>/src/__mocks__/three.ts",
  },
  transformIgnorePatterns: ["node_modules/(?!(three)/)"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
