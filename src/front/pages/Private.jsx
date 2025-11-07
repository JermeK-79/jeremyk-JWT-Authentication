import useGlobalReducer from "../hooks/useGlobalReducer"

export const Private = () => {
    const { store } = useGlobalReducer();
    
    return (
        <div className="text-center mt-5">
            {store.isLoggedIn 
                ? "Hello from the Private page!"
                : "You are not logged in. Please log in!"
            }
        </div>
    )
}