export const login = async(email, password, dispatch) => {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    }
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/token`, options)
    if (!response.ok){
        const data = await response.json();
        console.log(data.msg);
        return {
            error:{
                status: response.status,
                statusText: response.statusText,
            }
        }
    }
    const data = await response.json();
    sessionStorage.setItem('token', data.access_token);
    dispatch({
        type: 'fetchedToken',
        payload: {
            token: data.access_token,
        }
    })
    return data;
}

export const signUp = async(email, password, dispatch) => {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    }
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, options)
    if (!response.ok){
        const data = await response.json();
        console.log(data.message);
        return {
            error:{
                status: response.status,
                statusText: response.statusText,
            }
        }
    }
    const data = await response.json();
    dispatch({
        type: 'successfulSignUp',
        payload: {
            'message': data.message,
            'isSignUpSuccessful': true,
        }
    })
    console.log(data)
    return data;
}

export const logout = (dispatch) => {
    sessionStorage.removeItem('token');
    dispatch({
        type: 'removedToken',
        payload: {
            token: null,
        }
    });
}

export const getInvoices = async (token) => {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/invoices`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
    );
    if (!response.ok) {
        throw new Error("Failed to fetch invoices");
    }
    return response.json();
};