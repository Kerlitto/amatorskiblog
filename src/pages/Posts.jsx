import "../styles/styles.css";
import { Form, Link, useNavigation } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getFilteredPosts, getPosts } from "../api/posts";
import { getUsers } from "../api/users";
import { SelectAuthor } from "../components/selectAuthor";
import { TextInputBox } from "../components/textInputContainers";
import { Button } from "../components/buttons";

function PostsPage() {
  const { posts, users, filteredPost } = useLoaderData();

  console.log(filteredPost, posts);

  return (
    <>
      <div className="title-text-and-button">
        <h1>Posts</h1>

        <Link to={"/posts/new"}>
          <Button transparent>New Post</Button>
        </Link>
      </div>
      <Form className="posts-search-bar">
        <TextInputBox label="Query" type="search" name="query" />
        <SelectAuthor users={users} />
        <Button>Filter</Button>
      </Form>

      <div className="card-grid">
        {(filteredPost.length === 0 ? posts : filteredPost).map(post => (
          <div key={post.id} className="card">
            <div className="card-top">{post.title}</div>
            <div className="card-body">{post.body}</div>
            <div className="card-footer">
              <Link to={`/posts/${post.id}`}>
                <Button>View</Button>
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
