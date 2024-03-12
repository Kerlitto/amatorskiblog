import "../styles.css";
import { getTodos } from "../api/todos";
import { useLoaderData } from "react-router-dom";

const TodosPage = () => {
  const todos = useLoaderData();

  return (
    <>
      <h1>Todos</h1>
      <div className="card-grid">
        {todos.map((todos) => (
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
