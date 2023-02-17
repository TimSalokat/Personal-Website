
<script>
    import Chip from "./chip.svelte";

    export let items;
    export let title;
    export let selected = items[0].id;

    const select = (id) => {
        selected = id;
    }
</script>

<div class="wrapper">
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

<style lang="scss">

.wrapper {
    position: relative;
    display: flex;
    gap: .25rem;
    justify-content: center;
    padding: .75rem;
    padding-top: 1rem;
    flex-wrap: wrap;
}

h2 {
    position: absolute;
    font-size: .9rem;
    top: -8%;
    left: 5%;
}

</style>