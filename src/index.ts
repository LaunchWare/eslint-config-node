import path from "node:path"

import eslint from "@eslint/js"
import tsParser from "@typescript-eslint/parser"
import tsEslintUtils from "@typescript-eslint/utils"
import eslintPluginImportX from "eslint-plugin-import-x"
import tsEslint, { configs as tsEslintConfigs } from "typescript-eslint"

// eslint-disable-next-line no-restricted-imports
import packageJson from "../package.json"

const typeScriptFileGlobs = ["**/*.ts", "**/*.tsx"]

type ConfigurationOutput = {
  meta: {
    name: string
    version: string
  }
  configs: {
    recommended: tsEslintUtils.TSESLint.FlatConfig.ConfigArray
  }
}
export const getConfiguration = ({
  tsconfigRootDir,
  project,
  allowDefaultProject,
}: {
  tsconfigRootDir: string
  project: string | boolean | string[] | null | undefined
  allowDefaultProject: string[] | undefined
}): ConfigurationOutput => {
  const flatConfig = tsEslint.config(
    eslint.configs.recommended,
    ...tsEslintConfigs.strictTypeChecked,
    eslintPluginImportX.flatConfigs.recommended,
    eslintPluginImportX.flatConfigs.typescript,
    {
      name: "LaunchWare Rules",
      extends: [],
      languageOptions: {
        parser: tsParser,
        parserOptions: {
          tsconfigRootDir: path.resolve(tsconfigRootDir),
          project,
          projectService: {
            allowDefaultProject,
          },
          ecmaVersion: "latest",
        },
        ecmaVersion: "latest",
      },
      rules: {
        "quote-props": 0,
        "object-curly-spacing": 0,
        "arrow-parens": 0,
        "new-cap": 0,
        "require-jsdoc": 0,
        "no-console": 2,
        "no-multiple-empty-lines": ["error", { max: 1 }],
      },
    },
    {
      files: typeScriptFileGlobs,
      rules: {
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-unused-vars": ["error"],
        "no-restricted-imports": [
          "error",
          {
            patterns: ["**/../*"],
          },
        ],
        "import-x/no-default-export": "error",
        "import-x/order": [
          "error",
          {
            groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
            pathGroups: [
              {
                pattern: "@/**",
                group: "internal",
                position: "after",
              },
            ],
            pathGroupsExcludedImportTypes: ["builtin"],
            "newlines-between": "always",
            alphabetize: { order: "asc", caseInsensitive: true },
          },
        ],
      },
    },
    {
      files: ["**/*.test.ts"],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            patterns: ["**/../../*"],
          },
        ],
      },
    },
    {
      files: ["**/*.js"],
      extends: [tsEslintConfigs.disableTypeChecked],
    },
  )

  const config = {
    meta: {
      name: "@launchware/eslint-config-node",
      version: packageJson.version,
    },
    configs: {
      recommended: flatConfig,
    },
  }

  return config
}
