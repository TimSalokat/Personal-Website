
<script>
    import { projects } from "../../../stores/Tasks"
    import { colors, states } from "../../../stores/Global";

    import { func } from "../../../routes/todo/functions.js";

    import FormBase from ".././base_form.svelte";
    import CustomInput from "../form_components/custom_input.svelte";
    import CustomTextarea from "../form_components/custom_textarea.svelte";
    import ChipContainer from "../../base/inputs/chipContainer.svelte";

    let selectedProject = $states.overlay.project.id;
    let selectedCategory = $states.overlay.category;

    let title;
    let description;

    const submit = () => {
        if(description === undefined) description = "";
        const _data = {
            title: title,
            description: description,
            priority: 2,
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
        <CustomTextarea title="Description" customClasses="h-20" bind:value={description}/>
    
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

    </div>
</FormBase>
