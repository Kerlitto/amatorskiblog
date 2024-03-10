import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import "../styles.css";
import { Link } from "react-router-dom";

export const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch posts from JSON file
    fetch("http://127.0.0.1:3000/posts")
      .then((response) => response.json())
      .then((posts) => setPosts(posts))
      .catch((error) => console.error("Error fetching posts:", error));

    fetch("http://127.0.0.1:3000/users")
      .then((response) => response.json())
      .then((users) => setUsers(users))
      .catch((error) => console.error("Error fetching users:", error));

    fetch("http://127.0.0.1:3000/comments")
      .then((response) => response.json())
      .then((comments) => setComments(comments))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div>
          {posts.map((post) => (
            <div key={post.userId}>
              <h1>{post.body}</h1>
              <div>
                {users.map((user) => (
                  <div key={user.id}>
                    <h1>{user.name}</h1>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          {users.map((user) => (
            <div key={user.id}>
              <h1>{user.name}</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
