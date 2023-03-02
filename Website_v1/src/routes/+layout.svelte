<script>

	import "./index.scss"

	import { onMount } from "svelte";

	import { projects, _projects } from "$stores/Tasks";
	import { states } from "$stores/Global";

	import SideBar from '$components/base/sidebar.svelte';
	import Overlay from '$components/base/overlay.svelte';
	import LoadingScreen from "$src/components/base/loading_screen.svelte";

	import { f_project } from "$scripts/task_tracker/projects"
	import { f_task } from "$scripts/task_tracker/tasks"

	let project_ref;
	projects.subscribe(data => project_ref = data);

	export const setup = async () => {
		await f_project.get();    
		await f_task.get();
		project_ref.forEach(current => {
			f_project.reCalc(current.id);
		})
	}

	let isMounted = false;

	onMount(() => {
		if(!isMounted) { 
			setup();
			isMounted = true;
		}
	})

	let ShowSideBar = false;

	const toggleSideBar = () => { ShowSideBar = !ShowSideBar };

	$states.load(2000, () => {});

	const colors = [
		"#f3f5f6", // Page BG and form bg 1
		"#e2e5e9", // Hover text color 2
		"#d1d5db", // Seperator color 3
		"#98a1ae", // Form borders and seperator 4
		"#6e7887", // form placeholder, button border, sidebar icons 5
		"#46515d", // Hover bg color 6
		"#3b4754", // Main Text and most icons 7
		"#171b21", // Joker 8
		"#212830", // Joker  9
	]

	const dark_colors = [
		"#212830", // 1 Page and form bg
		"#171b21", // 2 Hover text
		"#3b4754", // 3 Seperator
		"#46515d", // 4 Form Borders and seperators
		"#6e7887", // 5 Form placeholder, button border, sidebar icons 
		"#98a1ae", // 6 Hover bg 
		"#d1d5db", // 7 Main Text and icons
		"#e2e5e9", // 8 Joker
		"#f3f5f6", // 9 Joker
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
