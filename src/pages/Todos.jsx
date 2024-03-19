import "../styles/styles.css";
import { getTodos, getFilteredTodos } from "../api/todos";
import { Form, Link, useLoaderData } from "react-router-dom";
import { TextInputBox } from "../components/textInputContainers";
import { SelectAuthor } from "../components/selectAuthor";
import { getUsers } from "../api/users";
import { Button } from "../components/buttons";

const TodosPage = () => {
  const { todos, users, filteredTodos } = useLoaderData();

  return (
    <>
      <div className="title-text-and-button">
        <h1>Todos</h1>
        <Link to={"/todos/new"}>
          <Button transparent>New Todo</Button>
        </Link>
      </div>
      <Form className="posts-search-bar">
        <TextInputBox label="Query" type="search" name="query" />
        <SelectAuthor users={users} />
        <Button>Filter</Button>
      </Form>
      <ul>
        {(filteredTodos.length === 0 ? todos : filteredTodos).map(todo => (
          <li
            key={todo.id}
            className={todo.completed ? "todo crossed-through" : "todo"}
          >
            <span style={{ fontWeight: "bold" }}>{todo.id}.</span>
            <Link to={`/todos/${todo.id}`}>{todo.title}</Link>
          </li>
        ))}
      </ul>
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
