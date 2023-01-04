
<script>

    import { Doughnut, Line } from "svelte-chartjs";
    import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    } from 'chart.js';

    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

    let base = {
        responsive: true,
        borderWidth: 0,
        cutout: "75%",
        hoverOffset: 18,
        offset: 2,
        borderRadius: 3,
        maintainAspectRatio: false,
        layout: {
            padding: 20,
        },
        plugins: {
            legend: {
                display: false,
                position: "chatArea",
            },            
        }
    }

    const sideCount = {
        id: "sideCount",
        afterDraw(chart, args, options) {
            const {ctx, chartArea: {top, bottom, left, right, width, height} } = chart;

            chart.data.datasets.forEach((dataset, i) => {
                chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
                    const { x,y } = datapoint.tooltipPosition();
                    
                    const halfwidth = width / 2;
                    const halfheight = height / 2;

                    const xLine = x >= halfwidth ? x + 0 : x ;
                    const yLine = y >= halfheight ? y + 20 : y - 15;

                    const extraLine = x >= halfwidth ? 15 : -15;

                    ctx.beginPath();
                    ctx.font = chart.data.fontSide;

                    // const text = chart.data.labels[index] + ": " + chart.data.datasets[i].data[index];
                    const text = chart.data.datasets[i].data[index];

                    const textXPos = x >= halfwidth ? "left" : "right";
                    const plusFive = x >= halfwidth ? 5 : -5;
                    ctx.textAlign = textXPos;
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = "#94a3b8";
                    ctx.fillStyle = chart.data.fontColor;
                    ctx.fillText(text, xLine + extraLine + plusFive, yLine);

                })
            })
        }
    }

    const midCount = {
        id: "midCount",
        afterDraw(chart, args, options) {
            const {ctx, chartArea: {top, bottom, left, right, width, height}} = chart;
            var total = 0;

            chart.data.datasets.forEach((dataset, i) => {
                const chartHeight = chart.canvas.clientHeight / 2;
                const chartWidth = chart.canvas.clientWidth / 2;

                chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
                    total += chart.data.datasets[i].data[index];
                })

                const totalWidth = ctx.measureText(total).width / 2;

                const position = chartWidth <= 70 ? (chartWidth - totalWidth/2 - 3) : (chartWidth + totalWidth + 4);

                ctx.beginPath();
                ctx.font = chart.data.fontMid;

                ctx.textBaseline = "middle";
                ctx.fillStyle = "#92a2b7";
                ctx.fillStyle = chart.data.fontColor;
                ctx.fillText(total, position, chartHeight + 2);

            })
        }

    }
    
    export let data;
    export let labels;
    export let plugins;

    export let passColors = [];

    export let fontColor = "#92a2b7";
    export let height = "h-28";
    export let width = "w-auto";
    export let fontMid = "1.25rem Arial";
    export let fontSide = ".9rem Arial";
    export let options = base;

    let chartPlugins = [[]];

    if (plugins.toString() === "mid,side") {
        chartPlugins = [midCount, sideCount]
    } else if (plugins === "mid") {
        chartPlugins = ([midCount])
    } else if (plugins === "side") {
        chartPlugins = ([sideCount])
    } 

    const chartData = {
        fontMid: fontMid, 
        fontSide: fontSide, 
        fontColor: fontColor,
        labels: labels,
        datasets: [
        {
            data: data,
            backgroundColor: passColors,
    }]}
</script>

<div class="z-10">
    <Doughnut 
        class="m-auto {height} {width}"
        plugins={chartPlugins}
        data={chartData}
        {options}
    />
</div>