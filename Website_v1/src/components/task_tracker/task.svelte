<script>

    import Icon from 'svelte-icons-pack/Icon.svelte';
	import BiCheckCircle from 'svelte-icons-pack/bi/BiCheckCircle';
	import BiCircle from 'svelte-icons-pack/bi/BiCircle';

    import { states } from '../../stores/Global';
    import { projects } from '../../stores/Tasks';
    import { func } from '../../routes/todo/functions';

    export let task;

    let this_project;
    $: {this_project = $projects.get(task.project_id)}

    let description;
    $: {
        if(!task.description) { description = "No Description" }
        else { description = task.description }  
    }

    const open_form = () => {
		$states.activeForm = "TaskDetails";
		$states.overlay.props = task;
		$states.overlayActive = true;
	}

</script>

<div class="task_container {task.finished ? "finished" : ""}">

    <!-- Checkbox -->
    <div 
    class="icon_wrapper" 
    style="fill: #3b4754"
    on:click={() => {
        func.setFinished(task.id, task.project_id, !task.finished)
        task.finished = !task.finished			
    }}
    on:keydown={() => console.log('keydown')}
    >
        <Icon 
        src={(task.finished ? BiCheckCircle : BiCircle)} 
        size="1.5rem" 
        className="icon_style"
        />
    </div>

    <!-- Content -->
    <div class="task_content" on:click={() => open_form()} on:keydown={() => console.log("Keydown")}>
        <h2 class="title">{task.title}</h2>
        <h2 class="project" style="color: {this_project.color}">{this_project.title}</h2>
        <p class="description">{description}</p>
    </div>
    
</div>

<style>

.task_content {
    width: 100%;
    display: grid;
    grid-template-columns: auto 75px;
    grid-template-rows: fit-content auto;
    grid-template-areas: 
    "title project"
    "desc desc";
}

.icon_wrapper{
    grid-area: checkbox;
}

.title {
    grid-area: title;
    font-size: 1.05rem;
    font-weight: 500;
    margin-top: auto;
    margin-bottom: auto;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

.description {
    grid-area: desc;
    color: #6e7887;
    padding-right: 20px;
    font-weight: 100;
    font-size: .9rem;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.project {
    grid-area: project;
    font-size: .8rem;
    justify-self: center;
}

.finished {
    text-decoration: line-through;
    text-decoration-color: #6e7887;
}

</style>