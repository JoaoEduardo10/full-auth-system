/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  bail: 1,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/server/repositories/**/*.ts",
    "src/server/controllers/**/*.ts",
    "src/server/middlewares/user-auth/*.ts",
    "src/server/usecase/user-authentication/*.ts",
  ],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "/protocols.ts"],
  coverageProvider: "v8",
  coverageReporters: ["text", "lcov", "clover"],
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: false,
            decorators: true,
          },
          target: "es2017",
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
        module: {
          type: "es6",
          noInterop: false,
        },
      },
    ],
  },
};
