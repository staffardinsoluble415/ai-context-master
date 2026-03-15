# MemoryOS - Full Memory Operating System

> Full Memory OS for AI Assistants - Self-hosted version

An elephant never forgets.

---

## Installation

### Option 1: Direct Usage (Recommended)

```bash
# Navigate to MemoryOS folder
cd MemoryOS

# Install dependencies (optional)
npm install

# Initialize (if folders don't exist yet)
node bin/memoryos init
```

### Option 2: Global Link

```bash
cd MemoryOS
npm link

# Now you can use from anywhere:
memoryos init
memoryos wake
memoryos remember "..."
```

### Option 3: Use with Bun

```bash
cd MemoryOS
bun run bin/memoryos init
bun run bin/memoryos wake
```

---

## Commands

| Command | Description |
|---------|-------------|
| `memoryos init` | Initialize MemoryOS folder structure |
| `memoryos wake` | Recover context from last session |
| `memoryos context [topic]` | Load relevant memory for a topic |
| `memoryos remember "..."` | Save a memory |
| `memoryos capture` | Auto-extract from conversation |
| `memoryos sleep "summary"` | Save summary + checkpoint |
| `memoryos search "query"` | Search memories |
| `memoryos status` | Show MemoryOS status |

---

## Usage Examples

### Start a Session

```bash
# Wake up - recover from last session
node bin/memoryos wake

# Load context for current project
node bin/memoryos context "project"
```

### Capture Memories

```bash
# Remember a decision
node bin/memoryos remember "Chose TypeScript for type safety" --category decision --title "Tech Stack Decision"

# Capture a quick note
node bin/memoryos capture "Important insight about API design"

# Remember a lesson learned
node bin/memoryos remember "Don't use var, use const/let" --category lesson
```

### Search & Retrieve

```bash
# Search all memories
node bin/memoryos search "typescript"

# Search in specific category
node bin/memoryos search "api" --category decisions
```

### End a Session

```bash
# Sleep - save summary and create handoff
node bin/memoryos sleep "Completed user authentication" --next "Work on user profile"
```

---

## Folder Structure

```
MemoryOS/
├── decisions/           # Choices made with context
├── lessons/            # What I learned
├── projects/           # Active work
├── tasks/              # Work items
├── people/             # Relationships
├── patterns/           # Recurring behaviors
├── inbox/              # Quick capture → process later
├── backlog/            # Future work
├── goals/              # Objectives
├── commitments/        # Promises, obligations
├── handoffs/           # Session bridges
├── research/           # Deep dives
├── rules/               # Operational constraints
├── preferences/        # Likes, dislikes
├── transcripts/        # Session summaries
├── ledger/raw/         # Raw transcripts
├── ledger/observations/ # Compressed observations
├── ledger/reflections/  # Weekly reflections
└── .memoryos/          # Config & index
```

---

## Configuration

MemoryOS stores configuration in `.memoryos/config.json`:

```json
{
  "version": "1.0.0",
  "initialized": "2026-03-12T00:00:00.000Z",
  "lastSession": "2026-03-12T00:00:00.000Z"
}
```

---

## Workflow

```
1. memoryos wake              # Recover previous context
2. memoryos context "project" # Load relevant context
3. [YOUR TASK]

DURING:
- memoryos remember "..."     # Save important info
- memoryos capture           # Quick capture

END:
- memoryos sleep "summary"    # Save summary + checkpoint
```

---

## Categories for Remember

Use `--category` flag with these values:

- `decision` - Business/technical decisions
- `lesson` - Lessons learned
- `project` - Project-related info
- `task` - Task-related info
- `person` - People information
- `pattern` - Recurring patterns
- `goal` - Goals and objectives
- `commitment` - Promises and commitments
- `handoff` - Session handoffs
- `research` - Research notes
- `rule` - Rules and constraints
- `preference` - Preferences

---

*Powered by MemoryOS (Self-hosted)*
