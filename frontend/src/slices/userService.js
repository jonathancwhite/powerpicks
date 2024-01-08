import axios from "axios";

const USERS_URL = "/api/users";

export const registerUser = async (userData) => {
	const response = await axios.post(USERS_URL, userData);
	return response.data;
};

const userService = {
	registerUser,
};

export default userService;
