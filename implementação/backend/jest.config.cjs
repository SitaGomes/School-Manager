// jest.config.cjs
/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],
};

module.exports = config;
