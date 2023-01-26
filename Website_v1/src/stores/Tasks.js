
import { writable } from 'svelte/store';
import { _colors } from "./Global";

export let _tasks = [];
export let _projects = [];

const priorityColors = _colors['priorityColors'];
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

export const priorities = writable([]);
export const projects = writable([]);
export const tasks = writable([]);

priorities.set(_priorities);
projects.set(_projects);
tasks.set(_tasks);