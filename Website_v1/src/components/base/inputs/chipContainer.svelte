
<script>
    import Chip from "./chip.svelte";

    export let items;
    export let selected = items[0].id;

    const select = (id) => {
        selected = id;
    }
</script>

<div class="flex gap-1 justify-center p-3 flex-wrap">
    {#each Array.from(items.entries()) as [id, item]}
        <Chip 
            text={item.title} 
            func={() => select(id)} 
            active={id === selected}
            color={item.color}
        />
    {/each}
</div>

