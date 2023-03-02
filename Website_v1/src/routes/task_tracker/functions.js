
import { projects, tasks } from "$stores/Tasks";

import { states } from "$stores/Global";

const TESTING = true;

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

    get_section: (map, project_id, section_id) => {
        // return map.get(project_id).sections.filter((section) => {return section.id == section_id})[0]
        return map.get(project_id).sections.find((section)=>{return section.id == section_id})
    },

    get_task: (map, project_id, section_id, task_id) => {
        let section = func.get_section(map, project_id, section_id);
        return section.tasks.filter((task) => {return task.id == task_id})[0];
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
        return func.sort(filtered_tasks);
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

        // let res = await getJson(`/get-tasks?testing=${TESTING}`);
        // if(res) { data = res; }

        _projects.forEach((project)=>{
            project.sections.forEach((section)=>{
                data.push(...section.tasks);
            })
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
        newProject.sections = [];
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

    addSection: async(title, project_id) => {
        const res = await fetch(backend + `/add-section/?testing=${TESTING}`, {
            method: "POST",
            body: JSON.stringify({
                title: title
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                project_id: project_id
            }
        })
        const new_section = await res.json();
        new_section.tasks = [];
        projects.update(current => {
            current.get(project_id).sections.push(new_section);
            return current;
        })
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

        func.taskChangeProject(details);
        projects.update(current => {
            let updated_section = func.get_section(current, details.project_id, details.section_id);
            let updated_task = updated_section.tasks.filter(task=>task.id===details.task_id)[0]
            updated_task.title = task.title;
            updated_task.description = task.description;
            updated_task.priority = task.priority;
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

    renameSection: async(project_id, id, new_value) => {
        let details = {
            section_id: id,
            new_title: new_value,
        }
        const res = await fetch(backend + `/rename-section?testing=${TESTING}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                ...details
            }
        });

        projects.update(current => {
            let section_edit = func.get_section(current, project_id, id);
            section_edit.title = new_value;
            return current
        })
    },

    delTask: async(project_id, section_id, task_id) => {
        const res = await fetch(backend + `/del-task?testing=${TESTING}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                task_id
            }
        });

        func.removeTask(project_id, section_id, task_id);
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

    taskChangeProject: (details) => {
        if(details.section_id === details.old_section_id) return
        projects.update(current => {
            let moved_task = func.get_task(current, details.old_project_id, details.old_section_id, details.task_id);
            moved_task.project_id = details.project_id;
            moved_task.section_id = details.section_id;

            func.get_section(current, details.project_id, details.section_id).tasks.push(moved_task);

            func.removeTask(details.old_project_id, details.old_section_id, details.task_id);
            return current
        })

        func.reCalc(details.project_id);
        func.reCalc(details.old_project_id);
    },

    removeTask: async(project_id, section_id, task_id) => {
        projects.update(current => {
            const section = func.get_section(current, project_id, section_id);
            const index = section.tasks.findIndex(task => task.id===task_id)
            section.tasks.splice(index, 1)
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

        let res = await fetch(backend + `/set-finished?task_id=${task_id}&testing=${TESTING}`, {
            method: "PUT",
            headers: {"Content-type": "application/json"}
        })
        func.getTasks();
    }
}

setup();