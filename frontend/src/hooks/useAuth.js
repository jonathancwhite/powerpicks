import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { validateUser } from "../services/authService";
import { setCredentials, logout } from "../slices/authSlice";
import { useState } from "react";

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

		checkAuthStatus();
	}, [dispatch]);

	return isLoading;
};

export default useAuth;
