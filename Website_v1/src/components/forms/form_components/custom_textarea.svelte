<script>
    import "../forms.scss"
    
    export let title;
    export let value;

</script>

<div class="anim custom_textarea">
    <textarea placeholder=" " bind:value></textarea>
    <p>{title}</p>
</div>
