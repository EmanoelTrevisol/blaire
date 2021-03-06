module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@': './src/',
          '@store': './src/store',
          '@components': './src/components',
          '@validations': './src/validations',
          '@utils': './src/utils',
          '@api': './src/api',
          '@models': './src/models',
          '@errors': './src/errors',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
