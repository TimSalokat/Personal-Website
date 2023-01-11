<script>
	import SideBar from '../components/base/SideBar.svelte';
	let ShowSideBar = false;

	const toggleSideBar = () => {
		ShowSideBar = !ShowSideBar;
	};
	const closeSideBar = () => {
		ShowSideBar = false;
	};
</script>

<SideBar {toggleSideBar} {ShowSideBar} {closeSideBar} />
<div
	class="{ShowSideBar
		? 'open'
		: 'closed'} min-w-screen min-h-screen bg-slate-800 text-white relative transition-all overflow-hidden"
>
	<slot />
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	.open {
		margin-left: 250px;
		border-radius: 30px 0 0 30px;
	}
	.closed {
		margin-left: 55px;
		border-radius: 5px 0 0 5px;
	}
</style>
