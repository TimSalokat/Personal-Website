<script>
    import Icon from "svelte-icons-pack";
    import BiEdit from "svelte-icons-pack/bi/BiEdit";
    import BiArrowBack from "svelte-icons-pack/bi/BiArrowBack";

    import "../../../routes/index.scss";

	import { projects } from "../../../stores/Tasks";
    import { states } from "../../../stores/Global";
    import TaskSection from "../../../components/task_tracker/task_section.svelte";

    export let data;

    let self;
    $: {self = $projects.get(data.params.project_id)}

    const categories = ["Section", "Testing", "Another One"]

    const open_form = () => {
        $states.activeForm = "EditProject";
		$states.overlay.props = self;
		$states.overlayActive = true;
    }
</script>

<svelte:head>
    <title>{self.title}</title>
</svelte:head>

<div class="header">

    <div class="navigation_bar">
        <a href="/task_tracker" style="display: flex; align-items: center">
            <Icon src={BiArrowBack} size="1.5rem" className="icon_style"/>
            <p class="ml-1">Go Back</p>
        </a>
        <button class="icon_wrapper" on:click={() => open_form()}>
            <Icon src={BiEdit} size="1.5rem" className="normal_icon_style"/>
        </button>
    </div>

    <h2>Tasks in <span style="color: {self.color}">{self.title}</span></h2>
</div>

<div class="scrollbar_horizontal section_wrapper">
    {#if categories}{#each categories as category}
    <TaskSection title={category} {self}/>
    {/each}{/if}
</div>

<style lang="scss">

    :global(.section) {
        position: relative;
        min-width: 550px;
        max-width: 550px;
        border-radius: .3rem;
        padding: .5rem;
        border-right: 2px solid var(--gray3);
        overflow-y: auto;
    }

    .header {
        position: relative;
        display: grid;
        place-content: center;
        height: 25%;

        h2 {
            color: var(--gray7);
            font-size: 2.5rem;
            font-weight: 800;
        }
    }

    .navigation_bar {
        display: flex;
        position: absolute;
        justify-content: space-between;
        padding: 5px 15px;
        top: 0;
        height: 50px;
        width: 100%;
    }
    
    .icon_wrapper {
        display: grid;
        place-items: center;
        border-radius: .5rem;
        width: 2.2rem;
        height: 2.2rem;
        aspect-ratio: 1/1;
        border: 2px solid (--gray7);

    }

    .section_wrapper {
        display: flex;
        height: 100%;
        margin: auto .5rem;
        flex-direction: row;
        overflow-x: auto;
        flex-wrap: nowrap;
        gap: 1rem;
    }

</style>