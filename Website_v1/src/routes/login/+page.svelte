
<script>
    import "$routes/index.scss"

    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { consts } from "$stores/Global";

    import { auth } from "$scripts/login/auth";

    import Cookies from "js-cookie";

    let _consts;
    consts.subscribe(data=>_consts = data);

    let username;
    let password;

    const handle_submit = async () => {
        auth.get_token(username, password)
    }

    onMount(async () => {
        let token = Cookies.get("token");
        if(await auth.check_token(token)){
            goto("/");}
    })


</script>

<div class="login_wrapper">

    <h2 style="font-size: 1.3rem">Login</h2>

    <div>
        <p class="login_label">Username:</p>
        <input class="login_input" type="text" autocomplete="off" placeholder=" " bind:value={username}>
        <p class="login_label">Password:</p>
        <input class="login_input" type="password" autocomplete="off" placeholder=" " bind:value={password}>
    </div>
    

    <div style="place-self: end">
        <button class="anim button secondary" on:click={() => {goto("/register")}}>Register</button>
        <button class="anim button" on:click={() => {handle_submit()}}>Login</button>
    </div>

</div>

<style lang="scss">
.button {
    font-family: "Rubik";
    background-color: var(--accent);
    color: var(--gray7);
    height: 3rem;
    width: 6.5rem;
    padding: .5rem;
    border: none;
    border-radius: .5rem;
    border: 2px solid transparent;
    &:hover {
        color: var(--gray7);
        cursor: pointer;
        border: 2px solid var(--gray6);
    }
}

.secondary {
    background-color: transparent;
    border: 2px solid var(--gray3);
    &:hover {
        background-color: transparent;
        color: var(--gray7);
        border-color: var(--gray6);
    }
}

</style>