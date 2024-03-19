import { baseApi } from "./base";

export const getTodos = options => {
  return baseApi.get("todos", options).then(res => res.data);
};

export const getTodo = (id, options) => {
  return baseApi.get(`todos/${id}`, options).then(res => res.data);
};

export const getFilteredTodos = (query, user, options) => {
  if (!query && user) {
    return baseApi.get(`/todos?userId=${user}`, options).then(res => res.data);
  } else if (query && !user) {
    return baseApi.get(`/todos?q=${query}`, options).then(res => res.data);
  } else {
    return baseApi
      .get(`/todos?q=${query}&userId=${user}`, options)
      .then(res => res.data);
  }
};

export const createTodo = (data, options) => {
  return baseApi.post(`todos/`, data, options).then(res => res.data);
};

export const editTodo = (id, data, options) => {
  return baseApi.put(`todos/${id}`, data, options).then(res => res.data);
};

export const deleteTodo = (id, data, options) => {
  return baseApi.delete(`todos/${id}`, data, options).then(res => res.data);
};
