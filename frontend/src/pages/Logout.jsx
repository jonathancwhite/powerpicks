import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Logout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [logoutApiCall] = useLogoutMutation();

	const forceLogout = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			toast.success("User logged out successfully");
			navigate("/");
		} catch (error) {
			toast.error(
				"User could not be logged out at this time, please refresh the page and try again.",
			);
		}
	};

	useEffect(() => {
		forceLogout();
	}, []);

	return (
		<>
			<LoadingSpinner />
		</>
	);
};

export default Logout;
