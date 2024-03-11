import { Navbar } from "../components/Navbar";
import "../styles.css";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getPosts } from "../api/posts";

function PostsPage() {
  const posts = useLoaderData();

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
                <Link to={`/posts/${post.id}`} className="view-button">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function loader({ request: { signal } }) {
  return getPosts({ signal });
}

export const postsPageRoute = {
  loader,
  element: <PostsPage />,
};
