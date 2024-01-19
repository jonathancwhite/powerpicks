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
	const [logoutApiCall, { isLoading }] = useLogoutMutation();

	const forceLogout = async () => {
		try {
			await logoutApiCall().unwrap();
			toast.info(
				"You have been logged out due to a session timeout. Please log back in.",
			);
			dispatch(logout());
			navigate("/");
		} catch (error) {
			console.error(error);
			navigate("/");
		}
		dispatch(logout());
		navigate("/");
	};

	useEffect(() => {
		forceLogout();
	}, []);

	return isLoading ? <LoadingSpinner /> : null;
};

export default Logout;
