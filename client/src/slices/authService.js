import axios from "axios";

const USERS_URL = "/api/users";

/**
 * @desc   	Updates user profile
 * @param   {string} token - jwt token
 * @param   {Object} updatedUserInfo - User Data
 * @returns {object} response - User Object
 */
export const updateUser = async (id, token, updatedUserInfo) => {
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	};

	console.group(`authService.js`);
	console.log(`id: ${id}`);
	console.log(`token: ${token}`);
	console.log(`updatedUserInfo: ${updatedUserInfo}`);
	console.groupEnd();

	const response = await axios.put(
		`${USERS_URL}/${id}`,
		updatedUserInfo,
		config,
	);
	return response.data;
};

const authService = {
	updateUser,
};

export default authService;
