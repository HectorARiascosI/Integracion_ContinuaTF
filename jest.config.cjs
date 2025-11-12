/* eslint-env node */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },

  // Solo toma tests en estas 3 carpetas
  testMatch: [
    '<rootDir>/src/__tests__/Matematicas/**/*.test.ts?(x)',
    '<rootDir>/src/__tests__/CienciasNaturales/**/*.test.ts?(x)',
    '<rootDir>/src/__tests__/Arte/**/*.test.ts?(x)',
  ],

  // Cobertura: incluye carpetas de interés y excluye tipos + quizLogic.ts
  collectCoverageFrom: [
    'src/**/Matematicas/**/*.{ts,tsx}',
    'src/**/CienciasNaturales/**/*.{ts,tsx}',
    'src/**/Arte/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!<rootDir>/src/Matematicas/quizLogic.ts',
  ],

  // 🔒 Doble exclusión robusta (funciona en Windows/Linux)
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/Matematicas/quizLogic.ts',
  ],
};
