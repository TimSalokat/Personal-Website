
import { projects, tasks } from "$stores/Tasks";
import { consts } from "$stores/Global";

import { get_headers } from "$scripts/functions";
import { f_section } from "$scripts/task_tracker/sections";
import { f_project } from "$scripts/task_tracker/projects";

let _consts;
consts.subscribe(data => _consts = data);

let _projects;
projects.subscribe(data => _projects = data);

export const f_task = {
    get: async () => {
        let data = [];
        _projects.forEach((project)=>{
            project.sections.forEach((section)=>{
                data.push(...section.tasks);
            })
        })
        tasks.set(data);
        return data
    },

    add: async (todo, project_id) => {
        const res = await fetch(_consts.backend + `/tasks/add/${project_id}`, {
            method: "POST",
            body: JSON.stringify(todo),
            headers: get_headers()
        });
        const new_task = await res.json()
        projects.update(current => {
            current.get(project_id).total_tasks += 1;
            current.get(project_id).sections.filter(section => {
                return section.id == todo.section_id;
            })[0].tasks.push(new_task);
            return current
        })       
        tasks.update(current => {
            current.push(new_task);
            return current;
        })
    },

    edit: async(task, details) => {
        const res = await fetch(_consts.backend + `/tasks/edit`, {
            method: "PUT",
            body: JSON.stringify(task),
            headers: {
                ...get_headers(),
                ...details
            }
        });

        local.taskChangeProject(details);
        projects.update(current => {
            let updated_section = f_section.get_section(current, details.project_id, details.section_id);
            let updated_task = updated_section.tasks.filter(task=>task.id===details.task_id)[0]
            updated_task.title = task.title;
            updated_task.description = task.description;
            updated_task.priority = task.priority;
            return current;
        })
        f_task.get();
    },

    delete: async(project_id, section_id, task_id) => {
        const res = await fetch(_consts.backend + `/tasks/delete`, {
            method: "DELETE",
            headers: {
                ...get_headers(),
                task_id
            }
        });

        local.removeTask(project_id, section_id, task_id);
        f_project.reCalc(project_id);
        f_task.get();
    },

    setFinished: async (task_id, project_id, set_to) => {
        set_to ? f_project.addFinished(project_id) : f_project.substractFinished(project_id);

        let res = await fetch(_consts.backend + `/tasks/set-finished?task_id=${task_id}`, {
            method: "PUT",
            headers: {"Content-type": "application/json"}
        })
        f_task.get();
    },
    
    filter_by_prio: (tasks, prio) => {
        let filtered_tasks;

        if (prio != -1) {
			filtered_tasks = tasks.filter((task) => {
				return task.priority == prio;
			});
		}

        else if (tasks != undefined){
			filtered_tasks = tasks.sort(function (a, b) {
				return b.priority - a.priority;
			});
		}
        
        else { filtered_tasks = []; }
        return local.sort(filtered_tasks);
    },
}

const local = {
    get_task: (map, project_id, section_id, task_id) => {
        let _section = f_section.get_section(map, project_id, section_id);
        return _section.tasks.filter((task) => {return task.id == task_id})[0];
    },

    sort: (tasks) => {
        let active = tasks.filter((task) => {
			return !task.finished;
		});
        let finished = tasks.filter((task) => {
			return task.finished;
		});
        return [...active, ...finished]
    },

    taskChangeProject: (details) => {
        if(details.section_id === details.old_section_id) return
        projects.update(current => {
            let moved_task = local.get_task(current, details.old_project_id, details.old_section_id, details.task_id);
            moved_task.project_id = details.project_id;
            moved_task.section_id = details.section_id;

            f_section.get_section(current, details.project_id, details.section_id).tasks.push(moved_task);

            local.removeTask(details.old_project_id, details.old_section_id, details.task_id);
            return current
        })

        f_project.reCalc(details.project_id);
        f_project.reCalc(details.old_project_id);
    },

    removeTask: async(project_id, section_id, task_id) => {
        projects.update(current => {
            const _section = f_section.get_section(current, project_id, section_id);
            const index = _section.tasks.findIndex(task => task.id===task_id)
            _section.tasks.splice(index, 1)
            return current
        })
    },
}