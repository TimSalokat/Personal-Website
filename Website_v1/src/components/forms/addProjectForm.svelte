
<script>
    import { func } from "../../routes/todo/functions.js";
    
    import { colors, states } from "../../stores/Global";

    import CustomInput from "../base/inputs/customInput.svelte";
    import FormBase from "./formBase.svelte";

    let title;

    const submit = () => {
        const _data = {
            title: title,
        }
        func.addProject(_data);
    }

</script>

<FormBase submit={submit}>
    <!-- Main  -->
    <div class="w-2/3 pr-5 relative">
        <h1 class="text-2xl mb-3">Add Project</h1>

        <!-- Inputs -->
        <CustomInput title="Title" bind:value={title}/>
    </div>

    <!-- Side -->
    <div class="flex-1 p-5 border-l relative mb-14" style="border-color: {$colors.darkColors[18]};">
        <h2 class="text-xl text-center">Settings</h2>
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