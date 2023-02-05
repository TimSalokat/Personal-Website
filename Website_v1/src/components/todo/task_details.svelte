
<script>
    import { projects } from "../../stores/Tasks"
    import { colors } from "../../stores/Global"

    import FormBase from "../forms/formBase.svelte";
    import CustomInput from "../base/inputs/customInput.svelte";
    import CustomTextarea from "../base/inputs/customTextarea.svelte";
    import ChipContainer from "../base/inputs/chipContainer.svelte";
	import { func } from "../../routes/todo/functions";

    export let props;

    const initialProject = props.project_id;
    let selectedProject = props.project_id;
    // let selectedCategory; 

    let title = props.title;
    let description = props.description;

    const submit = () => {
        if(description === undefined) description = "";
        const _data = {
            title: title,
            description: description,
            priority: 0,
        }
        const details = {
            "project_id": selectedProject,
            "task_id": props.id,
            "old_project_id": initialProject
        }
        func.editTask(_data, details)
    }

</script>

<FormBase submit={() => submit()}>
    <!-- Main  -->
    <div class="w-2/3 pr-5 relative">
        <h1 class="text-2xl mb-3">Add Task</h1>
        
        <!-- Inputs -->
        <CustomInput title="Title" bind:value={title}/>
        <CustomTextarea title="Description" customClasses="h-20" bind:value={description}/>
    
    </div>

    <!-- Side -->
    <div class="flex-1 p-5 border-l relative mb-14" style="border-color: {$colors.darkColors[18]};">
        <h2 class="text-xl text-center">Settings</h2>

        <span class="seperator" style="background-color: {$colors.darkColors[18]};"/>

        <ChipContainer 
            items={$projects} 
            bind:selected={selectedProject}
        />

        <span class="seperator" style="background-color: {$colors.darkColors[18]};"/>

    </div>
</FormBase>

<style>
	.seperator {
        @apply mt-2;
        @apply mb-1;
        @apply mx-auto;
        display: block;
		width: 90%;
		height: 1px;
	}
</style>