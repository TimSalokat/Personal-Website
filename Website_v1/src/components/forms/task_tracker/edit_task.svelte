
<script>
    import AddTask from "./add_task.svelte";
    import { f_task } from "$scripts/task_tracker/tasks";
    import { states } from "$stores/Global";
    export let props;

    const submit = (data, project_id) => {
        if(data.description === undefined) data.description = "";
        const details = {
            "task_id": props.id,
            "project_id": project_id,
            "section_id": data.section_id,

            "old_project_id": props.project_id,
            "old_section_id": props.section_id,
        }
        f_task.edit(data, details)
    }

    const handle_delete = (details) => {
        f_task.delete(details.project_id, details.section_id, details.id);
        $states.overlayActive = false;
    }

</script>

<AddTask edit={true} base_values={props} _submit={submit} on_delete={handle_delete}/>