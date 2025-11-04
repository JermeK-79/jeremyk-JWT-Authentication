import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { signUp } from "../fetch";  // ADDED: Import signUp function

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {store, dispatch} = useGlobalReducer();

    const handleSignUpClick = () => {
        signUp(email, password, dispatch);
    }

    useEffect(() => {
        if (store.token && store.token !== "") {
            navigate("/private");
        }
    }, [store.token, navigate]);

    return (
        <>
            <div className="signup-page text-center mt-5">
                <h1>Sign Up</h1>
                
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
                        className="form-control"
                    />
                </div>
                <div className="mt-3">
                    <input 
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="mt-3">
                    <button
                        onClick={handleSignUpClick}
                        className="btn btn-primary"
                    >
                        Sign Up
                    </button>
                </div>
                
                <div className="mt-3">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </>
    );
}