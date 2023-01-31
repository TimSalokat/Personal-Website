<script>
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import BiPlus from 'svelte-icons-pack/bi/BiPlus';
    
    import { states, colors } from '../../stores/Global';
    import { projects, tasks } from '../../stores/Tasks';

	$states['activePage'] = 'Todos';

	import Project from '../../components/todo/projectCard.svelte';
	import Todo from '../../components/todo/todo.svelte';

    function handleClick() {
		$states.activeForm = "AddProject";
		$states.overlayActive = true;
	}

</script>

<div class="p-4 my-auto h-full relative flex flex-col gap-2">
        
    <div 
    class="bg-red-900 flex h-60 border-2 p-3 rounded-xl"
    style="background-color: {$colors.darkColors[8]}; border-color: {$colors.darkColors[13]};"
    >
        <h2>Overview or some shit</h2>
    </div>

    <div class="flex h-full w-full flex-grow gap-2">
        <!-- ? Projects Section -->
        <div 
        class="flex w-1/2 rounded-xl border-2 p-3 flex-col" 
        style="background-color: {$colors.darkColors[8]}; border-color: {$colors.darkColors[13]};"
        >

            <h2 class="pb-4 text-2xl text-slate-200">Projects</h2>
            <div class="grid grid-cols-2 gap-3">

                {#if $projects} {#each $projects as project}
                    <Project {project} />
                {/each} {/if}

                <button
                class="relative w-full p-4 h-16 rounded-lg border-2 flex justify-center"
                style="border-color: {$colors.darkColors[15]}; color: {$colors.lightColors[7]}; fill: {$colors.lightColors[7]}"
                on:click={handleClick}
                on:keypress={() => console.log('keypress')}
                >
                    <Icon src={BiPlus} size="1.5rem" className="fill-inherit" />    
                    <h2>Add Project</h2>
                </button>

            </div>

        </div>

        <!-- ? Important Tasks -->
        <div 
        class="flex w-1/2 rounded-xl border-2 p-3 flex-col h-full" 
        style="background-color: {$colors.darkColors[8]}; border-color: {$colors.darkColors[13]};"
        >

            <h2 class="text-2xl pb-4 text-slate-200">Important Tasks</h2>
            <div class="flex flex-col w-full h-min">

                {#if $tasks} {#each $tasks as task, i}
                    {#if i < 5}
                    <Todo {task} />
                    {/if}
                {/each} {/if}

            </div>
        </div>
    </div>
</div>

<style>
    ::-webkit-scrollbar{
		height: 3px;
		width: 3px;
	}
	::-webkit-scrollbar-track{
		background: transparent;
	}
	::-webkit-scrollbar-thumb{
		background-color: rgb(161, 161, 192);
		border-radius: 5px;
	}
</style>