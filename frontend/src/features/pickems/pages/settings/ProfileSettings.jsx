import { useSelector } from "react-redux";

const ProfileSettings = () => {
	const auth = useSelector((state) => state.auth);
	return (
		<div className='settings__main'>
			<div className='settings__header'>
				<div className='settings__header--title'>Edit Your Profile</div>
				<div className='settings__header--text'>
					Edit your username.
				</div>
			</div>
			<div className='settings__content'>
				<div className='form-container'>
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
				</div>
				{/* <div className='form-container'>
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
				</div> */}
				<div className='bottom-wrap'>
					<div className='form-elements button'>
						<button className='btn btn--tertiary'>Save</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileSettings;
