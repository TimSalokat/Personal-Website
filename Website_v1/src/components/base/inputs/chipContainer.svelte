
<script>
    import Chip from "./chip.svelte";

    export let items;
    export let selected = items[0];
    export let customColors = undefined;

    const select = (text) => selected = text;
</script>

<div class="flex gap-1 justify-center p-3 flex-wrap">
    {#if customColors === undefined}
        {#each items as item}
            <Chip 
                text={item} 
                func={() => select(item)} 
                active={item === selected}
            />
        {/each}
    {:else}
        {#each items as item, index}
            <Chip 
                text={item} 
                func={() => select(item)} 
                active={item === selected}
                color={customColors[index]}
            />
        {/each}
    {/if}
</div>

