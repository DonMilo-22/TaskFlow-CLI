# TaskFlow CLI

Administrador local de tareas desde la terminal, desarrollado con TypeScript.

Permite organizar pendientes con prioridad y conservarlos entre sesiones sin una cuenta ni una base de datos.

## Funciones actuales

- Crear, completar, reabrir, renombrar y eliminar tareas.
- Cambiar prioridades y filtrar por estado o prioridad.
- Buscar por título sin distinguir mayúsculas.
- Consultar estadísticas y limpiar tareas completadas.
- Persistencia en un archivo JSON local.

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
