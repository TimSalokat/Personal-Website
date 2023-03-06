
import { consts } from "$stores/Global";

let _consts;
consts.subscribe(data=>_consts = data);

export const f_user = {
    add: async (username, password) => {
        const res = await fetch(_consts.backend + `/users/add`, {
            method: "Post",
            body: JSON.stringify({
                "name": username,
                "password": password,
            }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        if(res.status == 200) {
            return true
        }
        return false
    }
}