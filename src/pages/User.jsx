import { Link, useLoaderData } from "react-router-dom";

import "../styles/styles.css";
import { getUser, getUsersPosts, getUsersTodos } from "../api/users";

function UserPage() {
  const { user, posts, todos } = useLoaderData();
  return (
    <>
      <h1>{user.name}</h1>
      <div>
        <Link to={`mailto:${user.email}`}>{user.email}</Link>
      </div>
      <br></br>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b> {user.address.street} {user.address.suite}{" "}
        {user.address.city} {user.address.zipcode}
      </div>
      <br />
      <h1 className="title-text-and-button">Posts</h1>
      <div className="card-grid">
        {posts.map(post => (
          <div key={post.id} className="card">
            <div className="card-top">{post.title}</div>
            <div className="card-body">{post.body}</div>
            <div className="card-footer">
              <Link to={`/posts/${post.id}`} className="button-full">
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
      <br />
      <h1 className="title-text-and-button">Todos</h1>
      <div className="todos-list">
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
}

async function loader({ request: { signal }, params: { userId } }) {
  const user = await getUser(userId, { signal });
  const posts = getUsersPosts(user.id, { signal });
  const todos = getUsersTodos(user.id, { signal });
  return { posts: await posts, user, todos: await todos };
}

export const userPageRoute = {
  loader,
  element: <UserPage />,
};
