import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import "../styles.css";

export const TodosPage = () => {
  const [data, setData] = useState([]);

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    !data.completed;
    setIsActive(!isActive);
  };

  useEffect(() => {
    // Fetch data from JSON file
    fetch("http://127.0.0.1:3000/todos")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
