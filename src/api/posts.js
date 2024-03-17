import { baseApi } from "./base";

export const getPosts = options => {
  return baseApi.get("posts", options).then(res => res.data);
};

export const getPost = (postId, options) => {
  return baseApi.get(`posts/${postId}`, options).then(res => res.data);
};

export const getFilteredPosts = (query, user, options) => {
  if (!query && user) {
    return baseApi.get(`/posts?userId=${user}`, options).then(res => res.data);
  } else if (query && !user) {
    return baseApi.get(`/posts?q=${query}`, options).then(res => res.data);
  } else {
    return baseApi
      .get(`/posts?q=${query}&userId=${user}`, options)
      .then(res => res.data);
  }
};

export const postPost = (postId, options) => {
  return baseApi.post(`posts/${postId}`, options).then(res => res.data);
};
