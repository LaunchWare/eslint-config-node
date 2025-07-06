// Built-in
import fs from 'fs';
import path from 'path';

// External
import { ESLint } from 'eslint';
import * as ESTree from 'estree';

// Internal (assuming no path alias for now, will be treated as external if not configured)
// For testing internal, we might need to adjust ESLint settings or use a placeholder like '~/utils'
// import { someUtil } from '~/utils';

// Parent
import { parentModule } from '../parentModule';

// Sibling
// './my-types' comes before './siblingModule' alphabetically
import type { MyType } from './my-types'; // Type import, treated as sibling
import { siblingModule } from './siblingModule';

// Index
import { indexModule } from '.';

console.log(fs, path, ESLint, ESTree, parentModule, siblingModule, indexModule, MyType);

// Mock placeholder files for these imports to exist, actual content doesn't matter for order.
// Will create these as empty files if they cause resolution issues during linting,
// but for now, focusing on the import statements themselves.
