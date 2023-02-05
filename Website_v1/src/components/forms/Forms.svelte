
<script>
    import AddTodoForm from "../forms/addTodoForm.svelte";
    import AddProjectForm from "../forms/addProjectForm.svelte";
	import TaskDetails from "../todo/task_details.svelte";

    import { states } from "../../stores/Global";

    const forms = new Map([
        ["AddTodo", AddTodoForm],
        ["AddProject", AddProjectForm],
        ["TaskDetails", TaskDetails],
    ])

    const formData = $states.overlay.props

</script>

<svelte:component this={forms.get($states.activeForm)} props={formData}/> 
