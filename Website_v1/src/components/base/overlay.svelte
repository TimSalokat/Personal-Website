
<script>
    import Forms from "../forms/Forms.svelte";

    import { states } from "../../stores/Global";

</script>

{#if $states.overlayActive}

<div 
bind:this={$states.overlayActive}
id="Overlay" 
class="absolute h-full w-full z-50 flex items-center justify-center"
>
    <div 
    class="h-screen w-full absolute top-0" 
    on:click={() => $states.overlayActive = false}
    on:keydown={() => {}}
    />

    <Forms></Forms>

</div>

{/if}

<style>
    #Overlay {
        background-color: rgba(0,0,0,.5);
    }

</style>