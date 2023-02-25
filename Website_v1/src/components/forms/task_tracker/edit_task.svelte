
<script>
    import AddTask from "./add_task.svelte";
    import { func } from "$routes/task_tracker/functions";
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
        func.editTask(data, details)
    }

    const handle_delete = (details) => {
        func.delTask(details.project_id, details.section_id, details.id);
        $states.overlayActive = false;
    }

</script>

<AddTask edit={true} base_values={props} _submit={submit} on_delete={handle_delete}/>