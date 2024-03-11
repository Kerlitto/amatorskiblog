import {
  Link,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from "react-router-dom";
import "../styles.css";
import LoadingSpinner from "./LoadingSpinner";

export const Navbar = () => {
  const { state } = useNavigation();

  return (
    <>
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
      <ScrollRestoration />
      {state === "loading" ? <LoadingSpinner /> : null}
      <div className={state === "loading" ? "container loading" : "container"}>
        <Outlet />
      </div>
    </>
  );
};
