import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import "../styles.css";
import { getTodos } from "../api/todos";
import { useLoaderData } from "react-router-dom";

const TodosPage = () => {
  const data = useLoaderData();

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    !data.completed;
    setIsActive(!isActive);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Todos</h1>
        <div className="card-grid">
          {data.map((data) => (
            <li
              key={data.id}
              onClick={handleClick}
              className={isActive ? "crossed-through" : ""}
            >
              {data.title}
            </li>
          ))}
        </div>
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
