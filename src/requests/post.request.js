import {authApi} from "../api/request";

export const addPost= (post) => {
    return authApi.post('/add_post',post)
}