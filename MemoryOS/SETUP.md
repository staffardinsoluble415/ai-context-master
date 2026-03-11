# MemoryOS - Full Memory Operating System

> Full Memory OS for Claude Code Agent
> Setup: 2026-03-11

---

## What is MemoryOS?

MemoryOS = **Full Memory Operating System** - tự động ghi nhớ mọi conversation, quyết định, và context cho AI agent.

---

## Installation

```bash
# Already installed with Bun
bun install -g github:tobi/qmd

# Initialize MemoryOS
cd MemoryOS
memoryos init
```

---

## Commands

| Command | Description |
|---------|-------------|
| `memoryos wake` | Recover context from last session |
| `memoryos context` | Load relevant memory |
| `memoryos remember "..."` | Save a memory |
| `memoryos capture` | Auto-extract from conversation |
| `memoryos sleep` | Save summary + checkpoint |
| `memoryos search "..."` | Search memories |

---

## Workflow

```
1. memoryos wake           # Recover previous context
2. memoryos context       # Load relevant context
3. [YOUR TASK]

DURING:
- memoryos remember "Key decision X"
- memoryos capture        # Auto-extract

END:
- memoryos sleep          # Summary
```

---

## Folder Structure

```
MemoryOS/
├── decisions/     # Quyết định
├── lessons/       # Bài học
├── projects/      # Trạng thái project
├── tasks/        # Task lifecycle
├── people/        # Thông tin người
├── patterns/      # Pattern lặp lại
├── ledger/        # Quan sát & phản ánh
└── .memoryos/    # Index
```

---

## Usage with Memory Stack

- MemoryOS complements Memory Stack
- Memory Stack: Static knowledge (identity, rules)
- MemoryOS: Dynamic memory (conversations, decisions)
- Use both for full memory coverage!
