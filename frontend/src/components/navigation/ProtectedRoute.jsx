import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children }) => {
	const { userInfo } = useSelector((state) => state.auth);

	if (!userInfo) {
		const currentHost = window.location.host;
		const mainDomainHost = currentHost.replace(/^app\./, "");
		const protocol = window.location.protocol;
		window.location.href = `${protocol}//${mainDomainHost}/logout`;
		return null;
	} else {
		console.log("ProtectedRoute -> userInfo detected");
	}

	return <>{children}</>;
};
