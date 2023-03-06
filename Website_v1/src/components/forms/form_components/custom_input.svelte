
<script>
    import "../forms.scss";
    export let title;
    export let value;

</script>

<div class="anim custom_input">
    <input type="text" placeholder=" " bind:value>
    <p>{title}</p>
</div>