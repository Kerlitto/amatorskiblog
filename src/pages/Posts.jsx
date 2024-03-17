import "../styles/styles.css";
import { Form, Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getFilteredPosts, getPosts } from "../api/posts";
import { getUsers } from "../api/users";
import { SelectAuthor } from "../components/selectAuthor";
import { TextInputBox } from "../components/textInputContainers";

function PostsPage() {
  const { posts, users, filteredPost } = useLoaderData();

  console.log(filteredPost, posts);

  return (
    <>
      <div className="title-text-and-button">
        <h1>Posts</h1>

        <Link to={"/posts/new"}>
          <button className="button-transparent">New Post</button>
        </Link>
      </div>
      <Form className="posts-search-bar">
        <TextInputBox label="Query" type="search" name="query" />
        <SelectAuthor users={users} />
        <button className="button-full">Filter</button>
      </Form>
      <div className="card-grid">
        {(filteredPost.length === 0 ? posts : filteredPost).map(post => (
          <div key={post.id} className="card">
            <div className="card-top">{post.title}</div>
            <div className="card-body">{post.body}</div>
            <div className="card-footer">
              <Link to={`/posts/${post.id}`}>
                <button className="button-full">View</button>
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
