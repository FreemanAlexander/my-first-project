# My First AgentOS Project

Учебный проект для прохождения интенсива AgentOS.

Цель проекта — научиться создавать проект с нуля через Claude Code: вести репозиторий, описывать правила для агента, работать с GitHub, skills, permissions, дизайном, backend, тестами и деплоем.

## Что мы создаём

В рамках проекта планируется собрать:

- продающий лендинг;
- Telegram-бота с админскими функциями;
- приём заявок;
- базовую backend-логику;
- структуру для дальнейшего тестирования и деплоя.

## Где лежат правила проекта

Главные правила для Claude Code:

```text
.claude/CLAUDE.md
```

Корневой файл `CLAUDE.md` оставлен синхронизированным, чтобы Claude Code точно видел контекст проекта.

## Структура проекта

```text
.claude/
  CLAUDE.md
  skills/

tasks/
  todo.md
  lessons.md

.env.example
.gitignore
README.md
CLAUDE.md
```

## Текущий статус

- Пользователь `agentos` настроен.
- GitHub подключён.
- Репозиторий создан и запушен.
- Superpowers установлен.
- Skills `senior-brainstorm` и `telegram-bot-builder` установлены.
- Permissions настроены.
- Project-level `.claude/CLAUDE.md` создан.

## Рабочая папка

```bash
cd /home/agentos/my-first-project
```

## Базовые проверки

```bash
whoami
pwd
git status
git log --oneline -3
```

## Правило работы

Каждый следующий этап делаем по схеме:

```text
задача → план → действие → проверка → commit
```