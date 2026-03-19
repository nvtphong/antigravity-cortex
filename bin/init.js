#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// --- Config ----------------------------------------
const PACKAGE_NAME = 'antigravity-cortex';
const AGENTS_DIR = '.agents';
const LOGO = `
  +======================================+
  ||    🧠  Antigravity Cortex  v1.0.0    ||
  +======================================+
`;

// --- Colors (no dependencies) ----------------------
const color = {
  green: (t) => `\x1b[32m${t}\x1b[0m`,
  red: (t) => `\x1b[31m${t}\x1b[0m`,
  yellow: (t) => `\x1b[33m${t}\x1b[0m`,
  cyan: (t) => `\x1b[36m${t}\x1b[0m`,
  dim: (t) => `\x1b[2m${t}\x1b[0m`,
  bold: (t) => `\x1b[1m${t}\x1b[0m`,
};

// --- Helpers ---------------------------------------
function copyDirRecursive(src, dest) {
  let count = 0;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      count += copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      count++;
    }
  }
  return count;
}

// --- Main ------------------------------------------
function main() {
  console.log(color.cyan(LOGO));

  const targetDir = process.cwd();
  const targetAgents = path.join(targetDir, AGENTS_DIR);

  // Check if .agents already exists
  if (fs.existsSync(targetAgents)) {
    console.log(color.yellow('[!]  .agents/ directory already exists in this project.'));
    console.log(color.dim('   Use --force to overwrite.\n'));

    if (!process.argv.includes('--force')) {
      console.log(color.dim('   Run: npx antigravity-cortex --force'));
      process.exit(1);
    }

    console.log(color.yellow('   --force detected. Overwriting...\n'));
  }

  // Find source .agents directory
  const packageRoot = path.resolve(__dirname, '..');
  const sourceAgents = path.join(packageRoot, AGENTS_DIR);

  if (!fs.existsSync(sourceAgents)) {
    console.log(color.red('[X]  Could not find .agents/ in package. Installation may be corrupt.'));
    process.exit(1);
  }

  // Copy
  const fileCount = copyDirRecursive(sourceAgents, targetAgents);

  // Summary
  console.log(color.green(`[x]  Installed ${fileCount} files into .agents/\n`));

  console.log('  ' + color.bold('What was installed:'));
  console.log('  +-- rules/       ' + color.dim('-- 9 behavioral constraints (always active)'));
  console.log('  +-- workflows/   ' + color.dim('-- 14 slash commands (/cook, /debug, /plan...)'));
  console.log('  +-- skills/      ' + color.dim('-- 18 domain knowledge references'));
  console.log('  +-- CHANGELOG.md');

  console.log('\n  ' + color.bold('Quick start:'));
  console.log('  ' + color.cyan('/cook [task]') + '     -- Implement a feature');
  console.log('  ' + color.cyan('/debug [issue]') + '   -- Debug a problem');
  console.log('  ' + color.cyan('/plan [task]') + '     -- Plan before coding');
  console.log('  ' + color.cyan('/review') + '          -- Review your code');

  console.log('\n  ' + color.dim('Full docs: https://github.com/nvtphong/antigravity-cortex'));
  console.log();
}

main();
