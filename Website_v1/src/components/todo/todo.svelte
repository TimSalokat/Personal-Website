<script lang="ts">
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import BiCheckCircle from 'svelte-icons-pack/bi/BiCheckCircle';
	import BiCircle from 'svelte-icons-pack/bi/BiCircle';

	import { colors } from '../../stores/Global';

	const d_colors = $colors.darkColors;
	const l_colors = $colors.lightColors;

	export let task;
	export let light = false;
	export let customStyle = '';
	export let customClasses = '';

	const t_color = light ? l_colors[10] : l_colors[9];
	const bg_color = light ? d_colors[13] : d_colors[6];

	const appliedStyle = `background-color: ${bg_color}; color: ${t_color}; text-decoration-color: ${t_color}; border-color: ${t_color}`;
</script>

<div
	class="{customClasses} todoContainer items-center w-full rounded-xl h-fit p-2 border-l-0 relative"
	style="{customStyle} {appliedStyle}"
>
	<!-- Side Border -->
	<div
		class="w-fit h-fit overflow-visible relative"
		style="fill: {t_color}"
		on:click={() => (task.finished = !task.finished)}
		on:keydown={() => console.log('keydown')}
	>
		<!-- Checkbox -->
		{#if task.finished}
			<Icon
				src={BiCheckCircle}
				className="fill-inherit w-max h-max flex align-center justify-center scale-90"
				size="1.5rem"
			/>
		{:else}
			<Icon
				src={BiCircle}
				className="fill-inherit w-max h-max flex align-center justify-center scale-90"
				size="1.5rem"
			/>
		{/if}

		<span class="prioIndicator" style="background-color: {task.borderColor};" />
	</div>

	<!-- text -->
	<div class="{task.finished ? 'line-through' : ''} decoration-1 p-1 ml-2">
		<h2>{task.title}</h2>
		<h4 class="text-xs">{task.desc}</h4>
	</div>

	<!-- Project Indicator -->
	<p class="text-xs absolute top-0 right-0 p-1 px-2" style="color:{task.projectColor}">
		{task.project}
	</p>
</div>

<style>
	* {
		transition: 0.25s ease;
	}

	.prioIndicator {
		content: '';
		position: absolute;
		width: 2px;
		height: 25px;
		top: calc(50% - 12.5px);
		left: 120%;
		border-radius: 5px;
	}

	.todoContainer {
		display: grid;
		grid-template-columns: 1.5rem auto;
		cursor: pointer;
	}
</style>
