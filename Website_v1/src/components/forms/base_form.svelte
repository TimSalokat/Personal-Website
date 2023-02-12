
<script>
    import "../forms/forms.scss"
    import { states } from "../../stores/Global";

    export let submit;

    const send = () => {
        submit();
        $states.overlay = {}
        $states.overlayActive = false;
    }
</script>

<div class="form_wrapper">

    <slot/>

    <!-- Submit and Cancel buttons -->
    <div class="form_button_wrapper">
        <button 
            class="cancel_button"
            on:click={() => $states.overlayActive = false}
        >Cancel</button>

        <button 
            class="submit_button"
            on:click={() => send()}
        >Submit</button>
    </div>

</div>

<style>
    * {
        transition: 0.2s ease;
    }
</style>