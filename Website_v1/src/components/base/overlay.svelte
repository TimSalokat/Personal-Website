
<script>
    import AddTodoForm from "../forms/addTodoForm.svelte";

    import { states } from "../../stores/Global";

    const global = $states;  
    const active = $states.overlayActive;  

</script>

{#if active}
<div 
id="Overlay" 
class="absolute h-full w-full z-50"
on:click={() => $states.setOverlay(false)}
on:keydown={() => {}}
>

    {#if global.activeForm === "AddTodo"}
        <AddTodoForm/>
    {:else}
        <p>Hello</p>
    {/if}

</div>
{/if}

<style>
    #Overlay {
        background-color: rgba(0,0,0,.4);
    }

</style>