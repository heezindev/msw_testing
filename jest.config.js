/** @type {import('jest').Config} */
const config = {
  setupFiles: ["./jest.polyfills.js"],
  setupFilesAfterEnv: ["./src/setupTests.js"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

module.exports = config;
