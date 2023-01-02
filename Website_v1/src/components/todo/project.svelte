
<script>
    import DonutChart from "../base/donutChart.svelte";
    export let project;
</script>


<div id="projectContainer" class="w-full self-stretch bg-slate-900 shadow-l hover:scale-105 rounded-2xl p-3 relative overflow-hidden w-64 flex-grow" style="background-color: {project.color};">
    <div class="flex">
        <p class="text-xl font-semibold {project.text}">{project.title}</p>
    </div>
    
    <div class="flex pb-2">
        <DonutChart
            labels={["POne", "PTwo", "PThree", "PFour"]}
            fontMid="13px Arial"
            fontColor="#fff"
            data={[13,2,1,1]}
            plugins={"mid"}
        />
        <div class="flex flex-col stretch text-slate-400 {project.text} text-xs justify-center mb-2 pl-3 ">
            <p>PrioOne: 12</p>
            <p>PrioTwo: 2</p>
            <p>PrioThree: 1</p>
            <p>PrioFour: 1</p>
        </div>
    </div>

    <div class="absolute flex w-3/4 z-10 bg-slate-700 rounded-full" style="left: 12.5%; bottom: 12.5%; height: 3px">
        <span class="h-full" style="width:{"30%"}; background-color: {project.color}"></span>
    </div>

</div>

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