#!/usr/bin/env bash
set -euo pipefail

ROOT="/home/agentos/my-first-project"
cd "$ROOT"

export PATH="$HOME/.npm-global/bin:$PATH"

MODEL="${CODEX_MODEL:-gpt-5.4-mini}"
STAMP="$(date +%Y-%m-%d-%H%M%S)"
OUT="docs/reviews/REVIEW-codex-${STAMP}.md"

echo "--- Codex Reviewer ---"
echo "model: $MODEL"
echo "output: $OUT"
echo

codex exec \
  --cd "$ROOT" \
  --sandbox read-only \
  --model "$MODEL" \
  -o "$OUT" \
  "Ты Codex Reviewer для AgentOS / Claude Code проекта Александра Фримана.

Режим: read-only review.

Правила:
- не редактируй файлы;
- не коммить;
- не деплой;
- не читай secrets;
- не трогай systemd;
- не трогай /home/edgelab/claude-gateway;
- не трогай /opt/richard.

Задача:
Проверь текущий git diff и новые файлы. Дай короткий инженерный review по-русски.

Формат:
1. verdict;
2. P0 critical;
3. P1 important;
4. P2 improvements;
5. tests/checks needed;
6. security/privacy notes;
7. next steps.

Если diff пустой — так и напиши."

echo
echo "--- saved ---"
ls -l "$OUT"
