import { Link } from "react-router-dom";
import "../styles.css";

export const Navbar = () => {
  return (
    <nav className="top-nav">
      <Link to="/posts" className="big-text">
        Blog
      </Link>
      <ul className="nav-bar">
        <li>
          <Link to="/posts" className="link">
            Posts
          </Link>
        </li>
        <li>
          <Link to="/Users" className="link">
            Users
          </Link>
        </li>
        <li>
          <Link to="/Todos" className="link">
            Todos
          </Link>
        </li>
      </ul>
    </nav>
  );
};
