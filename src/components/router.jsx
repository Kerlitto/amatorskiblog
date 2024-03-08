import { createBrowserRouter } from "react-router-dom";
import { PostsPage } from "../pages/Posts.jsx";
import { UsersPage } from "../pages/Users.jsx";
import { TodosPage } from "../pages/Todos.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
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
]);
