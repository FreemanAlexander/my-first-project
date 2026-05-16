---
name: design-md-generator
description: |
  Генератор design.md — визуального контракта проекта.
  Используй, когда пользователь просит создать дизайн, design.md,
  дизайн-систему, visual contract, design tokens, UI style guide,
  landing design, макет проекта или визуальные правила интерфейса.
triggers:
  - "design.md"
  - "DESIGN.md"
  - "дизайн система"
  - "design tokens"
  - "визуальный контракт"
  - "visual contract"
  - "макет проекта"
  - "landing design"
---

## When to use

Используй этот skill, когда в проекте ещё нет `design.md` или когда нужно полностью пересобрать визуальный контракт проекта.

Не используй этот skill для маленьких точечных правок цветов, отступов или текста. Для точечных правок редактируй существующий `design.md` напрямую.

## Workflow

1. Прочитай `README.md` и `.claude/CLAUDE.md`, чтобы понять цель проекта и стек.
2. Уточни у пользователя:
   - тип проекта: landing / SaaS / dashboard / bot admin panel;
   - тема: light / dark / both;
   - желаемый визуальный стиль;
   - акцентный цвет;
   - есть ли брендовые цвета, логотип или референсы.
3. Сгенерируй `design.md` в корне проекта.
4. В `design.md` обязательно включи:
   - design principles;
   - color tokens;
   - typography;
   - spacing and layout;
   - components;
   - responsive rules;
   - anti-patterns.
5. Покажи `git diff -- design.md`.
6. Не коммить без подтверждения пользователя.

## Output format

Создавай `design.md` как Markdown-файл.

Без emoji. Без длинных вступлений.  
Каждая крупная часть — заголовок второго уровня.