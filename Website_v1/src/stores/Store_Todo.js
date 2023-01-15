import { writable } from 'svelte/store';
import { _colors } from './Global';

import { func } from '../routes/todo/functions';

import { v4 as uuid } from 'uuid';

const projectColors = _colors['projectColors'];
const priorityColors = _colors['priorityColors'];

export const priorities = writable({});
export const projects = writable({});
export const tasks = writable({});



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

export let _projects = await func.getProjects();
if(_projects[0] == undefined) _projects = [];

export let __projects = [
	{
		title: 'Testing',
		color: '',

		priorities: [13, 2, 1, 1],
		totalTasks: 0,
		finishedTasks: 13,
		uuid: ''
	},
	{
		title: 'Working on',
		color: '',

		priorities: [1, 5, 10, 6],
		totalTasks: 0,
		finishedTasks: 19,
		uuid: ''
	},
	{
		title: 'Todo Project',
		color: '',

		priorities: [1, 6, 7, 2],
		totalTasks: 0,
		finishedTasks: 0,
		uuid: ''
	}
];

// _projects.forEach((project, i) => {
// 	project.color = projectColors[i];
// 	project.totalTasks = project.priorities?.reduce((x, y) => {
// 		return x + y;
// 	});
// 	project.uuid = uuid();
// });

export let _tasks = await func.getTodos();
if(_tasks[0] == undefined) _tasks = [];

// _tasks.forEach((task, index) => {
// 	//Add id
// 	task.id = uuid();

// 	// Add Priority Color
// 	let prio = ''; // TODO make this count to the project
// 	_priorities.forEach((priority, i) => {
// 		if (task.prio === i) {
// 			prio = priority.title;
// 			task.borderColor = priority.color;
// 			return;
// 		}
// 	});

// 	// Add Project color and project id
// 	_projects.forEach((project) => {
// 		if (task.project === project.title) {
// 			task.projectColor = project.color;
// 			task.project_id = project.uuid;
// 			project.totalTasks += 1;
// 			return;
// 		}
// 	});
// });

priorities.set(_priorities);
projects.set(_projects);
tasks.set(_tasks);
