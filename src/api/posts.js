import { baseApi } from "./base";

export const getPosts = (options) => {
    return baseApi.get("posts", options).then(res=>res.data)
}

export const getPost = (postId,options) => {
    return baseApi.get(`posts/${postId}`, options).then(res=>res.data)
}