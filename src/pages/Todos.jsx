import "../styles/styles.css";
import { getTodos } from "../api/todos";
import { useLoaderData } from "react-router-dom";

const TodosPage = () => {
  const todos = useLoaderData();

  return (
    <>
      <h1 className="title-text-and-button">Todos</h1>
      <div>
        {todos.map(todos => (
          <li
            key={todos.id}
            className={todos.completed ? "crossed-through" : undefined}
          >
            {todos.title}
          </li>
        ))}
      </div>
    </>
  );
};

function loader({ request: { signal } }) {
  return getTodos({ signal });
}

export const todosPageRoute = {
  loader,
  element: <TodosPage />,
};
