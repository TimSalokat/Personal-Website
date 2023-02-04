
import { projects, tasks } from "../../stores/Tasks";

let _projects;
projects.subscribe(data => _projects = data)

let _tasks;
tasks.subscribe(data => _tasks = data);

let backend = "http://127.0.0.1:8000"

export const setup = async () => {
    await func.getProjects();    
    await func.getTasks();
}

const getJson = async (address) => {
    const target = backend + address;
    let response = await fetch(target);
    if(response.status === 200){
        let res = await response.json();
        console.log("Fetch from: " + address)
        console.log(res);
        return res 
    } else {
        console.error("Couldnt fetch from: " + address + ". Status code: " + response.status);
        return false
    }
}

export const func = {

    getTodoByUuid: (uuid) => {
        let _task;
        _tasks.forEach(task => {
            if(task.uuid === uuid) _task = task;
        })
        return _task 
    },

    getProjectByName: (name) => {
        let uuid;
        if(_projects === undefined) return
        _projects.forEach(project => {
            if(project.title === name) uuid = project.id
        })
        return uuid;
    },
    
    getTasks: async () => {
        let data = [];
        let res = await getJson("/get-tasks");
        if(res) data = res;
        tasks.set(data)
        return data
    },
    
    getProjects: async () => {
        let data = [];
        let res = await getJson("/get-projects");
        if(res) data = res;
        projects.set(data);
        return data
    },

    addProject: async (project) => {
        const res = await fetch(backend + "/add-project", {
            method: "POST",
            body: JSON.stringify(project),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        let newProject = await res.json()
        projects.update(current => {
            current.push(newProject)
            return current;
        })
    },

    addTask: async (todo, project_id) => {
        projects.update(current => {
            let index = current.findIndex(item => item.id == project_id)
            current[index].total_tasks += 1;
            return current
        })

        const res = await fetch(backend + `/add-task/${project_id}`, {
            method: "POST",
            body: JSON.stringify(todo),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        const newTask = await res.json()
        tasks.update(current => {
            current.push(newTask);
            return current;
        })
    },

    setFinished: async (task_id, project_id, set_to) => {
        projects.update(current => {
            let index = current.findIndex(item => item.id == project_id)
            if(set_to) current[index].finished_tasks += 1;
            else current[index].finished_tasks -= 1;
            return current
        })

        fetch(backend + `/set-finished?task_id=${task_id}`, {
            method: "put",
            headers: {"Content-type": "application/json"}
        })
    }
}

class _Projects {
	getById(id) {
		let response;
		_projects.forEach((project) => {
			if (id == project.id) {
				response = project;
			}
		});
		return response;
	}
}

export const Projects = new _Projects();

setup();