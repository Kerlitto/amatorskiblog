import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import "../styles.css";
import { Link } from "react-router-dom";

export const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from JSON file
    fetch("http://127.0.0.1:3000/posts")
      .then((response) => response.json())
      .then((posts) => setPosts(posts))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Posts</h1>
        <div className="card-grid">
          {posts.map((post) => (
            <div key={post.userId} className="card">
              <div className="card-top">{post.title}</div>
              <div className="card-body">{post.body}</div>
              <div className="card-footer">
                <Link to="/post" className="view-button">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
