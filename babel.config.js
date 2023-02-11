module.exports = {
  presets: [
    ['next/babel'],
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: ['superjson-next'],
  env: {
    production: {
      plugins: [
        ['react-remove-properties', { properties: ['data-testid'] }],
        ['@babel/plugin-transform-modules-commonjs'],
      ],
    },
  },
};
