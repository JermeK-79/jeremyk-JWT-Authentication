// create the login function
export const login = async(email, password, dispatch) => {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    }
    
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/token`, options);
    
    if (!response.ok) {
        const data = await response.json();
        console.log(data.msg);
        dispatch({
            type: 'LOGIN_FAILURE',
            payload: {
                message: data.msg || "Bad username or password"
            }
        });
        return {
            error: {
                status: response.status,
                statusText: response.statusText,
            }
        }
    }
    
    const data = await response.json();
    console.log(data.access_token);
    sessionStorage.setItem("token", data.access_token);
    dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
            token: data.access_token
        }
    });
    return data;
}

export const signUp = async(email, password, dispatch) => {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    }
    
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, options);
    
    if (!response.ok) {
        const data = await response.json();
        console.log(data.msg);
        dispatch({
            type: 'SIGNUP_FAILURE',
            payload: {
                message: data.msg || "Error creating account"
            }
        });
        return {
            error: {
                status: response.status,
                statusText: response.statusText,
            }
        }
    }
    
    const data = await response.json();
    console.log(data);
   
    dispatch({
        type: 'successfulSignup',
        payload: {
            'message': data.message,
            'isSignUpSuccessful': true,
        }
    });
    return data; 
}