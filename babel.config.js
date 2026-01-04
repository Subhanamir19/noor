module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
          },
        },
      ],
      // IMPORTANT: react-native-reanimated/plugin must be listed LAST
      'react-native-reanimated/plugin',
    ],
  };
};
