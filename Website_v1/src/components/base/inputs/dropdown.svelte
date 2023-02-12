<script>

    export let title;
    export let options;
    
    export let selected;

    let opened = false;

    const handle_click = (id) => {
        selected = id;
        opened = false;
    }

</script>

<div class="drop_container">
    
    <h2>{title}</h2>

    <div class="drop_wrapper">
        <button on:click={() => {opened = !opened}}>Filter</button>
        {#if opened}
        <div class="dropdown">
            {#each Array.from(options.entries()) as [id, option]}
            <button on:click={() => handle_click(id)}>
                {option.title}
            </button>
            {/each}
        </div>
        {/if}
    </div>

</div>

<style lang="scss">

.drop_container {
    position: sticky;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    background-color: var(--gray1);
    padding-top: 1rem;
    z-index: 2;
    filter: drop-shadow(0px 10px 10px var(--gray1));
    h2 {
        font-size: 1.6rem;
        font-weight: 700;
    }
}

.drop_wrapper {
    position: relative;
}

.dropdown {
    position: absolute;
    bottom: calc(-100px - 1rem);
    left: -160px;
    border-radius: 1rem 0 1rem 1rem;
    padding: .5rem;
    z-index: 2;
    width: 200px;
    height: fit-content;
    border: 1px solid var(--gray3);
    background-color: var(--gray1);
    button {
        text-align:left;
        width: 100%;
    }
    button:hover {
        text-decoration: underline;
    }
}

</style>