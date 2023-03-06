
<script>
	import "./index.scss";
	import { goto } from "$app/navigation";
</script>

<div class="page_wrapper">
	<div class="information_container">
		<div
			class="information_wrapper"
		>
			<h1>404</h1>
			<h3>Page not found</h3>
			<button class="anim" on:click={() => {goto("/login")}}>Go Back</button>
		</div>
	</div>
</div>

<style lang="scss">
	button {
		font-family: "Rubik";
		width: 7.5rem;
		height: 3.5rem;
		background-color: var(--gray2);
		color: var(--gray7);
		border: none;
		border-radius: .5rem;
		font-size: 1rem;
		&:hover{
			background-color: var(--gray4);
			cursor: pointer;
			scale: 1.1;
		}
	}
</style>