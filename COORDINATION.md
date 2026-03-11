# COORDINATION.md - Multi-Agent Coordination Rules

> Extracted from `RULE for CODING/Multi Agents/coordination.md`
> Combined with Parallel Workflow
> Last Updated: 2026-03-10

---

## 1. Agent Roles

### Coordinator (Orchestrator)
- ✅ Accepts user request
- ✅ Decomposes into sub-tasks
- ✅ Enforces `GOVERNANCE.md` for every sub-task
- ✅ Routes to workers based on capabilities and risk
- ✅ Aggregates results + artifacts

### Workers
- ✅ Execute tasks only within assigned scope
- ✅ Must honor governance constraints
- ✅ Must log actions and token usage
- ✅ Report status back to Coordinator

---

## 2. Standard Task Envelope

All inter-agent tasks MUST use this JSON envelope:

```json
{
  "task_id": "uuid",
  "parent_task_id": "uuid|null",
  "type": "VALIDATE|PROCESS|DELETE|DEPLOY|MONITOR|REPORT",
  "priority": "LOW|MED|HIGH|CRITICAL",
  "requested_by": "user|system|agent:<name>",
  "target": {
    "path": "/data/production|/data/staging|/logs|/backups",
    "dataset": "string",
    "records_estimate": 0
  },
  "constraints": {
    "never_hard_delete": true,
    "soft_delete_first": true,
    "must_backup_before_action": true,
    "test_in_staging_first": true
  },
  "approval": {
    "required": false,
    "min_approvers": 0,
    "status": "NOT_REQUIRED|PENDING|APPROVED|REJECTED",
    "reason_required": false
  },
  "artifacts": [
    { "type": "BACKUP|CHANGELOG|TEST_REPORT|AUDIT_LOG_REF", "ref": "string" }
  ],
  "context": {
    "summary": "short text",
    "inputs": {}
  }
}
```

---

## 3. Routing Rules

### A) By Capability
| Task Type | Route To |
|-----------|----------|
| VALIDATE | ValidatorAgent, DataProcessor_Agent |
| DELETE | DataProcessor_Agent + ApprovalGate |
| DEPLOY | DeployerAgent + MonitorAgent |
| PROCESS | DataProcessor_Agent |
| REPORT | ReporterAgent |

### B) By Risk & Path

#### If `/data/production`:
- Must include `BACKUP` task before execute
- Must set `approval.required = true` for MODIFY/DELETE
- Must add `MONITOR` sub-task post change (30 min)

#### If `/data/staging`:
- Approval typically not required
- Still prefer `backup_before_delete = true`

### C) By Threshold
- If `DELETE` + `records_estimate >= 100`:
  - `approval.required = true`
  - `min_approvers = 1`
  - `reason_required = true`
  - Notify data owner

---

## 4. Concurrency & Locks

- Any task targeting `/data/production` MUST acquire a lock:
  - `lock_key = hash(target.path + ":" + target.dataset)`
  - `lock_ttl_minutes = 30`

- If lock exists:
  - Queue task OR escalate if `CRITICAL`

---

## 5. Idempotency & Deduplication

- Workers MUST write `task_id` into audit log
- If same `task_id` received again:
  - Return previous result (do NOT re-execute)

---

## 6. Approval Levels (Human-in-the-Loop)

| Level | Description | Action |
|-------|-------------|--------|
| INFO | Log-only | Just record |
| CONFIRM | User yes/no | Pause for response |
| APPROVE | Human approver required | Get sign-off |
| ESCALATE | Stop + notify team lead | Emergency protocol |

---

## 7. Failure & Escalation

If any STOP condition occurs (policy conflict, backup failure, data loss):
- Coordinator sets task status = `ESCALATED`
- No further write operations allowed
- Create incident artifact:
  - Backup snapshot ref
  - Audit log ref
  - Minimal reproduction context

---

## 8. Parallel Coding in VS Code

### Setup Multi-Root Workspace
```bash
# File → Add Folder to Workspace
# Add both:
#   - project1_trading-bot/
#   - project2_ai-agent/
```

### Or Open Workspace File
```bash
# File → Open Workspace from File
# Select: Parallel/parallel.code-workspace
```

### Claude Code Context Loading

```
TRƯỚC KHI LÀM GÌ:
1. Đọc ../SOUL.md → Identity & constraints
2. Đọc ../USER.md → User preferences
3. Đọc ../GOVERNANCE.md → Policy rules
4. Đọc ../CH.md → Context Hub guide

5. NẾU DÙNG EXTERNAL API:
   # Option 1: chub search (khi có CLI)
   chub search "[API provider] [function]"
   chub get [DOC_ID] --lang python

   # Option 2: Web search (hiện tại)
   Web search: "[API provider] official docs Python"

TASK: [Your task description]

SAU KHI XONG:
- chub annotate [DOC_ID] "Project note: ..."
- Log results to memory/2026-03-10.md
```

### VS Code Shortcuts for Parallel

| Action | Shortcut |
|--------|----------|
| New terminal | `Ctrl+Shift+`` |
| Split editor | `Ctrl+\` |
| Multi-cursor | `Alt+Click` |
| Find in files | `Ctrl+Shift+F` |
| Replace in files | `Ctrl+Shift+H` |
| Command palette | `Ctrl+Shift+P` |

---

## 9. Parallel Task Distribution Workflow

### Khi nhận nhiệm vụ LỚN, Agent chính phải:

```
┌────────────────────────────────────────────────────────────────┐
│           PARALLEL TASK DISTRIBUTION WORKFLOW                  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  BƯỚC 1: PHÂN TÍCH KHỐI LƯỢNG CÔNG VIỆC                    │
│  ─────────────────────────────────────────────                │
│  □ Đọc requirements đầy đủ                                     │
│  □ Xác định các module/component độc lập                      │
│  □ Ước tính thời gian mỗi phần                                │
│  □ Xác định dependencies giữa các phần                         │
│                                                                │
│  BƯỚC 2: PHÂN PHỐI CHO CÁC AGENTS                            │
│  ─────────────────────────────────────────                    │
│  □ Tạo task envelope cho mỗi sub-agent                        │
│  □ Gán context riêng cho từng agent                           │
│  □ Set constraints: deadline, dependencies                   │
│  □ Define output format cho mỗi agent                          │
│                                                                │
│  BƯỚC 3: THỰC THI SONG SONG                                  │
│  ─────────────────────────────────────────                    │
│  □ Chạy các agents song song                                   │
│  □ Theo dõi progress của từng agent                           │
│  □ Handle errors riêng từng agent                             │
│                                                                │
│  BƯỚC 4: KIỂM TRA VÀ KẾT NỐI                               │
│  ─────────────────────────────────────────                    │
│  □ Verify output từ mỗi agent                                 │
│  □ Check dependencies: output A → input B                     │
│  □ Merge results thành unified output                         │
│  □ Validate final result                                       │
│                                                                │
│  BƯỚC 5: BÁO CÁO                                            │
│  ─────────────────────────────────────────                    │
│  □ Tổng hợp kết quả                                          │
│  □ Log vào memory/YYYY-MM-DD.md                               │
│  □ Report cho user                                             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Task Envelope cho Sub-Agent

```json
{
  "task_id": "sub-001",
  "parent_task_id": "parent-001",
  "agent_role": "Frontend_Agent",
  "type": "PROCESS",
  "priority": "HIGH",
  "scope": {
    "description": "Build React login form",
    "files": ["src/components/Login.tsx", "src/hooks/useAuth.ts"],
    "deliverables": ["Login component", "useAuth hook"]
  },
  "context": {
    "project": "Trading Dashboard",
    "tech_stack": ["React", "TypeScript", "Tailwind"],
    "design_system": "company-ui-kit"
  },
  "constraints": {
    "deadline": "30 minutes",
    "dependencies": [],
    "output_format": "TypeScript + CSS modules"
  },
  "validation": {
    "test_required": true,
    "lint_check": true,
    "build_verify": true
  }
}
```

### Progress Tracking

```
PARALLEL EXECUTION TRACKER:
┌──────────────────────────────────────────────────────────────┐
│ Task: Build Trading Dashboard                               │
├────────────────────┬────────────┬────────────┬───────────────┤
│ Agent              │ Status     │ Progress   │ Output        │
├────────────────────┼────────────┼────────────┼───────────────┤
│ Frontend_Agent    │ ✅ Done    │ 100%       │ Login.tsx     │
│ Backend_Agent     │ 🔄 Running │ 60%        │ -             │
│ Database_Agent   │ ⏳ Waiting │ 0%         │ -             │
│ API_Agent         │ ⏳ Waiting │ 0%         │ -             │
└────────────────────┴────────────┴────────────┴───────────────┘

MERGE STATUS: ⏳ Waiting for Backend_Agent
```

### Error Handling trong Parallel

| Error | Action |
|-------|--------|
| Agent fails | Retry 1 lần, sau đó escalate |
| Dependency missing | Pause dependent agents |
| Output invalid | Return cho agent sửa |
| Timeout | Report, continue others |

---

## 10. Quick Start Template

### Single Task
```
1. Đọc SOUL.md + GOVERNANCE.md
2. Phân tích requirements
3. Execute với logging
4. Report kết quả
```

### Parallel Tasks
```
1. Đọc COORDINATION.md
2. Split thành sub-tasks
3. Execute song song:
   - Task A → project1_trading-bot
   - Task B → project2_ai-agent
4. Merge kết quả
5. Report tổng hợp
```

---

## 11. Emergency Checklist

```
┌─────────────────────────────────────────────────────────┐
│ EMERGENCY RESPONSE                                       │
├─────────────────────────────────────────────────────────┤
│ 🚨 STOP CONDITION DETECTED                              │
│                                                         │
│ □ 1. STOP all operations immediately                  │
│ □ 2. Check GOVERANCE.md for stop condition            │
│ □ 3. Create incident artifact                         │
│ □ 4. Alert human supervisor                           │
│ □ 5. Preserve state for debugging                    │
│ □ 6. Wait for approval before proceeding              │
│                                                         │
│ Common Stop Conditions:                                │
│ - Policy conflict                                      │
│ - Backup failure                                       │
│ - Data loss detected                                   │
│ - Missing approval for critical action                 │
└─────────────────────────────────────────────────────────┘
```
