/**
 * MemoryOS Context Command
 * Load relevant context based on current task/topic
 */

const fs = require('fs');
const path = require('path');

function context(args, options) {
  const memoryosRoot = options.MEMORYOS_ROOT;

  // Parse arguments
  let topic = '';
  let showAll = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--all' || arg === '-a') {
      showAll = true;
    } else if (!arg.startsWith('--')) {
      topic = arg;
    }
  }

  if (!topic && !showAll) {
    console.log('Usage: memoryos context [topic] [--all]');
    console.log('\nExamples:');
    console.log('  memoryos context "project"     # Load project-related context');
    console.log('  memoryos context --all         # Show all recent context');
    return;
  }

  console.log('📚 Loading relevant context...\n');

  const contextFiles = [];

  // If specific topic, search for relevant files
  if (topic) {
    const topicLower = topic.toLowerCase();

    // Search through key folders
    const searchDirs = [
      'decisions',
      'lessons',
      'projects',
      'tasks',
      'patterns',
      'handoffs'
    ];

    for (const dir of searchDirs) {
      const dirPath = path.join(memoryosRoot, dir);
      if (!fs.existsSync(dirPath)) continue;

      const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));

      for (const file of files) {
        const filepath = path.join(dirPath, file);
        const content = fs.readFileSync(filepath, 'utf8').toLowerCase();

        if (content.includes(topicLower)) {
          contextFiles.push({
            path: filepath,
            dir: dir,
            file: file,
            relevance: content.split(topicLower).length - 1
          });
        }
      }
    }

    // Sort by relevance
    contextFiles.sort((a, b) => b.relevance - a.relevance);
  } else {
    // Show all recent files
    const searchDirs = [
      'decisions',
      'lessons',
      'projects',
      'tasks',
      'patterns',
      'handoffs',
      'inbox'
    ];

    for (const dir of searchDirs) {
      const dirPath = path.join(memoryosRoot, dir);
      if (!fs.existsSync(dirPath)) continue;

      const files = fs.readdirSync(dirPath)
        .filter(f => f.endsWith('.md'))
        .map(f => ({
          path: path.join(dirPath, f),
          dir: dir,
          file: f
        }));

      // Get file stats for sorting
      for (const f of files) {
        f.stat = fs.statSync(f.path);
      }

      contextFiles.push(...files);
    }

    // Sort by modification time (most recent first)
    contextFiles.sort((a, b) => b.stat.mtime - a.stat.mtime);
  }

  // Limit to 5 most relevant
  const displayFiles = contextFiles.slice(0, 5);

  if (displayFiles.length === 0) {
    console.log('No relevant context found.');
    console.log('Try: memoryos remember "important info" --category decisions');
    return;
  }

  console.log(`Found ${displayFiles.length} relevant file(s):\n`);

  for (const f of displayFiles) {
    const relPath = path.relative(memoryosRoot, f.path);
    const content = fs.readFileSync(f.path, 'utf8');
    const lines = content.split('\n');
    const title = lines[0].replace(/^#\s*/, '');

    console.log(`📄 ${relPath}`);
    console.log(`   ${title}`);
    console.log('');
  }

  console.log('---');
  console.log('\n💡 Tip: Use `memoryos search "<topic>"` for more detailed search');
}

module.exports = context;
