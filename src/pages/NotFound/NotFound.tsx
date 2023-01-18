import React from "react";
import { Link } from "react-router-dom";

/* Styles */
import "./NotFound.css";

const NotFound: React.FC = () => {
  return (
    <div className="notfound">
      <h1>Page Not Found</h1>
      <Link className="notfound__link" to={"/"}>
        Return to Home Page
      </Link>
    </div>
  );
};

export default NotFound;
