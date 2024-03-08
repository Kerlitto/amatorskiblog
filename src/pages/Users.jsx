import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import "../styles.css";

export const UsersPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from JSON file
    fetch("http://127.0.0.1:3000/users")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Users</h1>
        <div className="card-grid">
          {data.map((data) => (
            <div key={data.Id} className="card">
              <div className="card-top">{data.name}</div>
              <div className="card-body">
                {data.company.name}
                <br></br> {data.website}
                <br></br> {data.email}
              </div>
              <div className="card-footer">
                <button className="view-button">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
