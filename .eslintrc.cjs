module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["/dist/**/*", ".eslintrc.cjs"],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "quote-props": 0,
    "object-curly-spacing": 0,
    "arrow-parens": 0,
    "new-cap": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-unused-vars": ["error"],
    "require-jsdoc": 0,
    "no-console": 2,
    "no-multiple-empty-lines": ["error", { max: 1 }],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: {},
    },
  },
};
