<script lang="ts">
	import { states, colors } from '../../stores/Global';
	import { projects, tasks } from '../../stores/Store_Todo';

	$states['activePage'] = 'Todos';

	import Project from '../../components/todo/projectCard.svelte';
	import Todo from '../../components/todo/todo.svelte';

	import DonutChart from '../../components/base/donutChart.svelte';
</script>

<div class="flex h-full w-full">

        <!-- ? Projects Section -->
        <div 
        class="flex w-1/2 rounded-xl border-2 m-5 p-5 flex-col" 
        style="background-color: {$colors.darkColors[12]}; border-color: {$colors.darkColors[15]}; height: 50%;"
        >

            <h2 class="pb-4 text-2xl text-slate-200">Projects</h2>
            <div class="flex flex-wrap">
                {#each $projects as project}
                    <Project {project} />
                {/each}
            </div>

        </div>

        <!-- ? Important Tasks -->
        <div 
        class="flex w-1/2 rounded-xl border-2 m-5 p-5 flex-col" 
        style="background-color: {$colors.darkColors[12]}; border-color: {$colors.darkColors[15]}; height: 50%;"
        >

            <h2 class="text-2xl pb-2 text-slate-200">Important Tasks</h2>
            <div class="flex flex-col gap-3 stretch w-full">

                {#each $tasks as task}
                    <Todo {task} />
                {/each}
            </div>
        </div>
</div>