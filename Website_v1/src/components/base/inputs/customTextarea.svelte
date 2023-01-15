<script>
    
    import { colors } from "../../../stores/Global";
    
    export let title;
    export let customStyle = "";
    export let customClasses = "";

    export let value;

</script>

<div class="relative">
    <textarea style="background-color: {$colors.darkColors[10]};" placeholder=" " bind:value></textarea>
    <p class="top-1/4 ml-3 {customClasses}" style="color: {$colors.lightColors[6]} {customStyle}">{title}</p>
</div>

<style>

    * {
        transition: ease .2s;
    }

    textarea {
        @apply w-full;
        @apply my-2;
        @apply h-12;
        @apply rounded-md;
        @apply p-3;
        @apply pl-3;
        resize: none;
    }

    textarea + p{
        position: absolute;
    }

    textarea:focus {
        outline: none;
        @apply h-32;
    }

    textarea:not(:placeholder-shown) {
        outline: none;
        @apply h-32;
    }

    textarea:focus + p {
        @apply text-xs;
        color: inherit;
        top: calc(0% - 2px);
    }

    textarea:not(:placeholder-shown) + p {
        @apply text-xs;
        color: inherit;
        top: calc(0% - 2px);
    }

</style>
