import useGlobalReducer from "../hooks/useGlobalReducer"
import * as types from "../lib/actionTypes";

export const Private  = () => {
    const { store, dispatch } = useGlobalReducer();
    
    return(
        <>
        {
            (store.isLoggedIn)
            ?
            <div className="text-center mt-5">
                Hello from the Private page!
            </div>
            :
            <div className="text-center mt-5">
               You are not logged in. Please log in!
            </div>
        }
        </>
    )
}