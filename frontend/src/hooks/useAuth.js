import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { validateUser } from "../services/authService";
import { setCredentials, logout } from "../slices/authSlice";

const useAuth = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const userInfo = await validateUser();
				if (userInfo) {
					dispatch(setCredentials(userInfo));
				} else {
					dispatch(logout());
				}
			} catch (error) {
				dispatch(logout());
			}
		};

		checkAuthStatus();
	}, [dispatch]);
};

export default useAuth;
