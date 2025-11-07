import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { signUp } from "../lib/fetch";
import * as types from "../lib/actionTypes";

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            dispatch({
                type: types.setError,
                payload: "Please fill in all fields"
            });
            return;
        }
        
        if (password.length < 6) {
            dispatch({
                type: types.setError,
                payload: "Password must be at least 6 characters"
            });
            return;
        }
        
        setIsLoading(true);
        try {
            await signUp(email, password, dispatch);
        } catch (error) {
            console.error("Signup error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (store.token && store.token !== "") {
            navigate("/private");
        }
    }, [store.token, navigate]);

    return (
        <div className="signup-page text-center mt-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <h1 className="mb-4">Sign Up</h1>
                        {store.errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                {store.errorMessage}
                            </div>
                        )}
                        <form onSubmit={handleSignUpSubmit}>
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
                                    minLength={6}
                                    disabled={isLoading}
                                />
                                <small className="form-text text-muted">
                                    Password must be at least 6 characters
                                </small>
                            </div>
                            <div className="mb-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Signing up..." : "Sign Up"}
                                </button>
                            </div>
                        </form>
                        <div className="mt-3">
                            <p>Already have an account? <Link to="/login">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};