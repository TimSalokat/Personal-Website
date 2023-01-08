
<script>
    import DonutChart from "../base/donutChart.svelte";
    import {priorities} from "../../stores/Store_Todo";
    import {colors} from "../../stores/Global";
    export let project;
</script>


<a 
    href="/todo/{project.uuid}"
    id="projectContainer" 
    class="self-stretch bg-slate-900 shadow-l hover:scale-105 rounded-2xl p-3 relative overflow-hidden w-64 h-40 flex-grow" 
    style="background-color: {project.color};"
    >
   
    <!-- Heading -->
    <div class="flex h-full items-center pb-3 px-3">
        <h2
            class="text-xl font-extrabold font-mono text-slate-400" 
            style="font-size: 3.3rem; -webkit-text-fill-color: transparent; -webkit-text-stroke: 1px; line-height: 2.5rem">
            {project.title}
        </h2>
    </div>
    
    <!-- Chart and Text -->
    <!-- <div class="flex pb-2">
        <DonutChart
            labels={$priorities[0]}
            fontMid="13px Arial"
            fontColor="#fff"
            passColors={$colors["priorityColors"]}
            data={project.priorities}
            plugins={"mid"} 
        /> 
        <div class="flex flex-col stretch text-slate-400 {project.text} text-xs justify-center mb-2 pl-3 ">
            <p>PrioOne: </p>
            <p>PrioTwo: </p>
            <p>PrioThree: </p>
            <p>PrioFour: </p>
        </div>
        <div class="flex flex-col stretch text-slate-400 {project.text} text-xs justify-center mb-2 pl-3">
            {#each project.priorities as prio}
                <p>{prio}<br/></p>
            {/each}
        </div>
    </div> -->

    <!-- Progress Bar -->
    <div class="absolute flex w-3/4 z-10 bg-slate-700 rounded-full" style="left: 12.5%; bottom: 12.5%; height: 3px">
        <span class="h-full" style="width:{project.finishedTasks / project.totalTasks * 100 + "%"}; background-color: {project.color}"></span>
    </div>

</a>

<style>

    * {
        transition: .25s ease;
    }

    #projectContainer::before {
        @apply bg-slate-900;
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        -webkit-clip-path: polygon(75% 0%, 100% 35%, 100% 100%, 20% 100%, 0% 70%, 0 0);
        clip-path: polygon(75% 0%, 100% 35%, 100% 100%, 20% 100%, 0% 70%, 0 0);
        box-shadow: 0px 0px 60px 1px #090f1e inset;
        scale: 1.05;
    }
    #projectContainer:hover::before {
        scale: 1.05;
    }
    #projectContainer *{
        z-index: 10
    }
</style>