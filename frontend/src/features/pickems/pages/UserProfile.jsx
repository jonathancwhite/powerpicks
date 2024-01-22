import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, reset } from "../slices/profileSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const UserProfile = () => {
	const { id } = useParams();
	const { user, isLoading, isError, message } = useSelector(
		(state) => state.profile,
	);
	const { userInfo } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const fetchUserProfileData = async (id, token) => {
		if (id.length === 0 || token.length === 0) {
			toast.error("Invalid user profile data");
			return;
		}

		try {
			let userProfile = dispatch(fetchUserProfile({ id, token }));
			if (userProfile.payload) {
				toast.success(userProfile.payload.message);
				console.log(userProfile.payload);
			} else {
				toast.error(userProfile.error);
			}
		} catch (error) {
			toast.error(error);
			console.log(error);
		}
	};

	useEffect(() => {
		if (user.length > 0) {
			if (user._id !== id) {
				toast.info("Need to load correct user data");
				dispatch(reset());
			} else {
				toast.info("User data already loaded");
			}
		}

		if (user.length === 0 && id.length > 1) {
			fetchUserProfileData(id, userInfo.token);
		}
	});

	return (
		<div className='userProfile'>
			{isLoading ? (
				<div className='spinner'></div>
			) : (
				<h1>@{user.username}</h1>
			)}
		</div>
	);
};

export default UserProfile;
