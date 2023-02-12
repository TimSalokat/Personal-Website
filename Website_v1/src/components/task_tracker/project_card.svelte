<script>

    import { projects } from "../../stores/Tasks";

    export let project_id;

    let ratio;

	let self;
	$: self = $projects.get(project_id);

	$: {
        ratio = Math.round((self.finished_tasks / self.total_tasks) * 100)
		if(self.total_tasks == 0){ratio = 0}
	}

</script>

<a href="/task_tracker/{project_id}" class="project_container anim">

    <h2 class="title">{self.title}</h2>

    <div class="count" style="background-color: {self.color}">
        <p>{self.total_tasks}</p>
    </div>

    <div class="bar">
        <div class="bar_fill" style="width: {ratio + "%"}; background-color: {self.color}"/>
    </div>

    <p class="progress">{ratio}%</p>

</a>

<style>

    * {transition: ease .1s}

    .title {
        grid-area: title;
        font-size: 1.7rem;
        color: inherit;
        font-weight: 800;
        margin-top: auto;
    }

    .count {
        grid-area: count;
        display: grid;
        aspect-ratio: 1/1;
        height: 45px;
        border-radius: 12px;
    }

    .count p {
        place-self: center;
        font-weight: 600;
        font-size: 1.1rem;
        color: var(--gray1);
    }

    .bar {
        grid-area: bar;
        position: relative;
        width: 100%;
        height: 2px;
        place-self: center;
        background-color: var(--gray3);
    }

    .bar_fill {
        position: absolute;
        height: inherit;
        width: inherit;
    }

    .progress {
        grid-area: progress;
        font-size: .75rem;
        place-self: center;
        font-weight: 600;
    }

    @media screen and (max-width: 1350px) and (min-width: 1200px) {
        .title {
            font-size: 1.4rem;
        }
    }

</style>