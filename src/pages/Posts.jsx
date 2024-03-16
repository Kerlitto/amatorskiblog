import "../styles.css";
import { Form, Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getFilteredPosts, getPosts } from "../api/posts";
import { getUsers } from "../api/users";

function PostsPage() {
  const { posts, users, filteredPost } = useLoaderData();

  return (
    <>
      <div className="title-text-and-button">
        <h1>Posts</h1>
        <Link to={"/posts/new"} className="button-transparent">
          New Post
        </Link>
      </div>
      <Form className="posts-search-bar">
        <div className="input-group">
          <label htmlFor="title" className="label">
            Query
          </label>
          <input type="search" name="query" id="title" />
        </div>
        <div className="input-group">
          <label htmlFor="author" className="label">
            Author
          </label>
          <select name="userId" id="author">
            {users.map(users => (
              <option key={users.Id} value={users.id}>
                {users.name}
              </option>
            ))}
          </select>
        </div>
        <button className="button-full">Filter</button>
      </Form>
      <div className="card-grid">
        {filteredPost.map(post => (
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
    </>
  );
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query");
  const user = searchParams.get("userId");
  const posts = getPosts({ signal });
  const users = getUsers({ signal });
  const filteredPost = getFilteredPosts(query, user, { signal });
  console.log(user);

  return {
    posts: await posts,
    users: await users,
    filteredPost: await filteredPost,
  };
}

export const postsPageRoute = {
  loader,
  element: <PostsPage />,
};
