
import { projects, tasks } from "../../stores/Tasks";

let _projects;
projects.subscribe(data => _projects = data)

let _tasks;
tasks.subscribe(data => _tasks = data);

let backend = "http://127.0.0.1:8000"

export const setup = async () => {
    await func.getProjects();    
    await func.getTodos();
}

const getJson = async (address) => {
    let response = await fetch(address);
    if(response.status === 200){
        let res = await response.json();
        return res 
    }
    console.error("Couldnt fetch from: " + address + ". Status code: " + response.status);
}

export const func = {

    getProjectUuid: (name) => {
        let uuid;
        if(_projects === undefined) return
        _projects.forEach(project => {
            if(project.title === name) uuid = project.uuid
        })
        return uuid;
    },
    
    getTodos: async () => {
        let res = await getJson(backend + "/get-todos");
        let data = res.todos;
        tasks.set(data)
        return data
    },
    
    getProjects: async () => {
        let res = await getJson(backend + "/get-projects");
        let data = res.projects;
        projects.set(data);
        return data
    },

    addProject: async (project) => {
        fetch(backend + "/add-project", {
            method: "POST",
            body: JSON.stringify(project),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        await func.getProjects();
    },

    addTodo: async (todo) => {
        fetch(backend + "/add-todo", {
            method: "POST",
            body: JSON.stringify(todo),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        await func.getTodos();
    }

}

setup();