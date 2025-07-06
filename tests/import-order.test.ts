import { ESLint } from 'eslint';
import path from 'path';
import fs from 'fs';
import { getConfiguration } from '../src/index'; // Import directly from source
import { plugin as tsEslintPlugin, parser as tsParser } from 'typescript-eslint'; // For minimal config test

// Path to the root of the project to correctly resolve ESLint and its plugins.
const projectRoot = path.resolve(__dirname, '../');

const getEslintInstance = async () => {
  // Use getConfiguration from src/index.ts directly
  const launchWareConfig = getConfiguration({
    tsconfigRootDir: projectRoot,
    project: path.join(projectRoot, 'tsconfig.json'), // Provide path to the tsconfig.json
    allowDefaultProject: ['*.js', '*.mjs', '*.cjs'], // Match typical default project globs
  });

  // For debugging plugin loading: Create a minimal config
  const minimalFlatConfigForPluginTest = [
    {
      files: ["**/*.ts", "**/*.tsx"], // Ensure it applies to TS files
      plugins: {
        '@typescript-eslint': tsEslintPlugin,
      },
      languageOptions: {
        parser: tsParser,
        parserOptions: {
          project: true, // Using true will make it search for tsconfig.json relative to the file being linted
          tsconfigRootDir: projectRoot,
        },
      },
      rules: {
        '@typescript-eslint/no-unused-vars': 'error', // A simple rule from the plugin
      },
    },
     // Include the original configuration to still test import-x/order
    ...launchWareConfig.configs.recommended,
  ];


  return new ESLint({
    overrideConfigFile: true, // Use the config provided in overrideConfig
    // ESLint expects a FlatConfig[] here.
    // overrideConfig: launchWareConfig.configs.recommended, // Original
    overrideConfig: minimalFlatConfigForPluginTest, // Using the minimal config for testing plugin loading + original
    cwd: projectRoot, // Crucial for ESLint to find plugins, parsers, and configs
    ignore: false, // Ensure fixtures are linted regardless of .eslintignore
  });
};

describe('ESLint Import Order Validation', () => {
  let eslint: ESLint;

  beforeAll(async () => {
    eslint = await getEslintInstance();
  }, 10000); // Increase timeout for beforeAll if ESLint init is slow

  const fixturesDir = path.join(__dirname, 'fixtures', 'import-order');

  describe('Correct Order', () => {
    const correctDir = path.join(fixturesDir, 'correct');
    const correctFiles = fs.readdirSync(correctDir).filter(file => file.endsWith('.ts'));

    correctFiles.forEach(file => {
      test(`File with correct import order should have no 'import-x/order' errors: ${file}`, async () => {
        const filePath = path.join(correctDir, file);
        const results = await eslint.lintFiles([filePath]);
        const orderError = results[0].messages.find(m => m.ruleId === 'import-x/order');
        expect(orderError).toBeUndefined();
      });
    });
  });

  describe('Incorrect Order', () => {
    const incorrectDir = path.join(fixturesDir, 'incorrect');
    const incorrectFiles = fs.readdirSync(incorrectDir).filter(file => file.endsWith('.ts'));

    incorrectFiles.forEach(file => {
      test(`File with incorrect import order should have 'import-x/order' errors: ${file}`, async () => {
        const filePath = path.join(incorrectDir, file);
        const results = await eslint.lintFiles([filePath]);
        const orderError = results[0].messages.find(m => m.ruleId === 'import-x/order');
        expect(orderError).toBeDefined();
        expect(orderError?.ruleId).toBe('import-x/order');
      });
    });
  });
});
