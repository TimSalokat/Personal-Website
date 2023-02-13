import BiHome from 'svelte-icons-pack/bi/BiHome';
import BiSpreadsheet from 'svelte-icons-pack/bi/BiSpreadsheet';
import BiCategory from 'svelte-icons-pack/bi/BiCategory';

import { writable } from 'svelte/store';

export const states = writable({});
export const consts = writable({});

const _consts = {
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
	]
};

const _states = {
	activePage: _consts['Pages'][0].title,
	activeForm: "AddTodo",

	dark_mode: false,
	
	loading: false,
	load_for: (ms) => {
		_states.loading = true;
		setTimeout(() => {
			states.update((current) => {
				current.loading = false;
				return current
			})
		}, ms)
		// _states.loading = true
	},

	overlay: {},
	overlayActive: false,
	setOverlay : (newState) => {_states.overlayActive = newState;},
};

consts.set(_consts);
states.set(_states);
