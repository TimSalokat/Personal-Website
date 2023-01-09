
<script>

    import Icon from 'svelte-icons-pack/Icon.svelte';
    import BiPlus from "svelte-icons-pack/bi/BiPlus";

    export let category;
    export let project;
    export let customClasses = "";

</script>

<div class="{customClasses} mx-auto flex w-3/4 h-12 border border-slate-600 fill-slate-600 rounded items-center justify-center cursor-pointer"
    on:click={() => console.log("Heloo")}
    on:keypress={() => console.log("keypress")}
>

    <Icon src={BiPlus} size="1.5rem" className="fill-inherit"/>
    <p class="text-slate-500">Add task</p>

</div>