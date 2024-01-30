import { useSelector, useDispatch } from "react-redux";
import { IoPencil } from "react-icons/io5";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ProfilePictureModal from "../../components/ProfilePictureModal";
import { setCredentials, updateUser } from "../../../../slices/authSlice";

const ProfileSettings = () => {
	const { userInfo, isLoading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const [isProfilePictureModalOpen, setIsProfilePictureModalOpen] =
		useState(false);

	const [profileData, setProfileData] = useState({
		username: userInfo.username,
	});

	const handleChangePicture = () => {
		if (!isProfilePictureModalOpen) {
			setIsProfilePictureModalOpen(true);
		}
	};

	const closeModal = () => {
		setIsProfilePictureModalOpen(false);
	};

	// should this wait for a stop?
	const handleInputChange = (e) => {
		setProfileData({ username: e.target.value });
	};

	const handleSaveProfile = async () => {
		const id = userInfo._id;
		const token = userInfo.token;

		let updatedUserInfo = {
			username: profileData.username,
		};

		try {
			let updatedUser = await dispatch(
				updateUser({ id, token, updatedUserInfo }),
			);

			if (updatedUser.meta.requestStatus === "fulfilled") {
				let updatedCredentials = await dispatch(
					setCredentials(updatedUser.payload),
				);
				if (updatedCredentials.payload) {
					toast.success("Profile Updated");
				}
			}
		} catch (err) {
			toast.error(err.message);
		}
	};

	useEffect(() => {
		if (!userInfo) {
			toast.error("Please login to view this page");
		}

		// this may be bad later, idk?
		toast.dismiss();
	});

	return (
		<div className='settings__main'>
			<div className='settings__header'>
				<div className='settings__header--title'>Edit Your Profile</div>
				<div className='settings__header--text'>
					Edit your profile details.
				</div>
			</div>
			<div className='settings__content'>
				<div className='form-container'>
					<div className='form-item-wrap'>
						<div className='form-elements text-input'>
							<label>Profile Picture</label>
							<div className='settings__profilePicture'>
								<img
									src={`/pfp/${userInfo.profilePicture}`}
									alt='current profile picture'
								/>
								<div
									className='editProfilePicture'
									onClick={handleChangePicture}>
									<IoPencil />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='form-item-wrap'>
					<div className='form-elements text-input'>
						<label>Username</label>
						<input
							label='username'
							placeholder='Username'
							aria-label='username'
							value={profileData.username}
							onChange={(e) => handleInputChange(e)}
							disabled={isLoading}
						/>
						<span className='spinner grey'></span>
						<div className='validation-msg'></div>
						<div className='right-wrap'></div>
					</div>
				</div>

				<div className='bottom-wrap'>
					<div className='form-elements button'>
						{isLoading ? (
							<button className='btn btn--tertiary'>
								<div className='spinner'></div>
							</button>
						) : (
							<button
								className='btn btn--tertiary'
								onClick={handleSaveProfile}>
								Save
							</button>
						)}
					</div>
				</div>
			</div>
			{isProfilePictureModalOpen ? (
				<ProfilePictureModal closeModal={closeModal} user={userInfo} />
			) : null}
		</div>
	);
};

export default ProfileSettings;
