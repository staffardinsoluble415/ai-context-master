/**
 * MemoryOS Init Command
 * Initialize MemoryOS in the current directory
 */

const fs = require('fs');
const path = require('path');

const DEFAULT_FOLDERS = [
  'decisions',
  'lessons',
  'projects',
  'tasks',
  'people',
  'patterns',
  'ledger/raw',
  'ledger/observations',
  'ledger/reflections',
  'inbox',
  'backlog',
  'goals',
  'commitments',
  'handoffs',
  'research',
  'agents',
  'rules',
  'preferences',
  'transcripts',
  '.memoryos'
];

const WELCOME_CONTENT = `# Welcome to MemoryOS

An elephant never forgets.

## Quick Start

\`\`\`bash
# Capture a thought
memoryos capture "important insight about X"

# Store structured memory
memoryos remember "Key decision: We chose X because..."

# Search
memoryos search "query"

# Session lifecycle
memoryos sleep "what I did" --next "what's next"
memoryos wake
\`\`\`

## Folder Structure

- \`decisions/\` - Choices made with context and reasoning
- \`lessons/\` - What I learned, insights, patterns
- \`projects/\` - Active work, ongoing efforts
- \`tasks/\` - Active work items
- \`people/\` - Relationships, one file per person
- \`patterns/\` - Recurring behaviors
- \`ledger/\` - Session transcripts and observations
- \`inbox/\` - Quick capture → process later
- \`backlog/\` - Future work
- \`goals/\` - Long-term and short-term objectives
- \`commitments/\` - Promises and obligations
- \`handoffs/\` - Session bridges
- \`research/\` - Deep dives and reference material
- \`rules/\` - Operational constraints and guardrails
- \`preferences/\` - Likes, dislikes
- \`transcripts/\` - Session summaries
- \`.memoryos/\` - Index and metadata

---
*Powered by MemoryOS*
`;

function init(args, options) {
  const targetDir = args[0] || process.cwd();

  console.log(`Initializing MemoryOS in: ${targetDir}`);

  // Create folder structure
  for (const folder of DEFAULT_FOLDERS) {
    const folderPath = path.join(targetDir, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Created: ${folder}/`);
    }
  }

  // Create welcome file
  const welcomePath = path.join(targetDir, 'README.md');
  if (!fs.existsSync(welcomePath)) {
    fs.writeFileSync(welcomePath, WELCOME_CONTENT);
    console.log('Created: README.md');
  }

  // Create .memoryos config
  const configPath = path.join(targetDir, '.memoryos', 'config.json');
  const config = {
    version: '1.0.0',
    initialized: new Date().toISOString(),
    lastSession: null
  };
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log('Created: .memoryos/config.json');

  console.log('\n✅ MemoryOS initialized successfully!');
  console.log('\nNext steps:');
  console.log('  1. cd ' + targetDir);
  console.log('  2. npm install or bun install');
  console.log('  3. node bin/memoryos wake   # Start a session');
}

module.exports = init;
