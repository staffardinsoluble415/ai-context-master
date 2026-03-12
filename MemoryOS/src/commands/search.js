/**
 * MemoryOS Search Command
 * Search through all memories
 */

const fs = require('fs');
const path = require('path');

function search(args, options) {
  const memoryosRoot = options.MEMORYOS_ROOT;

  // Parse arguments
  let query = '';
  let limit = 10;
  let category = '';

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--limit' || arg === '-l') {
      limit = parseInt(args[++i]) || 10;
    } else if (arg === '--category' || arg === '-c') {
      category = args[++i] || '';
    } else if (!arg.startsWith('--')) {
      query = arg;
    }
  }

  // Also join remaining args as query
  if (!query && args.length > 0) {
    query = args.join(' ');
  }

  if (!query) {
    console.log('Usage: memoryos search "query" [--category <folder>] [--limit <number>]');
    console.log('\nExample: memoryos search "typescript" --limit 5');
    return;
  }

  console.log(`🔍 Searching for: "${query}"`);
  if (category) console.log(`   Category: ${category}`);
  console.log('');

  const searchDirs = category
    ? [path.join(memoryosRoot, category)]
    : [
        path.join(memoryosRoot, 'decisions'),
        path.join(memoryosRoot, 'lessons'),
        path.join(memoryosRoot, 'projects'),
        path.join(memoryosRoot, 'tasks'),
        path.join(memoryosRoot, 'people'),
        path.join(memoryosRoot, 'patterns'),
        path.join(memoryosRoot, 'inbox'),
        path.join(memoryosRoot, 'transcripts'),
        path.join(memoryosRoot, 'ledger', 'raw'),
        path.join(memoryosRoot, 'handoffs')
      ];

  const results = [];

  for (const dir of searchDirs) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

    for (const file of files) {
      const filepath = path.join(dir, file);
      const content = fs.readFileSync(filepath, 'utf8').toLowerCase();
      const queryLower = query.toLowerCase();

      if (content.includes(queryLower)) {
        const relPath = path.relative(memoryosRoot, filepath);
        const lines = content.split('\n');
        const title = lines[0].replace(/^#\s*/, '');

        // Find matching snippet
        let snippet = '';
        for (const line of lines) {
          if (line.toLowerCase().includes(queryLower)) {
            snippet = line.trim();
            break;
          }
        }

        results.push({
          file: relPath,
          title: title,
          snippet: snippet || content.slice(0, 100)
        });
      }
    }
  }

  // Sort by recency
  results.sort((a, b) => {
    const statA = fs.statSync(path.join(memoryosRoot, a.file));
    const statB = fs.statSync(path.join(memoryosRoot, b.file));
    return statB.mtime - statA.mtime;
  });

  // Limit results
  const limitedResults = results.slice(0, limit);

  if (limitedResults.length === 0) {
    console.log('No results found.');
    return;
  }

  console.log(`Found ${results.length} result(s). Showing ${limitedResults.length}:\n`);

  for (const result of limitedResults) {
    console.log(`📄 ${result.file}`);
    console.log(`   Title: ${result.title}`);
    console.log(`   Match: ${result.snippet.slice(0, 80)}...`);
    console.log('');
  }
}

module.exports = search;
