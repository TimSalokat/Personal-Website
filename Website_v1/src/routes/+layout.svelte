<script>

	import "./index.scss"

	import SideBar from '../components/base/SideBar.svelte';
	import Overlay from '../components/base/overlay.svelte';
	let ShowSideBar = false;

	const toggleSideBar = () => { ShowSideBar = !ShowSideBar };

</script>

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

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	:global(body) {
		--accent: #623bd7;

		--gray1: #f3f5f6;
		--gray2: #e2e5e9;
		--gray3: #d1d5db;
		--gray4: #98a1ae;
		--gray5: #6e7887;
		--gray6: #46515d;
		--gray7: #3b4754;
		--gray8: #212831;
		--gray9: #212830;
	}

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
		background-color: #f3f5f6;
    	color: #212830;
	}

</style>
