
<script>

    import Todo from "./todo.svelte";

    export let title;
    export let tasks = [];
    
</script>


<div class="w-96 flex-grow height-full p-5 border-r-2 border-slate-700 border-solid bg-slate-600 flex flex-col gap-2 rounded-xl">

    <h2 class="text-slate-300 text-xl">{title}</h2>

    <!-- Show that no tasks there -->
    {#if tasks.length === 0}
        <h2 class="text-slate-500 place-self-center my-auto text-xl">No Tasks</h2>
    {/if}

    <!-- Display Tasks -->
    {#each tasks as task }
        <Todo {task} light={true} customClasses="rounded-lg bg-slate-600 border-slate-800 border border-l hover:bg-slate-700"/>
        <span class="seperator bg-slate-700"/>
    {/each}
</div>