import tsEslint from "typescript-eslint"
import eslint from "@eslint/js"
import { flatConfigs as importConfigs } from "eslint-plugin-import"

const typeScriptFileGlobs = ["**/*.ts", "**/*.tsx"]

const flatConfig = tsEslint.config({
  files: typeScriptFileGlobs,
  extends: [
    eslint.configs.recommended,
    ...tsEslint.configs.strictTypeChecked,
    importConfigs.recommended,
  ],
  languageOptions: {
    parser: tsEslint.parser,
    ecmaVersion: "latest",
    parserOptions: {
      projectService: true,
    },
  },
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
})

const config = {
  meta: {
    name: "@launchware/eslint-config-node",
    version: "0.1.0",
  },
  configs: {
    recommended: flatConfig,
  },
}

export default config
