module.exports = {
  projects: [
    '<rootDir>/packages/datastore/jest.config.js',
    '<rootDir>/packages/structures/jest.config.js',
  ],
  transform: {
    '^.+\\.jsx?$': require.resolve('babel-jest'),
  },
};
