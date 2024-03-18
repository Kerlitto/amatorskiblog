import "../styles/styles.css";
import { Form, Link, redirect } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";
import { SelectAuthor } from "../components/selectAuthor";
import { TextInputArea, TextInputBox } from "../components/textInputContainers";
import { getPost } from "../api/posts";

function EditPostPage() {
  const { users, post } = useLoaderData();

  return (
    <>
      <h1 className="title-text-and-button">Edit Post</h1>
      <Form className="form-grid" method="put">
        <div className="title-author-group">
          <TextInputBox label="Title" type="text" name="title" value={post} />
          <SelectAuthor users={users} />
        </div>
        <TextInputArea label="Body" type="text" name="body" />
        <div className="form-footer-btn-grid">
          <Link to={`/`} className="button-transparent">
            Cancel
          </Link>
          <button className="button-full">Save</button>
        </div>
      </Form>
    </>
  );
}

async function loader({ request: { signal }, params: { postId } }) {
  const users = getUsers({ signal });
  const post = getPost(postId, { signal });
  console.log(post);

  return { users: await users, post: await post };
}

export const editPostPageRoute = {
  loader,
  element: <EditPostPage />,
  action: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get("title");
    const userId = formData.get("userId");
    const body = formData.get("body");

    const post = await fetch(`http://127.0.0.1:3000/posts/${post.id}`, {
      method: "PUT",
      signal: request.signal,

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, userId, body }),
    }).then((res) => res.json());

    return redirect("..");
  },
};
