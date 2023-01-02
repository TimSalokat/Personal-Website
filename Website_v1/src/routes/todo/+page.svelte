
<script lang="ts">

    import Project from "../../components/todo/project.svelte";
    import Todo from "../../components/todo/todo.svelte";

    import DonutChart from "../../components/base/donutChart.svelte";

    const projectColors = ["#F6AE2D", "#7400b8", "#6930c3", "#5e60ce", "#5390d9", "#4ea8de", "#48bfe3", "#56cfe1", "#64dfdf", "#72efdd", "#80ffdb"]

    const textColor = "text-slate-200";

    let Projects = [
        {
            title: "Testing",
            text: textColor,
            background: "bg-blue-600",
            color: "",
        },
        {
            title: "Working on",
            text: textColor,
            background: "bg-red-600",
            color: "",
        },
        {
            title: "Todo Project",
            text: textColor,
            background: "bg-green-600",
            color: "",
        },
        {
            title: "Testing",
            text: textColor,
            background: "bg-fuchsia-500",
            color: "",
        },
        {
            title: "Working on",
            text: textColor,
            background: "bg-fuchsia-600",
            color: "",
        },
        {
            title: "Todo Project",
            text: textColor,
            background: "bg-fuchsia-700",
            color: "",
        }
    ];

    Projects.forEach((project, i) => {
        project.color = projectColors[i];
    })

    let Tasks = [
        {
            project: "Todo Project",
            title: "Do some stuff",
            desc: "This means that you shall do some stuff",
            finished: false,
            border: "border-transparent",
        },
        {
            project: "Working on",
            title: "Do stuff",
            desc: "This means that you shall do some stuff",
            finished: true,
            border: "border-indigo-600",
        },
        {
            project: "Testing",
            title: "Do some more stuff",
            desc: "",
            finished: false,
            border: "border-indigo-600",
        },
    ]

</script>


<div class="grid grid-cols-7 grid-rows-5 w-full h-screen">

    <!-- ? Overview -->
    <!-- TODO outsource these two to seperate files. Need to make a data store first -->
    <div class="flex flex-col col-span-7 row-span-2 xl:col-span-5 border-b-2 border-indigo-700 mx-5 p-2">
        
        <h2 class="text-2xl pt-1 pb-3 text-slate-200">Overview</h2>
        <div class="flex mb-10 gap-10 px-5 no-wrap max-h-52 min-w-max"> 

            <div class="w-1/2 bg-slate-900 rounded-2xl p-3">

                <!-- ? Unfinished -->
                <h2 class="text-slate-400 text-xl">All Unfinished Tasks</h2>
                <div class="flex max-h-40">
                    <DonutChart 
                        width="w-52"
                        height="h-40"
                        labels={["Testing", "WorkingOn", "Todo Website"]}
                        data={[11,11,4]}
                        colors="passed"
                        passColors={projectColors}
                        plugins={"mid,side"}  
                    />
                    <div class="text-slate-400 text-l flex flex-col justify-center mb-5 pl-3">
                        <h3>Testing: 11</h3>
                        <h3>Working On: 11</h3>
                        <h3>Todo Website: 4</h3>
                    </div>
                </div>
            </div>

            <div class="w-1/2 bg-slate-900 rounded-2xl mt-0 p-3 max-h-52 min-w-fit">

                <!-- ? Priority -->
                <h2 class="text-slate-400 text-xl">Priority of Tasks</h2>
                <div class="flex max-h-40">
                    <DonutChart
                        height={"h-40"}
                        width={"w-52"}
                        labels={["Casual", "Should be done", "Has to be done", "Do this ASAP"]}
                        data={[9, 21, 6, 8]}
                        plugins={["mid", "side"]}
                    />
                    <div class="text-slate-400 text-l flex flex-col justify-center mb-5 pl-3">
                        <h3>Testing: 9</h3>
                        <h3>Working On: 21</h3>
                        <h3>Todo Website: 6</h3>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- ? Important Tasks -->
    <div class="stretch hidden row-span-5 col-span-2 xl:flex">
        <div class="flex flex-col gap-3 stretch border-l-2 border-l-indigo-800 w-full p-5 pt-0 my-10">
            <h2 class="text-2xl pb-2 text-slate-200">Important Tasks</h2>
            {#each Tasks as task}
                <Todo {task}/>
            {/each}
        </div>
    </div>

    <!-- ? Projects Section -->
    <div class="col-span-7 row-span-3 xl:col-span-5 p-10 pt-2">
        <h2 class="pb-4 text-2xl text-slate-200">Projects</h2>
        <div class="flex flex-wrap gap-5 pb-5">
            {#each Projects as project}
                <Project {project}/>
            {/each}
        </div>
    </div>
</div>