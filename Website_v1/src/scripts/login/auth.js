
import { consts, states, user} from "$stores/Global";

import { redirect } from "@sveltejs/kit";
import { goto } from "$app/navigation";

import Cookies from "js-cookie";

let _consts;
consts.subscribe(data=>_consts=data);

export const auth = {

    get_token: async (name, password) => {
        const res = await fetch(_consts.backend + `/auth/login`, {
            method: "Post",
            body: JSON.stringify({
                "name": name,
                "password": password,
            }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        if(res.status === 200){
            const response = await res.json();
            Cookies.set("token", response.access_token);
            goto("/");
        }
    },

    check_token: async (token) => {
        const res = await fetch(_consts.backend + `/auth/verify-token`,{
            method: "Get",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`}
        })
        if(res.status == 200){
            const response = await res.json();
            user.update(current => {
                current.username = response.name;
                current.role = response.role;
                return current;
            })
            states.update(current => {
                current.loading = false;
                return current;
            })
            return true;
        }
        return false;
    },

    check_login: async () =>  {
        let verified = false;
        let token = Cookies.get("token");
        if(!token){
            return false
        }
        verified = await auth.check_token(token);
        if(!verified) {
            return false
        }
        return true
    }
}