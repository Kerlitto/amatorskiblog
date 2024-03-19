import "../styles/styles.css";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";
import { SelectAuthor } from "../components/selectAuthor";
import { TextInputBox } from "../components/textInputContainers";
import { createTodo } from "../api/todos";
import { Button } from "../components/buttons";

function NewTodoPage() {
  const users = useLoaderData();
  const errorMessage = useActionData();

  return (
    <>
      <h1 className="title-text-and-button">New Todo</h1>
      <Form className="form-grid" method="post">
        <div className="title-author-group">
          <TextInputBox
            label={errorMessage ? errorMessage : "Title"}
            type="text"
            name="title"
          />

          <SelectAuthor users={users} />
        </div>

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

export const newTodoPageRoute = {
  loader,
  element: <NewTodoPage />,
  action: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get("title");
    const userId = formData.get("userId");
    if (title === "") {
      return "Title is required";
    }

    const todo = await createTodo(
      { title, userId },
      { signal: request.signal }
    );

    return redirect("..");
  },
};
