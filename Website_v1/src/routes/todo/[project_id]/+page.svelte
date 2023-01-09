
<script>

export let data;

import {states, colors} from "../../../stores/Global";

const color = $colors

import { Projects, Tasks } from "../Todo";

import Todo from "../../../components/todo/todo.svelte";
import Category from "../../../components/todo/category.svelte";

$states["activePage"] = "Todos";

const uuid = data.params.project_id;
const project = Projects.getById(uuid);

const tasks = Tasks.filterByProjectId(uuid);

</script>

<div class="p-5 h-screen w-full flex flex-col gap-0">

    <!-- Project Overview -->
    <div class="w-full flex h-80 items-center">

        <div class="mb-3">
            <p class="text-slate-400 text-lg font-light mb-0">Project: </p>
            <h2
                class="text-xl font-extrabold font-mono text-slate-400" 
                style="font-size: 3.5rem; -webkit-text-fill-color: transparent; -webkit-text-stroke: 1px; line-height: 2.5rem">
                {project.title}
            </h2>
        </div>


    </div>

    <!-- Taks Categories -->
    <div class="flex h-full w-full flex-wrap gap-5">
        
        <Category title="Todo" {tasks} project={project.title}/>

        <Category title="Still buggy" {tasks} project={project.title}/>

        <Category title="Implemented" project={project.title}/>

    </div>
</div>


<style>
    .seperator {
        margin-left: 10%;
        width: 80%;
        height: 1px;
    }
</style>