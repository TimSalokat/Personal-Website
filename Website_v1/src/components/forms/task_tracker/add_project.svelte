
<script>
    import { func } from "../../../routes/todo/functions.js";
    
    import { colors, states } from "../../../stores/Global";

    import CustomInput from "../form_components/custom_input.svelte";
    import FormBase from "../base_form.svelte";
      
    function hex() {
         const RanHexColor = Math.floor(Math.random()*16777215).toString(16);
         return "#" + RanHexColor.toString()
    }

    let random_colors = [];
    for (let i = 0; i < 25; i++) {
        random_colors.push(hex())
    }

    let title;
    let selected_color;

    const submit = () => {
        const _data = {
            title: title,
            color: selected_color,
        }
        func.addProject(_data);
    }

</script>

<FormBase submit={submit}>
    <!-- Main  -->
    <div class="form_main">
        <h1 class="text-2xl mb-3">Add Project</h1>

        <!-- Inputs -->
        <CustomInput title="Title" bind:value={title}/>
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