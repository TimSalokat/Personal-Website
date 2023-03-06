import BiHome from 'svelte-icons-pack/bi/BiHome';
import BiCategory from 'svelte-icons-pack/bi/BiCategory';
import RiSystemSettings3Line from "svelte-icons-pack/ri/RiSystemSettings3Line";

import { writable } from 'svelte/store';

export const states = writable({});
export const consts = writable({});
export const user = writable({});

const _consts = {
	
	backend: "http://127.0.0.1:8000",

	Pages: [
		{
			title: 'Dashboard',
			icon: BiHome,
			link: '/'
		},
		{
			title: 'Task Tracker',
			icon: BiCategory,
			link: '/task_tracker',
		},
		{
			title: 'Settings',
			icon: RiSystemSettings3Line,
			link: '/settings',
		}
	],

};

const _states = {
	activePage: _consts['Pages'][0].title,
	activeForm: "AddTodo",

	dark_mode: true,
	server_connection: false,
	
	loading: true,
	load: (ms, func) => {
		states.update((current) => {
			current.loading = true;
			return current;
		})

		setTimeout(() => { func(); }, 200)

		setTimeout(() => {
			states.update((current) => {
				current.loading = false;
				return current
			})}, ms)
	},

	overlay: {},
	overlayActive: false,
	setOverlay : (newState) => {_states.overlayActive = newState;},
};

const _user = {
	username: "",
	role: "",
}

consts.set(_consts);
states.set(_states);
user.set(_user);
