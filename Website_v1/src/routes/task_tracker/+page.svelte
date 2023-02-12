<script>
	import Icon from "svelte-icons-pack";
    import BiPlus from 'svelte-icons-pack/bi/BiPlus';

    import "$routes/index.scss";

    import { states } from "$stores/Global";
    import { projects, tasks } from "$stores/Tasks";

    $states['activePage'] = 'Task Tracker';

    import "./tasks_main.scss"

    import ProjectCard from "../../components/task_tracker/project_card.svelte";
    import Task from "../../components/task_tracker/task.svelte";

    const open_form = () => {
		$states.activeForm = "AddProject";
		$states.overlayActive = true;
    }

</script>

<svelte:head>
    <title>Projects</title>
</svelte:head>

<div class="dashboard_container">

    <div class="dashboard_header">
        <h1>Good Morning <span style="color: #8e7cc3">Admin</span></h1>
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
    
    <div class="scrollbar_horizontal dashboard_tasks">

        <h2>Tasks</h2>

        <div class="seperator"/>
        {#if $tasks} {#each $tasks as task, i}
            {#if i < 12} 
                <Task {task}/> 
                <div class="seperator"/>
            {/if}
        {/each} {/if}
    </div>
</div>

<style lang="scss">
    
    h2 {
        font-size: 1.6rem;
        font-weight: 700;
        position: sticky;
        top: 0;
        background-color: var(--gray1);
        padding-top: 1rem;
        z-index: 2;
        filter: drop-shadow(0px 10px 10px var(--gray1));
    }

    :global(.project_container) {
        display: grid;
        border-radius: .75rem;
        border: 1px solid var(--gray3);
        aspect-ratio: 3/1.7;
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

    :global(.task_container) {
        display: flex;
        gap: 5px;
        width: 100%;
        min-height: max-content;
        padding: .25rem;
        height: fit-content;
        border-radius: .35rem;
        border: 1px solid transparent;
        background-color: var(--gray1);
        fill: var(--gray6);
        &:hover {
            background-color: var(--gray6);
            color: var(--gray2);
            fill: var(--gray2)
        }
    }

    :global(.task_container:hover) {
        cursor: pointer;
    }

</style>