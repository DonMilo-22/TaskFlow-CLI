import { copyFile, mkdir, stat } from "node:fs/promises";
import { basename, join, resolve } from "node:path";

const source = resolve(process.argv[2] ?? "tasks.json");
try {
  const info = await stat(source);
  if (!info.isFile()) throw new Error("The source path is not a file.");
  const folder = join(resolve("."), "backups");
  await mkdir(folder, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const destination = join(folder, `${basename(source, ".json")}-${stamp}.json`);
  await copyFile(source, destination);
  console.log(`Backup created: ${destination}`);
} catch (error) {
  console.error(`Backup failed: ${error.message}`);
  process.exitCode = 1;
}
