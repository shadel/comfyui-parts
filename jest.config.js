module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node', // Default to Node environment
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/src/index.browser.test.ts'],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json'
      }
    },
    setupFiles: ['<rootDir>/jest.setup.js'], // To handle global setup for browser mocks
    testEnvironmentOptions: {
      resources: 'usable',
    },
  };
  