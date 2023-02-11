<script>
    import "../forms.scss"
    import { colors } from "../../../stores/Global";
    
    export let title;
    export let customStyle = "";
    export let customClasses = "";

    export let value;

</script>

<div class="custom_textarea">
    <textarea placeholder=" " bind:value></textarea>
    <p>{title}</p>
</div>
