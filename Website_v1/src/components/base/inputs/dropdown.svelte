<script>

    import Icon from 'svelte-icons-pack';
	import BiEdit from 'svelte-icons-pack/bi/BiEdit';

    export let title;
    export let options;
    
    export let selected;
    export let no_option = true;

    export let editable = false;
    export let on_edit = () => {};

    export let custom_style = "";

    let isEditing = false;
    let displayed_title = title; 

    let selected_title = "Filter"; 

    let opened = false;

    const handle_click = (id, option) => {
        selected = id;
        if (id == -1) selected_title = "Filter";
        else selected_title = option.title;
        opened = false;
    }

    const handle_edit = (e) => {
        on_edit(e.target.innerText);
        isEditing = false;
    }

</script>

<div class="drop_container" style={custom_style}>
    
    {#if editable}
        {#if isEditing}
            <h2 autofocus contenteditable="true" on:input={(e) => {displayed_title = e.target.innerText}} on:blur={handle_edit}>{displayed_title}</h2>
        {:else}
            <button style="display: flex; fill: var(--gray7);" on:click={() => {isEditing = true}}>
                <Icon src={BiEdit} size="1.5rem" className="normal_icon_style" />    
                <h2>{displayed_title}</h2>
            </button>
        {/if}
    {:else}
    <h2>{title}</h2>
    {/if}

    <!--* Actual dropdown  -->
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

h3 {
    color: var(--gray7);
}

.active {
    color: var(--gray7) !important;
}

.drop_container {
    position: sticky;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    padding-top: 1rem;
    z-index: 2;
    h2, input {
        color: var(--gray7);
        font-size: 1.4rem;
        font-weight: 700;
        margin-left: 10px;
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
    border: 1px solid var(--gray4);
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