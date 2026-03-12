#!/usr/bin/env node

/**
 * MemoryOS CLI Entry Point
 * Run with: node bin/memoryos <command> [args]
 */

const path = require('path');
const fs = require('fs');

// Get the directory where MemoryOS is installed
const MEMORYOS_ROOT = path.dirname(__dirname);

// Import commands
const commands = {
  init: require('./commands/init'),
  wake: require('./commands/wake'),
  remember: require('./commands/remember'),
  capture: require('./commands/capture'),
  sleep: require('./commands/sleep'),
  search: require('./commands/search'),
  context: require('./commands/context'),
  status: require('./commands/status')
};

function printHelp() {
  console.log(`
MemoryOS - Full Memory Operating System

Usage: memoryos <command> [options]

Commands:
  init              Initialize MemoryOS in current directory
  wake              Recover context from last session
  remember "..."    Save a memory
  capture           Auto-extract from conversation
  sleep             Save summary + checkpoint
  search "..."      Search memories
  context           Load relevant memory
  status            Show MemoryOS status

Examples:
  memoryos init
  memoryos remember "Important decision: Use TypeScript"
  memoryos capture
  memoryos search "project setup"

For more info, see: https://github.com/tobi/qmd
`.trim());
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    printHelp();
    process.exit(0);
  }

  if (command === '--help' || command === '-h') {
    printHelp();
    process.exit(0);
  }

  if (!commands[command]) {
    console.error(`Error: Unknown command '${command}'`);
    console.log(`Run 'memoryos --help' for usage information.`);
    process.exit(1);
  }

  try {
    commands[command](args.slice(1), { MEMORYOS_ROOT });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
