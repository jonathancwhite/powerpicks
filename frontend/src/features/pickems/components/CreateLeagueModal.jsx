import { useState } from "react";
import { IoMdClose, IoMdArrowBack } from "react-icons/io";
import { toast } from "react-toastify";
import SportSelector from "./SportSelector";
import { useDispatch } from "react-redux";
import { createAndJoinLeague } from "../slices/leaguesJoinedSlice";
import PropTypes from "prop-types";

const CreateLeagueModal = ({ closeModal, user }) => {
	let initialFormData = {
		sport: "",
		name: "",
		maxPlayers: "8",
		isPublic: "true",
		password: "",
		tier: "Free",
		members: [user._id],
		createdBy: user._id,
	};

	let leagueInviteURL = "";

	const [currentStep, setCurrentStep] = useState(1);
	const [isCopied, setIsCopied] = useState(false);
	const [formData, setFormData] = useState(initialFormData);
	const [formErrors, setFormErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();

	const stepHeaders = [
		"Choose Your Sport",
		"Make It Yours",
		"Who has Access?",
		"Invite Your Friends",
	];

	const stepDescriptions = [
		"",
		"Don't worry, you can edit this all later if needed.",
		"If you don't want everyone to be able to join off of the leagues page, select no and add a password. Don't worry, you can always send your friends and invite link to join.",
		"Send out a custom invite link to your friends",
	];

	const isValidSport = (sport) => {
		const isValid = sport === null || sport.trim() !== "";
		return {
			isValid,
			message: isValid
				? ""
				: "Sport selection unable to be made. Please refresh and try again.",
		};
	};

	const isValidName = (name) => {
		const isValid = name.trim() !== "" && name.length > 3;
		return {
			isValid,
			message: isValid
				? ""
				: "Please correct league name. League names must be longer than 3 characters.",
		};
	};

	const isValidPlayerCount = (playerCount) => {
		const playerCountInt = parseInt(playerCount, 10); // Convert to integer

		const isValid =
			playerCountInt > 7 &&
			playerCountInt < 33 &&
			playerCountInt % 2 === 0;

		return {
			isValid,
			message: isValid
				? ""
				: "Please select a valid option for Max Players.",
		};
	};

	const isValidPassword = (password) => {
		const isValid = password.length > 5;
		return {
			isValid,
			message: isValid
				? ""
				: "Not a valid password. Passwords must be more than 5 characters.",
		};
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setFormErrors({ ...formErrors, [e.target.name]: "" });
	};

	const handleModalContentClick = (e) => {
		e.stopPropagation();
	};

	const handleContinue = async () => {
		let isValid = true;
		let errors = {};

		switch (currentStep) {
			case 1: {
				const sportValidation = isValidSport(formData.sport);
				errors.sport = sportValidation.message;
				isValid = false;
				toast.error(
					"Sport could not be selected. Please refresh and try again.",
				);
				setCurrentStep(1);

				break;
			}
			case 2: {
				const nameValidation = isValidName(formData.name);

				if (!nameValidation.isValid) {
					errors.name = nameValidation.message;
					isValid = false;
					toast.error("Please provide a valid league name.");
				}

				const maxPlayersValidation = isValidPlayerCount(
					formData.maxPlayers,
				);

				if (!maxPlayersValidation.isValid) {
					isValid = false;
					toast.error(
						"Please provide a valid number of max players.",
					);
				}

				break;
			}
			case 3: {
				if (formData.isPublic === "false") {
					const passwordValidation = isValidPassword(
						formData.password,
					);

					if (!passwordValidation.isValid) {
						errors.password = passwordValidation.message;
						isValid = false;
						toast.error(
							"Passwords should be more than 5 characters.",
						);
					}
				} else if (formData.isPublic === "true") {
					setFormData({
						...formData,
						password: null,
					});
				}

				break;
			}
			case 4: {
				console.log("4");
			}
		}

		setFormErrors(errors);

		if (isValid) {
			if (currentStep === 3) {
				// convert formData.isPublic to boolean
				formData.isPublic = formData.isPublic === "true" ? true : false;

				let userObject = JSON.parse(localStorage.getItem("userInfo"));
				let token = userObject.token;

				console.group(`Create League - CreateLeagueModal.jsx`);
				console.log(`token:`, token);
				console.log(`formData:`, formData);
				console.groupEnd();

				setIsLoading(true);

				const league = await dispatch(
					createAndJoinLeague({ token, leagueData: formData }),
				);

				if (league.payload) {
					setIsLoading(false);
					const leaguePayload = league.payload;
					const inviteLinkCode = leaguePayload.inviteLink[0].code;
					// set invite url to variable
					leagueInviteURL = `http://jcwdev.local/invites/${inviteLinkCode}`;
					toast.info(leagueInviteURL);
				}

				if (league.error) {
					clearForm();
					toast.error(league.error.message);
					console.error(league.error);
					closeModal();
				} else {
					setCurrentStep(currentStep + 1);
				}
			} else {
				setCurrentStep(currentStep + 1);
			}
		}
	};

	const handleShare = () => {
		if (navigator.clipboard) {
			navigator.clipboard
				.writeText(leagueInviteURL)
				.then(() => setIsCopied(true))
				.catch((err) => console.error("Failed to copy text: ", err));
			if (isCopied) {
				toast.info("Copied to clipboard!");
			}
		} else {
			// Fallback for older browsers
			const textArea = document.createElement("textarea");
			textArea.value = leagueInviteURL;
			document.body.appendChild(textArea);
			textArea.select();
			try {
				const successful = document.execCommand("copy");
				setIsCopied(successful);
				if (isCopied) {
					toast.info("Copied to clipboard!");
				} else {
					// toast.error(
					// 	`Oops, unable to copy! Your invite link: ${leagueInviteURL}`,
					// 	{
					// 		autoClose: false,
					// 		hideProgressBar: true,
					// 		closeOnClick: false,
					// 	},
					// );
					console.log(leagueInviteURL);
				}
			} catch (err) {
				console.error("Fallback: Oops, unable to copy", err);
				toast.error(
					`Oops, unable to copy! Your invite link: ${leagueInviteURL}`,
					{
						autoClose: false,
						hideProgressBar: true,
						closeOnClick: false,
					},
				);
			}
			document.body.removeChild(textArea);
		}
		setTimeout(() => setIsCopied(false), 1500);
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleSportSelection = (e) => {
		const sportName = e.target.getAttribute("data-sport-name");
		if (sportName === null) {
			return;
		}
		setFormData({ ...formData, sport: sportName });
		setCurrentStep(currentStep + 1);
	};

	const clearForm = () => {
		setFormData(initialFormData);
	};

	const renderFormFields = () => {
		switch (currentStep) {
			case 1:
				return (
					<>
						<SportSelector handler={handleSportSelection} />
					</>
				);
			case 2:
				return (
					<>
						<label htmlFor='name'>League Name</label>
						<input
							className={formErrors.name ? "error" : ""}
							type='text'
							name='name'
							id='name'
							value={formData.name}
							onChange={handleInputChange}
							placeholder='Enter the name of your league...'
						/>
						<label htmlFor='maxPlayers'>Max Players</label>
						<select
							className={formErrors.maxPlayers ? "error" : ""}
							name='maxPlayers'
							id='maxPlayers'
							value={formData.maxPlayers}
							onChange={handleInputChange}>
							<option value='8'>8</option>
							<option value='10'>10</option>
							<option value='12'>12</option>
							<option value='14'>14</option>
							<option value='16'>16</option>
							<option value='18'>18</option>
							<option value='20'>20</option>
							<option value='22'>22</option>
							<option value='24'>24</option>
							<option value='26'>26</option>
							<option value='28'>28</option>
							<option value='30'>30</option>
							<option value='32'>32</option>
						</select>
					</>
				);
			case 3:
				return (
					<>
						<label htmlFor='isPublic'>
							Should everyone be able to join your league?
						</label>
						<select
							className={formErrors.isPublic ? "error" : ""}
							name='isPublic'
							id='isPublic'
							onChange={handleInputChange}
							value={formData.isPublic}>
							<option value='true'>Yes</option>
							<option value='false'>No</option>
						</select>
						{formData.isPublic === "false" && (
							<>
								<label htmlFor='password'>Password</label>
								<input
									className={
										formErrors.password ? "error" : ""
									}
									type='password'
									name='password'
									id='password'
									onChange={handleInputChange}
									value={formData.password}
								/>
							</>
						)}
					</>
				);
			default:
				return null;
		}
	};

	return (
		<div className='modal'>
			<div className='modal-backdrop' onClick={closeModal}>
				<div className='modal-item' onClick={handleModalContentClick}>
					<div className='createLeague create-league-modal'>
						<div className='modal-header'>
							<div className='back'>
								{currentStep > 1 && (
									<button
										className='btn btn--back'
										onClick={handleBack}>
										<IoMdArrowBack />
									</button>
								)}
							</div>
							<div className='progress'>
								<span>Step {currentStep} of 4</span>
								<div className='progress__bar'>
									<div
										className={`progress__bar--${currentStep}`}></div>
								</div>
							</div>
							<div className='close'>
								<button
									className='btn btn--close'
									onClick={closeModal}>
									<IoMdClose />
								</button>
							</div>
						</div>
						<div className='modal-content'>
							<div className='leagueForm'>
								<div className='stepHeader'>
									<h2>{stepHeaders[currentStep - 1]}</h2>
									<p>{stepDescriptions[currentStep - 1]}</p>
								</div>

								<form onSubmit={(e) => e.preventDefault()}>
									{renderFormFields()}
									<div className='leagueForm__actions'>
										{currentStep > 1 && (
											<button
												className='btn btn--cta'
												onClick={
													currentStep === 4
														? handleShare
														: handleContinue
												}>
												{currentStep === 2
													? "Continue"
													: currentStep === 3
													? "Create League"
													: isLoading
													? "Loading..."
													: "Copy Invite Code"}
											</button>
										)}
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

CreateLeagueModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
	user: PropTypes.object,
};

export default CreateLeagueModal;
