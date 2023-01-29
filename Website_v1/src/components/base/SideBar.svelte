<script>
	import Icon from 'svelte-icons-pack/Icon.svelte';

	import { states, consts, colors } from '../../stores/Global.js';
	import { projects } from '../../stores/Tasks.js';

	export let toggleSideBar;
	export let ShowSideBar;

	const l_colors = $colors.lightColors;
	const hover_color = "#eee";

</script>

<button class={ShowSideBar ? 'Burger open' : 'Burger'} on:click={toggleSideBar}>
	<span class="bg-slate-300" />
	<span class="bg-slate-300" />
	<span class="bg-slate-300" />
</button>

<div
    class="flex flex-col min-h-screen bg-gray-900 text-slate-300 absolute top-0 left-0 items-center px-1 py-5"
	id="SideBar"
>
	<!-- Header -->
	<h1 class="text-xl mb-4 font-semibold">Tims Projecto</h1>
	<div class="bg-indigo-500 rounded-full w-16 h-16 mb-2">
		<!-- Placeholder for Image -->
	</div>

	<!-- User Info -->
	<h2 class="font-semibold text-indigo-500">Admin User</h2>
	<p class="text-slate-500 text-xs">Admin</p>

	<span class="{ShowSideBar ? 'seperator' : 'seperator invis'} bg-indigo-600 my-5" />

	<!-- Navigation -->
	<nav class="flex flex-col w-full px-3 gap-1 font-normal text-gray-500">

		{#each $consts['Pages'] as page}
			<a
			class="col-span-3 transition ease-in-out flex gap-5 hover:text-slate-200 {page.title === "Todos" ? "" : "mb-2"}"
			href={page.link}
			style="{$states['activePage'] === page.title ? `color: ${hover_color} ;` : ``}"
			>
				<div
				class="w-6 h-6 hover:fill-slate-200"
				style={$states['activePage'] === page.title ? `fill: ${hover_color};` : `fill: ${l_colors[5]}`}
				>
					<Icon src={page.icon} className="w-6 h-6 fill-inherit" />
				</div>
				<h4 style="color: inherit;">{page.title}</h4>
			</a>

			<!-- !This shit aint workin (link) -->
			<!-- TODO this is an error in sveltekit. if your at the dynamic +page from the projects the data isnt passed a second time on click of any of these -->
			{#if page.title === "Todos"}
				<!-- {#await func.getProjects()}
					<h2>Loading ...</h2>
				{:then projects}  -->
					<ul>
						{#each $projects as project}
							<li class="hover:text-slate-200">
								<a href="/todo/{project.uuid}">
									{project.title}
								</a>
							</li>
						{/each}
					</ul>
				<!-- {/await} -->
			{/if}
		{/each}
		
	</nav>
</div>

<style>
	#SideBar {
		padding-right: 30px;
		width: 280px;
	}

	.seperator {
		width: 60%;
		height: 1px;
		border-radius: 100%;
		transition: 0.2s ease;
	}

	.seperator.invis {
		opacity: 0;
	}

	.Burger {
		position: fixed;
		z-index: 49;
		margin: 20px 10px;
		height: 30px;
		width: 30px;
	}

	.Burger span {
		position: absolute;
		width: 22px;
		height: 1px;
		rotate: 0deg;
		border-radius: 2px;
		top: 50%;
		right: 0%;
		transition: ease-in-out 0.4s;
	}
	.Burger span:nth-of-type(1) {
		top: calc(50% + 7px);
	}
	.Burger span:nth-of-type(2) {
		top: calc(50% - 7px);
	}

	.Burger.open span:nth-of-type(1) {
		rotate: 315deg;
		top: 50%;
	}
	.Burger.open span:nth-of-type(2) {
		rotate: 45deg;
		top: 50%;
	}
	.Burger.open span:nth-of-type(3) {
		opacity: 0;
	}
	ul{
		list-style-type: circle;
		margin-left: 3rem;
	}
</style>
