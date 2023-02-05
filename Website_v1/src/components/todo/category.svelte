<script>
	import { states, colors } from '../../stores/Global';
	import { projects } from '../../stores/Tasks';

	import Sortable from "sortablejs";

	const color = $colors;

	import Todo from './todo.svelte';
	import AddTodoBtn from './addTodoBtn.svelte';

	export let title;
	export let project_id;
	let tasks;

	$: {tasks = $projects.get(project_id).tasks}

	let self;
	let sortable;
	$: {
		if(self !== undefined) {
			sortable = Sortable.create(self, {
				animation: 150,
			})
		}
	}

</script>

<div
	class="flex-shrink-0 height-full p-3 flex flex-col gap-2 rounded-xl overflow-y-auto"
	style="background-color: {color.darkColors[8]}; width: 22rem; border-color: {color.lightColors[0]}"
>
	<h2 class="text-slate-300 text-xl mb-1">{title}</h2>

	<div
	bind:this={self}
	class="flex flex-col"
	>
		<!-- Display Tasks -->
		{#if tasks}{#each tasks as task}
		<Todo {task}/>
		<span class="seperator bg-slate-700" />
		{/each} {/if}
	</div>

	<!-- Show that no tasks there -->
	{#if tasks.length === 0}
		<!-- <h2 class="text-slate-500 place-self-center text-xl">No Tasks</h2> -->
		<AddTodoBtn category={title} project={$projects.get(project_id)} customClasses="m-auto" />
	{:else}
		<AddTodoBtn category={title} project={$projects.get(project_id)} customClasses="mt-auto mb-5"/>
	{/if}
</div>


<style>
	::-webkit-scrollbar{
		height: 3px;
		width: 3px;
	}
	::-webkit-scrollbar-track{
		background: transparent;
	}
	::-webkit-scrollbar-thumb{
		background-color: rgb(161, 161, 192);
		border-radius: 5px;
	}

</style>