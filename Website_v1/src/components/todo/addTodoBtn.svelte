<script>
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import BiPlus from 'svelte-icons-pack/bi/BiPlus';

	import { states, colors } from '../../stores/Global';

	export let project;
	export let category;
	export let customClasses = '';

	function handleClick() {
		$states.activeForm = "AddTodo";
		$states.overlayActive = true;
		$states.overlay.project = project;
		$states.overlay.category = category;
	}

</script>

<button
class="{customClasses} mx-auto flex w-3/4 h-14 border-2 rounded-lg items-center justify-center cursor-pointer relative"
style="border-color: {$colors.darkColors[15]}; color: {$colors.lightColors[7]}; fill: {$colors.lightColors[7]}"
on:click={handleClick}
on:keypress={() => console.log('keypress')}
>

	<Icon src={BiPlus} size="1.5rem" className="fill-inherit" />
	<p>Add task</p>

</button>