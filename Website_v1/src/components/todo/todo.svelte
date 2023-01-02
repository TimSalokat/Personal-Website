<script>
    export let task;
</script>


<div class="todoContainer items-center w-full rounded-xl h-fit p-2 bg-slate-900 hover:bg-indigo-900 border-l-2 relative {task.border}">

    <div class="{task.finished ? "finished" : "checkBox"} justify-self-center rounded-full border-slate-400 border-2 hover:bg-slate-400" on:click={()=>task.finished = !task.finished}/>

    <div class="{task.finished ? "line-through" : ""} decoration-1 decoration-slate-200 ml-3 py-1">
        <h2 class="text-slate-300">{task.title}</h2>
        <h4 class="text-xs text-slate-400">{task.desc}</h4>
    </div>

    <p class="text-xs absolute top-0 right-0 p-1 px-2 text-indigo-500">{task.project}</p>
        
</div>

<style>

    * {
        transition: .25s ease;
    }

    .checkBox {
        width: 1.15rem;
        height: 1.15rem;
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