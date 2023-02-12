<script>

    import Icon from "svelte-icons-pack";
    import BiPlus from 'svelte-icons-pack/bi/BiPlus';

    import { states } from "../../stores/Global";

    import Task from "./task.svelte";

    export let title;
    export let self;

    let active_tasks;
    $: {active_tasks = self.tasks.filter((task) => {
            return !task.finished;
        })}
    let finished_tasks;
    $: {finished_tasks = self.tasks.filter((task) => {
            return task.finished;
        })}

    const open_form = () => {
        $states.activeForm = "AddTodo";
		$states.overlayActive = true;
		$states.overlay.project = self;
		$states.overlay.category = title;
    }

</script>

<div style="display:flex;">

    <div class="section">    
        <h2>
            {title}
        </h2>
        
        {#each active_tasks as task}
        <Task {task}/>
        <div class="seperator"/>
        {/each}
        
        {#each finished_tasks as task}
        <Task {task}/>
        <div class="seperator"/>
        {/each}

        <button 
        class="add_task" 
        style="
            display: flex;
            justify-content: center;
            align-items: center;"
        on:click={() => open_form()}
        >
            <Icon src={BiPlus} size="1.5rem" className="normal_icon_style"/>
            <p>Add Task</p>
        </button>

    </div>
</div>


<style lang="scss">

    h2 {
        font-size: 1.35rem;
        font-weight: 500;
        margin-bottom: .5rem;
    }

    .add_task {
        * {transition: .2s ease}
        width: calc(50% - 2rem);
        height: 55px;
        border: 1px solid var(--gray4);
        border-radius: .5rem;
        position: absolute;
        bottom: 10px;
        left: 25%;
        fill: var(--gray4);
        p {
            font-size: 1.1rem;
            margin-top: .12rem;
            margin-left: .5rem;
            color: var(--gray4);
        }
        &:hover {
            background-color: var(--gray6);
            fill: var(--gray2);
            p {color: var(--gray2)}
        }
    }

</style>