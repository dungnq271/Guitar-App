export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  maxWorkers: 1,
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.test.ts?$': 'ts-jest'
  },
  globalSetup: './src/test/jest-setup/jest-setup.ts',
  globalTeardown: './src/test/jest-setup/jest-teardown.ts',
  testPathIgnorePatterns: ['/e2e/', '/node_modules/', '/dist/']
};
