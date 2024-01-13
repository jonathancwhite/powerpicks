import axios from "axios";

const INVITE_LINKS_URL = "/api/invite_links";

/**
 *
 * @param {Object} inviteLinkData
 * @param {string} token - jwt token
 * @returns
 */
export const createInviteLink = async (inviteLinkData, token) => {
	// createInviteLink needs leagueId, passwordBypass, and expiresIn
	// route is protected, so we need to send the token in the headers
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
		},
		body: {
			leagueId: inviteLinkData.leagueId,
			passwordBypass: inviteLinkData.passwordBypass,
			expiresIn: inviteLinkData.expiresIn,
		},
	};

	const response = await axios.post(INVITE_LINKS_URL, inviteLinkData, config);
	return response.data;
};
