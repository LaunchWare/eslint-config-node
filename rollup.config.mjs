import copy from "rollup-plugin-copy"
import typescript from "@rollup/plugin-typescript"

import { writeFile, mkdir } from "fs/promises"

function createCommonJsPackage() {
  const pkg = { type: "commonjs" }
  return {
    buildEnd: async () => {
      await mkdir("./dist/cjs", { recursive: true })
      await writeFile("./dist/cjs/package.json", JSON.stringify(pkg, null, 2))
    },
  }
}

export default [
  {
    input: "./src/index.ts",
    plugins: [
      typescript(),
      copy({
        targets: [{ src: "./package.json", dest: "dist" }],
      }),
      createCommonJsPackage(),
    ],
    output: [
      { format: "es", file: "./dist/esm/eslint-config-node.js" },
      { format: "cjs", file: "./dist/cjs/eslint-config-node.js" },
    ],
  },
]
