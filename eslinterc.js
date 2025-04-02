module.exports = {
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:import/errors', 'plugin:import/warnings'],
    plugins: ['react', 'import'],
    rules: {
      'import/no-unresolved': 'error',
    },
  };
  