import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { login } from "../lib/fetch";
import * as types from "../lib/actionTypes";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            dispatch({
                type: types.setError,
                payload: "Please fill in all fields"
            });
            return;
        }
        
        setIsLoading(true);
        try {
            await login(email, password, dispatch);
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (store.token) {
            navigate("/private");
        }
    }, [store.token, navigate]);

    return (
        <div className="login-page text-center mt-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        {store.token ? (
                            <>
                                <h1>Hello! You are logged in.</h1>
                                <div className="alert alert-success mt-3">
                                    Token: {store.token.substring(0, 20)}...
                                </div>
                            </>
                        ) : (
                            <>
                                <h1 className="mb-4">Login</h1>
                                {store.errorMessage && (
                                    <div className="alert alert-danger" role="alert">
                                        {store.errorMessage}
                                    </div>
                                )}
                                <form onSubmit={handleLoginSubmit}>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            className="form-control"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            className="form-control"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Logging in...
                                                </>
                                            ) : (
                                                "Login"
                                            )}
                                        </button>
                                    </div>
                                </form>
                                <div className="mt-3">
                                    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};