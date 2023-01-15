
<script>
    import { colors } from "../../../stores/Global";

    export let text;
    export let active;
    export let func;
    export let color = "#d9d9d9";
</script>

<button 
class="border rounded-xl py-1 px-3 text-xs w-max cursor-pointer {active ? "active" : "inactive"}"
style="border-color: {color}; color: {!active ? color : $colors.darkColors[11]}; background-color: {active ? color : "transparent"}" 
on:click={func}>
    {text}
</button>

<style>
    .active {
        background-color: red;
    }
    .inactive {
        background-color: var(--color);
    }
</style>