# TaskFlow CLI

Administrador local de tareas desde la terminal, desarrollado con TypeScript.

Permite organizar pendientes con prioridad y conservarlos entre sesiones sin una cuenta ni una base de datos.

## Funciones actuales

- Crear, completar, reabrir, renombrar y eliminar tareas.
- Cambiar prioridades y filtrar por estado o prioridad.
- Buscar por título sin distinguir mayúsculas.
- Consultar estadísticas y limpiar tareas completadas.
- Persistencia en un archivo JSON local.
- Exportación de tareas a CSV para abrirlas en una hoja de cálculo.
- Copias de seguridad JSON con fecha y hora.

## Requisitos

Node.js 18 o superior y npm. El proyecto utiliza TypeScript 5.

## Instalación y primer uso

```bash
git clone https://github.com/DonMilo-22/TaskFlow-CLI.git
cd TaskFlow-CLI
npm install
npm run build
npm start -- add "Estudiar redes" high
npm start -- list
```

## Comandos

Todos se ejecutan con `npm start -- <comando>` después de compilar.

| Comando | Ejemplo | Resultado |
|---|---|---|
| `add <título> [prioridad]` | `add "Estudiar redes" high` | Crea una tarea; prioridad predeterminada `medium`. |
| `list [all\|pending\|done]` | `list pending` | Lista tareas; sin filtro muestra todas. |
| `done <id>` | `done 1` | Marca una tarea como completada. |
| `reopen <id>` | `reopen 1` | Devuelve una tarea a pendientes. |
| `rename <id> <título>` | `rename 1 "Repasar OSI"` | Cambia el título. |
| `priority <id> <low\|medium\|high>` | `priority 1 low` | Cambia la prioridad. |
| `list-priority <low\|medium\|high>` | `list-priority high` | Filtra por prioridad, incluyendo tareas completadas. |
| `search <texto>` | `search redes` | Busca en los títulos. |
| `stats` | `stats` | Muestra totales y pendientes de prioridad alta. |
| `delete <id>` | `delete 1` | Elimina la tarea. |
| `clear-done` | `clear-done` | Elimina todas las tareas completadas. |
| `export-csv` | `export-csv` | Exporta las tareas a `tasks-export.csv`. |
| `help` | `help` | Muestra la ayuda. |

## Ejemplo de salida

Salida ilustrativa después de agregar la primera tarea:

```text
✓ Added #1: Estudiar redes [high]
○ #1 [high] Estudiar redes
```

## Almacenamiento y límites

`tasks.json` se crea en el directorio de trabajo desde el que se ejecuta el proceso. Los ejemplos usan la raíz del repositorio. Eliminar ese archivo elimina la lista guardada. `delete` y `clear-done` no tienen papelera ni confirmación. No hay sincronización entre dispositivos.

## Comprobaciones

`npm run build` comprueba la compilación TypeScript. `npm start -- help` permite consultar los comandos disponibles. Estos comandos no constituyen una suite de pruebas automatizadas.

## Autor y licencia

Desarrollado por [DonMilo-22](https://github.com/DonMilo-22).

Licencia: MIT.

## Actualización 2026-10-12

- Added `recent [count]` to show the most recently created tasks, defaulting to five.

## Actualización adicional 2026-10-12

- `stats` now includes the completion percentage so progress is visible at a glance.

## Historial

Consulta [CHANGELOG.md](CHANGELOG.md) para ver las actualizaciones.

## Actualización 2026-10-14

- Added `priority-summary`, which counts pending tasks by high, medium, and low priority.

## Actualización 2026-10-15

- Added `oldest` to show the earliest-created task, including its ID, priority, title, and creation timestamp.


## Actualización 2026-10-16

- Added `export-csv` to export all tasks, including their status and creation date, to a spreadsheet-friendly CSV file.


## Utilidad nueva: copia de seguridad

Crea una copia con fecha y hora de tu archivo de tareas antes de hacer cambios importantes:

```bash
node scripts/backup-tasks.mjs
# O indica otra ruta JSON:
node scripts/backup-tasks.mjs ./tasks.json
```

Las copias se guardan en `backups/`; el script no modifica el archivo original.


## New utility: task summary

Get a quick count of completed and pending tasks from a JSON array (or an object with a `tasks` array):

```bash
node scripts/task-summary.mjs tasks.json
```

The summary recognizes `done: true` or `completed: true` and reports the completion percentage without modifying the input file.


## Actualización 2026-10-25

- Added the `backup` command to save a timestamped JSON snapshot of the current tasks without changing the active task file.

```bash
npm start -- backup
```
