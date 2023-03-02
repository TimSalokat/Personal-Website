
import { derived, writable } from 'svelte/store';

export let _tasks = [];
export let _projects;
export let _priorities = new Map([
    [0, {
        title: "Low",
        color: "var(--gray5)",
    }],
    [1, {
        title: "Medium",
        color: "#40BCD8",
    }],
    [2, {
        title: "High",
        color: "#FCAF58",
    }],
    [3, {
        title: "Critical",
        color: "#F21B3F",
    }],
]);

export const tasks = writable([]);
export const projects = writable(new Map());
export const priorities = writable();

tasks.set(_tasks);
projects.set(_projects);
priorities.set(_priorities);