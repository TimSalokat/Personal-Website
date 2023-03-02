
<script>
    import Icon from "svelte-icons-pack";
    import BiTrash from "svelte-icons-pack/bi/BiTrash";

    import { projects, priorities } from "$stores/Tasks"
    import { states } from "$stores/Global";

    import { f_task } from "$scripts/task_tracker/tasks";

    import Chip from "$components/base/inputs/chip.svelte";
    import FormBase from ".././base_form.svelte";
    import CustomInput from "../form_components/custom_input.svelte";
    import CustomTextarea from "../form_components/custom_textarea.svelte";
    import ChipContainer from "$components/base/inputs/chip_container.svelte";

    export let edit = false;
    export let base_values = undefined;
    export let _submit = () => {};
    export let on_delete = () => {};

    let title;
    let description;

    let selected_project;
    let selected_priority=0;
    let selected_section;

    let data;
    $: {data = {
        title: title,
        description: description,
        priority: selected_priority,
        section_id: selected_section,
    }}
    
    let submit = (data, project) => {
        if(description === undefined) data.description = "";
        f_task.add(data, project);
    }

    if (edit) {
        title = base_values.title;
        description = base_values.description;
        selected_project = base_values.project_id;
        selected_priority = base_values.priority;
        selected_section = base_values.section_id;
        submit = _submit;
    } else {
        selected_project = $states.overlay.project_id;
        selected_section = $states.overlay.section_id;
    }


</script>

<FormBase submit={() => {submit(data, selected_project)}}>
    <!-- Main  -->
    <div class="form_main">
        <h1 class="text-2xl mb-3">{edit ? "Edit Task" : "Add Task"}</h1>
        
        <!-- Inputs -->
        <CustomInput title="Title" bind:value={title}/>
        <CustomTextarea title="Description" bind:value={description}/>

        {#if edit}
        <button class="delete_button" on:click={() => {on_delete(base_values)}}>
            <Icon src={BiTrash} size="1.5rem" className="icon_inherit icon_style"/>
        </button>            
        {/if}
    
    </div>

    <!-- Side -->
    <div class="form_side">
        <h2 class="text-xl text-center">Settings</h2>

        <span class="form_seperator"/>

        <ChipContainer 
            items={$projects} 
            title="Project: "
            bind:selected={selected_project}
        />

        <span class="form_seperator"/>

        <ChipContainer 
            items={$priorities}
            title="Importance: " 
            bind:selected={selected_priority}
        />

        <span class="form_seperator"/>

        <div class="chip_container">
            <h2>Section: </h2>
        
            {#each $projects.get(selected_project).sections as section}
                <Chip 
                    text={section.title} 
                    func={() => selected_section = section.id} 
                    active={section.id === selected_section}
                    color={"var(--gray7)"}
                />
            {/each}
        </div>

        <span class="form_seperator"/>

    </div>
</FormBase>
