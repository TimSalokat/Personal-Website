<script>
	import { states, colors } from '../../stores/Global';
	import { projects, tasks } from '../../stores/Store_Todo';

	$states['activePage'] = 'Todos';

	import Project from '../../components/todo/projectCard.svelte';
	import Todo from '../../components/todo/todo.svelte';
</script>

<div 
class="bg-red-900 flex h-60 border-2 m-3 p-5 rounded-xl"
style="background-color: {$colors.darkColors[9]}; border-color: {$colors.darkColors[13]};"
>
    <h2>Overview or some shit</h2>
</div>

<div class="flex h-2/3 w-full">

        <!-- ? Projects Section -->
        <div 
        class="flex w-1/2 rounded-xl border-2 m-3 p-5 flex-col h-full" 
        style="background-color: {$colors.darkColors[9]}; border-color: {$colors.darkColors[13]};"
        >

            <h2 class="pb-4 text-2xl text-slate-200">Projects</h2>
            <div class="grid grid-cols-2 gap-5">

                {#each $projects as project}
                    <Project {project} />
                {/each}

            </div>

        </div>

        <!-- ? Important Tasks -->
        <div 
        class="flex w-1/2 rounded-xl border-2 m-3 p-5 flex-col h-full" 
        style="background-color: {$colors.darkColors[9]}; border-color: {$colors.darkColors[13]};"
        >

            <h2 class="text-2xl pb-4 text-slate-200">Important Tasks</h2>
            <div class="flex flex-col gap-3 stretch w-full">

                {#each $tasks as task}
                    <Todo {task} />
                {/each}

            </div>
        </div>
</div>