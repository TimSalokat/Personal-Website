
<script>
    import AddProject from "./task_tracker/add_project.svelte";
    import AddTask from "./task_tracker/add_task.svelte";
    import TaskDetails from "./task_tracker/task_details.svelte";
	import EditProject from "./task_tracker/edit_project.svelte";

    import { states } from "../../stores/Global";

    const forms = new Map([
        ["AddTodo", AddTask],
        ["AddProject", AddProject],
        ["TaskDetails", TaskDetails],
        ["EditProject", EditProject],
    ])

    const formData = $states.overlay.props

</script>

<svelte:component this={forms.get($states.activeForm)} props={formData}/> 
