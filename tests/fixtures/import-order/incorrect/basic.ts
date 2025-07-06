// Incorrect order: External before built-in
import { ESLint } from 'eslint';
import fs from 'fs';

// Incorrect order: Sibling before parent
import { siblingModule } from './siblingModule';
// Parent
import { parentModule } from '../parentModule';

// Internal mixed with external
import path from 'path';
// import { someUtil } from '~/utils'; // Assuming internal
import * as ESTree from 'estree';

// Index before sibling
import { indexModule } from '.';

// Type import not grouped
import type { MyType } from './my-types';


console.log(fs, path, ESLint, ESTree, parentModule, siblingModule, indexModule, MyType);
