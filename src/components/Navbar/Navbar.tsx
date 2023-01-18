import React, { useRef } from "react";
import { Link } from "react-router-dom";

/* Icons */
import { FaBars } from "react-icons/fa";

/* Styles */
import "./Navbar.css";

const Nav: React.FC = () => {
  const navRef = useRef<HTMLInputElement | null>(null);
  const showNavbar = (): boolean | undefined =>
    navRef.current?.classList.toggle("responsive-nav");

  return (
    <header>
      <div className="responsive-button">
        <button className="nav__btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </div>
      <nav className="nav responsive-nav" ref={navRef}>
        <ul>
          <li>
            <Link to={"/"} className="nav__link">
              Home Page
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
