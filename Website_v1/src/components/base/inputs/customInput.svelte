<script>
    
    import { colors } from "../../../stores/Global";
    
    export let title;
    export let customStyle = "";
    export let customClasses = "";

    export let value;

</script>

<form class="relative">
    <input style="background-color: {$colors.darkColors[10]};" type="text" placeholder=" " bind:value>
    <p class="top-1/4 ml-3 {customClasses}" style="color: {$colors.lightColors[6]} {customStyle}">{title}</p>
</form>

<style>

    * {
        transition: ease .2s;
    }

    input {
        @apply w-full;
        @apply my-2;
        @apply h-10;
        @apply rounded-md;
        @apply pl-3;
    }

    input + p{
        position: absolute;
    }

    input:focus {
        outline: none;
    }

    input:focus + p {
        @apply text-xs;
        color: inherit;
        top: calc(0% - 2px);
    }

    input:not(:placeholder-shown) + p {
        @apply text-xs;
        color: inherit;
        top: calc(0% - 2px);
    }

</style>
