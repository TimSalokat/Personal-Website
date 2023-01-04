
import { writable } from "svelte/store";

export const states = writable({})
export const consts = writable({})
export const colors = writable({})

export const _colors = {
    projectColors: ["#F6AE2D", "#7400b8", "#6930c3", "#5e60ce", "#5390d9", "#4ea8de", "#48bfe3", "#56cfe1", "#64dfdf", "#72efdd", "#80ffdb"],
    priorityColors: ["#03245E", "#023E8A", "#0077B6", "#C71F37"],
}

const _consts = {
    Pages: [
        {
            title: "Dashboard",
            icon: "ic:round-home",
            link: "/",
        },
        {
            title: "Todos",
            icon: "ic:round-assignment",
            link: "/todo",
        }
    ]
}

const _states ={
    activePage: _consts["Pages"][0].title,
}


colors.set(_colors);
consts.set(_consts);
states.set(_states);