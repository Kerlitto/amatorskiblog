import "../styles/styles.css";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";
import { SelectAuthor } from "../components/selectAuthor";
import { TextInputArea, TextInputBox } from "../components/textInputContainers";
import { createPost } from "../api/posts";
import { Button } from "../components/buttons";

function NewPostPage() {
  const users = useLoaderData();
  const errorMessage = useActionData();

  return (
    <>
      <h1 className="title-text-and-button">New Post</h1>
      <Form className="form-grid" method="post">
        <div className="title-author-group">
          <TextInputBox
            label={errorMessage ? errorMessage : "Title"}
            type="text"
            name="title"
          />
          <SelectAuthor users={users} />
        </div>
        <TextInputArea label="Body" type="text" name="body" />
        <div className="form-footer-btn-grid">
          <Link to={`..`}>
            <Button transparent>Cancel</Button>
          </Link>
          <Button submit>Save</Button>
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
  action: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get("title");
    const userId = formData.get("userId");
    const body = formData.get("body");
    if (title === "") {
      return "Title is required";
    }

    const post = await createPost(
      { title, body, userId },
      { signal: request.signal }
    );

    return redirect(`/posts/${post.id}`);
  },
  element: <NewPostPage />,
};
