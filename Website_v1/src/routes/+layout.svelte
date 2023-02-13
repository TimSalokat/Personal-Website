<script>

	import "./index.scss"

	import { states } from "$stores/Global";

	import SideBar from '../components/base/SideBar.svelte';
	import Overlay from '../components/base/overlay.svelte';
	import LoadingScreen from "$src/components/base/loading_screen.svelte";
	let ShowSideBar = false;

	const toggleSideBar = () => { ShowSideBar = !ShowSideBar };

	$states.load_for(2000);

	const colors = [
		"#f3f5f6",
		"#e2e5e9",
		"#d1d5db",
		"#98a1ae",
		"#6e7887",
		"#46515d",
		"#3b4754",
		"#171b21",
		"#212830"
	]

	const dark_colors = [
		"#212830",
		"#171b21",
		"#3b4754",
		"#46515d",
		"#6e7887",
		"#e2e5e9",
		"#d1d5db",
		"#e2e5e9",
		"#f3f5f6"
	];

	let displayed_colors;
	$: { if($states.dark_mode == true){displayed_colors = dark_colors}
		else {displayed_colors = colors}
	}

</script>

<div style="
--accent: #623bd7;

--gray1: {displayed_colors[0]};
--gray2: {displayed_colors[1]};
--gray3: {displayed_colors[2]};
--gray4: {displayed_colors[3]};
--gray5: {displayed_colors[4]};
--gray6: {displayed_colors[5]};
--gray7: {displayed_colors[6]};
--gray8: {displayed_colors[7]};
--gray9: {displayed_colors[8]};
">

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
        min-width: 90%;
        margin: .35rem 5%;
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
		background-color: var(--gray1);
    	color: var(--gray9);
	}
</style>
