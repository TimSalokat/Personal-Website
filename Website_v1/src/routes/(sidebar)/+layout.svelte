
<script>

	import "../index.scss"

	import { onMount } from "svelte";

	import { projects, _projects } from "$stores/Tasks";
	import { states, consts } from "$stores/Global";

	import SideBar from '$components/base/sidebar.svelte';
	import Overlay from '$components/base/overlay.svelte';
	import LoadingScreen from "$src/components/base/loading_screen.svelte";

	let ShowSideBar = false;

	const toggleSideBar = () => { ShowSideBar = !ShowSideBar };

</script>

<div>
	<LoadingScreen/>

	<Overlay/>

	<SideBar {toggleSideBar} {ShowSideBar} />
	
	<!-- Main Content -->
	<div 
	class=" {ShowSideBar
			? 'open'
			: 'closed'} 
			wrapper
			min-w-screen min-h-screen max-h-screen relative transition-all overflow-hidden h-screen flex flex-col"
			>
			<slot />
		</div>
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	:global(.seperator){
        min-width: 70%;
        margin: .3rem 15%;
        min-height: 1px;
        background-color: var(--gray3);
    }

	.open {
		margin-left: 250px;
		border-radius: 20px 0 0 20px;
	}
	.closed {
		margin-left: 55px;
		border-radius: 5px 0 0 5px;
	}

	.wrapper {
		position: relative;
		background-color: var(--gray1);
    	color: var(--gray7);
	}

	.wrapper::after {
		position: absolute;
		content: "";
		margin-top: 30vh;
		height: 40vh;
		width: 2px;
		background-color: var(--gray3);
	}
</style>
