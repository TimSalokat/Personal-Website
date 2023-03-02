<script>
	import Icon from 'svelte-icons-pack';
	import BiPlus from 'svelte-icons-pack/bi/BiPlus';

	import Sortable from 'sortablejs';

	import { states } from '$stores/Global';
	import { priorities, projects } from '$stores/Tasks';
	
	import { f_section } from "$scripts/task_tracker/sections";
	import { f_task } from "$scripts/task_tracker/tasks";

	import Task from './task.svelte';
	import Dropdown from '../base/inputs/dropdown.svelte';

	export let section_id;
	export let project_id;

	let self;
	$: {
		self = $projects.get(project_id).sections.filter(section => {return section.id == section_id})[0]
	}

	let selected_filter = -1;
	let displayed_tasks;
	$:{
		displayed_tasks = f_task.filter_by_prio(self.tasks, selected_filter);
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
	<Dropdown 
		title={self.title}
		options={$priorities}
		bind:selected={selected_filter}
		editable={true}
		on_edit={(text) => {f_section.edit(self.project_id, self.id, text)}}
		/>

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
		class="button add_task"
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

	 :global(.section) {
        position: relative;
        display: flex;
        flex-direction: column;
        color: var(--gray4);
        height: calc(100% - 80px);
		padding: .5rem;
        padding-bottom: 40px;
		border-radius: .5rem;
        min-width: 400px;
        max-width: 400px;
        overflow-y: auto;
		background-color: var(--gray2);
    }

	h5 {
		align-self: center;
		margin-top: auto;
		margin-bottom: auto;
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
        background-color: var(--gray1);
	}

	.add_task {
		* { transition: 0.2s ease;}
		position: absolute;
		z-index: 2;
		width: calc(180px);
		height: 55px;
		bottom: 10px;
		left: calc(50% - 90px);
		font-size: 1rem;
		fill: var(--gray7);
		background-color: var(--gray1);
		&:hover {
			background-color: var(--gray6);
			fill: var(--gray2);
			p {
				color: var(--gray2);
			}
		}
	}
</style>
