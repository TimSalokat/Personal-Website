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
    import TaskSection from "$components/task_tracker/task_section.svelte";
    import Dropdown from "$components/base/inputs/dropdown.svelte";
	import { func } from "./functions";

    const user_name = "Tim"

    const open_form = () => {
		$states.activeForm = "AddProject";
		$states.overlayActive = true;
    }

    let selected_filter = -1;
    let filtered_tasks;
    $: {
        filtered_tasks = func.filter_by_prio($tasks, selected_filter)
    }

    const handle_switch = (new_value) => {
        $states.load(800, () => $states.dark_mode = new_value);
    }

</script>

<svelte:head>
    <title>Projects</title>
</svelte:head>

<!-- Dark Mode switch -->
<label class="switch">
    <input type="checkbox" on:change={(e) => handle_switch(e.target.checked)} checked={$states.dark_mode}>
    <span class="slider"></span>
</label>


<div class="task_tracker_container">

    <div class="task_tracker_header">
        <h1>Good Morning <span style="color: var(--accent)">{user_name}</span></h1>
    </div>

    <div class="task_tracker_projects">    
        
        <h2>Projects</h2>

        <div class="project_wrapper">
            
            {#each Array.from($projects.entries()) as [id, project]}
                <ProjectCard project_id={id} />
            {/each}

            {#if $states.server_connection}
                <button 
                class="add_project_btn anim project_container"
                on:click={() => open_form()}>
                    <Icon src={BiPlus} size="1.5rem" className="bigger_icon_style"/>
                </button>
            {:else}
                <h5 class="w-full col-span-2 h-full" style="margin-top: 50%">No Server Connection</h5>
            {/if}
    
        </div> 
    </div>
    
    <div class="task_tracker_tasks">

        <Dropdown 
        title="Tasks" 
        options={$priorities}
        bind:selected={selected_filter}
        custom_style="background-color: var(--gray2)"/>

        <div class="seperator"/>
        {#if filtered_tasks && filtered_tasks.length != 0} 
            
            {#each filtered_tasks as task}
                <Task {task}/>
            {/each}

        {:else if filtered_tasks.length == 0 && selected_filter == -1}

        <h5>No Tasks</h5>

        {:else}
        
        <h5>No Tasks <br/> in <br/> 
            <span 
                style="color: {$priorities.get(selected_filter).color}">
                {$priorities.get(selected_filter).title}
            </span> 
        </h5>
        
        {/if}
    </div>
</div>

<style lang="scss">

    h5{
        align-self: center;
        margin-top: auto;
        margin-bottom: auto;
        text-align: center;
        font-size: 1.1rem;
        line-height: 1.4rem;
    }

    .add_project_btn {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .switch {
    --width-of-switch: 2.8em;
    --height-of-switch: 1.5em;
    --size-of-icon: 1.3em;
    --slider-offset: 0.2em;
    position: sticky;
    margin-top: 20px;
    margin-right: 20px;
    margin-left: auto;
    width: var(--width-of-switch);
    height: var(--height-of-switch);
    }

    /* Hide default HTML checkbox */
    .switch input {
    opacity: 0;
    width: 0;
    height: 0;
    }

    /* The slider */
    .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    border: 1px solid var(--gray5);
    transition: .4s;
    border-radius: 30px;
    }

    .slider:before {
    position: absolute;
    content: "";
    height: var(--size-of-icon,1.4em);
    width: var(--size-of-icon,1.4em);
    border-radius: 20px;
    left: var(--slider-offset,0.3em);
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(40deg,#ff0080,#ff8c00 70%);
    ;
    transition: .4s;
    }

    input:checked + .slider {
    background: transparent;
    }

    input:checked + .slider:before {
    left: calc(100% - (var(--size-of-icon,1.4em) + var(--slider-offset,0.3em)));
    background: transparent;
    /* change the value of second inset in box-shadow to change the angle and direction of the moon  */
    box-shadow: inset -3px -2px 5px -2px #8983f7, inset -10px -4px 0 0 #a3dafb;
    }


</style>