<script>
	export let data;

	import { states, colors } from '../../../stores/Global';
	import { tasks } from '../../../stores/Tasks';
	import { Projects } from '../functions';

	import Category from '../../../components/todo/category.svelte';

	$states['activePage'] = 'Todos';

	const uuid = data.params.project_id;
	const project = Projects.getById(uuid);
</script>

<div class="h-full w-full flex flex-col gap-0 overflow-hidden">
	<!-- Project Overview -->
	<div class="w-full flex h-60 items-center">
		<div class="mb-3">
			<p class="text-slate-400 text-lg font-light mb-0">Project:</p>
			<h2
				class="text-xl font-extrabold font-mono text-slate-400"
				style="font-size: 3.5rem; -webkit-text-fill-color: transparent; -webkit-text-stroke: 1px; line-height: 2.5rem"
			>
				{project.title}
			</h2>
		</div>
	</div>

	<!-- Taks Categories -->
	<div class="flex h-full w-full flex-wrap gap-5">
		<Category title="Todo" {uuid} {project} />

		<Category title="Still buggy" {uuid} {project} />

		<Category title="Implemented" {uuid} {project} />
	</div>
</div>