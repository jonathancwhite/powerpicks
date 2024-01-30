import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials, updateUser } from "../../../slices/authSlice";
import PropTypes from "prop-types";

const ProfilePictureModal = ({ closeModal, user }) => {
	const [selectedAnimal, setSelectedAnimal] = useState("");
	const [profilePictureString, setProfilePictureString] = useState(
		user.profilePicture,
	);
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();
	const token = user.token;

	const availableProfilePictures = [
		"dog",
		"cat",
		"tiger",
		"bird",
		"bear",
		"fox",
		"otter",
	];

	const handleModalContentClick = (e) => {
		e.stopPropagation();
	};

	const handleProfilePictureClick = (e) => {
		// get the animal name from the image src
		let animalName = e.target.src.split("/")[4].split("-")[1];
		setSelectedAnimal(animalName); // only to show a state of what is clicked before save
		setProfilePictureString(`generic-${animalName}-ai.webp`);
	};

	const handleUpdateProfilePicture = async () => {
		const updatedUserInfo = {
			profilePicture: profilePictureString,
		};

		const id = user._id;

		try {
			setIsLoading(true);
			let updatedUser = await dispatch(
				updateUser({ id, token, updatedUserInfo }),
			);

			if (updatedUser.meta.requestStatus === "fulfilled") {
				console.log("setting credentials");
				let updatedCredentials = await dispatch(
					setCredentials(updatedUser.payload),
				);
				if (updatedCredentials.payload) {
					setIsLoading(false);
					toast.success("Profile Picture Updated");
					closeModal();
				}
			}
		} catch (error) {
			toast.error(error.message);
			console.error(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		// Profile Pictures take this form "generic-animal-ai.webp"
		let profilePicString = user.profilePicture;
		let pictureStrArray = profilePicString.split("-");
		let currentAnimal = pictureStrArray[1];

		setSelectedAnimal(currentAnimal);
	}, [user.profilePicture]);

	return (
		<div className='modal'>
			<div className='modal-backdrop' onClick={closeModal}>
				<div className='modal-item' onClick={handleModalContentClick}>
					<div className='profile-picture-modal'>
						<div className='modal-header'>
							<div className='close'>
								<button
									className='btn btn--close'
									onClick={closeModal}>
									<IoMdClose />
								</button>
							</div>
						</div>
						<div className='modal-content'>
							{isLoading ? (
								<>
									<div className='modal-content--title'>
										<h2>Changing Profile Picture</h2>
									</div>
									<div className='modal-content--text'>
										Please wait while we update your profile
										picture.
									</div>
								</>
							) : (
								<>
									<div className='modal-content--title'>
										<h2>Change Profile Picture</h2>
									</div>
									<div className='modal-content--text'>
										Select a new profile picture.
									</div>
								</>
							)}

							<div className='profilePictureSelector'>
								{isLoading ? (
									<div className='spinner'></div>
								) : (
									<>
										{availableProfilePictures.map(
											(animal, index) => {
												return (
													<div
														className={`profilePictureSelector__item ${
															animal ===
															selectedAnimal
																? "active"
																: ""
														}`}
														onClick={
															handleProfilePictureClick
														}
														key={index}>
														<img
															src={`/pfp/generic-${animal}-ai.webp`}
															alt={animal}
														/>
													</div>
												);
											},
										)}
									</>
								)}
							</div>
							{isLoading ? null : (
								<div className='profilePictureSelector__actions'>
									<button
										className='btn btn--tertiary'
										onClick={handleUpdateProfilePicture}>
										Save
									</button>
								</div>
							)}

							<div className='modal-content--footer'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

ProfilePictureModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
	user: PropTypes.object,
};

export default ProfilePictureModal;
