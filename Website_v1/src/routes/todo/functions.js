
import { writable } from 'svelte/store';
import { _colors } from '../../stores/Global';

export const priorities = writable([]);
export const projects = writable([]);
export const tasks = writable([]);

let backend = "http://127.0.0.1:8000"

export let _tasks = [];
export let _projects = [];

const priorityColors = _colors['priorityColors'];

export const setup = async () => {
    await func.getProjects();
    // if(_projects[0] == undefined) _projects = [];
    
    await func.getTodos();
    // if(_tasks[0] == undefined) _tasks = [];
}

let _priorities = [
	['Whatever', 'Should do', 'Must do', 'Do ASAP'],
	{
		title: 'Whatever',
		color: priorityColors[0]
	},
	{
		title: 'Should do',
		color: priorityColors[1]
	},
	{
		title: 'Must do',
		color: priorityColors[2]
	},
	{
		title: 'Do ASAP',
		color: priorityColors[3]
	}
];

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
    
    getTodos: async (getNew=false) => {
        if(getNew || _tasks.length == 0) {
            let res = await getJson(backend + "/get-todos");
            tasks.set(res.todos);
            _tasks = res.todos;
        }
        return _tasks
    },
    
    getProjects: async (getNew=false) => {
        if(getNew || _projects.length == 0){
            let res = await getJson(backend + "/get-projects");
            projects.set(res.projects);
            _projects = res.projects;
        }
        return _projects
    },

    addProject: (project) => {
        fetch(backend + "/add-project", {
            method: "POST",
            body: JSON.stringify(project),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        func.getProjects(true);
    },

    addTodo: (todo) => {
        fetch(backend + "/add-todo", {
            method: "POST",
            body: JSON.stringify(todo),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        func.getTodos(true);
    }

}

setup();

priorities.set(_priorities);
projects.set(_projects);
tasks.set(_tasks);