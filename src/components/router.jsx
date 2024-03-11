import { Navigate, createBrowserRouter } from "react-router-dom";

import { PostPage } from "../pages/Post.jsx";
import { postsPageRoute } from "../pages/Posts.jsx";
import { usersPageRoute } from "../pages/Users.jsx";
import { todosPageRoute } from "../pages/Todos.jsx";

export const router = createBrowserRouter([
  // {
  //   path: "*",
  //   element: <Navigate to="/posts" />,
  // },
  {
    path: "/posts",
    children: [
      {
        index: true,
        ...postsPageRoute,
      },
      { path: "postId", element: <h1>Hi post</h1> },
    ],
  },
  {
    path: "/users",
    children: [
      {
        index: true,
        ...usersPageRoute,
      },
      { path: "userId", element: <h1>Hi user</h1> },
    ],
  },
  {
    path: "/todos",
    children: [
      {
        index: true,
        ...todosPageRoute,
      },
      { path: "userId", element: <h1>Hi user</h1> },
    ],
  },
  {
    path: "/post",
    element: <PostPage />,
  },
]);
