/**
 * MemoryOS Sleep Command
 * Save summary + checkpoint and end session
 */

const fs = require('fs');
const path = require('path');

function sleep(args, options) {
  const memoryosRoot = options.MEMORYOS_ROOT;
  const configPath = path.join(memoryosRoot, '.memoryos', 'config.json');

  // Parse arguments
  let summary = '';
  let nextTask = '';
  let workingOn = '';

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--next' || arg === '-n') {
      nextTask = args[++i] || '';
    } else if (arg === '--working-on' || arg === '-w') {
      workingOn = args[++i] || '';
    } else if (!arg.startsWith('--')) {
      summary = arg;
    }
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const dateStr = new Date().toISOString().slice(0, 10);

  // Create session transcript
  const transcriptContent = `# Session Transcript - ${dateStr}

## Summary
${summary || 'No summary provided'}

## Next Task
${nextTask || 'Not specified'}

${workingOn ? `## Working On\n${workingOn}` : ''}

---
- Session ended: ${new Date().toISOString()}
`;

  const transcriptPath = path.join(memoryosRoot, 'transcripts', `${timestamp}-session.md`);
  fs.writeFileSync(transcriptPath, transcriptContent);
  console.log(`✅ Saved transcript: transcripts/${path.basename(transcriptPath)}`);

  // Create handoff for next session
  if (nextTask) {
    const handoffContent = `# Handoff - ${dateStr}

## What was done
${summary || 'See transcript'}

## What comes next
${nextTask}

${workingOn ? `## Currently working on\n${workingOn}` : ''}

---
- Created: ${new Date().toISOString()}
`;

    const handoffPath = path.join(memoryosRoot, 'handoffs', `${timestamp}-handoff.md`);
    fs.writeFileSync(handoffPath, handoffContent);
    console.log(`✅ Created handoff: handoffs/${path.basename(handoffPath)}`);
  }

  // Create checkpoint in ledger/raw
  const checkpointContent = `# Checkpoint - ${dateStr}

## Status
${workingOn ? `Working on: ${workingOn}` : 'No active task'}

## Summary
${summary || 'No summary'}

## Next
${nextTask || 'Not specified'}

---
- Checkpoint created: ${new Date().toISOString()}
`;

  const checkpointPath = path.join(memoryosRoot, 'ledger', 'raw', `${timestamp}-checkpoint.md`);
  fs.writeFileSync(checkpointPath, checkpointContent);
  console.log(`✅ Created checkpoint: ledger/raw/${path.basename(checkpointPath)}`);

  // Update config
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    config.lastSession = new Date().toISOString();
    config.lastSummary = summary;
    config.lastNextTask = nextTask;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  }

  console.log('\n💤 MemoryOS going to sleep...');
  console.log('See you next time!');
}

module.exports = sleep;
