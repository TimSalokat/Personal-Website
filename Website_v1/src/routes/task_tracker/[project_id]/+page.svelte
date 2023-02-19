<script>
    import Icon from "svelte-icons-pack";
    import BiEdit from "svelte-icons-pack/bi/BiEdit";
    import BiArrowBack from "svelte-icons-pack/bi/BiArrowBack";
	import BiPlus from 'svelte-icons-pack/bi/BiPlus';

    import "$routes/index.scss";

	import { projects } from "$stores/Tasks";
    import { states } from "$stores/Global";
    import TaskSection from "$components/task_tracker/task_section.svelte";

    export let data;

    let self;
    $: {
        try{ self = $projects.get(data.params.project_id) }
        catch(error){ console.error(error); }
    }

    const open_form = (form_title) => {
        $states.activeForm = form_title;
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

        <button class="icon_wrapper" on:click={() => open_form("EditProject")}>
            <Icon src={BiEdit} size="1.5rem" className="normal_icon_style"/>
        </button>

    </div>

    <h2>Tasks in <span style="color: {self.color}">{self.title}</span></h2>
</div>

<div class="scrollbar_horizontal section_wrapper">
    {#if self.sections}{#each self.sections as section}
    <TaskSection 
        section_id={section.id}
        project_id={self.id}/>
    {/each}{/if}

    <button class="add_section_btn" on:click={() => open_form("AddSection")}>
		<Icon src={BiPlus} size="1.5rem" className="normal_icon_style" />
        Add Section
    </button>

</div>

<style lang="scss">

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
        fill: var(--gray7);
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

    .add_section_btn {
        transition: .2s ease;
        display: flex;
        width: 500px;
        min-width: 500px;
        margin-bottom: 1rem;
        margin-top: 1rem;
        align-items: center;
        justify-content: center;
        border: 2px solid var(--gray3);
        color: var(--gray4);
        fill: var(--gray4);
        border-radius: .5rem;
        &:hover{
            font-size: 1.1rem;
            border-color: var(--gray5);
            fill: var(--gray6);
            color: var(--gray6);
        }
    }

</style>