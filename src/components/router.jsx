import { Navigate, createBrowserRouter } from "react-router-dom";

import { postPageRoute } from "../pages/Post.jsx";
import { postsPageRoute } from "../pages/Posts.jsx";
import { usersPageRoute } from "../pages/Users.jsx";
import { userPageRoute } from "../pages/User.jsx";
import { todosPageRoute } from "../pages/Todos.jsx";
import { Navbar } from "./Navbar.jsx";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/posts" />,
  },
  {
    path: "/",
    element: <Navbar />,

    children: [
      {
        errorElement: <h1>error</h1>,
        children: [
          {
            path: "/posts",
            children: [
              {
                index: true,
                ...postsPageRoute,
              },
              { path: ":postId", ...postPageRoute },
            ],
          },
          {
            path: "/users",
            children: [
              {
                index: true,
                ...usersPageRoute,
              },
              { path: ":userId", ...userPageRoute },
            ],
          },
          {
            path: "/todos",
            children: [
              {
                index: true,
                ...todosPageRoute,
              },
            ],
          },
        ],
      },
    ],
  },
]);
