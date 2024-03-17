import { baseApi } from "./base";

export const getUsers = options => {
  return baseApi.get("users", options).then(res => res.data);
};

export const getUser = (userId, options) => {
  return baseApi.get(`users/${userId}`, options).then(res => res.data);
};

export const getUsersPosts = (userId, options) => {
  return baseApi.get(`users/${userId}/posts`, options).then(res => res.data);
};

export const getUsersTodos = (userId, options) => {
  return baseApi.get(`users/${userId}/todos`, options).then(res => res.data);
};
