
<script>
    import { states, consts } from "$stores/Global";

    import { onMount } from "svelte";

    import { f_project } from "$scripts/task_tracker/projects";
    import { f_task } from "$scripts/task_tracker/tasks";

    import Switch from "$components/base/inputs/switch.svelte";
	import { goto } from "$app/navigation";

    import Cookies from "js-cookie";
	import { auth } from "$scripts/login/auth";

    onMount(async () => {
        let authorized = await auth.check_login()
        if(!authorized){
            goto("/login")
        }
    })

    $states['activePage'] = 'Settings';
</script>

<svelte:head>
    <title>Settings</title>
</svelte:head>

<ul class="settings_wrapper">
    <li>
        <h2>Backend swapper</h2>
        <!-- <Switch handle_change={(value)=>{console.log(value)}}/> -->
    </li>
    <div class="seperator"/>
    <button
        on:click={async () => {
            const res = await fetch($consts.backend + "/projects/test", {
                method: "get",
                headers: {
                    Authorization: Cookies.get("token"),
                }
            })
            const result = await res.json();
            console.log(result);
        }}
    >
        Test
    </button>
</ul>

<style lang="scss">
    .settings_wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 70%;
        background-color: var(--gray2);

        margin-left: auto;
        margin-right: auto;
        margin-top: 80px;
        border-radius: 20px 20px 0 0 ;
        padding: 2rem;
        font-size: 1.2rem;
    }
    li {
        display: flex;
        margin: 10px 0px;
        justify-content: space-between;
    }
</style>