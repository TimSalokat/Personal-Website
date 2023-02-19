<script>
	import Icon from 'svelte-icons-pack';
	import BiPlus from 'svelte-icons-pack/bi/BiPlus';

	import Sortable from 'sortablejs';

	import { states } from '$stores/Global';
	import { priorities, projects } from '$stores/Tasks';
	import { func } from '$routes/task_tracker/functions';

	import Task from './task.svelte';
	import Dropdown from '../base/inputs/dropdown.svelte';

	export let section_id;
	export let project_id;

	let self;
	$: {
		self = $projects.get(project_id).sections.filter(section => {return section.id == section_id})[0]
		// console.log(self);
	}

	let selected_filter = -1;
	let displayed_tasks;
	$:{
		displayed_tasks = func.filter_by_prio(self.tasks, selected_filter);
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
		$states.overlay.project_id = project_id;
		$states.overlay.section_id = section_id;
	};
</script>

<div class="section_container">
	<Dropdown title={self.title} options={$priorities} bind:selected={selected_filter} />

	<div class="section" bind:this={sorting}>
		{#if displayed_tasks != undefined && displayed_tasks.length != 0}
			
			{#each displayed_tasks as task}
				<Task {task} />
			{/each}

		{:else}
		<h5>No tasks here</h5>
		{/if}
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

	h5 {
		align-self: center;
		margin-top: 40%;
		text-align: center;
        font-size: 1.1rem;
        line-height: 1.4rem;
	}

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
