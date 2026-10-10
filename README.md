# ✅ TaskFlow CLI

> A fast, dependency-light task manager for your terminal, built with TypeScript.

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

TaskFlow CLI lets you create, list, complete and delete tasks without leaving the terminal. Tasks are saved locally in a JSON file, so your list survives between sessions.

## ✨ Features

- Add tasks with **low, medium or high priority**
- List all tasks or filter by status
- Mark tasks as completed
- Delete tasks by ID
- Persistent local JSON storage
- Zero database setup

## 🚀 Quick start

```bash
npm install
npm run build
npm start -- add "Finish networking report" high
npm start -- list
```

## 🧭 Commands

| Command | Example | What it does |
|---|---|---|
| `add` | `npm start -- add "Study" high` | Creates a task |
| `list` | `npm start -- list pending` | Shows tasks |
| `done` | `npm start -- done 1` | Completes a task |
| `delete` | `npm start -- delete 1` | Removes a task |
| `help` | `npm start -- help` | Shows help |

## 🗂️ Data

TaskFlow creates `tasks.json` automatically in the project directory. No cloud account, API key or database is required.

## 🧱 Structure

```text
src/
  index.ts      # CLI and command handling
package.json
tsconfig.json
.gitignore
```

## 🛠️ Requirements

- Node.js 18+
- npm

## 💡 Why this project?

It demonstrates TypeScript types, file persistence, command-line parsing, array manipulation and a small clean application architecture.

## 📄 License

MIT. Use it, modify it and make it yours.


## 🆕 Recent changes

### 2026-10-09

- Added `list-priority <low|medium|high>` to quickly view tasks by priority.

### 2026-10-08

- Added `rename <id> <new title>` to change a task title without recreating it.

### 2026-10-07

- Added `clear-done` to remove all completed tasks in one command.

### 2026-10-06

- Added task search by title via `search <text>`.

### 2026-10-05

- Added `priority <id> <low|medium|high>` to change an existing task's priority.

### 2026-10-04

- Added `reopen <id>` to return a completed task to pending status.

### Previous update

- Added a `stats` command with totals for pending, completed and high-priority tasks.
