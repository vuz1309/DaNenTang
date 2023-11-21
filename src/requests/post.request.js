import {api} from "./config/api";

export const addPost= (post) => {
    return api.post('/add_post',post)
}