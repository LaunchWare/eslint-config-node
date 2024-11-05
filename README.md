# LaunchWare's eslint-config-node

This is the default eslint configuration for LaunchWare's Node projects.

It works exclusively with TypeScript projects.

## Installation

```bash
pnpm add -D @launchware/eslint-config-node
```

## Usage

You need to add the following to your `eslint.config.js` (or equivalent) file:

```javascript
const { getConfiguration as getLaunchwareConfiguration } = require("@launchware/eslint-config-node")

// you need to point to the directory where tsconfig.json resides when you call `getLaunchwareConfiguration`
const launchEslint = getLaunchwareConfiguration({tsconfigRootDir: __dirname})

module.exports = [
  // ... other configurations,
  ...launchEslint.configs.recommended,
]
```
