
<script>
    import Icon from "svelte-icons-pack";
    import BiTrash from "svelte-icons-pack/bi/BiTrash";

    import "../forms.scss";

    import { projects, priorities } from "../../../stores/Tasks"
    import { states } from "../../../stores/Global"

    import FormBase from "../../forms/base_form.svelte";
    import CustomInput from "../form_components/custom_input.svelte";
    import CustomTextarea from "../form_components/custom_textarea.svelte";
    import ChipContainer from "../../base/inputs/chipContainer.svelte";
	import { func } from "$routes/task_tracker/functions";

    export let props;

    const initialProject = props.project_id;
    let selectedProject = props.project_id;
    let selectedPriority = props.priority;
    // let selectedCategory; 

    let title = props.title;
    let description = props.description;


    const submit = () => {
        if(description === undefined) description = "";
        const _data = {
            title: title,
            description: description,
            priority: selectedPriority,
        }
        const details = {
            "project_id": selectedProject,
            "task_id": props.id,
            "old_project_id": initialProject
        }
        func.editTask(_data, details)
    }

    const handle_delete = () => {
        func.delTask(initialProject, props.id);
        $states.overlayActive = false;
    }

</script>

<FormBase submit={() => submit()}>
    <!-- Main  -->
    <div class="form_main">
        <h1 class="text-2xl mb-4">Edit Task</h1>
        
        <!-- Inputs -->
        <CustomInput title="Title" bind:value={title}/>
        <CustomTextarea title="Description" bind:value={description}/>

        <button class="delete_button" on:click={() => {handle_delete()}}>
            <Icon src={BiTrash} size="1.5rem" className="icon_inherit icon_style"/>
        </button>
    
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