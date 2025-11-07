import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { logout } from "../lib/fetch";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    
    const handleClick = () => {
        logout(dispatch);
    };
    
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>
                <div className="ml-auto">
                    {!store.isLoggedIn ? (
                        <>
                            <Link to="/signup">
                                <button className="btn btn-primary">
                                    Sign Up!
                                </button>
                            </Link>
                            <Link to="/login">
                                <button className="btn btn-primary ms-2"
                                >Login
                                </button>
                            </Link>
                        </>
                    ) : (
                        <button
                            className="btn btn-danger"
                            onClick={handleClick}
                        >Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};