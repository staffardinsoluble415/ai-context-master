# 🚀 START.md - Quick Reference

> Bắt đầu nhanh với Memory Stack
> Last Updated: 2026-03-10

---

## 1. Mở Workspace

```bash
# VS Code
File → Open Folder → MEMORY cho Agent Coding
```

---

## 2. Prompt Template (Copy-Paste)

### A. New Task
```
TRƯỚC KHI LÀM GÌ:
1. Đọc SOUL.md → Identity & constraints
2. Đọc USER.md → User preferences
3. Đọc GOVERNANCE.md → Policy rules
4. Đọc RULES.md → Operating procedures
5. Đọc COORDINATION.md → Multi-agent workflow
6. Đọc CH.md → Context Hub guide
7. Đọc MEMORY.md → Project knowledge
8. Đọc memory/2026-03-10.md → Today's context

[TASK CỦA BẠN]

SAU XONG:
- Log to memory/2026-03-10.md
```

### B. Parallel Task (Task Lớn - Tự Phân Phối)
```
TRƯỚC KHI LÀM GÌ:
1. Đọc SOUL.md, USER.md, GOVERNANCE.md
2. Đọc WORKFLOW.md → Task distribution workflow
3. Đọc COORDINATION.md → Parallel agent coordination

NẾU TASK LỚN:
→ Thực hiện 5-Step Workflow:
   Bước 1: ANALYZE - Phân tích khối lượng
   Bước 2: DISTRIBUTE - Phân phối cho sub-agents
   Bước 3: EXECUTE - Chạy song song
   Bước 4: VERIFY & MERGE - Kiểm tra & Kết nối
   Bước 5: REPORT - Báo cáo

TASK: [Mô tả task của bạn]

SAU XONG:
- Log to memory/2026-03-10.md
```

### C. Quick Parallel (Nhiều Task Nhỏ)
```
TRƯỚC KHI LÀM GÌ:
1. Đọc SOUL.md, USER.md, GOVERNANCE.md, COORDINATION.md

TASK PARALLEL:
- Task 1: [project1_trading-bot]
- Task 2: [project2_ai-agent]

SAU XONG:
- Log to memory/2026-03-10.md
```

### C. API Task
```
TRƯỚC KHI CODE:
1. Đọc SOUL.md, USER.md, CH.md
2. Web search: "[API] official documentation Python"
3. Inject docs vào context

[TASK]

SAU XONG:
- Log to memory/2026-03-10.md
```

---

## 3. VS Code Shortcuts

| Action | Shortcut |
|--------|----------|
| Claude Code | `Ctrl+Shift+P` → "Claude Code" |
| New terminal | `Ctrl+Shift+`` |
| Split editor | `Ctrl+\` |
| Multi-cursor | `Alt+Click` |
| Find in files | `Ctrl+Shift+F` |
| Command palette | `Ctrl+Shift+P` |

---

## 4. File Quick Ref

| File | Purpose |
|------|---------|
| SOUL.md | Agent identity & constraints |
| USER.md | User preferences |
| GOVERNANCE.md | Policy rules |
| RULES.md | Operating procedures |
| COORDINATION.md | Multi-agent workflow |
| CH.md | Context Hub guide |
| MEMORY.md | Project knowledge |
| HEARTBEAT.md | Session tracker |
| memory/ | Daily logs |
| Parallel/ | Multi-project workspace |
| docs/ | API references |
| templates/ | Code templates |

---

## 5. Context Loading Order

```
1. SOUL.md         → Identity
2. USER.md         → Preferences
3. GOVERNANCE.md   → Policy
4. RULES.md        → Procedures
5. COORDINATION.md → Workflow
6. CH.md           → API Guide
7. MEMORY.md       → Knowledge
8. memory/YYYY-MM-DD → Today's logs
```

---

## 6. Common Commands

```bash
# Context Hub (khi có)
chub search "[API]"
chub get [DOC_ID] --lang python
chub annotate [DOC_ID] "Note: ..."

# Git
git status
git add [file]
git commit -m "message"

# Python
python main.py
pip install -r requirements.txt
```

---

## 7. Emergency Checklist

```
□ STOP if: Policy conflict
□ STOP if: Backup failure
□ STOP if: Data loss detected
□ ASK if: Unclear requirements
□ BACKUP before modify production
□ APPROVAL if: > 100 records affected
```

---

## 8. Quick Links

- [docs/](docs/) → API References
- [templates/](templates/) → Code Templates
- [Parallel/](Parallel/) → Multi-project Workspace

---

**Ready to code!** 🚀
