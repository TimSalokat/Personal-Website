<script>
	import Icon from 'svelte-icons-pack';
	import BiPlus from 'svelte-icons-pack/bi/BiPlus';

	import Sortable from 'sortablejs';

	import { states } from '$stores/Global';
	import { priorities } from '$stores/Tasks';

	import Task from './task.svelte';
	import Dropdown from '../base/inputs/dropdown.svelte';

	export let title;
	export let self;

	let selected_filter = -1;
	let filtered_tasks;
	$: {
		if (selected_filter != -1) {
			filtered_tasks = self.tasks.filter((task) => {
				return task.priority == selected_filter;
			});
		} else {
			filtered_tasks = self.tasks.sort(function (a, b) {
				return b.priority - a.priority;
			});
		}
	}

	let active_tasks;
	$: {
		active_tasks = filtered_tasks.filter((task) => {
			return !task.finished;
		});
	}

	let finished_tasks;
	$: {
		finished_tasks = filtered_tasks.filter((task) => {
			return task.finished;
		});
	}

	let sorting;
	let sortable;
	$: {
		if (sorting !== undefined) {
			sortable = Sortable.create(sorting, {
				animation: 150
			});
		}
	}

	const open_form = () => {
		$states.activeForm = 'AddTodo';
		$states.overlayActive = true;
		$states.overlay.project = self;
		$states.overlay.category = title;
	};
</script>

<div class="section_container">
	<Dropdown {title} options={$priorities} bind:selected={selected_filter} />

	<div class="section" bind:this={sorting}>
		{#each active_tasks as task}
			<Task {task} />
		{/each}

		{#each finished_tasks as task}
			<Task {task} />
		{/each}
	</div>

	<button
		class="add_task"
		style="
        display: flex;
        justify-content: center;
        align-items: center;"
		on:click={() => open_form()}
	>
		<Icon src={BiPlus} size="1.5rem" className="normal_icon_style" />
		<p>Add Task</p>
	</button>
</div>

<style lang="scss">

	.section_container {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 0.5rem;
	}

	.add_task {
		* {
			transition: 0.2s ease;
		}
		position: absolute;
		width: calc(50% - 2rem);
		height: 55px;
		border: 1px solid var(--gray4);
		border-radius: 0.5rem;
		bottom: 10px;
		left: 25%;
		fill: var(--gray4);
		p {
			font-size: 1.1rem;
			margin-top: 0.12rem;
			margin-left: 0.5rem;
			color: var(--gray4);
		}
		&:hover {
			background-color: var(--gray6);
			fill: var(--gray2);
			p {
				color: var(--gray2);
			}
		}
	}
</style>
