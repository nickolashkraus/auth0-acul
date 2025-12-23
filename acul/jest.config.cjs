module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@auth0/auth0-acul-js/(.*)$":
      "<rootDir>/node_modules/@auth0/auth0-acul-js/dist/screens/$1/index.js",
  },
  // Allow transforming ESM modules from node_modules.
  transformIgnorePatterns: [
    "/node_modules/(?!(@auth0/auth0-acul-react|@auth0/auth0-acul-js|friendly-challenge)/)",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
};
