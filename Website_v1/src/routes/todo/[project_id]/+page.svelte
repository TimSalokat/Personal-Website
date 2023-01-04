
<script>

export let data;

import {states} from "../../../stores/Global";
import { Projects, Tasks } from "../Todo";

import Todo from "../../../components/todo/todo.svelte";

$states["activePage"] = "Todos";

const uuid = data.params.project_id;
const project = Projects.getById(uuid);

const tasks = Tasks.filterByProjectId(uuid);

console.log(tasks);

</script>

<div class="p-5 h-screen w-full flex flex-row gap-0">
    <div class="min-w-80 w-1/3 h-full p-5 border-r-2 border-slate-700 border-solid flex flex-col gap-2">

        <h2 class="text-slate-400 text-xl">For Praktikum</h2>

        <!-- Show that no tasks there -->
        {#if tasks.length === 0}
            <h2>No Tasks here</h2>
        {/if}

        <!-- Display Tasks -->
        {#each tasks as task }
            <Todo {task} customStyle="" customClasses="rounded-none hover:rounded-lg"/>
            <span class="seperator bg-slate-700"/>
            <Todo {task} customStyle="" customClasses="rounded-none hover:rounded-lg"/>
            <span class="seperator bg-slate-700"/>
            <Todo {task} customStyle="" customClasses="rounded-none hover:rounded-lg"/>
            <span class="seperator bg-slate-700"/>
            <Todo {task} customStyle="" customClasses="rounded-none hover:rounded-lg"/>
            <span class="seperator bg-slate-700"/>
            <Todo {task} customStyle="" customClasses="rounded-none hover:rounded-lg"/>
            <span class="seperator bg-slate-700"/>
            <Todo {task} customStyle="" customClasses="rounded-none hover:rounded-lg"/>
            <span class="seperator bg-slate-700"/>
        {/each}
    </div>

    <div class="min-w-80 w-1/3 h-full p-5 border-r-2 border-slate-700 border-solid flex flex-col gap-2">

        <h2 class="text-slate-400 text-xl">For smthing else</h2>

        <!-- Show that no tasks there -->
        {#if tasks.length === 0}
            <h2>No Tasks here</h2>
        {/if}

        <!-- Display Tasks -->
        {#each tasks as task }
            <Todo {task} customStyle="" customClasses="border-b-slate-600 border-b rounded-none hover:rounded-lg"/>
        {/each}
    </div>
</div>


<style>
    .seperator {
        margin-left: 10%;
        width: 80%;
        height: 1px;
    }
</style>