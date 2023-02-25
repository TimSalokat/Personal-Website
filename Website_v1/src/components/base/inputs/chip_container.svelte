
<script>
    import Chip from "./chip.svelte";

    export let items;
    export let title;
    export let selected = items[0].id;

    const select = (id) => {
        selected = id;
    }
</script>

<div class="chip_container">
    <h2>{title}</h2>

    {#each Array.from(items.entries()) as [id, item]}
        <Chip 
            text={item.title} 
            func={() => select(id)} 
            active={id === selected}
            color={item.color}
        />
    {/each}
</div>
