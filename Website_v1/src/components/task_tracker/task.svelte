<script>
    export let task;
</script>

<div class="task_container">
    
    <h2>{task.title}</h2>

</div>

<style>

.task_container {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 3rem;
    border-radius: .5rem;
    padding: .25rem;
    height: fit-content;
    background-color: #f3f5f6;
}

h2 {
    font-weight: 500;
}

</style>