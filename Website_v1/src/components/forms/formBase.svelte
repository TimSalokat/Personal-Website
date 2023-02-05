
<script>
    import { colors, states } from "../../stores/Global";

    export let submit;

    const send = () => {
        submit();
        $states.overlay = {}
        $states.overlayActive = false;
    }
</script>

<div 
style="background-color: {$colors.darkColors[5]}; color: {$colors.lightColors[10]}" 
class="w-3/5 h-4/5 mx-auto rounded-xl p-5 relative flex"
>

    <slot/>

    <!-- Submit and Cancel buttons -->
    <div class="absolute bottom-5 right-5 flex gap-3">
        <button 
            class="border px-6 py-3 rounded text-sm"
            style="border-color: {$colors.darkColors[19]}"
            on:click={() => $states.overlayActive = false}
        >Cancel</button>

        <button 
            class="px-6 py-3 rounded text-sm border" 
            style="background-color: {$colors.darkColors[15]};  border-color: {$colors.darkColors[19]}"
            on:click={() => send()}
        >Submit</button>
    </div>

</div>