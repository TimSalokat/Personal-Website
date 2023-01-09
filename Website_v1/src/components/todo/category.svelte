
<script>
    import {states, colors} from "../../stores/Global";

    const color = $colors

    import Todo from "./todo.svelte";

    export let title;
    export let tasks = [];
    
</script>


<div class="w-96 flex-grow height-full p-5 flex flex-col gap-2 rounded-xl"
    style="background-color: {color.darkColors[9]};"
>

    <h2 class="text-slate-300 text-xl">{title}</h2>

    <!-- Show that no tasks there -->
    {#if tasks.length === 0}
        <h2 class="text-slate-500 place-self-center my-auto text-xl">No Tasks</h2>
    {/if}

    <!-- Display Tasks -->
    {#each tasks as task }
        <Todo {task} light={true} customClasses="rounded-lg hover:bg-slate-700"/>
        <span class="seperator bg-slate-700"/>
    {/each}
</div>