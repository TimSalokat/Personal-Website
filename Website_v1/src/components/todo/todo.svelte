<script>
    export let task;
    export let light = false;
    export let customStyle = "";
    export let customClasses = "";

    const appliedBg = light ? "bg-slate-600" : "bg-slate-800";
    const appliedColor = light ? "text-slate-900" : "text-slate-400";

</script>

<div 
    class="{customClasses} {appliedBg} todoContainer items-center w-full rounded-xl h-fit p-2 hover:bg-indigo-900 border-l-0 relative"    
    style="{customStyle}">

    <!-- Side Border and Checkbox -->
    <div class="{task.finished ? "finished" : "checkBox"} relative justify-self-center rounded-full border-slate-400 border-2 hover:bg-slate-400" 
        on:click={()=>task.finished = !task.finished}
        on:keydown={() => console.log("keydown")}
    >
        <span class="prioIndicator" style="background-color: {task.borderColor};"/>
    </div>

    <!-- text -->
    <div class="{task.finished ? "line-through" : ""} decoration-1 decoration-slate-200 ml-3 py-1">
        <h2 class="{appliedColor}">{task.title}</h2>
        <h4 class="text-xs {appliedColor}">{task.desc}</h4>
    </div>

    <!-- Project Indicator -->
    <p class="text-xs absolute top-0 right-0 p-1 px-2" style="color:{task.projectColor}">{task.project}</p>
        
</div>

<style>

    * {
        transition: .25s ease;
    }

    .checkBox {
        width: 1.15rem;
        height: 1.15rem;
    }

    .prioIndicator {
        content: "";
        position: absolute;
        width: 2px;
        height: 25px;
        top: calc(50% - 12.5px);
        left: -85%;
        border-radius: 2px;
    }

    .finished .prioIndicator {
        opacity: 0;
    }

    .finished {
        @apply bg-slate-400;
        @apply border-hidden;
        @apply h-4;
        @apply w-4;
    }

    .todoContainer {
        display: grid;
        grid-template-columns: 1.5rem auto;
    }
</style>