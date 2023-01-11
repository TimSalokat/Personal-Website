import BiHome from 'svelte-icons-pack/bi/BiHome';
import BiSpreadsheet from 'svelte-icons-pack/bi/BiSpreadsheet';

import { writable } from 'svelte/store';

export const states = writable({});
export const consts = writable({});
export const colors = writable({});

export const _colors = {
	darkColors: [
		'#080716',
		'#09091A',
		'#0B0C1D',
		'#0C0E21',
		'#0E1025',
		'#0F1328',
		'#11152C',
		'#12182F',
		'#141A33',
		'#151C37',
		'#171F3A',
		'#18213E',
		'#1A2342',
		'#1B2645',
		'#1D2849',
		'#1E2B4C',
		'#202D50',
		'#212F54',
		'#233257',
		'#24345B'
	],
	lightColors: [
		'#51595F',
		'#5C646A',
		'#676F75',
		'#727980',
		'#7D848B',
		'#888F96',
		'#939AA1',
		'#9EA5AD',
		'#A9AFB8',
		'#B4BAC3',
		'#BFC5CE',
		'#CAD0D9',
		'#D5DAE4',
		'#E0E5EF',
		'#EBF0FA'
	],
	projectColors: [
		'#F6AE2D',
		'#7400b8',
		'#6930c3',
		'#5e60ce',
		'#5390d9',
		'#4ea8de',
		'#48bfe3',
		'#56cfe1',
		'#64dfdf',
		'#72efdd',
		'#80ffdb'
	],
	priorityColors: ['#03245E', '#023E8A', '#0077B6', '#C71F37']
};

const _consts = {
	Pages: [
		{
			title: 'Dashboard',
			icon: BiHome,
			link: '/'
		},
		{
			title: 'Todos',
			icon: BiSpreadsheet,
			link: '/todo'
		}
	]
};

const _states = {
	activePage: _consts['Pages'][0].title
};

colors.set(_colors);
consts.set(_consts);
states.set(_states);
