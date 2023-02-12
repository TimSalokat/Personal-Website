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

    <div 
    class="drop_wrapper" 
    on:mouseover={() => {opened = true}} 
    on:mouseleave={() => {opened = false}}
    >
        <h3>Filter</h3>
        {#if opened}
        <div class="dropdown">
            {#each Array.from(options.entries()) as [id, option]}
            <button on:click={() => handle_click(id)} class={selected == id ? "active" : ""}>
                {option.title}
            </button>
            {/each}
        </div>
        {/if}
    </div>

</div>

<style lang="scss">

.active {
    text-decoration: underline;
}

.drop_container {
    position: sticky;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    background-color: var(--gray1);
    padding-top: 1rem;
    z-index: 2;
    // filter: drop-shadow(0px 10px 10px var(--gray1));
    h2 {
        font-size: 1.6rem;
        font-weight: 700;
    }
}

.drop_wrapper {
    position: relative;
    width: 30%;
    text-align: right;
    h3 { width: 100% }
}

.dropdown {
    position: absolute;
    top: 25px;
    right: 0;
    border-radius: 1rem 0 1rem 1rem;
    padding: .5rem;
    z-index: 2;
    width: fit-content;
    height: max-content;
    border: 1px solid var(--gray3);
    background-color: var(--gray1);
    button {
        text-align: right;
        width: 100%;
    }
    button:hover {
        text-decoration: underline;
    }
}

</style>