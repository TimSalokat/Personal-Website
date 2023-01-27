<script>

	import SideBar from '../components/base/SideBar.svelte';
	import Overlay from '../components/base/overlay.svelte';
	import { colors } from '../stores/Global';
	let ShowSideBar = true;

	const toggleSideBar = () => { ShowSideBar = !ShowSideBar };

</script>

<Overlay/>
<SideBar {toggleSideBar} {ShowSideBar} />

<!-- Main Content -->
<div 
	class=" {ShowSideBar
		? 'open'
		: 'closed'} min-w-screen min-h-screen max-h-screen text-white relative transition-all overflow-hidden h-screen flex flex-col"
	style="background-color: {$colors.darkColors[10]};"
>
	<slot />
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	.open {
		margin-left: 250px;
		border-radius: 20px 0 0 20px;
	}
	.closed {
		margin-left: 55px;
		border-radius: 5px 0 0 5px;
	}

</style>
