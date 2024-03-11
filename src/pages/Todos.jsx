import "../styles.css";
import { getTodos } from "../api/todos";
import { useLoaderData } from "react-router-dom";

const TodosPage = () => {
  const data = useLoaderData();

  return (
    <>
      <h1>Todos</h1>
      <div className="card-grid">
        {data.map((data) => (
          <li
            key={data.id}
            className={data.completed ? "crossed-through" : undefined}
          >
            {data.title}
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
