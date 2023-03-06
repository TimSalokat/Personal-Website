<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { auth } from '$scripts/login/auth';

	import { states, consts } from '$stores/Global';

	$states['activePage'] = 'Dashboard';

	onMount(async () => {
        let authorized = await auth.check_login()
        if(!authorized){
            goto("/login")
        }
    })
</script>

<div class="information_container">
	<div class="information_wrapper">
		<h1>Home</h1>
		<h3>Still working on this page</h3>
	</div>
</div>
