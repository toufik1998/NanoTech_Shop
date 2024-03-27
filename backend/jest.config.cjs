module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/__tests__/**/*.spec.js',
  ],
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**',
  ],
  coverageReporters: [
    'html',
    'text-summary',
  ],
};