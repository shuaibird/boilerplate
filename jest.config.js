module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '__tests__/*',
  moduleDirectories: ['node_modules', '<rootDir>'],
  setupFilesAfterEnv: ['./__tests__/jest.setup.ts'],
  testPathIgnorePatterns: ['./__tests__/jest.setup.ts'],
};
