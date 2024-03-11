import { useLoaderData } from "react-router-dom";

import "../styles.css";
import { getPost } from "../api/posts";
import { getUser } from "../api/users";
import { getComments } from "../api/comments";

function PostPage() {
  const { user, post, comments } = useLoaderData();
  return (
    <>
      <h1>{post.title}</h1>
      <h1>{user.name}</h1>
      <h1>{comments.email}</h1>
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
