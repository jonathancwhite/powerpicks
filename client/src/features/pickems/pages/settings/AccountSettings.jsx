import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateUser, setCredentials } from "../../../../slices/authSlice";

const AccountSettings = () => {
	const { userInfo, isLoading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const initialFormData = {
		email: userInfo.email,
		phoneNumber: userInfo.phoneNumber ? userInfo.phoneNumber : "",
	};

	const [accountSettingsData, setAccountSettingsData] =
		useState(initialFormData);

	const handleInputChange = (e) => {
		setAccountSettingsData({
			...accountSettingsData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSaveAccount = async () => {
		const id = userInfo._id;
		const token = userInfo.token;

		let updatedUserInfo = {
			email: accountSettingsData.email,
			phoneNumber: accountSettingsData.phoneNumber,
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
					toast.success("Account Updated");
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
		toast.dismiss();
	});

	return (
		<div className='settings__main'>
			<div className='settings__header'>
				<div className='settings__header--title'>Account Settings</div>
				<div className='settings__header--text'>
					Your login email / phone number & password allow you to
					authenticate yourself and use PowerPicks on multiple
					devices. Never give out your credentials to anyone!
				</div>
			</div>
			<div className='settings__content'>
				<div className='form-container'>
					<div className='form-item-wrap'>
						<div className='form-elements text-input'>
							<label>Email</label>
							<input
								label='email'
								placeholder='Enter your email'
								aria-label='Email'
								name='email'
								value={accountSettingsData.email}
								onChange={(e) => handleInputChange(e)}
								disabled={isLoading}
							/>
							<span className='spinner grey'></span>
							<div className='validation-msg'></div>
							<div className='right-wrap'></div>
						</div>
					</div>
				</div>
				<div className='form-container'>
					<div className='form-item-wrap'>
						<div className='form-elements text-input'>
							<label>Phone Number</label>
							<input
								label='Phone Number'
								placeholder='Enter your phone number'
								aria-label='Phone Number'
								name='phoneNumber'
								value={accountSettingsData.phoneNumber}
								onChange={(e) => handleInputChange(e)}
								disabled={isLoading}
							/>
							<span className='spinner grey'></span>
							<div className='validation-msg'></div>
							<div className='right-wrap'></div>
						</div>
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
								onClick={handleSaveAccount}>
								Update Account
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountSettings;
