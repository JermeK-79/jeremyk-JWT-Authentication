import { Link } from "react-router-dom";
import LogoutButton from "./Logout";

export const Navbar = ({ dispatch }) => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to = "/signup">
					<button className="btn btn-primary">
						Signup
					</button>
				</Link>
				<Link to = "/login">
					<button className="btn btn-success">
						Login
					</button>
				</Link>
				<div className="ml-auto">
					<LogoutButton dispatch={dispatch} />
				</div>
			</div>
		</nav>
	);
};