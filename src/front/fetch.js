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
    
    // FIXED: Changed from fetch`...` to fetch(...)
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