<script>
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import BiCheckCircle from 'svelte-icons-pack/bi/BiCheckCircle';
	import BiCircle from 'svelte-icons-pack/bi/BiCircle';

	import { states } from '../../stores/Global';
	import { projects, priorities } from '../../stores/Tasks';
	import { func } from '$routes/task_tracker/functions';

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

<div class="anim task_container {task.finished ? 'finished' : ''}">
	<!-- Checkbox -->
	<div
		class="icon_wrapper"
		style="fill: inherit;"
		on:click={() => {
			func.setFinished(task.id, task.project_id, !task.finished);
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

			<p class="text-left">20:15</p>

			<p class="priority_indicator text-center" style="color: {priority.color}">{priority.title}</p>
			
			<p class="text-right">{func.get_section($projects, task.project_id, task.section_id).title}</p>

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
		height: fit-content;
		// height: 4rem;
		padding: 0.25rem;
		margin-bottom: 0.5rem;
		border-radius: 0.35rem;
		border: 1px solid transparent;
		background-color: var(--gray1);
		fill: var(--gray6);
		&:hover {
			background-color: var(--gray6);
			color: var(--gray2);
			fill: var(--gray2);
		}
		&::after {
			content: '';
			position: absolute;
			bottom: -6px;
			left: 2.5%;
			width: 95%;
			height: 1px;
			background-color: var(--gray3);
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
		// justify-content: space-between;
		font-size: .6rem;
		* {
			width: 35%;
		}
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
		color: inherit;
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
</style>
