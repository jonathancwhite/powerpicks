import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children }) => {
	const { userInfo } = useSelector((state) => state.auth);

	if (!userInfo) {
		// Get the current host (includes hostname and port)
		const currentHost = window.location.host;
		const mainDomainHost = currentHost.replace(/^app\./, "");

		// Redirect to the login page on the main domain
		const protocol = window.location.protocol;
		const loginURL = `${protocol}//${mainDomainHost}/login`;
		window.location.href = loginURL;
		return null;
	}

	return <>{children}</>;
};
