
<script>
    import { states } from "../../stores/Global";
    
    import AddProject from "./task_tracker/add_project.svelte";
    import AddTask from "./task_tracker/add_task.svelte";
	import EditProject from "./task_tracker/edit_project.svelte";
	import AddSection from "./task_tracker/add_section.svelte";
	import EditTask from "./task_tracker/edit_task.svelte";

    const forms = new Map([
        ["AddTodo", AddTask],
        ["AddProject", AddProject],
        ["TaskDetails", EditTask],
        ["EditProject", EditProject],
        ["AddSection", AddSection],
    ])

    const formData = $states.overlay.props

</script>

<svelte:component this={forms.get($states.activeForm)} props={formData}/> 
