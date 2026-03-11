# WORKFLOW.md - Task Distribution & Parallel Processing

> Workflow for handling large tasks with parallel agents
> Last Updated: 2026-03-10

---

## Overview

When receiving a **LARGE TASK**, the main agent must:
1. **Analyze** the workload → Break into independent parts
2. **Distribute** → Assign each part to a sub-agent
3. **Execute parallel** → Run agents simultaneously
4. **Verify & Merge** → Check outputs, combine results

---

## Workflow: 5-Step Process

### Step 1: ANALYZE - Phân tích khối lượng

```
□ 1.1. Read full requirements
□ 1.2. Identify modules/components
□ 1.3. Map dependencies (what depends on what)
□ 1.4. Estimate complexity per module
□ 1.5. Determine which parts can run in parallel
```

**Output**: List of independent sub-tasks

### Step 2: DISTRIBUTE - Phân phối

```
□ 2.1. Create task envelope for each sub-agent
□ 2.2. Assign specific scope (files, components)
□ 2.3. Provide context (project info, tech stack)
□ 2.4. Set constraints (deadline, format)
□ 2.5. Define validation criteria
```

**Output**: Task assignments for each agent

### Step 3: EXECUTE - Thực thi song song

```
□ 3.1. Launch all sub-agents in parallel
□ 3.2. Track progress of each agent
□ 3.3. Handle individual errors
□ 3.4. Monitor dependencies
□ 3.5. Collect outputs as they complete
```

**Output**: Individual agent results

### Step 4: VERIFY & MERGE - Kiểm tra & Kết nối

```
□ 4.1. Verify each agent's output
□ 4.2. Check: Does output A work with output B?
□ 4.3. Fix integration issues
□ 4.4. Merge into unified result
□ 4.5. Run final validation
```

**Output**: Complete, integrated solution

### Step 5: REPORT - Báo cáo

```
□ 5.1. Summarize what was done
□ 5.2. List agents and their contributions
□ 5.3. Note any issues and resolutions
□ 5.4. Log to memory/YYYY-MM-DD.md
□ 5.5. Present final result to user
```

**Output**: Final report

---

## Example: Large Task Distribution

### Task: "Build a complete e-commerce backend"

#### Step 1: Analyze
```
Independent parts:
- User authentication module
- Product catalog API
- Shopping cart service
- Order processing system
- Payment integration

Parallelizable: 4/5 (Order depends on Cart)
```

#### Step 2: Distribute

```
Agent 1: Auth_Agent
  → Scope: Login, Register, JWT, Password reset
  → Tech: Express.js, MongoDB

Agent 2: Product_Agent
  → Scope: CRUD products, categories, search
  → Tech: Express.js, MongoDB

Agent 3: Cart_Agent
  → Scope: Add/remove items, quantity, session
  → Tech: Express.js, Redis

Agent 4: Order_Agent (depends on Cart)
  → Scope: Checkout, order history, status
  → Tech: Express.js, MongoDB
```

#### Step 3: Execute Parallel
```
[Auth_Agent]     ████████████ 100% ✅
[Product_Agent]  ████████████ 100% ✅
[Cart_Agent]     ████████████ 100% ✅
[Order_Agent]    ⏳ Waiting for Cart... ✅
```

#### Step 4: Verify & Merge
```
□ Check: Auth integrates with all modules ✅
□ Check: Product accessible from Cart ✅
□ Check: Order receives cart data ✅
□ Merge: Routes, models, tests ✅
□ Final test: Full checkout flow ✅
```

#### Step 5: Report
```
✅ COMPLETE: E-commerce Backend

Agents:
- Auth_Agent: Login, Register, JWT
- Product_Agent: Product CRUD, Search
- Cart_Agent: Cart management
- Order_Agent: Order processing

Total time: ~45 min (vs 3h if sequential)
```

---

## Task Envelope Template

```json
{
  "task_id": "unique-id",
  "parent_task_id": "parent-unique-id",
  "agent_role": "Agent_Name",
  "priority": "HIGH",

  "scope": {
    "description": "What to build",
    "files": ["file1.ts", "file2.ts"],
    "components": ["ComponentA", "ComponentB"]
  },

  "context": {
    "project_name": "...",
    "tech_stack": ["React", "TypeScript"],
    "existing_code": "path/to/reference"
  },

  "constraints": {
    "deadline": "30 minutes",
    "dependencies": ["agent-id-1", "agent-id-2"],
    "output_format": "TypeScript + Jest tests"
  },

  "validation": {
    "lint_pass": true,
    "tests_pass": true,
    "build_success": true
  }
}
```

---

## Quick Reference

```
NHẬN TASK LỚN →

1. ANALYZE:     Break into parts, find dependencies
2. DISTRIBUTE:  Create envelopes, assign to agents
3. EXECUTE:     Run parallel, track progress
4. VERIFY:      Check outputs, fix integration
5. REPORT:      Summarize, log to memory

→ DONE!
```

---

## Integration với Memory Stack

- **Before**: Đọc COORDINATION.md để biết workflow
- **During**: Log progress vào agent tracking
- **After**: Log final report vào memory/YYYY-MM-DD.md

---

## Notes

- Always identify **dependencies** first
- **Parallel** = parts that don't depend on each other
- **Sequential** = parts where B depends on A's output
- Verify **interfaces** match between modules
- Keep **communication** simple between agents
