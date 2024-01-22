import axios from "axios";

const USERS_URL = "/api/users";

/**
 * @desc   	Gets user profile
 * @param  	{string} token - jwt token
 * @returns	{object} response - User Object
 */
export const fetchUserProfile = async (id, token) => {
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(`${USERS_URL}/${id}/profile`, config);
	return response.data;
};

const profileService = {
	fetchUserProfile,
};

export default profileService;
