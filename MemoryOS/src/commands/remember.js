/**
 * MemoryOS Remember Command
 * Save a memory to the appropriate category
 */

const fs = require('fs');
const path = require('path');

const CATEGORIES = {
  decision: 'decisions',
  lesson: 'lessons',
  project: 'projects',
  task: 'tasks',
  person: 'people',
  pattern: 'patterns',
  goal: 'goals',
  commitment: 'commitments',
  handoff: 'handoffs',
  research: 'research',
  rule: 'rules',
  preference: 'preferences'
};

function remember(args, options) {
  const memoryosRoot = options.MEMORYOS_ROOT;
  const configPath = path.join(memoryosRoot, '.memoryos', 'config.json');

  // Parse arguments
  let category = 'inbox';
  let content = '';
  let title = '';

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--category' || arg === '-c') {
      category = args[++i] || 'inbox';
    } else if (arg === '--title' || arg === '-t') {
      title = args[++i] || '';
    } else if (!arg.startsWith('--')) {
      content = arg;
    }
  }

  // If no content provided via args, try reading from stdin
  if (!content && !title) {
    console.log('Usage: memoryos remember "content" [--category <type>] [--title "Title"]');
    console.log('\nCategories:', Object.keys(CATEGORIES).join(', '));
    return;
  }

  // Map category to folder
  const folder = CATEGORIES[category] || 'inbox';

  // Generate filename from title or content
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const safeTitle = title
    ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    : content.slice(0, 30).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const filename = `${timestamp}-${safeTitle}.md`;
  const filepath = path.join(memoryosRoot, folder, filename);

  // Build content
  const markdown = `# ${title || content.slice(0, 50)}
${title ? '\n' + content + '\n' : ''}
---
- Category: ${category}
- Created: ${new Date().toISOString()}
- Tags: []
`;

  fs.writeFileSync(filepath, markdown);

  console.log(`✅ Saved to ${folder}/${filename}`);
  console.log(`\nPath: ${filepath}`);
}

module.exports = remember;
