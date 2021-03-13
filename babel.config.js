module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '#components': './app/components',
          '#hooks': './app/hooks',
          '#screens': './app/screens',
          '#contexts': './app/contexts',
          '#navigation': './app/navigation',
          '#theme': './app/theme',
          '#assets': './app/assets',
          '#utils': './app/utils',
        },
      },
    ],
  ],
};
