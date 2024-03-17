import {
  Link,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from "react-router-dom";
import "../styles/navbar.css";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";

export const Navbar = () => {
  const { state } = useNavigation();

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <nav className={`top-nav ${showMenu ? "show" : ""}`}>
        <Link to="/posts" className="big-text">
          Blog
        </Link>
        <div className="menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-bar ${showMenu ? "show" : ""}`}>
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
