import BiHome from 'svelte-icons-pack/bi/BiHome';
import BiSpreadsheet from 'svelte-icons-pack/bi/BiSpreadsheet';
import BiCategory from 'svelte-icons-pack/bi/BiCategory';

import { writable } from 'svelte/store';

export const states = writable({});
export const consts = writable({});

const _consts = {
	
	backend: "http://127.0.0.1:8000",
	testing: true,

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
		}
	],

};

const _states = {
	activePage: _consts['Pages'][0].title,
	activeForm: "AddTodo",

	dark_mode: true,
	server_connection: false,
	
	loading: false,
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

consts.set(_consts);
states.set(_states);
