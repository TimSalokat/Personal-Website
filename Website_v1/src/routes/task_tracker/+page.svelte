<script>
    import { states } from "../../stores/Global";
    import { projects, tasks } from "../../stores/Tasks";
    $states['activePage'] = 'Task Tracker';

    import "./main.scss"

    import ProjectCard from "../../components/task_tracker/project_card.svelte";
    import Task from "../../components/task_tracker/task.svelte";

</script>

<div class="white_bg">

    <div class="dashboard_container">

        <div class="dashboard_header">
            <h1>Good Morning Admin</h1>
        </div>

        <div class="dashboard_projects">
            {#if $projects} 
            {#each Array.from($projects.entries()) as [id, project]}
            <ProjectCard {project} />
            {/each} {/if}
        </div>
        
        <div class="dashboard_tasks">
            {#if $tasks} {#each $tasks as task, i}
                {#if i < 12} <Task {task}/> {/if}
            {/each} {/if}
        </div>
        
    </div>

</div>