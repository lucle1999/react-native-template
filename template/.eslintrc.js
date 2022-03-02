module.exports = {
    root: true,
    extends: "@react-native-community",
    rules: {
      "comma-dangle": ["error", "never"],
      quotes: [2, "double", { avoidEscape: true }],
      "no-undef": 2,
      "no-bitwise": 0,
      "no-control-regex": 0,
      "react-hooks/exhaustive-deps": 0,
      "react-native/no-inline-styles": 2
    },
    parser: "babel-eslint",
    parserOptions: {
      ecmaVersion: 6,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
        modules: true,
        experimentalObjectRestSpread: true
      }
    }
  };
  