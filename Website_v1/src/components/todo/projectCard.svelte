<script>
	import DonutChart from '../base/donutChart.svelte';
	import { colors } from '../../stores/Global';
	import { func } from '../../routes/todo/functions';
	import { projects } from '../../stores/Tasks';

	export let project;
	
	const total = func.calcTotal(project.id);
	const finished = func.calcFinished(project.id);
	
	let ratio = Math.round((finished / total) * 100);
	if(total == 0){ratio = 0}

	$: {
		ratio = Math.round(($projects.get(project.id).finished_tasks / $projects.get(project.id).finished_tasks) * 100)
		if(total == 0){ratio = 0}
	}

</script>

<a 
    href="/todo/{project.id}"
    id="" 
    class="relative w-full p-4 pl-3 flex h-16 rounded-lg"
	style="background-color: {$colors.darkColors[12]}"
    >

	<div class="rounded-full h-6 w-6 my-auto" style="background-color: {project.color};"/>
   
    <!-- Heading -->
    <div 
	class="flex flex-col h-full justify-center pb-3 px-0 pl-3"
	style="color: {$colors.lightColors[10]}"
	>
        <h2
            class="text-l font-semibold" 
            style="">
            {project.title}
        </h2>
        <p 
		class="" 
		style="font-size: .75rem; line-height: .5rem; color: {$colors.lightColors[6]}"
		>
			{total} Tasks
		</p>
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
			style="width:{ratio + "%"}; background-color: {project.color}"
		/>
	</div>
	<p class="absolute right-1 bottom-1 text-xs">
		{ratio} %
	</p>
</a>

<style>
	* {
		transition: scale 0.25s ease;
	}
</style>
