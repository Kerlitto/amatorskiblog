import "../styles/styles.css";
import { Form, Link, redirect } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";
import { SelectAuthor } from "../components/selectAuthor";
import { TextInputBox } from "../components/textInputContainers";
import { getTodos } from "../api/todos";

function NewTodoPage() {
  const users = useLoaderData();

  return (
    <>
      <h1 className="title-text-and-button">New Todo</h1>
      <Form className="form-grid" method="post">
        <div className="title-author-group">
          <TextInputBox label="title" type="text" name="title" />
          <SelectAuthor users={users} />
        </div>

        <div className="form-footer-btn-grid">
          <Link to={`..`} className="button-transparent">
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

export const newTodoPageRoute = {
  loader,
  element: <NewTodoPage />,
  action: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get("title");
    const userId = formData.get("userId");

    const todo = await fetch("http://127.0.0.1:3000/todos", {
      method: "POST",
      signal: request.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, userId, completed: false }),
    }).then(res => res.json());

    return redirect("..");
  },
};
