import useGlobalReducer from "../hooks/useGlobalReducer"

export const Private = () => {
	const { store, dispatch } = useGlobalReducer()
	
	return (
		<>
			{store.isLoginSuccessful ? (
				<div className="text-center mt-auto">
					Hello, from the Private Page
				</div>
			) : (
				<div className="text-center mt-auto">
					You are not logged in. Please Log in!
				</div>
			)}
		</>
	)
}