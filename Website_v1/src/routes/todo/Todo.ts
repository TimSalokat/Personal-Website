import { _projects, _tasks } from '../todo/functions';

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
			return task.project_id === id;
		});
		return filtered;
	}
}

export const Projects = new _Projects();
export const Tasks = new _Todos();
