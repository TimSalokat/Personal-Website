
import { states } from "$stores/Global";

export const load = () => {
    states.update(current => {
        current.loading = true;
        return current;
    })
}