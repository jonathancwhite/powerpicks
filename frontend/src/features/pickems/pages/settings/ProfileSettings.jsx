import { useSelector } from "react-redux";
import { IoPencil } from "react-icons/io5";
import { toast } from "react-toastify";
import { useState } from "react";
import ProfilePictureModal from "../../components/ProfilePictureModal";

const ProfileSettings = () => {
	const auth = useSelector((state) => state.auth);
	const [isProfilePictureModalOpen, setIsProfilePictureModalOpen] =
		useState(false);

	const handleChangePicture = () => {
		if (!isProfilePictureModalOpen) {
			setIsProfilePictureModalOpen(true);
		}
	};

	const closeModal = () => {
		setIsProfilePictureModalOpen(false);
	};

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
									src={`/pfp/${auth.userInfo.profilePicture}`}
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
							value={auth.userInfo.name}
						/>
						<span className='spinner grey'></span>
						<div className='validation-msg'></div>
						<div className='right-wrap'></div>
					</div>
				</div>

				<div className='bottom-wrap'>
					<div className='form-elements button'>
						<button className='btn btn--tertiary'>Save</button>
					</div>
				</div>
			</div>
			{isProfilePictureModalOpen ? (
				<ProfilePictureModal
					closeModal={closeModal}
					user={auth.userInfo}
				/>
			) : null}
		</div>
	);
};

export default ProfileSettings;
