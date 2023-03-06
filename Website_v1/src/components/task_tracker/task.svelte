<script>
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import BiCheckCircle from 'svelte-icons-pack/bi/BiCheckCircle';
	import BiCircle from 'svelte-icons-pack/bi/BiCircle';

	import { states } from '../../stores/Global';
	import { projects, priorities } from '../../stores/Tasks';

	import { f_section } from "$scripts/task_tracker/sections";
	import { f_task } from "$scripts/task_tracker/tasks";

	export let task;
	
	let this_project;
	$: {this_project = $projects.get(task.project_id);}

	let description;
	$: {
		if (!task.description) {
			description = "No Description";
		} else {
			description = task.description;
		}
	}

	let priority;
	$: {
		priority = $priorities.get(task.priority);
	}

	const open_form = () => {
		$states.activeForm = 'TaskDetails';
		$states.overlay.props = task;
		$states.overlayActive = true;
	};
</script>

<div> <!-- !Need this for the hover anim to work -->
<div class="anim task_container 
	{task.finished ? 'finished' : ''}
	{task.priority == 3 ? "red" : "" }">

		<!-- Checkbox -->
		<div
		class="icon_wrapper"
		style="fill: inherit;"
		on:click={() => {
			f_task.setFinished(task.id, task.project_id, !task.finished);
			task.finished = !task.finished;
		}}
		on:keydown={() => console.log('keydown')}
		>
		<Icon src={task.finished ? BiCheckCircle : BiCircle} size="1.5rem" className="icon_style" />
	</div>
	
	<!-- Content -->
	<div class="task_content" on:click={() => open_form()} on:keydown={() => console.log('Keydown')}>
		<h2 class="title">{task.title}</h2>
		<h2 class="project" style="color: {this_project?.color}">{this_project?.title}</h2>
		<p class="description">{description}</p>

		<div class="info">
			<p class="priority_indicator text-left" style="color: {task.priority == 0 ? "inherit" : priority.color}">{priority.title}</p>
			
			<p class="text-center">20:15</p>
			
			<p class="text-right">{f_section.get_section($projects, task.project_id, task.section_id).title}</p>
		</div>
		
	</div>
</div>
</div>

<style lang="scss">
	:global(.task_container) {
		position: relative;
		display: flex;
		gap: 5px;
		width: 100%;
		min-height: max-content;
		height: max-content;
		padding: 0.25rem;
		margin-bottom: 0.5rem;
		border-radius: 0.35rem;
		background-color: var(--gray1);
		fill: var(--gray7);
		color: var(--gray7);
		overflow: hidden;
		* { z-index: 1; }
		&:hover {
			color: var(--gray2);
			fill: var(--gray2);
			&::before{
				width: 120%;
				transform: translate(-50%, -50%) rotate(0deg);
			}
		}
		&::before {
			content: '';
			width: 0;
			height: 500%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%) rotate(-45deg);
			background: var(--gray7);
			transition: .5s ease;
			display: block;
		}
	}

	:global(.task_container:hover) {
		cursor: pointer;
	}

	.task_content {
		width: 100%;
		display: grid;
		grid-template-columns: auto fit-content 20px;
		grid-template-rows: fit-content auto;
		grid-template-areas:
			'title project'
			'desc desc'
			'info info';
	}

	.info {
		grid-area: info;
		position: relative;
		padding-right: 5px;
		padding-top: 8px;
		height: 20px;
		display: flex;
		font-size: .6rem;
		* { width: 35%; }
	}

	.title {
		grid-area: title;
		font-size: 1.07rem;
		font-weight: 500;
		margin-top: auto;
		margin-bottom: auto;

		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.description {
		grid-area: desc;
		padding-right: 20px;
		font-weight: 100;
		font-size: 0.75rem;
		line-height: .9rem;
		min-height: .1rem;

		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.project {
		grid-area: project;
		font-size: 0.8rem;
		justify-self: flex-end;
		padding-right: 0.5rem;
	}

	.finished {
		text-decoration: line-through;
	}

	.red { background: var(--gray1) linear-gradient(-150deg, rgba(0,0,0,0) 50%, rgba(255,0,0,0.30) 120%);}
</style>
