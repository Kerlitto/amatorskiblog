import { Navigate, createBrowserRouter } from "react-router-dom";
import { PostsPage } from "../pages/Posts.jsx";
import { UsersPage } from "../pages/Users.jsx";
import { TodosPage } from "../pages/Todos.jsx";
import { PostPage } from "../pages/Post.jsx";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/posts" />,
  },
  {
    path: "/posts",
    element: <PostsPage />,
  },
  {
    path: "/users",
    element: <UsersPage />,
  },
  {
    path: "/todos",
    element: <TodosPage />,
  },
  {
    path: "/post",
    element: <PostPage />,
  },
]);
