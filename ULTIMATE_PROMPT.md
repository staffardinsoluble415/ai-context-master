# 🚀 ULTIMATE AGENT FACTORY PROMPT

> Copy-paste vào Claude Code để kích hoạt full agent factory
> Last Updated: 2026-03-11

---

## PROMPT TEMPLATE

```
🚀 FULLSTACK CRYPTO AGENT FACTORY ACTIVATED 🚀

1. LOAD MEMORY OS
   ─────────────────
   memoryos wake --profile crypto
   @SOUL.md → Identity & constraints
   @USER.md → User preferences
   @MEMORY.md → Project knowledge

2. DETERMINE SUBAGENTS
   ────────────────────
   Task analysis → Which agents needed?
   - crypto-orchestrator: Always load first
   - ccxt-trader: Exchange API, trading logic
   - supabase-engineer: Database, schema
   - backtest-analyst: Strategy testing
   - deploy-specialist: Deployment, DevOps
   - research-specialist: Documentation

3. CONTEXT HUB MANDATORY
   ───────────────────────
   chub search "[API provider] [function]"
   chub get [DOC_ID] --lang python

4. EXECUTE TASK
   ────────────
   [YOUR TASK DESCRIPTION]

5. MERGE & VALIDATE
   ─────────────────
   - Combine outputs from all agents
   - Verify dependencies work together
   - Run final validation

6. SAVE MEMORY
   ────────────
   memoryos capture "Key decision: ..."
   memoryos checkpoint --working-on "[next task]"
   Log to memory/2026-03-11.md
```

---

## EXAMPLE USAGE

### Example 1: Build Trading Bot
```
🚀 FULLSTACK CRYPTO AGENT FACTORY ACTIVATED 🚀

1. LOAD MEMORY: memoryos wake --profile crypto
2. SPAWN AGENTS:
   - ccxt-trader → Binance integration
   - supabase-engineer → Price data schema
   - backtest-analyst → MACD strategy backtest

3. CONTEXT HUB: chub search "CCXT Python"

4. TASK: Build crypto trading bot v2 with:
   - Binance spot trading via CCXT
   - Supabase for price storage
   - MACD + RSI strategy
   - Backtest on last 30 days

5. MERGE: Ensure all components work together

6. SAVE: memoryos checkpoint --working-on "Deploy to Vercel"
```

### Example 2: Optimize Database
```
🚀 FULLSTACK CRYPTO AGENT FACTORY ACTIVATED 🚀

1. LOAD MEMORY: memoryos wake --profile crypto
2. SPAWN: supabase-engineer + research-specialist

3. TASK: Optimize Supabase schema for:
   - 1M+ price records
   - Real-time queries
   - Cost optimization

4. SAVE: Log changes to memory/
```

---

## SUBAGENTS QUICK REFERENCE

| Agent | Role | Keywords |
|-------|------|----------|
| crypto-orchestrator | Master coordinator | crypto, trading, bot |
| ccxt-trader | Exchange API | ccxt, exchange, binance |
| supabase-engineer | Database | supabase, database, schema |
| backtest-analyst | Strategy testing | backtest, strategy, sharpe |
| deploy-specialist | DevOps | deploy, docker, vercel |
| research-specialist | Docs | docs, readme, research |

---

## SHORTCUTS

| Action | Command |
|--------|---------|
| Wake memory | `memoryos wake --profile crypto` |
| Save context | `memoryos capture "note"` |
| Checkpoint | `memoryos checkpoint --working-on "task"` |
| Search docs | `chub search "API name"` |
| Get doc | `chub get [ID] --lang python` |

---

## NOTES

- Always load SOUL.md + USER.md first
- Use Context Hub before coding any API
- Save progress regularly to MemoryOS
- Log all key decisions to memory/
