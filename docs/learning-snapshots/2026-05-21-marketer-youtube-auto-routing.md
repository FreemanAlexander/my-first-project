# Marketer — YouTube auto-routing and corpus research

Дата: 2026-05-21

## Итог

Marketer научился автоматически применять YouTube Research Mode без ручной команды "прочитай core/YOUTUBE_RESEARCH.md".

## Natural smoke

Запрос был естественный:

`Marketer, вот канал @GoogleDevelopers. Посмотри его как корпус видео и найди 3 паттерна сильных хуков, которые можно адаптировать под ПМЛ. Ничего не публикуй.`

## Результат

Marketer сам применил YouTube corpus logic.

Использованный корпус:

- 15 top
- 10 recent

Вывод:

- найдено 3 паттерна сильных хуков;
- каждый паттерн адаптирован под ПМЛ;
- Marketer указал ограничение выборки: top перекошен Google I/O 2026;
- ничего не публиковалось.

## Найденные паттерны

1. `What's new in X (recap)` — сжатый апдейт / recap.
2. `Число + жёсткая граница` — измеримое обещание.
3. `Era shift` — смена парадигмы.

## Gateway

Gateway log:

- agent: `marketer`
- status: `completed`
- duration_ms: `63635`

Accounting записан в:

`/home/agentos/.claude-lab/agentos-gateway/logs/runs.jsonl`

## Статус

YouTube Research Mode работает как auto-routing.

Пользователю больше не нужно вручную писать:

`прочитай core/YOUTUBE_RESEARCH.md`

## Next

Улучшить YouTube corpus tools:

- фильтр по дате;
- `publishedBefore`;
- `publishedAfter`;
- режим diversity;
- comments mode;
- transcript для выбранных видео.
