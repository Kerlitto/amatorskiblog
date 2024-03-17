import { Link, useLoaderData } from "react-router-dom";

import "../styles/styles.css";
import { getPost } from "../api/posts";
import { getUser } from "../api/users";
import { getComments } from "../api/comments";

function PostPage() {
  const { user, post, comments } = useLoaderData();
  return (
    <>
      <div className="title-text-and-button">
        <h1>{post.title}</h1>
        <Link to={"/posts/new"}>
          <button className="button-transparent">Edit Post</button>
        </Link>
      </div>

      <div>
        By: <Link to={`/users/${user.id}`}>{user.name}</Link>
      </div>
      <br></br>
      <div>{post.body}</div>
      <h2>Comments</h2>
      <div className="comments-card-list">
        {comments.map(comment => (
          <div key={comment.id} className="card">
            <div className="card-top comment">{comment.email}</div>
            <div className="card-body">{comment.body}</div>
          </div>
        ))}
      </div>
    </>
  );
}

async function loader({ request: { signal }, params: { postId } }) {
  const comments = getComments(postId, { signal });
  const post = await getPost(postId, { signal });
  const user = getUser(post.userId, { signal });

  return { user: await user, post, comments: await comments };
}

export const postPageRoute = {
  loader,
  element: <PostPage />,
};
