import { Link } from "react-router-dom";

function Navbar({user}) {
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">social auth app</Link>
      </span>
      {
        user 
          ? (<ul className="list">
              <li className="listItem">
                <img
                  src={user.photos[0].value}
                  alt=""
                  className="avatar"
                />
              </li>
              <li className="listItem">{user.displayName}</li>
              <li className="listItem" onClick={logout}>logout</li>
            </ul>)
          : (<Link className="link" to="/login">
            Login
          </Link>)
      }
      
    </div>
  );
}

export default Navbar;