import "../styles/styles.css";
import { Form, Link, redirect } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";
import { SelectAuthor } from "../components/selectAuthor";
import { TextInputArea, TextInputBox } from "../components/textInputContainers";

function NewPostPage() {
  const users = useLoaderData();

  return (
    <>
      <h1 className="title-text-and-button">New Post</h1>
      <Form className="form-grid" method="post">
        <div className="title-author-group">
          <TextInputBox label="Title" type="text" name="title" />
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

function loader({ request: { signal } }) {
  return getUsers({ signal });
}

export const newPostPageRoute = {
  loader,
  element: <NewPostPage />,
  action: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get("title");
    const userId = formData.get("userId");
    const body = formData.get("body");

    const post = await fetch("http://127.0.0.1:3000/posts", {
      method: "POST",
      signal: request.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, userId, body }),
    }).then((res) => res.json());

    return redirect("..");
  },
};
