import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../fetch";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(dispatch);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">

        <Link to="/" className="navbar-brand mb-0 h1">
          React Boilerplate
        </Link>

        <Link to="/signup">
          <button className="btn btn-primary">Sign Up!</button>
        </Link>

        <div className="ml-auto">

          {store.isLoggedIn ? (
            <button
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="btn btn-success">
                Log In
              </button>
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
};
