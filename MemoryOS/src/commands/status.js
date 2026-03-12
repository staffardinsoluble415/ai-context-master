/**
 * MemoryOS Status Command
 * Show MemoryOS status and statistics
 */

const fs = require('fs');
const path = require('path');

function status(args, options) {
  const memoryosRoot = options.MEMORYOS_ROOT;
  const configPath = path.join(memoryosRoot, '.memoryos', 'config.json');

  // Check if MemoryOS is initialized
  if (!fs.existsSync(configPath)) {
    console.log('MemoryOS not initialized. Run: memoryos init');
    return;
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  console.log('╔══════════════════════════════════════╗');
  console.log('║         MemoryOS Status             ║');
  console.log('╚══════════════════════════════════════╝\n');

  // Version info
  console.log(`📦 Version: ${config.version || '1.0.0'}`);
  console.log(`📅 Initialized: ${config.initialized ? new Date(config.initialized).toLocaleDateString() : 'Unknown'}`);

  if (config.lastSession) {
    console.log(`💤 Last session: ${new Date(config.lastSession).toLocaleString()}`);
  }

  console.log('');

  // Count files in each folder
  const folders = [
    'decisions',
    'lessons',
    'projects',
    'tasks',
    'people',
    'patterns',
    'inbox',
    'backlog',
    'goals',
    'commitments',
    'handoffs',
    'research',
    'rules',
    'preferences',
    'transcripts',
    'ledger/raw',
    'ledger/observations',
    'ledger/reflections'
  ];

  console.log('📊 Statistics:\n');

  let totalFiles = 0;
  for (const folder of folders) {
    const folderPath = path.join(memoryosRoot, folder);
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.md'));
      const count = files.length;
      totalFiles += count;
      if (count > 0) {
        console.log(`   ${folder.padEnd(20)}: ${count}`);
      }
    }
  }

  console.log(`\n   ${'Total'.padEnd(20)}: ${totalFiles} memories`);

  // Show recent activity
  console.log('\n� recent Activity:\n');

  // Check inbox
  const inboxPath = path.join(memoryosRoot, 'inbox');
  if (fs.existsSync(inboxPath)) {
    const inboxFiles = fs.readdirSync(inboxPath).filter(f => f.endsWith('.md'));
    if (inboxFiles.length > 0) {
      console.log(`   📥 Inbox: ${inboxFiles.length} item(s) pending`);
    }
  }

  // Check handoffs
  const handoffsPath = path.join(memoryosRoot, 'handoffs');
  if (fs.existsSync(handoffsPath)) {
    const handoffFiles = fs.readdirSync(handoffsPath).filter(f => f.endsWith('.md'));
    if (handoffFiles.length > 0) {
      console.log(`   📋 Handoffs: ${handoffFiles.length} pending`);
    }
  }

  // Check last summary
  if (config.lastSummary) {
    console.log(`\n📝 Last summary: "${config.lastSummary.slice(0, 50)}..."`);
  }

  console.log('\n✅ MemoryOS is running!');
}

module.exports = status;
