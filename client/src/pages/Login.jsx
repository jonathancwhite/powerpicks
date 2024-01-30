import { useEffect } from "react";
import LoginForm from "../features/marketingSite/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
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
			<LoginForm />
		</div>
	);
};

export default Login;
