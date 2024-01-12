import axios from "axios";

export const validateUser = async () => {
	const currentHost = window.location.host;
	const mainDomainHost = currentHost.replace(/^app\./, "");

	const protocol = window.location.protocol;
	const baseURL = `${protocol}//${mainDomainHost}`;

	try {
		console.log("Trying to validate user");
		// const response = await axios.get(
		// 	`${baseURL}/api/users/auth/validateUser`,
		// );
		const response = await axios.get(
			"http://jcwdev.test:8000/api/users/auth/validateUser",
			{ withCredentials: true },
		);

		return response.data;
	} catch (error) {
		console.error("Error during JWT validation:", error);
		throw error;
	}
};
