module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        extensions: [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json"
        ],
        alias: {
          assets: "./src/assets",
          components: "./src/components",
          config: "./src/config",
          screens: "./src/screens",
          constants: "./src/constants",
          navigation: "./src/navigation",
          store: "./src/store",
          themes: "./src/themes",
          translations: "./src/translations",
          utils: "./src/utils"
        }
      }
    ]
  ]
};
