# LaunchWare's eslint-config-node

This is the default eslint configuration for LaunchWare's Node projects.

## Installation

```bash
pnpm add -D @launchware/eslint-config-node
```

## Usage

You need to add the following to your `eslint.config.js` (or equivalent) file:

```javascript
const { getConfiguration as getLaunchwareConfiguration } = require("@launchware/eslint-config-node")
const launchEslint = getLaunchwareConfiguration(__dirname) //you need to point to the directory where tsconfig.json resides

module.exports = [
  // ... other configurations,
  ...launchEslint.configs.recommended,
  {
    settings: {
      "files": ["**/*.{ts}"],
      "import/resolver": { typescript: { project: "./tsconfig.lib.json" } },
    },
  },
  {
    files: ["test/**/*.{ts}", "**/*.test.{ts}"],
    languageOptions: { parserOptions: { project: "./tsconfig.test.json" } },
  },
]
```
