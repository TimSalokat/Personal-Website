import { projects, tasks } from "../../stores/Tasks";

let _projects;
projects.subscribe(data => _projects = data);

let _tasks;
tasks.subscribe(data => _tasks = data)

class _Projects {
	getById(id: string) {
		let response;
		_projects.forEach((project) => {
			if (id == project.uuid) {
				response = project;
			}
		});
		return response;
	}
}

class _Todos {
	filterByProjectId(id: string) {
		const filtered = _tasks.filter((task) => {
			return task.project_uuid === id;
		});
		return filtered;
	}
}

export const Projects = new _Projects();
export const Tasks = new _Todos();
