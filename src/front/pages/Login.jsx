import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { login } from "../fetch";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {store, dispatch} = useGlobalReducer();

    const handleLoginClick = () => {
        login(email, password, dispatch);
    }

    useEffect(() => {
        if (store.token && store.token !== undefined && store.token !== "") {
            navigate("/private");
        }
    }, [store.token, navigate]);

    return (
        <>
            <div className="login-page text-center mt-5">
                {
                    (store.token && store.token !== undefined && store.token !== "")
                    ?
                    <>
                        <h1>Hello! You are logged in.</h1>
                        <div>{store.token}</div>
                    </>
                    :
                    <>
                        <h1>Login</h1>

                        {store.errorMessage && (
                            <div className="alert alert-danger mt-3">
                                {store.errorMessage}
                            </div>
                        )}

                        <div className="mt-3">
                            <input 
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mt-3">
                            <input 
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mt-3">
                            <button
                                onClick={handleLoginClick}
                                className="btn btn-primary"
                            >
                                Login
                            </button>
                        </div>
                        
                        <div className="mt-3">
                            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                        </div>
                    </>
                }
            </div>
        </>
    );
}