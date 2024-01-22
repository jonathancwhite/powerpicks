import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateUser } from "../services/authService";
import { setCredentials, logout } from "../slices/authSlice";

const useAuth = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		const checkAuthStatus = async () => {
			console.log("Checking auth status");
			try {
				const user = await validateUser();
				if (user) {
					dispatch(setCredentials(user));
					localStorage.setItem("userInfo", JSON.stringify(user));
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
		if (hostname.includes("app.") && !userInfo) {
			checkAuthStatus();
		} else {
			setIsLoading(false);
		}
	}, [dispatch, isLoading, userInfo]);

	return isLoading;
};

export default useAuth;
