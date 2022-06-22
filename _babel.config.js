module.exports = {
  presets: [
    [
      'next/babel',
      {
        'transform-runtime': { loose: true },
        'styled-jsx': {},
        'class-properties': { loose: true },
        'preset-env': {
          modules: 'auto', // false turns off code splitting
          loose: true,
        },
        'preset-react': {
          loose: true,
        },
      },
    ],
    '@babel/preset-flow',
  ],
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
    [
      '@babel/plugin-proposal-object-rest-spread',
      { useBuiltIns: true, loose: true },
    ],
  ],
}
