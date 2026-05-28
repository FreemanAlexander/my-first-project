# Codex instructions for pml-project

This repository is part of Alexander Freeman's AgentOS / Claude Code learning project.

Codex role in this repo:

- independent code reviewer
- architecture reviewer
- security and edge-case auditor
- test strategy designer
- migration/refactoring planner

Primary coding agent is Homer / Claude Code.

Codex should usually not be the main implementer.

Default behavior:

- inspect repository and git diff
- do not edit files unless the user explicitly asks
- do not commit
- do not push
- do not deploy
- do not read or print secrets
- do not change Telegram tokens
- do not change systemd services
- do not touch /home/edgelab/claude-gateway
- do not touch /opt/richard

Important paths:

- /home/agentos/.claude-lab
- /home/agentos/.claude-lab/agentos-gateway
- /home/agentos/pml-project
- docs/learning-snapshots
- docs/reviews

Review output should be saved or prepared as:

- docs/reviews/REVIEW-codex-YYYY-MM-DD.md

Use Russian by default.

For code reviews, report:

- short verdict
- P0/P1/P2 findings
- missing tests
- security/privacy concerns
- suggested fix order

## Loop Coding approval

For large or risky engineering tasks, use `docs/runbooks/loop-coding.md`.

Do not start Codex planning, implementation review, or any expensive loop phase without explicit approval from Alexander.

Before starting, explain why Loop Coding is recommended and ask:

“Запускать Loop Coding? Да/нет?”
