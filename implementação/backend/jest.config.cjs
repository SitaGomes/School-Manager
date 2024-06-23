/** @type {import('ts-jest').InitialOptionsTsJest} */
const config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', 
    '!src/**/*.d.ts', 
    '!src/**/index.ts', 
  ],
  coverageDirectory: 'coverage',
};

module.exports = config;
