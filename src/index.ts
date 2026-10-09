import { existsSync, readFileSync, writeFileSync } from "node:fs";

type Priority = "low" | "medium" | "high";
type Status = "pending" | "done";
type Task = { id: number; title: string; priority: Priority; status: Status; createdAt: string };

const DB = "tasks.json";
const load = (): Task[] => existsSync(DB) ? JSON.parse(readFileSync(DB, "utf8")) : [];
const save = (tasks: Task[]) => writeFileSync(DB, JSON.stringify(tasks, null, 2));
const args = process.argv.slice(2);
const command = args[0] ?? "help";

function help() {
  console.log(`
TaskFlow CLI
  add <title> [low|medium|high]
  list [all|pending|done]
  done <id>
  delete <id>
  reopen <id>
  priority <id> <low|medium|high>
  stats
  search <text>
  clear-done
  rename <id> <new title>
  help
`);
}

const tasks = load();

switch (command) {
  case "add": {
    const maybePriority = args.at(-1) as Priority;
    const priority: Priority = ["low","medium","high"].includes(maybePriority) ? maybePriority : "medium";
    const titleParts = priority === maybePriority ? args.slice(1, -1) : args.slice(1);
    const title = titleParts.join(" ").trim();
    if (!title) { console.error("A task title is required."); process.exitCode = 1; break; }
    const id = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    tasks.push({ id, title, priority, status: "pending", createdAt: new Date().toISOString() });
    save(tasks);
    console.log(`✓ Added #${id}: ${title} [${priority}]`);
    break;
  }
  case "list": {
    const filter = args[1] ?? "all";
    const visible = filter === "all" ? tasks : tasks.filter(t => t.status === filter);
    if (!visible.length) { console.log("No tasks found."); break; }
    for (const t of visible) console.log(`${t.status === "done" ? "✓" : "○"} #${t.id} [${t.priority}] ${t.title}`);
    break;
  }
  case "done": {
    const id = Number(args[1]);
    const task = tasks.find(t => t.id === id);
    if (!task) { console.error("Task not found."); process.exitCode = 1; break; }
    task.status = "done"; save(tasks); console.log(`✓ Completed #${id}`); break;
  }
  case "stats": {
    const pending = tasks.filter(t => t.status === "pending").length;
    const done = tasks.filter(t => t.status === "done").length;
    const high = tasks.filter(t => t.priority === "high" && t.status === "pending").length;
    console.log(`Tasks: ${tasks.length} | Pending: ${pending} | Done: ${done} | High priority pending: ${high}`);
    break;
  }
  case "reopen": {
    const task = tasks.find(t => t.id === Number(args[1]));
    if (!task) { console.error("Task not found."); process.exitCode = 1; break; }
    task.status = "pending"; save(tasks); console.log(`↺ Reopened #${task.id}`); break;
  }
  case "priority": {
    const task = tasks.find(t => t.id === Number(args[1]));
    const nextPriority = args[2] as Priority;
    if (!task || !["low","medium","high"].includes(nextPriority)) { console.error("Use: priority <id> <low|medium|high>"); process.exitCode = 1; break; }
    task.priority = nextPriority; save(tasks); console.log(`↕ Updated #${task.id} to ${nextPriority} priority`); break;
  }
  case "search": {
    const query = args.slice(1).join(" ").trim().toLowerCase();
    if (!query) { console.error("Use: search <text>"); process.exitCode = 1; break; }
    const matches = tasks.filter(t => t.title.toLowerCase().includes(query));
    if (!matches.length) { console.log("No matching tasks."); break; }
    for (const t of matches) console.log(`${t.status === "done" ? "✓" : "○"} #${t.id} [${t.priority}] ${t.title}`);
    break;
  }
  case "clear-done": {
    const remaining = tasks.filter(t => t.status !== "done");
    const removed = tasks.length - remaining.length;
    save(remaining);
    console.log(`✓ Removed ${removed} completed task${removed === 1 ? "" : "s"}`);
    break;
  }
  case "rename": {
    const task = tasks.find(t => t.id === Number(args[1]));
    const title = args.slice(2).join(" ").trim();
    if (!task || !title) { console.error("Use: rename <id> <new title>"); process.exitCode = 1; break; }
    task.title = title;
    save(tasks);
    console.log(`✎ Renamed #${task.id}: ${title}`);
    break;
  }
  case "delete": {
    const id = Number(args[1]);
    const next = tasks.filter(t => t.id !== id);
    if (next.length === tasks.length) { console.error("Task not found."); process.exitCode = 1; break; }
    save(next); console.log(`✓ Deleted #${id}`); break;
  }
  default: help();
}
