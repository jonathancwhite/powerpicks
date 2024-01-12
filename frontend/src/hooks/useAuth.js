import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { validateUser } from "../services/authService";
import { setCredentials, logout } from "../slices/authSlice";

const useAuth = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

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
			} finally {
				setIsLoading(false);
			}
		};

		const hostname = window.location.host;
		if (hostname.includes("app.")) {
			checkAuthStatus();
		} else {
			setIsLoading(false);
		}
	}, [dispatch, isLoading]);

	return isLoading;
};

export default useAuth;
