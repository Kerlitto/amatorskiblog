import "../styles/styles.css";
import { Form, Link, redirect } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";
import { SelectAuthor } from "../components/selectAuthor";
import { TextInputBox } from "../components/textInputContainers";
import { Button } from "../components/buttons";
import { deleteTodo, editTodo, getTodo, getTodos } from "../api/todos";
import { useState } from "react";

function TodoPage() {
  const { users, todo } = useLoaderData();
  console.log(todo);
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
    todo.completed === checked;
  };
  console.log(checked);

  return (
    <>
      <div className="title-text-and-button">
        <h1>Edit Todo</h1>
        <Form method="delete">
          <Button transparent>REMOVE</Button>
        </Form>
      </div>
      <Form className="form-grid" method="put">
        <div className="title-author-group">
          <TextInputBox
            label="Title"
            type="text"
            name="title"
            defaultValues={todo}
          />
          <SelectAuthor users={users} defaultValues={todo} />
          <div className="checkbox-grid">
            <label for="checkbox" className="label">
              Completed
            </label>
            <input
              className="checkbox"
              type="checkbox"
              id="checkbox"
              checked={checked}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-footer-btn-grid">
          <Link to={`..`}>
            <Button transparent>Cancel</Button>
          </Link>
          <Button>Save</Button>
        </div>
      </Form>
    </>
  );
}

async function loader({ request: { signal }, params: { id } }) {
  const users = getUsers({ signal });
  const todo = getTodo(id, { signal });

  return { users: await users, todo: await todo };
}

export const todoPageRoute = {
  loader,
  action: async ({ request, params: { id } }) => {
    switch (request.method) {
      case "PUT": {
        const formData = await request.formData();
        const title = formData.get("title");
        const userId = formData.get("userId");
        const completed = formData.get("completed");

        const todo = await editTodo(
          id,
          { title, completed, userId },
          { signal: request.signal }
        );

        return redirect(`/todos/${id}`);
      }
      case "DELETE": {
        const formData = await request.formData();
        const title = formData.get("title");
        const userId = formData.get("userId");
        const completed = formData.get("completed");

        const todo = await deleteTodo(
          id,
          { title, completed, userId },
          { signal: request.signal }
        );

        return redirect(`/todos/`);
      }
      default: {
        throw new Response("", { status: 405 });
      }
    }
  },
  element: <TodoPage />,
};
