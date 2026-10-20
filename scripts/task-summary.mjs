import { readFile } from "node:fs/promises";

const file = process.argv[2] ?? "tasks.json";
try {
  const parsed = JSON.parse(await readFile(file, "utf8"));
  const tasks = Array.isArray(parsed) ? parsed : parsed.tasks;
  if (!Array.isArray(tasks)) throw new Error("Expected a JSON array or an object with a tasks array.");
  const done = tasks.filter(task => task.done === true || task.completed === true).length;
  const pending = tasks.length - done;
  console.log(`Total tasks: ${tasks.length}`);
  console.log(`Completed: ${done}`);
  console.log(`Pending: ${pending}`);
  console.log(`Completion: ${tasks.length ? Math.round(done / tasks.length * 100) : 0}%`);
} catch (error) {
  console.error(`Could not summarize tasks: ${error.message}`);
  process.exitCode = 1;
}
