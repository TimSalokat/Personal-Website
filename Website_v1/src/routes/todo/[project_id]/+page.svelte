<script>
	export let data;

	import Icon from 'svelte-icons-pack/Icon.svelte';
	import BiPlus from 'svelte-icons-pack/bi/BiPlus';

	import { states, colors } from '../../../stores/Global';

	import { Projects, Tasks } from '../Todo';
	import Category from '../../../components/todo/category.svelte';

	$states['activePage'] = 'Todos';


	const uuid = data.params.project_id;
	const project = Projects.getById(uuid);

	$: tasks = Tasks.filterByProjectId(uuid); // TODO move this because at the moment you need to reload the page for the tasks to update
</script>

<div class="h-full w-full flex flex-col gap-0 overflow-hidden">
	<!-- ! Project Overview dont know if i wanna keep this -->
	<!-- <div class="w-full flex h-60 items-center">
		<div class="mb-3">
			<p class="text-slate-400 text-lg font-light mb-0">Project:</p>
			<h2
				class="text-xl font-extrabold font-mono text-slate-400"
				style="font-size: 3.5rem; -webkit-text-fill-color: transparent; -webkit-text-stroke: 1px; line-height: 2.5rem"
			>
				{project.title}
			</h2>
		</div>
	</div> -->

	<!-- Taks Categories -->
	<div class="flex h-full w-full flex-nowrap gap-5 overflow-x-auto p-5">
		<Category title="Todo" {tasks} project={project.title} />

		<Category title="Still buggy" {tasks} project={project.title} />

		<Category title="Implemented" {tasks} project={project.title} />

		<button 
		class="flex-shrink-0 height-full flex rounded-lg items-center justify-center border pt-7"
		style="width: 22rem; border-color: {$colors.lightColors[0]}; color: {$colors.lightColors[7]}; fill: {$colors.lightColors[7]}"
		>
			<Icon src={BiPlus} size="1.5rem" className="fill-inherit" />
			<p>Add Category</p>
		</button>
	</div>
</div>

<style>

	::-webkit-scrollbar{
		height: 3px;
	}
	::-webkit-scrollbar-track{
		background: transparent;
	}
	::-webkit-scrollbar-thumb{
		/* background-color: rgb(161, 161, 192); */
		background-color: transparent;
		border-radius: 5px;
	}

</style>