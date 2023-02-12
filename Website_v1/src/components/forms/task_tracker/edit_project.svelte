
<script>
	import Icon from "svelte-icons-pack";
    import BiTrash from "svelte-icons-pack/bi/BiTrash";

    import { func } from "../../../routes/todo/functions.js";
    
    import { states } from "../../../stores/Global";

    import CustomInput from "../form_components/custom_input.svelte";
    import FormBase from "../base_form.svelte";

    export let props;
      
    function hex() {
         const RanHexColor = Math.floor(Math.random()*16777215).toString(16);
         return "#" + RanHexColor.toString()
    }

    let random_colors = [];
    for (let i = 0; i < 25; i++) {
        random_colors.push(hex())
    }

    let title = props.title;
    let selected_color = props.color;

    const submit = () => {
        const _data = {
            title: title,
            color: selected_color,
        }

        const details = {
            project_id: props.id,
        }
        func.editProject(_data, details);
    }

    const handle_delete = () => {
        func.delProject(props.id);
        $states.overlayActive = false;
    }

</script>

<FormBase submit={submit}>
    <!-- Main  -->
    <div class="form_main">
        <h1 class="text-2xl mb-3">Edit Project</h1>

        <!-- Inputs -->
        <CustomInput title="Title" bind:value={title}/>

        <a href="/task_tracker" class="delete_button" on:click={() => {handle_delete()}}>
            <Icon src={BiTrash} size="1.5rem" className="icon_inherit icon_style"/>
        </a>

    </div>

    <!-- Side -->
    <div class="form_side">
        <h2 class="text-xl text-center">Settings</h2>
        <span class="form_seperator"/>
        
        <div style="display: flex;" class="gap-2 m-2">
            <h2>Color:</h2>
            <div class="color_option" style="background-color: {selected_color}"></div>
        </div>

        <span class="form_seperator"/>

        <div class="color_wrapper">
            {#each random_colors as color}
            <div 
                class="color_option" 
                style="background-color: {color};" 
                on:click={() => selected_color = color} 
                on:keypress={() => console.log("key")}
            />
            {/each}
        </div>

        <span class="form_seperator"/>

    </div>

</FormBase>

<style>

    .color_wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        justify-content: center;
    }

    .color_option {
        height: 25px;
        width: 25px;
        border-radius: 100%;
        border: 1px solid #3b4754;
        cursor: pointer;
    }
</style>