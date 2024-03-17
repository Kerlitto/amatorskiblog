import "../styles/styles.css";
import { Form, Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";
import { SelectAuthor } from "../components/selectAuthor";
import { TextInputArea, TextInputBox } from "../components/textInputContainers";

function NewPostPage() {
  const users = useLoaderData();

  return (
    <>
      <h1 className="title-text-and-button">New Post</h1>
      <Form className="form-grid">
        <div className="title-author-group">
          <TextInputBox label="Title" type="text" name="title" />
          <SelectAuthor users={users} />
        </div>
        <TextInputArea label="Body" type="text" name="body" />
        <div className="form-footer-btn-grid">
          <Link to={`/`} className="button-transparent">
            Cancel
          </Link>
          <Link to={`/`} className="button-full">
            Save
          </Link>
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
};
