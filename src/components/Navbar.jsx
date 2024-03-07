import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Posts</Link>
        </li>
        <li>
          <Link to="/Users">Users</Link>
        </li>
        <li>
          <Link to="/Todos">Todos</Link>
        </li>
      </ul>
    </nav>
  );
};
