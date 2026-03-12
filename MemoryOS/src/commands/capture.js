/**
 * MemoryOS Capture Command
 * Auto-extract and save important information from conversation
 */

const fs = require('fs');
const path = require('path');

function capture(args, options) {
  const memoryosRoot = options.MEMORYOS_ROOT;

  // Check for piped input or arguments
  let content = '';
  if (!process.stdin.isTTY) {
    // Read from stdin (piped input)
    process.stdin.setEncoding('utf8');
    let stdinData = '';
    process.stdin.on('data', chunk => stdinData += chunk);
    process.stdin.on('end', () => {
      saveCapture(stdinData, memoryosRoot);
    });
  } else if (args.length > 0) {
    // Read from command line argument
    content = args.join(' ');
    saveCapture(content, memoryosRoot);
  } else {
    console.log('Usage: memoryos capture "message to capture"');
    console.log('   or: echo "message" | memoryos capture');
    console.log('\nCapture extracts important information from the conversation.');
    console.log('It will be saved to inbox for later review.');
  }
}

function saveCapture(content, memoryosRoot) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const filename = `${timestamp}-capture.md`;
  const filepath = path.join(memoryosRoot, 'inbox', filename);

  const markdown = `# Capture

${content}

---
- Captured: ${new Date().toISOString()}
- Type: auto-capture
`;

  fs.writeFileSync(filepath, markdown);

  console.log(`✅ Captured to inbox/${filename}`);
  console.log(`\nContent: ${content.slice(0, 100)}${content.length > 100 ? '...' : ''}`);
}

module.exports = capture;
