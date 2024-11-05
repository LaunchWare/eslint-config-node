import { getConfiguration as getLaunchwareConfiguration } from "./dist/esm/eslint-config-node.js"

const launchEslint = getLaunchwareConfiguration({
  tsconfigRootDir: import.meta.dirname,
  allowDefaultProject: ["*.mjs"],
})

export default [
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  ...launchEslint.configs.recommended,
  {
    ignores: ["dist/**/*"],
  },
]
