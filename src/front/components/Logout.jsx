import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton({ dispatch }) {
	const navigate = useNavigate();

	const handleLogout = () => {
		try {
			sessionStorage.removeItem('token');
			sessionStorage.removeItem('userId');
			sessionStorage.removeItem('user');
			dispatch({
				type: 'removedToken',
				payload: {
					token: null,
					isLoginSuccessful: false
				}
			});
			navigate('/login');
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	return (
		<button 
			onClick={handleLogout}
			className="btn btn-primary">
			Logout
		</button>
	);
}