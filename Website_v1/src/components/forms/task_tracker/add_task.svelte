
<script>
    import { projects, priorities } from "$stores/Tasks"
    import { states } from "$stores/Global";

    import { func } from "$routes/task_tracker/functions.js";

    import Chip from "$components/base/inputs/chip.svelte";
    import FormBase from ".././base_form.svelte";
    import CustomInput from "../form_components/custom_input.svelte";
    import CustomTextarea from "../form_components/custom_textarea.svelte";
    import ChipContainer from "../../base/inputs/chipContainer.svelte";

    let selectedProject = $states.overlay.project.id;
    let selectedCategory = $states.overlay.category;

    let title;
    let description;

    let selectedPriority=0;

    const submit = () => {
        if(description === undefined) description = "";
        const _data = {
            title: title,
            description: description,
            priority: selectedPriority,
        }
        func.addTask(_data, selectedProject);
    }
    const select = (id) => {
        console.log(id);
        selectedPriority = id;
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
            bind:selected={selectedProject}
        />

        <span class="form_seperator"/>

        <ChipContainer 
            items={$priorities} 
            bind:selected={selectedPriority}
        />

    </div>
</FormBase>
