<!-- TODO remove the description as a dependencie -->
<script>
    import { func } from "../../routes/todo/functions.js";

    import { v4 as uuid } from 'uuid';

    import { projects } from "../../stores/Tasks";
    import { colors, states } from "../../stores/Global";

    import CustomInput from "../base/inputs/customInput.svelte";
    import CustomTextarea from "../base/inputs/customTextarea.svelte";

    let title;
    let description;

    const submit = () => {
        console.log(title, description);
        const _data = {
            uuid: uuid(),
            title: title,
            description: description,
            total: 0,
            finished: 0,
            color: "#ea1"
        }
        func.addProject(_data);
        $states.overlayActive = false;
    }

</script>

<div 
style="background-color: {$colors.darkColors[5]}; color: {$colors.lightColors[10]}" 
class="w-3/5 h-4/5 mx-auto rounded-xl p-5 relative flex"
>

    <!-- Main  -->
    <div class="w-2/3 pr-5 relative">
        <h1 class="text-2xl mb-3">Add Project</h1>
        
        <!-- Inputs -->
        <CustomInput title="Title" bind:value={title}/>
        <CustomTextarea title="Description" customClasses="h-20" bind:value={description}/>


        <!-- Submit and Cancel buttons -->
        <div class="absolute bottom-5 right-5 flex gap-3">
            <button 
                class="border px-6 py-3 rounded text-sm"
                style="border-color: {$colors.darkColors[19]}"
                on:click={() => $states.overlayActive = false}
            >Cancel</button>

            <button 
                class="px-6 py-3 rounded text-sm border" 
                style="background-color: {$colors.darkColors[15]};  border-color: {$colors.darkColors[19]}"
                on:click={() => submit()}
            >Add Project</button>
        </div>
    </div>

    <!-- Side -->
    <div class="flex-1 p-5 border-l relative" style="border-color: {$colors.darkColors[18]};">
        <h2 class="text-xl text-center">Settings</h2>

        <span class="seperator" style="background-color: {$colors.darkColors[18]};"/>

    </div>

</div>

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