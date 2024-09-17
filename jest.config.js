// jest.config.js
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
  };
  