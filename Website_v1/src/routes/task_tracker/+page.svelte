<script>
	import Icon from "svelte-icons-pack";
    import BiPlus from 'svelte-icons-pack/bi/BiPlus';

    import "$routes/index.scss";

    import { states } from "$stores/Global";
    import { priorities, projects, tasks } from "$stores/Tasks";

    $states['activePage'] = 'Task Tracker';

    import "./tasks_main.scss"

    import ProjectCard from "$components/task_tracker/project_card.svelte";
    import Task from "$components/task_tracker/task.svelte";
    import Dropdown from "$components/base/inputs/dropdown.svelte";

    const open_form = () => {
		$states.activeForm = "AddProject";
		$states.overlayActive = true;
    }

    let selected_filter = 0;
    // Make this actually filter

</script>

<svelte:head>
    <title>Projects</title>
</svelte:head>

<div class="dashboard_container">

    <div class="dashboard_header">
        <h1>Good Morning <span style="color: var(--accent)">Admin</span></h1>
    </div>

    <div class="dashboard_projects">                
        {#if $projects} 
        {#each Array.from($projects.entries()) as [id, project]}
        <ProjectCard project_id={project.id} />
        {/each} {/if}

        <button 
        class="anim project_container" 
        style="
            display: flex;
            justify-content: center;
            align-items: center;"
        on:click={() => open_form()}
        >
            <Icon src={BiPlus} size="1.5rem" className="bigger_icon_style"/>
        </button>
    </div>
    
    <div class="dashboard_tasks">

        <Dropdown title="Tasks" options={$priorities} bind:selected={selected_filter}/>

        <div class="seperator"/>
        {#if $tasks} {#each $tasks as task, i}
            {#if i < 12} 
                <Task {task} show_project={true}/> 
            {/if}
        {/each} {/if}
    </div>
</div>

<style lang="scss">

    :global(.project_container) {
        display: grid;
        border-radius: .75rem;
        border: 1px solid var(--gray3);
        aspect-ratio: 3/1.7 !important;
        min-height: 35%;
        padding: 1rem;
        margin: .5rem;
        color: var(--gray7);
        fill: var(--gray4);

        grid-template-areas: 
        "title count"
        "bar progress";
        grid-template-columns: auto 45px;
        grid-template-rows: auto 15px;

        &:hover {
            cursor: pointer;
            background-color: var(--gray6);
            color: var(--gray2);
            fill: var(--gray2);
        }
    }

</style>