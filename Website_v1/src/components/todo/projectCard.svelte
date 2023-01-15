<script>
	import DonutChart from '../base/donutChart.svelte';
	import { priorities } from '../../stores/Store_Todo';
	import { colors } from '../../stores/Global';
	export let project;
</script>

<a 
    href="/todo/{project.uuid}"
    id="" 
    class="relative xl:w-1/2 w-full p-2 flex h-14"
    >

	<div class="rounded h-6 w-6 my-auto" style="background-color: {project.color};"/>
   
    <!-- Heading -->
    <div class="flex flex-col h-full justify-center pb-3 px-0 pl-2">
        <h2
            class="text-l font-semibold text-slate-400" 
            style="">
            {project.title}
        </h2>
        <p class="text-slate-500 text-sm" style="line-height: 1rem;">15 Tasks</p>
    </div>
    
        <!-- <DonutChart
            labels={$priorities[0]}
            fontMid="13px Arial"
            fontColor="#fff"
            passColors={$colors["priorityColors"]}
            data={project.priorities}
            plugins={"mid"} 
        />  -->

	<!-- Progress Bar -->
	<div
		class="absolute flex w-3/5 z-10 bg-slate-700 rounded-full ml-4"
		style="left: 12.5%; bottom: 12.5%; height: 3px"
	>
		<span
			class="h-full"
			style="width:{(project.finishedTasks / project.totalTasks) * 100 +
				'%'}; background-color: {project.color}"
		/>
	</div>
</a>

<style>
	* {
		transition: scale 0.25s ease;
	}

	#projectContainer::before {
		@apply bg-slate-900;
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		-webkit-clip-path: polygon(75% 0%, 100% 35%, 100% 100%, 20% 100%, 0% 70%, 0 0);
		clip-path: polygon(75% 0%, 100% 35%, 100% 100%, 20% 100%, 0% 70%, 0 0);
		box-shadow: 0px 0px 60px 1px #090f1e inset;
		scale: 1.05;
	}
	#projectContainer:hover::before {
		scale: 1.05;
	}
	#projectContainer * {
		z-index: 10;
	}
</style>
