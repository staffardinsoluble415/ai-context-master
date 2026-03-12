/**
 * MemoryOS Wake Command
 * Recover context from last session
 */

const fs = require('fs');
const path = require('path');

function wake(args, options) {
  const memoryosRoot = options.MEMORYOS_ROOT;
  const configPath = path.join(memoryosRoot, '.memoryos', 'config.json');

  // Check if MemoryOS is initialized
  if (!fs.existsSync(configPath)) {
    console.log('MemoryOS not initialized. Run: memoryos init');
    return;
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  console.log('🧠 Waking up MemoryOS...\n');

  // Load last session info
  if (config.lastSession) {
    console.log('Last session:', config.lastSession);
  }

  // Show recent handoffs
  const handoffsPath = path.join(memoryosRoot, 'handoffs');
  if (fs.existsSync(handoffsPath)) {
    const files = fs.readdirSync(handoffsPath)
      .filter(f => f.endsWith('.md'))
      .sort((a, b) => {
        const statA = fs.statSync(path.join(handoffsPath, a));
        const statB = fs.statSync(path.join(handoffsPath, b));
        return statB.mtime - statA.mtime;
      })
      .slice(0, 3);

    if (files.length > 0) {
      console.log('\n📋 Recent handoffs:');
      for (const file of files) {
        const content = fs.readFileSync(path.join(handoffsPath, file), 'utf8');
        const title = content.split('\n')[0].replace(/^#\s*/, '');
        console.log(`  - ${file.replace('.md', '')}: ${title}`);
      }
    }
  }

  // Show pending inbox
  const inboxPath = path.join(memoryosRoot, 'inbox');
  if (fs.existsSync(inboxPath)) {
    const files = fs.readdirSync(inboxPath)
      .filter(f => f.endsWith('.md'))
      .sort((a, b) => {
        const statA = fs.statSync(path.join(inboxPath, a));
        const statB = fs.statSync(path.join(inboxPath, b));
        return statB.mtime - statA.mtime;
      });

    if (files.length > 0) {
      console.log('\n📥 Inbox items:', files.length);
      for (const file of files.slice(0, 5)) {
        console.log(`  - ${file}`);
      }
    }
  }

  // Update last session
  config.lastSession = new Date().toISOString();
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  console.log('\n✅ Ready to work!');
}

module.exports = wake;
