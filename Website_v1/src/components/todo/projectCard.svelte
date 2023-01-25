<script>
	import DonutChart from '../base/donutChart.svelte';
	import { priorities } from '../../routes/todo/functions';
	import { colors } from '../../stores/Global';
	export let project;
</script>

<a 
    href="/todo/{project.uuid}"
    id="" 
    class="relative w-full p-4 flex h-16 rounded-lg"
	style="background-color: {$colors.darkColors[12]}"
    >

	<div class="rounded-full h-6 w-6 my-auto" style="background-color: {project.color};"/>
   
    <!-- Heading -->
    <div 
	class="flex flex-col h-full justify-center pb-3 px-0 pl-2"
	style="color: {$colors.lightColors[10]}"
	>
        <h2
            class="text-l font-semibold" 
            style="">
            {project.title}
        </h2>
        <p class="text-sm" style="line-height: 1rem; color: {$colors.lightColors[6]}">15 Tasks</p>
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
</style>
