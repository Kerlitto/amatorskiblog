import "../styles/styles.css";
import { Link, useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";
import { Button } from "../components/buttons";

function UsersPage() {
  const users = useLoaderData();

  return (
    <>
      <h1 className="title-text-and-button">Users</h1>
      <div className="card-grid">
        {users.map(users => (
          <div key={users.Id} className="card">
            <div className="card-top">{users.name}</div>
            <div className="card-body">
              {users.company.name}
              <br></br> {users.website}
              <br></br>{" "}
              <Link to={`mailto:${users.email}`} className="mailto">
                {users.email}
              </Link>
            </div>
            <div className="card-footer">
              <Link to={`/users/${users.id}`}>
                <Button>View</Button>
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
