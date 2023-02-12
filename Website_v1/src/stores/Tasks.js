
import { writable } from 'svelte/store';

export let _tasks = [];
export let _projects = [];

export const projects = writable([]);
export const tasks = writable([]);

projects.set(_projects);
tasks.set(_tasks);