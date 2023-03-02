
import { projects, tasks } from "$stores/Tasks";
import { consts, states } from "$stores/Global";

let _consts;
consts.subscribe(data => _consts = data);

export const getJson = async (address) => {
    const target = _consts.backend + address;
    try{
        let response = await fetch(target);
        if(response.status === 200){
            let res = await response.json();
            states.update(current => {current.server_connection = true; return current})
            return res 
        } else {
            console.error("Couldnt fetch from: " + address + ". Status code: " + response.status);
            states.update(current => {current.server_connection = false; return current})
            return false
        }
    }catch(error) {
        console.error(error);
        states.update(current => {current.server_connection = false; return current})
    }
}

