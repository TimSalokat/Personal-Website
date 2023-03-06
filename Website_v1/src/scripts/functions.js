
import { projects, tasks } from "$stores/Tasks";
import { consts, states } from "$stores/Global";

import Cookies from "js-cookie";

let _consts;
consts.subscribe(data => _consts = data);

export const get_headers = () => {
    let token = Cookies.get("token");
    return {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: token
    }
}

export const getJson = async (address, headers = {}) => {
    const target = _consts.backend + address;
    try{
        let response = await fetch(target, {
            headers: headers,
        });
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

