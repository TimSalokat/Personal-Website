<script lang="ts">
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import BiCheckCircle from 'svelte-icons-pack/bi/BiCheckCircle';
	import BiCircle from 'svelte-icons-pack/bi/BiCircle';

	import { colors } from '../../stores/Global';

	const d_colors = $colors.darkColors;
	const l_colors = $colors.lightColors;

	export let task;
	export let customStyle = '';
	export let customClasses = '';
	export let charLimit = 150;

	const t_color = l_colors[10];
	const bg_color = d_colors[12];

	const appliedStyle = `background-color: ${bg_color}; color: ${t_color}; text-decoration-color: ${t_color}; border-color: ${t_color}`;

	let trimmedDescription;

	if(task.description.length > charLimit) {
		trimmedDescription = task.description.substring(0, charLimit) + "...";
	}else trimmedDescription = task.description;

</script>

<div
	class="{customClasses} todoContainer items-center w-full rounded-lg h-fit p-2 border-l-0 relative"
	style="{customStyle} {appliedStyle}"
>
	<!-- Side Border -->
	<div
		class="w-fit h-full overflow-visible relative customscale"
		style="fill: {t_color}"
		on:click={() => (task.finished = !task.finished)}
		on:keydown={() => console.log('keydown')}
	>
		<!-- Checkbox -->
		{#if task.finished}
			<Icon
				src={BiCheckCircle}
				className="fill-inherit w-max h-max flex align-center justify-center customscale"
				size="1.5rem"
			/>
		{:else}
			<Icon
				src={BiCircle}
				className="fill-inherit w-max h-max flex align-center justify-center customscale"
				size="1.5rem"
			/>
		{/if}

		<span class="prioIndicator" style="background-color: {task.borderColor};" />
	</div>

	<div class="ml-2" on:click={() => console.log(task)} on:keypress>

		<!-- text -->
		<div class="{task.finished ? 'line-through' : ''} decoration-1">
			<h2 class="font-semibold text-sm">{task.title}</h2>
			<h4 class="text-xs" style="color: {$colors.lightColors[6]}">{trimmedDescription}</h4>
		</div>
		
		<!-- Project Indicator -->
		<p class="text-xs absolute top-0 right-0 p-1 px-2" style="color:{task.project_color}">
			{task.project_title}
		</p>
		
	</div>
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
		@apply my-1;
		display: grid;
		grid-template-columns: 1.5rem auto;
		cursor: pointer;
	}
	.todoContainer.sortable-ghost {
		opacity: .4 !important;
	}

	.customscale {
		transform: scale(.85);
	}
</style>
