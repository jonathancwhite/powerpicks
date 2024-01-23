import { useSelector } from "react-redux";

const AccountSettings = () => {
	const auth = useSelector((state) => state.auth);

	const handleInputChange = (e) => {
		console.log("handleInputChange");
		// use e.target.value to update formData?
	};

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
								label='Email'
								placeholder='Enter your email'
								aria-label='Email'
								value={auth.userInfo.email}
								onChange={(e) => handleInputChange(e)}
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
								value=''
							/>
							<span className='spinner grey'></span>
							<div className='validation-msg'></div>
							<div className='right-wrap'></div>
						</div>
					</div>
				</div>
				<div className='bottom-wrap'>
					<div className='form-elements button'>
						<button className='btn btn--tertiary'>
							Change Password
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountSettings;
