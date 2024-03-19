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

export const createPost = (data, options) => {
  return baseApi.post(`posts/`, data, options).then(res => res.data);
};

export const editPost = (postId, data, options) => {
  return baseApi.put(`posts/${postId}`, data, options).then(res => res.data);
};

export const deletePost = (postId, data, options) => {
  return baseApi.delete(`posts/${postId}`, data, options).then(res => res.data);
};
