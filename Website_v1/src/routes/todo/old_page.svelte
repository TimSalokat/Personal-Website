<script lang="ts">
	import { states, colors } from '../../stores/Global';
	import { projects, tasks } from '../todo/functions';

	$states['activePage'] = 'Todos';

	import Project from '../../components/todo/projectCard.svelte';
	import Todo from '../../components/todo/todo.svelte';

	import DonutChart from '../../components/base/donutChart.svelte';
</script>

<div class="grid grid-cols-7 grid-rows-5 w-full h-screen">
	<!-- ? Overview -->
	<!-- TODO outsource these two to seperate files. Need to make a data store first -->
	<div
		class="flex flex-col col-span-7 row-span-2 xl:col-span-5 border-b-2 border-indigo-900 mx-5 p-2"
	>
		<h2 class="text-2xl pt-1 pb-3 text-slate-200">Overview</h2>
		<div class="flex mb-10 gap-10 px-5 no-wrap max-h-52 min-w-max">
			<!-- ? Unfinished Overview -->
			<div class="w-1/2 bg-slate-900 rounded-2xl p-3">
				<h2 class="text-slate-400 text-xl">All Unfinished Tasks</h2>

				<div class="flex max-h-40">
					<DonutChart
						width="w-52"
						height="h-40"
						labels={['Testing', 'WorkingOn', 'Todo Website']}
						data={[11, 11, 4]}
						passColors={$colors['projectColors']}
						plugins={'mid,side'}
					/>

					<div class="text-slate-400 text-l flex flex-col justify-center mb-5 pl-3">
						<h3>Testing: 11</h3>
						<h3>Working On: 11</h3>
						<h3>Todo Website: 4</h3>
					</div>
				</div>
			</div>

			<!-- ? Priority  Overview -->
			<div class="w-1/2 bg-slate-900 rounded-2xl mt-0 p-3 max-h-52 min-w-fit">
				<h2 class="text-slate-400 text-xl">Priority of Tasks</h2>
				<div class="flex max-h-40">
					<DonutChart
						height={'h-40'}
						width={'w-52'}
						labels={['Casual', 'Should be done', 'Has to be done', 'Do this ASAP']}
						data={[9, 21, 6, 8]}
						plugins={['mid', 'side']}
						passColors={$colors['priorityColors']}
					/>

					<div class="text-slate-400 text-l flex flex-col justify-center mb-5 pl-3">
						<h3>Testing: 9</h3>
						<h3>Working On: 21</h3>
						<h3>Todo Website: 6</h3>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- ? Important Tasks -->
	<div class="stretch hidden row-span-5 col-span-2 xl:flex">
		<div class="flex flex-col gap-3 stretch border-l-2 border-indigo-900 w-full p-5 pt-0 my-10">
			<h2 class="text-2xl pb-2 text-slate-200">Important Tasks</h2>

			{#each $tasks as task}
				<Todo {task} />
			{/each}
		</div>
	</div>

	<!-- ? Projects Section -->
	<div class="col-span-7 row-span-3 xl:col-span-5 p-10 pt-2">
		<h2 class="pb-4 text-2xl text-slate-200">Projects</h2>
		<div class="flex flex-wrap gap-5 pb-5 justify-center">
			{#each $projects as project}
				<Project {project} />
			{/each}
		</div>
	</div>
</div>
