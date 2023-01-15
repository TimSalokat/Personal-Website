
import { _projects } from "../../stores/Store_Todo";

let backend = "http://127.0.0.1:8000"

let tasks;
let projects = [];

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
        _projects.forEach(project => {
            if(project.title === name) uuid = project.uuid
        })
        return uuid;
    },
    
    getTodos: async () => {
        tasks = await getJson(backend + "/get-todos");
        tasks = tasks.todos;
        return tasks
    },
    
    getProjects: async () => {
        projects = await getJson(backend + "/get-projects");
        projects = projects.projects;
        return projects
    },

    addProject: (project) => {
        fetch(backend + "/add-project", {
            method: "POST",
            body: JSON.stringify(project),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
    },

    addTodo: (todo) => {
        fetch(backend + "/add-todo", {
            method: "POST",
            body: JSON.stringify(todo),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
    }

}