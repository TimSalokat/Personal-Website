<script>

    export let title;
    export let options;
    
    export let selected;
    export let no_option = true;

    let selected_title = "Filter"; 

    let opened = false;

    const handle_click = (id, option) => {
        selected = id;
        if (id == -1) selected_title = "Filter";
        else selected_title = option.title;
        opened = false;
    }

</script>

<div class="drop_container">
    
    <h2>{title}</h2>

    <div 
    class="drop_wrapper" 
    on:mouseover={() => {opened = true}} 
    on:mouseleave={() => {opened = false}}
    on:focus={() => {}}
    >

        <h3>{selected_title}</h3>

        {#if opened}
        <div class="dropdown">
            {#if no_option}
                <button on:click={() => handle_click(-1, {})} class={selected == -1 ? "active" : ""}>
                    No Filter
                </button>
            {/if}

            {#each Array.from(options.entries()) as [id, option]}
            <button on:click={() => handle_click(id, option)} class={selected == id ? "active" : ""}>
                {option.title}
            </button>
            {/each}

        </div>
        {/if}
    </div>

</div>

<style lang="scss">

.active {
    color: var(--gray8) !important;
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
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: .3rem;
    }
}

.drop_wrapper {
    cursor: pointer;
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
    width: 150%;
    height: max-content;
    border: 1px solid var(--gray3);
    background-color: var(--gray1);
    button {
        text-align: right;
        position: relative;
        width: 100%;
        padding: .2rem;
        transition: ease .5s;
        color: var(--gray4)
    }
    button:hover {
        background-color: var(--gray2);
    }
}

</style>