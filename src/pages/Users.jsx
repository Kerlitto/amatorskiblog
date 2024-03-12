import "../styles.css";
import { Link, useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";

function UsersPage() {
  const users = useLoaderData();

  return (
    <>
      <h1>Users</h1>
      <div className="card-grid">
        {users.map((users) => (
          <div key={users.Id} className="card">
            <div className="card-top">{users.name}</div>
            <div className="card-body">
              {users.company.name}
              <br></br> {users.website}
              <br></br> <Link to={`mailto:${users.email}`}>{users.email}</Link>
            </div>
            <div className="card-footer">
              <Link to={`/users/${users.id}`} className="view-button">
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function loader({ request: { signal } }) {
  return getUsers({ signal });
}

export const usersPageRoute = {
  loader,
  element: <UsersPage />,
};
