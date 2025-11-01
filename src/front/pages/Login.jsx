import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";




export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const handleLoginClick = () => {
        login(email, password, dispatch)
    }
    
    return(
        <>
        <div className="login-page text-center mt-5">
        {
        (store.token && store.token !== undefined && store.token !== " ")
        ?
        <>
        <h1>Hello, you are logged in.</h1>
        <div>{store.token}</div>
        </>
        :
        <>
        <h1>Login</h1>
        <div>
            <input 
            type="text" 
            placeholder="Enter e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div>
            <input 
            type="text" 
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
        </div>
        <div>
            <button
                onClick={handleLoginClick}
            >Login
            </button>
        </div>
        </>
        }
        </div>
        </>
    )
}