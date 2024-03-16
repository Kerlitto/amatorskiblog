import { baseApi } from "./base";

export const getPosts = options => {
  return baseApi.get("posts", options).then(res => res.data);
};

export const getPost = (postId, options) => {
  return baseApi.get(`posts/${postId}`, options).then(res => res.data);
};

export const getFilteredPosts = (query, user, options) => {
  return baseApi
    .get(`/posts?q=${query} & userId=${user}`, options)
    .then(res => res.data);
};
