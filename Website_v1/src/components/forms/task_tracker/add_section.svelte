
<script>
    import { f_section } from "$scripts/task_tracker/sections";

    import CustomInput from "../form_components/custom_input.svelte";
    import FormBase from "../base_form.svelte";

    export let props;
    let title;

    const submit = () => {
        f_section.add(title, props.id);
    }

</script>

<FormBase submit={submit}>
    <!-- Main  -->
    <div class="form_main">
        <h1 class="text-2xl mb-3">Add Section</h1>

        <!-- Inputs -->
        <CustomInput title="Title" bind:value={title}/>
        
    </div>

    <!-- Side -->
    <div class="form_side">
        <h2 class="text-xl text-center">Settings</h2>
        
        <span class="form_seperator"/>
    </div>

</FormBase>