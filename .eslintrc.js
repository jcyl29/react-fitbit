module.exports = {
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  globals: {
    it: true
  },
  plugins: ["react", "react-hooks", "jest", "testing-library"],
  ignorePatterns: ["public/", "build/"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: { quotes: ["error", "single"], "no-console": 2, "no-alert": 2, "no-debugger": 2  },
  parser: "babel-eslint"
};
