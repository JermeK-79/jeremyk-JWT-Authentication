export const login = async(email, password, dispatch) => {
    const options ={
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    }
    const response = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/token`, options);
    if(!response.ok){
        const data = await response.json();
        console.log(data.msg);
        return{
            error:{
                
            }
        }

    }
}