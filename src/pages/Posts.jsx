import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import "../styles.css";

export const PostsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from JSON file
    fetch("http://127.0.0.1:3000/posts")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Posts</h1>
        <div className="card-grid">
          {data.map((post) => (
            <div key={post.userId} className="card">
              <div className="card-top">{post.title}</div>
              <div className="card-body">{post.body}</div>
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
