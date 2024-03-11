import { baseApi } from "./base";

export const getUsers = (options) => {
    return baseApi.get("users", options).then(res=>res.data)
}

export const getUser = (userId, options) => {
    return baseApi.get(`users/${userId}`, options).then(res=>res.data)
}