import { projects, tasks } from "$stores/Tasks";
import { consts } from "$stores/Global";

import { getJson } from "$scripts/functions";
import {f_task} from "$scripts/task_tracker/tasks";

let _consts;
consts.subscribe(data => _consts = data);

let _projects;
projects.subscribe(data => _projects = data);

export const f_project = {
    get: async () => {
        let data = [];
        let res = await getJson(`/projects/get?testing=${_consts.testing}`);
        if(res) {
            data = res.reduce((accumulator, current) => {
                accumulator.set(current.id, current);
                return accumulator
            }, new Map());
        }
        console.log(data);
        projects.set(data);
        return data
    },

    add: async (project) => {
        const res = await fetch(_consts.backend + `/projects/add?testing=${_consts.testing}`, {
            method: "POST",
            body: JSON.stringify(project),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        let newProject = await res.json()
        newProject.sections = [];
        projects.update(current => {
            current.set(newProject.id, newProject)
            return current;
        })
    },

    edit: async(project, details) => {
        const res = await fetch(_consts.backend + `/projects/edit?testing=${_consts.testing}`, {
            method: "PUT",
            body: JSON.stringify(project),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                ...details
            }
        });

        projects.update(current => {
            let updated_project = current.get(details.project_id)
            updated_project.title = project.title;
            updated_project.color = project.color;
            return current;
        })
    },

    delete: async(project_id) => {
        const res = await fetch(_consts.backend + `/projects/delete?testing=${_consts.testing}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                project_id
            }
        });

        local.removeProject(project_id);
        f_task.get();
    },

    reCalc: (project_id) => {
        projects.update(current => {
            current.get(project_id).total_tasks = local.calcTotal(project_id)
            current.get(project_id).finished_tasks = local.calcFinished(project_id)
            return current
        })
    },
}

// ! -----------------------------------

const local = {
    calcTotal: (project_id) => {
        let count = 0;
        if(_projects.get(project_id).sections !== undefined){
            _projects.get(project_id).sections.forEach(section => {
                count += section.tasks.length;
            });
        }
        return count
    },
    calcFinished: (project_id) => {
        let count = 0;
        if(_projects.get(project_id).sections !== undefined){
            _projects.get(project_id).sections.forEach(section => {
                count += section.tasks.filter(task => {return task.finished}).length
            });
        }
        return count
    },

    addFinished: (project_id) => {
        projects.update(current => {
            current.get(project_id).finished_tasks += 1;
            return current;
        })
    }, 
    substractFinished: (project_id) => {
        projects.update(current => {
            current.get(project_id).finished_tasks -= 1;
            return current;
        })
    },

    removeProject: async(project_id) => {
        projects.update(current => {
            current.delete(project_id);
            return current
        })
    },
}
