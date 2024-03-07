import { createBrowserRouter } from "react-router-dom"
import { Posts } from "../pages/Posts.jsx"
import { Users } from "../pages/Users.jsx"
import { Todos } from "../pages/Todos.jsx"


export const router = createBrowserRouter([
    {
        path: "/", element: <Posts/>
    }, {
        path: "/users", element: <Users/>
    }, {
        path: "/todos", element: <Todos/>
    }
])