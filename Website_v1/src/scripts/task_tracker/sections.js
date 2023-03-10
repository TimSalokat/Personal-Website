
import { projects } from "$stores/Tasks";
import { consts } from "$stores/Global";

import { get_headers } from "../functions";

let _consts;
consts.subscribe(data => _consts = data)

export const f_section = {

    get_section: (map, project_id, section_id) => {
        return map.get(project_id).sections.find((section)=>{return section.id == section_id})
    },

    add: async(title, project_id) => {
        const res = await fetch(_consts.backend + `/sections/add`, {
            method: "POST",
            body: JSON.stringify({
                title: title
            }),
            headers: {
                ...get_headers(),
                project_id: project_id
            }
        })
        const new_section = await res.json();
        new_section.tasks = [];
        projects.update(current => {
            current.get(project_id).sections.push(new_section);
            return current;
        })
    },

    edit: async(project_id, id, new_value) => {
        let details = {
            section_id: id,
            new_title: new_value,
        }
        const res = await fetch(_consts.backend + `/sections/edit`, {
            method: "PUT",
            headers: {
                ...get_headers(),
                ...details
            }
        });

        projects.update(current => {
            let section_edit = f_section.get_section(current, project_id, id);
            section_edit.title = new_value;
            return current
        })
    },


}