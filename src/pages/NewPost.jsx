import "../styles.css";
import { Form, Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";

function NewPostPage() {
  const users = useLoaderData();

  return (
    <>
      <h1>New Post</h1>
      <Form className="form-grid">
        <div className="title-author-group">
          <div className="input-group">
            <label htmlFor="title" className="label">
              Title
            </label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="input-group">
            <label htmlFor="author" className="label">
              Author
            </label>
            <select name="author" id="author">
              {users.map(users => (
                <option value={users.userId} key={users.userId}>
                  {users.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="body" className="label">
            Body
          </label>
          <textarea type="text" name="body" id="body" />
        </div>
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
