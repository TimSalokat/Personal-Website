
import { projects, tasks } from "$stores/Tasks";

import { states } from "$stores/Global";

const TESTING = false;

let _projects;
projects.subscribe(data => _projects = data)

let _tasks;
tasks.subscribe(data => _tasks = data);

let backend = "http://127.0.0.1:8000"

export const setup = async () => {
    await func.getProjects();    
    await func.getTasks();
    _projects.forEach(project => {
        func.reCalc(project.id);
    })
}

const getJson = async (address) => {
    const target = backend + address;
    try{
        let response = await fetch(target);
        if(response.status === 200){
            let res = await response.json();
            states.update(current => {current.server_connection = true; return current})
            return res 
        } else {
            console.error("Couldnt fetch from: " + address + ". Status code: " + response.status);
            states.update(current => {current.server_connection = false; return current})
            return false
        }
    }catch(error) {
        console.error(error);
        states.update(current => {current.server_connection = false; return current})
    }
}

export const func = {

    calcTotal: (project_id) => {
        if(_projects.get(project_id).tasks === undefined) return 0
        return _projects.get(project_id).tasks.length;
    },
    calcFinished: (project_id) => {
        return _projects.get(project_id).tasks?.filter(task => task.finished === true).length
    },

    reCalc: (project_id) => {
        projects.update(project => {
            project.get(project_id).total_tasks = func.calcTotal(project_id)
            project.get(project_id).finished_tasks = func.calcFinished(project_id)
            return project
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
    
    getProjects: async () => {
        let data = [];
        let res = await getJson(`/get-projects?testing=${TESTING}`);
        if(res) {
            data = res.reduce((accumulator, current) => {
                accumulator.set(current.id, current);
                return accumulator
            }, new Map());
        }
        projects.set(data);
        return data
    },

    getTasks: async () => {
        let data = [];
        
        _projects.forEach(project => {
            data.push(...project.tasks);
        });

        data = data.sort(function(a,b) {
            return b.priority - a.priority;
        })
        
        tasks.set(data);
        return data
    },

    addProject: async (project) => {
        const res = await fetch(backend + `/add-project?testing=${TESTING}`, {
            method: "POST",
            body: JSON.stringify(project),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        let newProject = await res.json()
        newProject.tasks = [];
        projects.update(current => {
            current.set(newProject.id, newProject)
            return current;
        })
    },

    addTask: async (todo, project_id) => {
        const res = await fetch(backend + `/add-task/${project_id}?testing=${TESTING}`, {
            method: "POST",
            body: JSON.stringify(todo),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        const newTask = await res.json()
        projects.update(project => {
            project.get(project_id).total_tasks += 1;
            project.get(project_id).tasks.push(newTask);
            return project
        })       
        func.getTasks();
    },

    editTask: async(task, details) => {
        const res = await fetch(backend + `/edit-task?testing=${TESTING}`, {
            method: "PUT",
            body: JSON.stringify(task),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                ...details
            }
        });

        func.taskChangeProject(details.task_id, details.project_id, details.old_project_id)
        projects.update(current => {
            let updated_task = current.get(details.project_id).tasks.filter(task=>task.id===details.task_id)
            updated_task[0].title = task.title;
            updated_task[0].description = task.description;
            updated_task[0].priority = task.priority;
            return current;
        })
        func.getTasks();
    },

    editProject: async(project, details) => {
        const res = await fetch(backend + `/edit-project?testing=${TESTING}`, {
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

    delTask: async(project_id, task_id) => {
        const res = await fetch(backend + `/del-task?testing=${TESTING}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                task_id
            }
        });

        func.removeTask(task_id, project_id);
        func.reCalc(project_id);
        func.getTasks();
    },

    delProject: async(project_id) => {
        const res = await fetch(backend + `/del-project?testing=${TESTING}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                project_id
            }
        });

        func.removeProject(project_id);
        func.getTasks();
    },

    taskChangeProject: (task_id, new_project_id, old_project_id) => {
        if(new_project_id === old_project_id) return
        projects.update(current => {
            let moved_task = current.get(old_project_id).tasks.filter(task => task.id===task_id)
            moved_task[0].project_id = new_project_id;
            if(current.get(new_project_id).hasOwnProperty("tasks")){
                current.get(new_project_id).tasks.push(...moved_task);
            }else {
                current.get(new_project_id).tasks = moved_task;
            }
            func.removeTask(task_id, old_project_id);
            return current
        })
        func.reCalc(new_project_id);
        func.reCalc(old_project_id);
    },

    removeTask: async(task_id, project_id) => {
        projects.update(current => {
            const index = current.get(project_id).tasks.findIndex(task => task.id===task_id)
            current.get(project_id).tasks.splice(index, 1)
            return current
        })
    },

    removeProject: async(project_id) => {
        projects.update(current => {
            current.delete(project_id);
            return current
        })
    },

    setFinished: async (task_id, project_id, set_to) => {
        set_to ? func.addFinished(project_id) : func.substractFinished(project_id);

        fetch(backend + `/set-finished?task_id=${task_id}&testing=${TESTING}`, {
            method: "PUT",
            headers: {"Content-type": "application/json"}
        })
        func.getTasks();
    }
}

setup();