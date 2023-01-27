<script>
	import { states, colors } from '../../stores/Global';
	import { tasks } from '../../stores/Tasks';

	const color = $colors;

	import Todo from './todo.svelte';
	import AddTodoBtn from './addTodoBtn.svelte';

	export let title;
	export let project;
	export let uuid;
	// export let tasks = [];

	let _tasks;

	$: {
		_tasks = $tasks.filter((task) => {
			return task.project_uuid === uuid;
		});
	}

</script>

<div
	class="w-96 flex-grow height-full p-5 flex flex-col gap-2 rounded-xl"
	style="background-color: {color.darkColors[9]};"
>
	<h2 class="text-slate-300 text-xl mb-1">{title}</h2>

	<!-- Display Tasks -->
	{#each _tasks as task}
		<Todo {task}/>
		<span class="seperator bg-slate-700" />
	{/each}

	<!-- Show that no tasks there -->
	{#if _tasks.length === 0}
		<!-- <h2 class="text-slate-500 place-self-center text-xl">No Tasks</h2> -->
		<AddTodoBtn category={title} {project} customClasses="m-auto" />
	{:else}
		<AddTodoBtn category={title} {project} />
	{/if}
</div>
