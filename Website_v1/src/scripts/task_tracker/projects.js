import { projects, tasks } from "$stores/Tasks";
import { consts, user } from "$stores/Global";

import { getJson, get_headers } from "$scripts/functions";
import {f_task} from "$scripts/task_tracker/tasks";

let _user;
user.subscribe(data=>_user=data);

let _consts;
consts.subscribe(data => _consts = data);

let _projects;
projects.subscribe(data => _projects = data);

export const f_project = {
    get: async () => {
        let data = [];
        let res = await getJson(`/projects/get?owner=${_user.username}`, get_headers());
        if(res) {
            data = res.reduce((accumulator, current) => {
                accumulator.set(current.id, current);
                return accumulator
            }, new Map());
        }
        projects.set(data);
        return data
    },

    add: async (project) => {
        const res = await fetch(_consts.backend + `/projects/add`, {
            method: "POST",
            body: JSON.stringify(project),
            headers: get_headers()
        })
        let newProject = await res.json()
        newProject.sections = [];
        projects.update(current => {
            current.set(newProject.id, newProject)
            return current;
        })
    },

    edit: async(project, details) => {
        const res = await fetch(_consts.backend + `/projects/edit`, {
            method: "PUT",
            body: JSON.stringify(project),
            headers: {
                ...get_headers(),
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
        const res = await fetch(_consts.backend + `/projects/delete`, {
            method: "DELETE",
            headers: {
                ...get_headers(),
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

    removeProject: async(project_id) => {
        projects.update(current => {
            current.delete(project_id);
            return current
        })
    },
}
