import { writable } from "svelte/store";
import { _colors } from "./Global";

import { Projects } from "../routes/todo/Todo";

import { v4 as uuid } from "uuid";

const projectColors = _colors["projectColors"];
const priorityColors = _colors["priorityColors"];


export const priorities = writable({});
export const projects = writable({});
export const tasks = writable({});

let _priorities = [
    ["Whatever", "Should do", "Must do", "Do ASAP"],
    {
        title: "Whatever",
        color: priorityColors[0],
    },
    {
        title: "Should do",
        color: priorityColors[1],
    },
    {
        title: "Must do",
        color: priorityColors[2],
    },
    {
        title: "Do ASAP",
        color: priorityColors[3],
    },
]

export let _projects = [
    {
        title: "Testing",
        color: "",

        priorities: [13,2,1,1],
        totalTasks: 0,
        finishedTasks: 13,
        uuid: "",
    },
    {
        title: "Working on",
        color: "",
        
        priorities: [1,5,10,6],
        totalTasks: 0,
        finishedTasks: 19,
        uuid: "",
    },
    {
        title: "Todo Project",
        color: "",

        priorities: [1,6,7,2],
        totalTasks: 0,
        finishedTasks: 0,
        uuid: "",
    },
    {
        title: "Testinggg",
        color: "",

        priorities: [3,2,1,1],
        totalTasks: 0,
        finishedTasks: 2,
        uuid: "",
    },
    {
        title: "Working onnn",
        color: "",

        priorities: [17,2,7,1],
        totalTasks: 0,
        finishedTasks: 6,
        uuid: "",
    },
    {
        title: "Todo Project",
        color: "",

        totalTasks: 0,
        finishedTasks: 11,
        priorities: [11,2,3,3],
        uuid: "",
    }
];


_projects.forEach((project, i) => {
    project.color = projectColors[i];
    project.totalTasks = project.priorities?.reduce((x,y) => {return x+y});
    project.uuid = uuid();
})

export let _tasks = [
    {
        project: "Todo Project",
        title: "Do some stuff",
        desc: "This means that you shall do some stuff",
        finished: false,
        prio: 2,

        pColor: "",
        borderColor: "",

        id: "",
        project_id: ""
    },
    {
        project: "Working on",
        title: "Do stuff",
        desc: "This means that you shall do some stuff",
        finished: true,
        prio: 3,

        pColor: "",
        borderColor: "",

        id: "",
        project_id: ""
    },
    {
        project: "Testing",
        title: "Do some more stuff",
        desc: "",
        finished: false,
        prio: 4,

        projectColor: "",
        borderColor: "",

        id: "",
        project_id: ""
    },
]

_tasks.forEach((task, index)=> {

    //Add id
    task.id = uuid();

    // Add Priority Color
    let prio = "";  // TODO make this count to the project
    _priorities.forEach((priority, i) => {
        if(task.prio === i) {
            prio = priority.title;
            task.borderColor = priority.color;
            return
        }
    })

    // Add Project color and project id
    _projects.forEach((project) => {
        if(task.project === project.title){
            task.projectColor = project.color;
            task.project_id = project.uuid;
            project.totalTasks += 1;
            return
        }
    })
})

priorities.set(_priorities);
projects.set(_projects);
tasks.set(_tasks);