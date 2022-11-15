import React, { useContext } from "react";

import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Button } from "antd";

const Header = () => {
  let { user, logOutUser } = useContext(AuthContext);
  // console.log(user)
  return (
    <div>
      {user ? (
        <>
          <Button type="link">
            <Link to="/">Home</Link>
          </Button>
          <span>|</span>
          <Button type="link">
            <Link to="/books">Books</Link>
          </Button>
          <span>|</span>
          <Button type="link" onClick={logOutUser}>
            Logout
          </Button>
        </>
      ) : (
        <Button type="link">
          <Link to="/login">Login</Link>
        </Button>
      )}
      {user && (
        <>
          <p>Hello {user.username}</p>
        </>
      )}
    </div>
  );
};

export default Header;
