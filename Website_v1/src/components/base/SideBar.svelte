<script>
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import BiExit from "svelte-icons-pack/bi/BiExit";

	import { states, consts, user } from '$stores/Global.js';

	import Cookies from "js-cookie";

	export let toggleSideBar;
	export let ShowSideBar;

	const logout = () => {
		Cookies.remove("token")
        location.reload();
	}

</script>

<button class={ShowSideBar ? 'Burger open' : 'Burger'} on:click={toggleSideBar}>
	<span />
	<span />
	<span />
</button>

<div id="SideBar" >
	<!-- Header -->
	<h1>Web App</h1>
	<div class="image_holder">
		<!-- Placeholder for Image -->
	</div>

	<!-- User Info -->
	<h2>{$user.username}</h2>
	<span class="seperator {ShowSideBar ? '' : 'invis'}" style="background-color:var(--gray3)"/>
	<p>{$user.role}</p>

	<!-- Navigation -->
	<nav class="link_wrapper">

		{#each $consts['Pages'] as page}
			{#if page.title == "Settings"}
				<a
				class="anim {$states['activePage']==page.title ? "active":""}"
				style="position: absolute; bottom: 2rem;"
				href={page.link}
				>
					<Icon src={page.icon} size="1.5rem" />
					<h4 style="color: inherit;">{page.title}</h4>
				</a>
			{:else}
				<a
				class="anim {$states['activePage']==page.title ? "active":""}"
				href={page.link}
				>
					<Icon src={page.icon} size="1.5rem" />
					<h4 style="color: inherit;">{page.title}</h4>
				</a>
			{/if}
		{/each}

		<button 
		class="anim"
		style="position: absolute; bottom: 0"
		on:click={() => {logout()}}>
				<Icon src={BiExit} size="1.5rem"/>
				<h4>Logout</h4>
		</button>
		
	</nav>
</div>

<style lang="scss">

	#SideBar {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		align-items: center;
		padding: 1.25rem;
		padding-left: 4px;
		padding-right: 30px;
		width: 280px;
		background-color: var(--gray2);
		color: var(--gray7);
	}

	h1 {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	h2 {
		color: var(--accent);
		font-weight: 600;
		text-transform: capitalize;
	}
	
	p {
		font-size: .8rem;
		text-transform: capitalize;
	}

	a, button {
		display: flex;
		gap: 20px;
		cursor: default;
		fill: var(--gray5);
		color: var(--gray5);
		&:hover{
			cursor: pointer;
			fill: var(--gray7);
			color: var(--gray7);
		}
	}

	a {
		&.active {
			color: var(--accent);
			fill: var(--accent);
			h4 {
				font-weight: 600;
			}
		}
	}

	.seperator.invis {
		opacity: 0;
	}

	.image_holder {
		background-color: var(--accent);
		border-radius: 100%;
		height: 4rem;
		width: 4rem;
		margin-bottom: .5rem;
	}

	.link_wrapper {
		display: flex;
		position: relative;
		flex-direction: column;
		width: 100%;
		height: 100%;
		flex: 1;
		margin-top: 25%;
		padding-left: .75rem;
		gap: .5rem;
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
		background-color: var(--gray8);
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
</style>
