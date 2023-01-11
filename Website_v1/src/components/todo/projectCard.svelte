<script>
	import DonutChart from '../base/donutChart.svelte';
	import { priorities } from '../../stores/Store_Todo';
	import { colors } from '../../stores/Global';
	export let project;
</script>

<a
	href="/todo/{project.uuid}"
	id="projectContainer"
	class="self-stretch bg-slate-900 shadow-l hover:scale-105 rounded-2xl p-3 relative overflow-hidden w-1/4 h-40 flex-grow w-"
	style="background-color: {project.color}; min-width: 18rem; max-width: 21rem"
>
	<!-- Heading -->
	<div class="flex flex-col h-full justify-center pb-2 px-0">
		<h2 class="text-xl font-extrabold text-slate-400 pb-2" style="font-size: 2.7rem;">
			{project.title}
		</h2>
		<p class="text-slate-500 pl-1" style="line-height: 1.1rem;">
			Total Tasks 15 <br /> Finished 20%
		</p>
	</div>

<a 
    href="/todo/{project.uuid}"
    id="projectContainer" 
    class="self-stretch bg-slate-900 shadow-l hover:scale-105 rounded-2xl p-3 relative overflow-hidden w-1/4 h-44 flex-grow w-" 
    style="background-color: {project.color}; min-width: 18rem; max-width: 21rem"
    >
   
    <!-- Heading -->
    <div class="flex flex-col h-full justify-center pb-2 px-0">
        <h2
            class="text-xl font-extrabold text-slate-400 pb-2" 
            style="font-size: 2.2rem;">
            {project.title}
        </h2>
        <p class="text-slate-500 pl-1 text-sm" style="line-height: 1rem;">Total Tasks 15 <br/> Finished 20% </p>
    </div>
    
    <!-- Chart and Text -->
    <!-- <div class="flex pb-2">
        <DonutChart
            labels={$priorities[0]}
            fontMid="13px Arial"
            fontColor="#fff"
            passColors={$colors["priorityColors"]}
            data={project.priorities}
            plugins={"mid"} 
        /> 
        <div class="flex flex-col stretch text-slate-400 {project.text} text-xs justify-center mb-2 pl-3 ">
            <p>PrioOne: </p>
            <p>PrioTwo: </p>
            <p>PrioThree: </p>
            <p>PrioFour: </p>
        </div>
        <div class="flex flex-col stretch text-slate-400 {project.text} text-xs justify-center mb-2 pl-3">
            {#each project.priorities as prio}
                <p>{prio}<br/></p>
            {/each}
        </div>
    </div> -->

	<!-- Progress Bar -->
	<div
		class="absolute flex w-3/4 z-10 bg-slate-700 rounded-full"
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
