import { useEffect } from "react";
import Login from "../components/form/Login";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
	const { userInfo } = useSelector((state) => state.auth);

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from || "/";

	useEffect(() => {
		// check if user is already logged in
		if (userInfo && location.pathname === "/login") {
			toast.success("User logged in successfully");
			navigate(from);
		}
	}, [userInfo, navigate, from, location.pathname]);

	return (
		<div className='container'>
			<Login />
		</div>
	);
};

export default LoginPage;
