
<script>
    import { projects, priorities } from "$stores/Tasks"
    import { states } from "$stores/Global";

    import { func } from "$routes/task_tracker/functions.js";

    import Chip from "$components/base/inputs/chip.svelte";
    import FormBase from ".././base_form.svelte";
    import CustomInput from "../form_components/custom_input.svelte";
    import CustomTextarea from "../form_components/custom_textarea.svelte";
    import ChipContainer from "$components/base/inputs/chip_container.svelte";

    let selectedProject = $states.overlay.project_id;
    let selected_section = $states.overlay.section_id;

    let title;
    let description;

    let selectedPriority=0;

    const submit = () => {
        if(description === undefined) description = "";
        const _data = {
            title: title,
            description: description,
            priority: selectedPriority,
            section_id: selected_section,
        }
        func.addTask(_data, selectedProject);
    }

</script>

<FormBase submit={submit}>
    <!-- Main  -->
    <div class="form_main">
        <h1 class="text-2xl mb-3">Add Task</h1>
        
        <!-- Inputs -->
        <CustomInput title="Title" bind:value={title}/>
        <CustomTextarea title="Description" bind:value={description}/>
    
    </div>

    <!-- Side -->
    <div class="form_side">
        <h2 class="text-xl text-center">Settings</h2>

        <span class="form_seperator"/>

        <ChipContainer 
            items={$projects} 
            title="Project: "
            bind:selected={selectedProject}
        />

        <span class="form_seperator"/>

        <ChipContainer 
            items={$priorities}
            title="Importance: " 
            bind:selected={selectedPriority}
        />

        <span class="form_seperator"/>

    </div>
</FormBase>
