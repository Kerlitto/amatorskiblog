import { useLoaderData } from "react-router-dom";

import "../styles.css";
import { getUser } from "../api/users";

function UserPage() {
  const user = useLoaderData();
  return (
    <>
      <h1>{user.name}</h1>
      <div>{user.email}</div>
      <br></br>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b> {user.address.street} {user.address.suite}{" "}
        {user.address.city} {user.address.zipcode}
      </div>
    </>
  );
}

function loader({ request: { signal }, params }) {
  return getUser(params.userId, { signal });
}

export const userPageRoute = {
  loader,
  element: <UserPage />,
};
