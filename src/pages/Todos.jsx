import "../styles/styles.css";
import { getTodos, getFilteredTodos } from "../api/todos";
import { Form, Link, useLoaderData } from "react-router-dom";
import { TextInputBox } from "../components/textInputContainers";
import { SelectAuthor } from "../components/selectAuthor";
import { getUsers } from "../api/users";

const TodosPage = () => {
  const { todos, users, filteredTodos } = useLoaderData();

  return (
    <>
      <div className="title-text-and-button">
        <h1>Todos</h1>
        <Link to={"/todos/new"}>
          <button className="button-transparent">New Todo</button>
        </Link>
      </div>
      <Form className="posts-search-bar">
        <TextInputBox label="Query" type="search" name="query" />
        <SelectAuthor users={users} />
        <button className="button-full">Filter</button>
      </Form>
      <div>
        {(filteredTodos.length === 0 ? todos : filteredTodos).map(todo => (
          <li
            key={todo.id}
            className={todo.completed ? "crossed-through" : undefined}
          >
            {todo.title}
          </li>
        ))}
      </div>
    </>
  );
};

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query");
  const user = searchParams.get("userId");
  const todos = getTodos({ signal });
  const users = getUsers({ signal });
  const filteredTodos = getFilteredTodos(query, user, { signal });

  return {
    todos: await todos,
    users: await users,
    filteredTodos: await filteredTodos,
  };
}

export const todosPageRoute = {
  loader,
  element: <TodosPage />,
};
