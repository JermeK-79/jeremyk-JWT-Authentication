import { useState,useEffect } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { login } from "../fetch";

export const Login= () => {
    const[email,setEmail]= useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();
    const{store,dispatch} = useGlobalReducer();

    const handleLoginClick = () =>{
        login(email,password,dispatch)
    }

     useEffect(() => {
        if (store.isLoginSuccessful) {
            navigate('/Private');
        }
        
    }, [store.isLoginSuccessful]);


    return (
        <>
            <div className="login-page">
                {
                    (store.token && store.token != undefined && store.token != "")
                        ?
                        (<>
                        <h1>Hello! You are logged in</h1>
                        <div>(store.token)</div>
                        </>)
                        :
                        (
                            <>
                            <div className="loginscreen text-center mt-5">
                            <h1>Login </h1>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    />
                            </div>
                            <div>
                                <button
                                    onClick={handleLoginClick}
                                >
                                    Login
                                </button>
                            </div>
                            </div>
                            </>
                        )
                }
            </div>
        </>
    )
}